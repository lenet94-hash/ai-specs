// ── Types ──────────────────────────────────────────────────────────────────

export interface SpecProperty {
  name: string;
  value: string;
  source: "direct" | "token" | "variable" | "not-found";
  token?: string;
}

export interface SpecData {
  nodeName: string;
  nodeType: string;
  properties: SpecProperty[];
}

// ── URL parsing ─────────────────────────────────────────────────────────────

export function parseFigmaUrl(
  raw: string,
): { fileKey: string; nodeId: string } | null {
  try {
    const u = new URL(raw.trim());
    if (!["www.figma.com", "figma.com"].includes(u.hostname)) return null;
    const match = u.pathname.match(/^\/(file|design)\/([A-Za-z0-9_-]+)/);
    if (!match) return null;
    const fileKey = match[2];
    const rawNodeId = u.searchParams.get("node-id");
    if (!rawNodeId) return null;
    // URL format uses "-" as separator; API expects ":"
    // URLSearchParams already decodes %3A → ":", handle both forms
    const nodeId = rawNodeId.includes(":")
      ? rawNodeId
      : rawNodeId.replace(/-/g, ":");
    return { fileKey, nodeId };
  } catch {
    return null;
  }
}

// ── Internal Figma node types ────────────────────────────────────────────────

type FigmaColor = { r: number; g: number; b: number; a: number };
type FigmaBoundVariable = { type: "VARIABLE_ALIAS"; id: string };
type FigmaFill = {
  type: string;
  color?: FigmaColor;
  boundVariables?: { color?: FigmaBoundVariable };
};

interface FigmaTextStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  lineHeightPx?: number;
  lineHeightPercentFontSize?: number;
  lineHeightUnit?: string;
}

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  absoluteBoundingBox?: { width: number; height: number };
  layoutSizingHorizontal?: string;
  layoutSizingVertical?: string;
  layoutMode?: string;
  itemSpacing?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  primaryAxisAlignItems?: string;
  counterAxisAlignItems?: string;
  fills?: FigmaFill[];
  styles?: Record<string, string>;
  boundVariables?: { fills?: FigmaBoundVariable[] };
  style?: FigmaTextStyle;
  cornerRadius?: number;
  rectangleCornerRadii?: [number, number, number, number];
  constraints?: { horizontal: string; vertical: string };
  children?: FigmaNode[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function colorToString(c: FigmaColor): string {
  const r = Math.round(c.r * 255);
  const g = Math.round(c.g * 255);
  const b = Math.round(c.b * 255);
  const a = c.a ?? 1;
  if (a < 0.995) {
    return `rgba(${r}, ${g}, ${b}, ${parseFloat(a.toFixed(2))})`;
  }
  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  ).toUpperCase();
}

function direct(name: string, value: string, token?: string): SpecProperty {
  return { name, value, source: token ? "token" : "direct", token };
}

function missing(name: string): SpecProperty {
  return { name, value: "не знайдено", source: "not-found" };
}

// ── Spec extraction ──────────────────────────────────────────────────────────

