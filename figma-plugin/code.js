"use strict";
// AI Specs — Figma Plugin
// code.ts — runs in the Figma sandbox (main thread)
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
async function resolveFieldSource(node, boundVariableKey, styleIdKey) {
    // 1. Check bound variable
    const boundVars = node.boundVariables;
    if (boundVars) {
        const binding = boundVars[boundVariableKey];
        if (binding) {
            // fills / strokes are arrays — take first entry
            const alias = Array.isArray(binding)
                ? binding[0]
                : binding;
            if (alias === null || alias === void 0 ? void 0 : alias.id) {
                try {
                    const variable = await figma.variables.getVariableByIdAsync(alias.id);
                    if (variable)
                        return `токен: ${variable.name}`;
                    return "токен використано, деталі отримати не вдалося";
                }
                catch (_a) {
                    return "токен використано, деталі отримати не вдалося";
                }
            }
        }
    }
    // 2. Check shared style (fills / strokes / text / effects only)
    if (styleIdKey) {
        const styleId = node[styleIdKey];
        if (styleId) {
            try {
                const style = await figma.getStyleByIdAsync(styleId);
                if (style)
                    return `токен: ${style.name}`;
                return "токен використано, деталі отримати не вдалося";
            }
            catch (_b) {
                return "токен використано, деталі отримати не вдалося";
            }
        }
    }
    return "пряме значення";
}
// ─── Value helpers ───────────────────────────────────────────────────────────
function shadowColorStr(c) {
    const r = Math.round(c.r * 255).toString(16).padStart(2, "0");
    const g = Math.round(c.g * 255).toString(16).padStart(2, "0");
    const b = Math.round(c.b * 255).toString(16).padStart(2, "0");
    const a = Math.round(c.a * 100) / 100;
    return a < 1
        ? `rgba(${Math.round(c.r * 255)}, ${Math.round(c.g * 255)}, ${Math.round(c.b * 255)}, ${a})`
        : `#${r}${g}${b}`.toUpperCase();
}
function formatShadow(effect) {
    var _a;
    const { color, offset, radius } = effect;
    const spread = (_a = effect.spread) !== null && _a !== void 0 ? _a : 0;
    const spreadStr = spread !== 0 ? ` ${Math.round(spread)}px` : "";
    const prefix = effect.type === "INNER_SHADOW" ? "inset " : "";
    return `${prefix}${Math.round(offset.x)}px ${Math.round(offset.y)}px ${Math.round(radius)}px${spreadStr} ${shadowColorStr(color)}`;
}
function toHex(color) {
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
function toRgba(color, opacity) {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    const a = Math.round(opacity * 100) / 100;
    return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : toHex(color);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function px(value) {
    if (value === undefined || value === null)
        return "не знайдено";
    // figma.mixed is a unique symbol — any arithmetic on it throws
    if (typeof value === "symbol")
        return "змішані значення";
    return `${Math.round(value)}px`;
}
/** Sizing mode label */
function sizeValue(node, axis) {
    if ("layoutMode" in node && node.layoutMode !== "NONE") {
        const mode = axis === "width" ? node.primaryAxisSizingMode : node.counterAxisSizingMode;
        if (mode === "AUTO")
            return "розраховується автоматично (HUG)";
    }
    // Check if the node participates in parent auto-layout as FILL
    const parent = node.parent;
    if (parent && "layoutMode" in parent && parent.layoutMode !== "NONE") {
        const layoutGrow = node.layoutGrow;
        if (axis === "width" && parent.layoutMode === "HORIZONTAL" && layoutGrow === 1)
            return "розраховується автоматично (FILL)";
        if (axis === "height" && parent.layoutMode === "VERTICAL" && layoutGrow === 1)
            return "розраховується автоматично (FILL)";
    }
    return px(node[axis]);
}
// ─── Main spec builder ───────────────────────────────────────────────────────
async function buildSpec(node) {
    var _a, _b, _c, _d, _e, _f;
    const fields = [];
    // Helper to push a field
    function push(label, value, source) {
        fields.push({ label, value, source });
    }
    const isFrame = node.type === "FRAME" ||
        node.type === "COMPONENT" ||
        node.type === "INSTANCE" ||
        node.type === "GROUP";
    const frameNode = isFrame
        ? node
        : null;
    // ── Width ──
    {
        const autoLabel = frameNode ? sizeValue(frameNode, "width") : null;
        const isAuto = autoLabel === null || autoLabel === void 0 ? void 0 : autoLabel.startsWith("розраховується");
        const widthVal = isAuto ? autoLabel : px(node.width);
        const widthSource = isAuto
            ? "розраховується автоматично"
            : await resolveFieldSource(node, "width");
        push("Width", widthVal, widthSource);
    }
    // ── Height ──
    {
        const autoLabel = frameNode ? sizeValue(frameNode, "height") : null;
        const isAuto = autoLabel === null || autoLabel === void 0 ? void 0 : autoLabel.startsWith("розраховується");
        const heightVal = isAuto ? autoLabel : px(node.height);
        const heightSource = isAuto
            ? "розраховується автоматично"
            : await resolveFieldSource(node, "height");
        push("Height", heightVal, heightSource);
    }
    // ── Auto-layout specific fields ──
    if (frameNode &&
        "layoutMode" in frameNode &&
        frameNode.layoutMode !== "NONE") {
        const fn = frameNode;
        // Gap
        const gapVal = px(fn.itemSpacing);
        const gapSource = await resolveFieldSource(node, "itemSpacing");
        push("Gap", gapVal, gapSource);
        // Padding — check if all sides equal first
        const { paddingLeft, paddingRight, paddingTop, paddingBottom } = fn;
        const allEqual = paddingLeft === paddingRight &&
            paddingLeft === paddingTop &&
            paddingLeft === paddingBottom;
        if (allEqual) {
            const src = await resolveFieldSource(node, "paddingLeft");
            push("Padding", px(paddingLeft), src);
        }
        else {
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
        const fills = node.fills;
        const solidFill = fills.find((f) => f.type === "SOLID" && f.visible !== false);
        if (solidFill) {
            const fillVal = toRgba(solidFill.color, (_a = solidFill.opacity) !== null && _a !== void 0 ? _a : 1);
            const fillSource = await resolveFieldSource(node, "fills", "fillStyleId");
            push("Fill Color", fillVal, fillSource);
        }
        else if (fills.length > 0) {
            push("Fill Color", "градієнт або зображення", "пряме значення");
        }
        else {
            push("Fill Color", "не знайдено", "пряме значення");
        }
    }
    else {
        push("Fill Color", "не знайдено", "—");
    }
    // ── Stroke color ──
    if ("strokes" in node) {
        const strokes = node.strokes;
        const solidStroke = strokes.find((s) => s.type === "SOLID" && s.visible !== false);
        if (solidStroke) {
            const strokeVal = toRgba(solidStroke.color, (_b = solidStroke.opacity) !== null && _b !== void 0 ? _b : 1);
            const strokeSource = await resolveFieldSource(node, "strokes", "strokeStyleId");
            const strokeWeight = "strokeWeight" in node && typeof node.strokeWeight !== "symbol"
                ? ` / ${px(node.strokeWeight)}`
                : "";
            push("Stroke Color", `${strokeVal}${strokeWeight}`, strokeSource);
        }
        // If no stroke — omit row (not relevant)
    }
    // ── Border radius ──
    if ("cornerRadius" in node) {
        const n = node;
        // Check if corners are uniform (cornerRadius is a number, not mixed)
        const uniform = typeof n.cornerRadius === "number";
        if (uniform && n.cornerRadius !== 0) {
            const src = await resolveFieldSource(node, "topLeftRadius");
            push("Border Radius", px(n.cornerRadius), src);
        }
        else if (!uniform) {
            // Individual corners
            const [srcTL, srcTR, srcBR, srcBL] = await Promise.all([
                resolveFieldSource(node, "topLeftRadius"),
                resolveFieldSource(node, "topRightRadius"),
                resolveFieldSource(node, "bottomRightRadius"),
                resolveFieldSource(node, "bottomLeftRadius"),
            ]);
            const tl = (_c = n.topLeftRadius) !== null && _c !== void 0 ? _c : 0;
            const tr = (_d = n.topRightRadius) !== null && _d !== void 0 ? _d : 0;
            const br = (_e = n.bottomRightRadius) !== null && _e !== void 0 ? _e : 0;
            const bl = (_f = n.bottomLeftRadius) !== null && _f !== void 0 ? _f : 0;
            // If all corners have the same source binding → single row
            const allSameSource = srcTL === srcTR && srcTL === srcBR && srcTL === srcBL;
            const allSameValue = tl === tr && tl === br && tl === bl;
            if (allSameSource && allSameValue) {
                push("Border Radius", px(tl), srcTL);
            }
            else {
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
        const effects = node.effects;
        const shadows = effects.filter((e) => (e.type === "DROP_SHADOW" || e.type === "INNER_SHADOW") &&
            e.visible !== false);
        if (shadows.length === 0) {
            push("Shadow", "не знайдено", "—");
        }
        else {
            // effectStyleId covers all effects on a node at once
            const effectSource = await resolveFieldSource(node, "effects", "effectStyleId");
            if (shadows.length === 1) {
                push("Shadow", formatShadow(shadows[0]), effectSource);
            }
            else {
                shadows.forEach((shadow, i) => {
                    push(`Shadow ${i + 1}`, formatShadow(shadow), effectSource);
                });
            }
        }
    }
    // ── Typography (text nodes) ──
    if (node.type === "TEXT") {
        const t = node;
        // Font family
        const fontFamily = t.fontName !== figma.mixed
            ? t.fontName.family
            : "змішане";
        const familySrc = await resolveFieldSource(node, "fontFamily", "textStyleId");
        push("Font Family", fontFamily, familySrc);
        // Font size
        const fontSize = t.fontSize !== figma.mixed ? `${t.fontSize}px` : "змішане";
        const fontSizeSrc = await resolveFieldSource(node, "fontSize", "textStyleId");
        push("Font Size", fontSize, fontSizeSrc);
        // Font weight
        const fontWeight = t.fontName !== figma.mixed
            ? String(t.fontName.style)
            : "змішане";
        const fontWeightSrc = await resolveFieldSource(node, "fontWeight", "textStyleId");
        push("Font Weight", fontWeight, fontWeightSrc);
        // Line height
        let lineHeightVal = "не знайдено";
        if (t.lineHeight !== figma.mixed) {
            const lh = t.lineHeight;
            lineHeightVal =
                lh.unit === "PIXELS"
                    ? `${lh.value}px`
                    : lh.unit === "PERCENT"
                        ? `${lh.value}%`
                        : "auto";
        }
        else {
            lineHeightVal = "змішане";
        }
        const lineHeightSrc = await resolveFieldSource(node, "lineHeight", "textStyleId");
        push("Line Height", lineHeightVal, lineHeightSrc);
        // Letter spacing
        let letterSpacingVal = "не знайдено";
        if (t.letterSpacing !== figma.mixed) {
            const ls = t.letterSpacing;
            letterSpacingVal =
                ls.unit === "PIXELS" ? `${ls.value}px` : `${ls.value}%`;
        }
        else {
            letterSpacingVal = "змішане";
        }
        const letterSpacingSrc = await resolveFieldSource(node, "letterSpacing", "textStyleId");
        push("Letter Spacing", letterSpacingVal, letterSpacingSrc);
    }
    return fields;
}
// ─── Container scan helpers ──────────────────────────────────────────────────
function isContainerForScan(node) {
    return (node.type === "FRAME" ||
        node.type === "SECTION" ||
        node.type === "GROUP" ||
        node.type === "COMPONENT_SET");
}
function findTopLevelComponents(container) {
    const results = [];
    function walk(node) {
        if (node.type === "INSTANCE" || node.type === "COMPONENT") {
            results.push(node);
            return;
        }
        if ("children" in node) {
            for (const child of node.children) {
                walk(child);
            }
        }
    }
    for (const child of container.children) {
        walk(child);
    }
    return results;
}
async function tryResolveVariants(node) {
    var _a, _b, _c;
    let componentSet = null;
    let selectedComponent = null;
    if (node.type === "INSTANCE") {
        const main = await node.getMainComponentAsync();
        if (main && ((_a = main.parent) === null || _a === void 0 ? void 0 : _a.type) === "COMPONENT_SET") {
            componentSet = main.parent;
            selectedComponent = main;
        }
    }
    else if (node.type === "COMPONENT") {
        if (((_b = node.parent) === null || _b === void 0 ? void 0 : _b.type) === "COMPONENT_SET") {
            componentSet = node.parent;
            selectedComponent = node;
        }
    }
    if (!componentSet || !selectedComponent)
        return null;
    const selectedProps = (_c = selectedComponent.variantProperties) !== null && _c !== void 0 ? _c : {};
    const hasStateProperty = "State" in selectedProps;
    if (hasStateProperty) {
        const fixedProps = {};
        for (const [key, val] of Object.entries(selectedProps)) {
            if (key !== "State")
                fixedProps[key] = val;
        }
        const stateVariants = componentSet.children.filter((child) => {
            var _a;
            const childProps = (_a = child.variantProperties) !== null && _a !== void 0 ? _a : {};
            return Object.entries(fixedProps).every(([key, val]) => childProps[key] === val);
        });
        return { componentSet, stateVariants, hasStateProperty: true, fixedProps };
    }
    return {
        componentSet,
        stateVariants: [...componentSet.children],
        hasStateProperty: false,
        fixedProps: {},
    };
}
// ─── Plugin entry point ──────────────────────────────────────────────────────
figma.showUI(__html__, { width: 680, height: 580, themeColors: false });
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
    // Container scan (FRAME, SECTION, GROUP, COMPONENT_SET selected directly)
    if (isContainerForScan(node) && node.type !== "COMPONENT") {
        try {
            const components = findTopLevelComponents(node);
            if (components.length === 0) {
                figma.ui.postMessage({ type: "no-components-in-frame" });
                return;
            }
            const specs = await Promise.all(components.map(async (comp) => ({
                nodeName: comp.name,
                nodeType: comp.type,
                fields: await buildSpec(comp),
            })));
            figma.ui.postMessage({
                type: "multi-spec-data",
                payload: {
                    containerName: node.name,
                    containerType: node.type,
                    components: specs,
                },
            });
        }
        catch (_a) {
            figma.ui.postMessage({
                type: "error",
                message: "Не вдалося проаналізувати вміст фрейму.",
            });
        }
        return;
    }
    // Variant comparison (INSTANCE or COMPONENT that belongs to a COMPONENT_SET)
    try {
        const variantResult = await tryResolveVariants(node);
        if (variantResult) {
            const { componentSet, stateVariants, hasStateProperty, fixedProps } = variantResult;
            const variantSpecs = await Promise.all(stateVariants.map(async (variant) => {
                var _a, _b;
                const vProps = (_a = variant.variantProperties) !== null && _a !== void 0 ? _a : {};
                const stateLabel = hasStateProperty
                    ? (_b = vProps["State"]) !== null && _b !== void 0 ? _b : "Unknown"
                    : Object.values(vProps).join(" / ") || variant.name;
                return {
                    stateLabel,
                    fields: await buildSpec(variant),
                };
            }));
            figma.ui.postMessage({
                type: "variant-comparison-data",
                payload: {
                    componentSetName: componentSet.name,
                    fixedProps,
                    hasStateProperty,
                    variants: variantSpecs,
                },
            });
            return;
        }
    }
    catch (_b) {
        // If variant resolution fails, fall through to single spec
    }
    // Single node — original behavior
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
    }
    catch (_c) {
        figma.ui.postMessage({
            type: "error",
            message: "Не вдалося прочитати цей елемент. Спробуйте обрати компонент, а не текстовий шар чи довільну групу.",
        });
    }
}
// Run once immediately on open
analyzeSelection();
