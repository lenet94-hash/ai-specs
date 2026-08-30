// AI Specs — Figma Plugin
// code.ts — runs in the Figma sandbox (main thread)

// ─── Types ──────────────────────────────────────────────────────────────────

interface SpecField {
  label: string;
  value: string;
  source: string;
}

type BoundVariableAlias = { id: string } | undefined;

// ─── Source resolver ─────────────────────────────────────────────────────────

/**
 * Resolves the source annotation for any node field that may be bound to a
 * Figma Variable or a Shared Style.
 *
 * Priority:
 *  1. boundVariables[boundVariableKey]  → Variable name
 *  2. node[styleIdKey]                  → Style name  (only when styleIdKey provided)
 *  3. fallback                          → "пряме значення"
 */
async function resolveFieldSource(
  node: SceneNode,
  boundVariableKey: string,
  styleIdKey?: string
): Promise<string> {
  // 1. Check bound variable
  const boundVars = (node as any).boundVariables as
    | Record<string, BoundVariableAlias | BoundVariableAlias[]>
    | undefined;

  if (boundVars) {
    const binding = boundVars[boundVariableKey];
    if (binding) {
      // fills / strokes are arrays — take first entry
      const alias: BoundVariableAlias = Array.isArray(binding)
        ? binding[0]
        : binding;
      if (alias?.id) {
        try {
          const variable = await figma.variables.getVariableByIdAsync(alias.id);
          if (variable) return `токен: ${variable.name}`;
          return "токен використано, деталі отримати не вдалося";
        } catch {
          return "токен використано, деталі отримати не вдалося";
        }
      }
    }
  }

  // 2. Check shared style (fills / strokes / text / effects only)
  if (styleIdKey) {
    const styleId: string | undefined = (node as any)[styleIdKey];
    if (styleId) {
      try {
        const style = await figma.getStyleByIdAsync(styleId);
        if (style) return `токен: ${style.name}`;
        return "токен використано, деталі отримати не вдалося";
      } catch {
        return "токен використано, деталі отримати не вдалося";
      }
    }
  }

  return "пряме значення";
}

// ─── Value helpers ───────────────────────────────────────────────────────────

function shadowColorStr(c: RGBA): string {
  const r = Math.round(c.r * 255).toString(16).padStart(2, "0");
  const g = Math.round(c.g * 255).toString(16).padStart(2, "0");
  const b = Math.round(c.b * 255).toString(16).padStart(2, "0");
  const a = Math.round(c.a * 100) / 100;
  return a < 1
    ? `rgba(${Math.round(c.r * 255)}, ${Math.round(c.g * 255)}, ${Math.round(c.b * 255)}, ${a})`
    : `#${r}${g}${b}`.toUpperCase();
}

function formatShadow(effect: DropShadowEffect | InnerShadowEffect): string {
  const { color, offset, radius } = effect;
  const spread = (effect as DropShadowEffect).spread ?? 0;
  const spreadStr = spread !== 0 ? ` ${Math.round(spread)}px` : "";
  const prefix = effect.type === "INNER_SHADOW" ? "inset " : "";
  return `${prefix}${Math.round(offset.x)}px ${Math.round(offset.y)}px ${Math.round(radius)}px${spreadStr} ${shadowColorStr(color)}`;
}