function extractSpec(
  node: FigmaNode,
  styleNames: Record<string, string>,
): SpecData {
  // For COMPONENT_SET take first child (default variant)
  const t: FigmaNode =
    node.type === "COMPONENT_SET" && node.children?.length
      ? node.children[0]
      : node;

  const props: SpecProperty[] = [];

  // Dimensions
  const w = t.absoluteBoundingBox?.width;
  const h = t.absoluteBoundingBox?.height;
  props.push(
    w !== undefined
      ? direct(
          "Width",
          t.layoutSizingHorizontal
            ? `${Math.round(w)}px (${t.layoutSizingHorizontal})`
            : `${Math.round(w)}px`,
        )
      : missing("Width"),
  );
  props.push(
    h !== undefined
      ? direct(
          "Height",
          t.layoutSizingVertical
            ? `${Math.round(h)}px (${t.layoutSizingVertical})`
            : `${Math.round(h)}px`,
        )
      : missing("Height"),
  );

  // Auto layout
  if (t.layoutMode && t.layoutMode !== "NONE") {
    props.push(
      direct(
        "Layout mode",
        t.layoutMode === "HORIZONTAL" ? "Horizontal" : "Vertical",
      ),
    );
    props.push(direct("Gap", `${t.itemSpacing ?? 0}px`));
    const pt = t.paddingTop ?? 0;
    const pr = t.paddingRight ?? 0;
    const pb = t.paddingBottom ?? 0;
    const pl = t.paddingLeft ?? 0;
    const padding =
      pt === pr && pr === pb && pb === pl
        ? `${pt}px`
        : `${pt}px ${pr}px ${pb}px ${pl}px`;
    props.push(direct("Padding", padding));
    props.push(direct("Primary axis align", t.primaryAxisAlignItems ?? "—"));
    props.push(direct("Counter axis align", t.counterAxisAlignItems ?? "—"));
  } else {
    props.push(missing("Layout mode"));
    props.push(missing("Gap"));
    props.push(missing("Padding"));
    props.push(missing("Primary axis align"));
    props.push(missing("Counter axis align"));
  }

  // Fills
  const fills = (t.fills ?? []).filter((f) => f.type !== "NONE" && f.color);
  if (fills.length) {
    fills.forEach((fill, i) => {
      const label = fills.length > 1 ? `Fill color ${i + 1}` : "Fill color";
      const hex = colorToString(fill.color!);

      // 1. Shared Style — resolve name from styles map
      const styleId = t.styles?.fill ?? t.styles?.fills;
      const styleName = styleId ? styleNames[styleId] : undefined;
      if (styleName) {
        props.push({ name: label, value: hex, source: "token", token: styleName });
        return;
      }

      // 2. Bound Variable — name unresolvable without Enterprise plan, no API call
      const hasBoundVar =
        fill.boundVariables?.color != null ||
        t.boundVariables?.fills?.[i] != null;
      if (hasBoundVar) {
        props.push({ name: label, value: hex, source: "variable" });
        return;
      }

      // 3. Direct value
      props.push({ name: label, value: hex, source: "direct" });
    });
  } else {
    props.push(missing("Fill color"));
  }

  // Typography — from the node itself if TEXT, or first TEXT child
  const textNode =
    t.type === "TEXT" ? t : t.children?.find((c) => c.type === "TEXT");
  if (textNode?.style) {
    const s = textNode.style;
    props.push(
      s.fontFamily ? direct("Font family", s.fontFamily) : missing("Font family"),
    );
    props.push(
      s.fontSize !== undefined
        ? direct("Font size", `${s.fontSize}px`)
        : missing("Font size"),
    );
    props.push(
      s.fontWeight !== undefined
        ? direct("Font weight", String(s.fontWeight))
        : missing("Font weight"),
    );
    if (s.lineHeightUnit === "PIXELS" && s.lineHeightPx !== undefined) {
      props.push(direct("Line height", `${s.lineHeightPx}px`));
    } else if (
      s.lineHeightUnit === "PERCENT" &&
      s.lineHeightPercentFontSize !== undefined
    ) {
      props.push(direct("Line height", `${s.lineHeightPercentFontSize}%`));
    } else {
      props.push(missing("Line height"));
    }
  } else {
    props.push(missing("Font family"));
    props.push(missing("Font size"));
    props.push(missing("Font weight"));
    props.push(missing("Line height"));
  }

  // Border radius
  if (t.rectangleCornerRadii) {
    const [tl, tr, br, bl] = t.rectangleCornerRadii;
    const val =
      tl === tr && tr === br && br === bl
        ? `${tl}px`
        : `${tl}px ${tr}px ${br}px ${bl}px`;
    props.push(direct("Border radius", val));
  } else if (t.cornerRadius !== undefined) {
    props.push(direct("Border radius", `${t.cornerRadius}px`));
  } else {
    props.push(missing("Border radius"));
  }

  // Constraints
  if (t.constraints) {
    props.push(direct("Horizontal constraint", t.constraints.horizontal));
    props.push(direct("Vertical constraint", t.constraints.vertical));
  } else {
    props.push(missing("Horizontal constraint"));
    props.push(missing("Vertical constraint"));
  }

  return { nodeName: t.name, nodeType: t.type, properties: props };
}

// ── API call ─────────────────────────────────────────────────────────────────

export async function fetchFigmaSpec(
  fileKey: string,
  nodeId: string,
  token: string,
): Promise<SpecData> {
  const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`;

  let res: Response;
  try {
    res = await fetch(url, { headers: { "X-Figma-Token": token } });
  } catch {
    throw new Error(
      "Не вдалось зʼєднатись з Figma API. Перевір підключення до інтернету.",
    );
  }

  if (res.status === 401)
    throw new Error(
      "Невалідний токен. Поверни на попередній крок і підключись знову.",
    );
  if (res.status === 403)
    throw new Error(
      "Немає доступу до файлу. Перевір, що токен має скоуп file_content:read і виданий для цього файлу.",
    );
  if (res.status === 404)
    throw new Error("Файл не знайдено. Перевір посилання.");
  if (!res.ok)
    throw new Error(`Figma API повернув помилку ${res.status}. Спробуй ще раз.`);

  const data = await res.json();
  const nodeEntry = data.nodes?.[nodeId];
  if (!nodeEntry)
    throw new Error(
      "Ноду не знайдено у відповіді. Переконайся, що в URL є параметр node-id і він веде на конкретну ноду.",
    );

  const node = nodeEntry.document as FigmaNode;
  const styleNames: Record<string, string> = {};
  const rawStyles = nodeEntry.styles as
    | Record<string, { name: string }>
    | undefined;
  if (rawStyles) {
    for (const [id, style] of Object.entries(rawStyles)) {
      styleNames[id] = style.name;
    }
  }

  return extractSpec(node, styleNames);
}