function toHex(color: RGB): string {
  const r = Math.round(color.r * 255)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(color.g * 255)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(color.b * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}`.toUpperCase();
}

function toRgba(color: RGB, opacity: number): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = Math.round(opacity * 100) / 100;
  return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : toHex(color);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function px(value: any): string {
  if (value === undefined || value === null) return "не знайдено";
  // figma.mixed is a unique symbol — any arithmetic on it throws
  if (typeof value === "symbol") return "змішані значення";
  return `${Math.round(value as number)}px`;
}

/** Sizing mode label */
function sizeValue(
  node: FrameNode | ComponentNode | InstanceNode | GroupNode,
  axis: "width" | "height"
): string {
  if ("layoutMode" in node && node.layoutMode !== "NONE") {
    const mode =
      axis === "width" ? node.primaryAxisSizingMode : node.counterAxisSizingMode;
    if (mode === "AUTO") return "розраховується автоматично (HUG)";
  }
  // Check if the node participates in parent auto-layout as FILL
  const parent = node.parent as FrameNode | null;
  if (parent && "layoutMode" in parent && parent.layoutMode !== "NONE") {
    const layoutGrow = (node as FrameNode).layoutGrow;
    if (axis === "width" && parent.layoutMode === "HORIZONTAL" && layoutGrow === 1)
      return "розраховується автоматично (FILL)";
    if (axis === "height" && parent.layoutMode === "VERTICAL" && layoutGrow === 1)
      return "розраховується автоматично (FILL)";
  }
  return px(node[axis]);
}

// ─── Main spec builder ───────────────────────────────────────────────────────

async function buildSpec(node: SceneNode): Promise<SpecField[]> {
  const fields: SpecField[] = [];

  // Helper to push a field
  function push(label: string, value: string, source: string) {
    fields.push({ label, value, source });
  }

  const isFrame =
    node.type === "FRAME" ||
    node.type === "COMPONENT" ||
    node.type === "INSTANCE" ||
    node.type === "GROUP";

  const frameNode = isFrame
    ? (node as FrameNode | ComponentNode | InstanceNode)
    : null;

  // ── Width ──
  {
    const autoLabel = frameNode ? sizeValue(frameNode as FrameNode, "width") : null;
    const isAuto = autoLabel?.startsWith("розраховується");
    const widthVal = isAuto ? autoLabel! : px(node.width);
    const widthSource = isAuto
      ? "розраховується автоматично"
      : await resolveFieldSource(node, "width");
    push("Width", widthVal, widthSource);
  }

  // ── Height ──
  {
    const autoLabel = frameNode ? sizeValue(frameNode as FrameNode, "height") : null;
    const isAuto = autoLabel?.startsWith("розраховується");
    const heightVal = isAuto ? autoLabel! : px(node.height);
    const heightSource = isAuto
      ? "розраховується автоматично"
      : await resolveFieldSource(node, "height");
    push("Height", heightVal, heightSource);
  }

  // ── Auto-layout specific fields ──
  if (
    frameNode &&
    "layoutMode" in frameNode &&
    frameNode.layoutMode !== "NONE"
  ) {
    const fn = frameNode as FrameNode;

    // Gap
    const gapVal = px(fn.itemSpacing);
    const gapSource = await resolveFieldSource(node, "itemSpacing");
    push("Gap", gapVal, gapSource);

    // Padding — check if all sides equal first
    const { paddingLeft, paddingRight, paddingTop, paddingBottom } = fn;
    const allEqual =
      paddingLeft === paddingRight &&
      paddingLeft === paddingTop &&
      paddingLeft === paddingBottom;

    if (allEqual) {
      const src = await resolveFieldSource(node, "paddingLeft");
      push("Padding", px(paddingLeft), src);
    } else {
      // Each side independently
      const [srcL, srcR, srcT, srcB] = await Promise.all([
        resolveFieldSource(node, "paddingLeft"),
        resolveFieldSource(node, "paddingRight"),
        resolveFieldSource(node, "paddingTop"),
        resolveFieldSource(node, "paddingBottom"),
      ]);
      push("Padding Top", px(paddingTop), srcT);
      push("Padding Right", px(paddingRight), srcR);
      push("Padding Bottom", px(paddingBottom), srcB);
      push("Padding Left", px(paddingLeft), srcL);
    }
  }

  // ── Fill color ──
  if ("fills" in node) {
    const fills = node.fills as Paint[];
    const solidFill = fills.find(
      (f): f is SolidPaint => f.type === "SOLID" && f.visible !== false
    );
    if (solidFill) {
      const fillVal = toRgba(solidFill.color, solidFill.opacity ?? 1);
      const fillSource = await resolveFieldSource(node, "fills", "fillStyleId");
      push("Fill Color", fillVal, fillSource);
    } else if (fills.length > 0) {
      push("Fill Color", "градієнт або зображення", "пряме значення");
    } else {
      push("Fill Color", "не знайдено", "пряме значення");
    }
  } else {
    push("Fill Color", "не знайдено", "—");
  }

  // ── Stroke color ──
  if ("strokes" in node) {
    const strokes = node.strokes as Paint[];
    const solidStroke = strokes.find(
      (s): s is SolidPaint => s.type === "SOLID" && s.visible !== false
    );
    if (solidStroke) {
      const strokeVal = toRgba(solidStroke.color, solidStroke.opacity ?? 1);
      const strokeSource = await resolveFieldSource(
        node,
        "strokes",
        "strokeStyleId"
      );
      const strokeWeight =
        "strokeWeight" in node && typeof node.strokeWeight !== "symbol"
          ? ` / ${px(node.strokeWeight as number)}`
          : "";
      push("Stroke Color", `${strokeVal}${strokeWeight}`, strokeSource);
    }
    // If no stroke — omit row (not relevant)
  }

  // ── Border radius ──
  if ("cornerRadius" in node) {
    const n = node as RectangleNode | FrameNode | ComponentNode | InstanceNode;

    // Check if corners are uniform (cornerRadius is a number, not mixed)
    const uniform = typeof n.cornerRadius === "number";

    if (uniform && n.cornerRadius !== 0) {
      const src = await resolveFieldSource(node, "topLeftRadius");
      push("Border Radius", px(n.cornerRadius as number), src);
    } else if (!uniform) {
      // Individual corners
      const [srcTL, srcTR, srcBR, srcBL] = await Promise.all([
        resolveFieldSource(node, "topLeftRadius"),
        resolveFieldSource(node, "topRightRadius"),
        resolveFieldSource(node, "bottomRightRadius"),
        resolveFieldSource(node, "bottomLeftRadius"),
      ]);
      const tl = (n as RectangleNode).topLeftRadius ?? 0;
      const tr = (n as RectangleNode).topRightRadius ?? 0;
      const br = (n as RectangleNode).bottomRightRadius ?? 0;
      const bl = (n as RectangleNode).bottomLeftRadius ?? 0;

      // If all corners have the same source binding → single row
      const allSameSource =
        srcTL === srcTR && srcTL === srcBR && srcTL === srcBL;
      const allSameValue = tl === tr && tl === br && tl === bl;

      if (allSameSource && allSameValue) {
        push("Border Radius", px(tl), srcTL);
      } else {
        push("Border Radius (TL)", px(tl), srcTL);
        push("Border Radius (TR)", px(tr), srcTR);
        push("Border Radius (BR)", px(br), srcBR);
        push("Border Radius (BL)", px(bl), srcBL);
      }
    }
    // cornerRadius === 0 and uniform → skip (no rounding)
  }

  // ── Effects / Shadows ──
  if ("effects" in node) {
    const effects = node.effects as Effect[];
    const shadows = effects.filter(
      (e): e is DropShadowEffect | InnerShadowEffect =>
        (e.type === "DROP_SHADOW" || e.type === "INNER_SHADOW") &&
        e.visible !== false
    );

    if (shadows.length === 0) {
      push("Shadow", "не знайдено", "—");
    } else {
      // effectStyleId covers all effects on a node at once
      const effectSource = await resolveFieldSource(node, "effects", "effectStyleId");
      if (shadows.length === 1) {
        push("Shadow", formatShadow(shadows[0]), effectSource);
      } else {
        shadows.forEach((shadow, i) => {
          push(`Shadow ${i + 1}`, formatShadow(shadow), effectSource);
        });
      }
    }
  }

  // ── Typography (text nodes) ──
  if (node.type === "TEXT") {
    const t = node as TextNode;

    // Font family
    const fontFamily =
      t.fontName !== figma.mixed
        ? (t.fontName as FontName).family
        : "змішане";
    const familySrc = await resolveFieldSource(node, "fontFamily", "textStyleId");
    push("Font Family", fontFamily, familySrc);

    // Font size
    const fontSize =
      t.fontSize !== figma.mixed ? `${t.fontSize}px` : "змішане";
    const fontSizeSrc = await resolveFieldSource(node, "fontSize", "textStyleId");
    push("Font Size", fontSize, fontSizeSrc);

    // Font weight
    const fontWeight =
      t.fontName !== figma.mixed
        ? String((t.fontName as FontName).style)
        : "змішане";
    const fontWeightSrc = await resolveFieldSource(
      node,
      "fontWeight",
      "textStyleId"
    );
    push("Font Weight", fontWeight, fontWeightSrc);

    // Line height
    let lineHeightVal = "не знайдено";
    if (t.lineHeight !== figma.mixed) {
      const lh = t.lineHeight as LineHeight;
      lineHeightVal =
        lh.unit === "PIXELS"
          ? `${lh.value}px`
          : lh.unit === "PERCENT"
          ? `${lh.value}%`
          : "auto";
    } else {
      lineHeightVal = "змішане";
    }
    const lineHeightSrc = await resolveFieldSource(
      node,
      "lineHeight",
      "textStyleId"
    );
    push("Line Height", lineHeightVal, lineHeightSrc);

    // Letter spacing
    let letterSpacingVal = "не знайдено";
    if (t.letterSpacing !== figma.mixed) {
      const ls = t.letterSpacing as LetterSpacing;
      letterSpacingVal =
        ls.unit === "PIXELS" ? `${ls.value}px` : `${ls.value}%`;
    } else {
      letterSpacingVal = "змішане";
    }
    const letterSpacingSrc = await resolveFieldSource(
      node,
      "letterSpacing",
      "textStyleId"
    );
    push("Letter Spacing", letterSpacingVal, letterSpacingSrc);
  }

  return fields;
}

// ─── Plugin entry point ──────────────────────────────────────────────────────

figma.showUI(__html__, { width: 596, height: 560, themeColors: false });

figma.on("selectionchange", async () => {
  await analyzeSelection();
});

async function analyzeSelection() {
  const sel = figma.currentPage.selection;

  if (sel.length === 0) {
    figma.ui.postMessage({ type: "no-selection" });
    return;
  }

  if (sel.length > 1) {
    figma.ui.postMessage({ type: "multi-selection" });
    return;
  }

  const node = sel[0];

  try {
    const fields = await buildSpec(node);
    figma.ui.postMessage({
      type: "spec-data",
      payload: {
        nodeName: node.name,
        nodeType: node.type,
        fields,
      },
    });
  } catch {
    figma.ui.postMessage({
      type: "error",
      message:
        "Не вдалося прочитати цей елемент. Спробуйте обрати компонент, а не текстовий шар чи довільну групу.",
    });
  }
}

// Run once immediately on open
analyzeSelection();
