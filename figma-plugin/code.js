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
/** Recursively find all TEXT nodes and return their characters */
function collectTextContent(node) {
    const texts = [];
    if (node.type === "TEXT") {
        const chars = node.characters.trim();
        if (chars)
            texts.push(chars);
    }
    if ("children" in node) {
        for (const child of node.children) {
            texts.push(...collectTextContent(child));
        }
    }
    return texts;
}
/** Check if a node tree contains vector/icon-like elements */
function hasIconChild(node) {
    if (node.type === "VECTOR" || node.type === "STAR" || node.type === "POLYGON" ||
        node.type === "BOOLEAN_OPERATION" || node.type === "LINE")
        return true;
    // Small frames/instances (< 32px) likely icons
    if ((node.type === "INSTANCE" || node.type === "FRAME" || node.type === "COMPONENT") &&
        node.width <= 32 && node.height <= 32)
        return true;
    if ("children" in node) {
        for (const child of node.children) {
            if (hasIconChild(child))
                return true;
        }
    }
    return false;
}
/** Count direct meaningful children (skip invisible) */
function countVisibleChildren(node) {
    if (!("children" in node))
        return 0;
    return node.children.filter((c) => c.visible !== false).length;
}
/** Build variant info for a single node */
async function buildVariantInfo(node) {
    const fields = await buildSpec(node);
    const textContent = collectTextContent(node);
    const icon = hasIconChild(node);
    const childCount = countVisibleChildren(node);
    let variantProperties = {};
    if (node.type === "COMPONENT" && node.variantProperties) {
        variantProperties = node.variantProperties;
    }
    else if (node.type === "INSTANCE") {
        const main = await node.getMainComponentAsync();
        if (main === null || main === void 0 ? void 0 : main.variantProperties)
            variantProperties = main.variantProperties;
    }
    return {
        name: node.name,
        variantProperties,
        fields,
        textContent,
        hasIcon: icon,
        childCount,
    };
}
/** Compare variants and generate facts */
function generateFacts(variants, componentSetName) {
    const facts = [];
    // ── Variant properties (what axes exist) ──
    const allPropKeys = new Set();
    for (const v of variants) {
        for (const key of Object.keys(v.variantProperties)) {
            allPropKeys.add(key);
        }
    }
    for (const key of allPropKeys) {
        const values = [...new Set(variants.map((v) => v.variantProperties[key]).filter(Boolean))];
        if (values.length > 0) {
            facts.push({
                fact: `Variant property "${key}" has values: ${values.join(", ")}`,
                category: "structure",
            });
        }
    }
    // ── Build field maps for comparison ──
    const fieldMaps = variants.map((v) => {
        const m = {};
        for (const f of v.fields)
            m[f.label] = f;
        return m;
    });
    const allLabels = new Set();
    for (const v of variants) {
        for (const f of v.fields)
            allLabels.add(f.label);
    }
    // ── Find differences across variants ──
    for (const label of allLabels) {
        const valuesWithVariant = [];
        for (let i = 0; i < variants.length; i++) {
            const field = fieldMaps[i][label];
            if (field) {
                valuesWithVariant.push({
                    value: field.value,
                    source: field.source,
                    variantName: variants[i].name,
                });
            }
        }
        const uniqueValues = [...new Set(valuesWithVariant.map((v) => v.value))];
        if (uniqueValues.length === 1) {
            // Same across all variants — single fact
            const src = valuesWithVariant[0].source;
            const tokenInfo = src.startsWith("токен:") ? ` (${src})` : "";
            facts.push({
                fact: `${label} is ${uniqueValues[0]} across all variants${tokenInfo}`,
                category: categorizeField(label),
            });
        }
        else {
            // Different across variants — detail per variant
            const diffs = valuesWithVariant.map((v) => {
                const tokenInfo = v.source.startsWith("токен:") ? ` (${v.source})` : "";
                return `${v.variantName}: ${v.value}${tokenInfo}`;
            });
            facts.push({
                fact: `${label} differs across variants — ${diffs.join("; ")}`,
                category: categorizeField(label),
            });
        }
    }
    // ── Token usage summary ──
    const tokenNames = new Set();
    for (const v of variants) {
        for (const f of v.fields) {
            if (f.source.startsWith("токен:")) {
                tokenNames.add(f.source.replace("токен:", "").trim());
            }
        }
    }
    if (tokenNames.size > 0) {
        facts.push({
            fact: `Design tokens used: ${[...tokenNames].join(", ")}`,
            category: "tokens",
        });
    }
    // ── Content patterns ──
    const allTexts = [];
    for (const v of variants) {
        for (const t of v.textContent)
            allTexts.push(t);
    }
    const uniqueTexts = [...new Set(allTexts)];
    if (uniqueTexts.length > 0) {
        facts.push({
            fact: `Text content found across variants: "${uniqueTexts.join('", "')}"`,
            category: "content",
        });
    }
    // ── Icon presence ──
    const withIcon = variants.filter((v) => v.hasIcon);
    const withoutIcon = variants.filter((v) => !v.hasIcon);
    if (withIcon.length > 0 && withoutIcon.length > 0) {
        facts.push({
            fact: `Some variants have icons (${withIcon.map((v) => v.name).join(", ")}), others don't (${withoutIcon.map((v) => v.name).join(", ")})`,
            category: "content",
        });
    }
    else if (withIcon.length === variants.length) {
        facts.push({ fact: "All variants contain icon elements", category: "content" });
    }
    else if (withIcon.length === 0) {
        facts.push({ fact: "No variants contain icon elements", category: "content" });
    }
    // ── Child count patterns ──
    const childCounts = [...new Set(variants.map((v) => v.childCount))];
    if (childCounts.length === 1) {
        facts.push({
            fact: `All variants have ${childCounts[0]} direct child elements`,
            category: "structure",
        });
    }
    else {
        const details = variants.map((v) => `${v.name}: ${v.childCount} children`);
        facts.push({
            fact: `Child element count varies — ${details.join("; ")}`,
            category: "structure",
        });
    }
    return facts;
}
function categorizeField(label) {
    if (label.startsWith("Font") || label === "Line Height" || label === "Letter Spacing")
        return "typography";
    if (label.startsWith("Padding") || label === "Gap")
        return "spacing";
    if (label.startsWith("Fill") || label.startsWith("Stroke") || label === "Shadow" ||
        label.startsWith("Shadow") || label.startsWith("Border Radius"))
        return "visual";
    return "structure";
}
/** Walk up the tree collecting frame/section/group names */
function getParentChain(node) {
    const chain = [];
    let current = node.parent;
    while (current && current.type !== "PAGE" && current.type !== "DOCUMENT") {
        if ("name" in current) {
            chain.push(current.name);
        }
        current = current.parent;
    }
    return chain;
}
/** Get names of sibling instances/components (immediate siblings only) */
function getSiblingComponentNames(node) {
    const parent = node.parent;
    if (!parent || !("children" in parent))
        return [];
    const names = [];
    for (const child of parent.children) {
        const c = child;
        if (c.id === node.id)
            continue;
        if (c.type === "INSTANCE" || c.type === "COMPONENT") {
            names.push(c.name);
        }
        else if (c.type === "TEXT") {
            names.push(`[Text: "${c.characters.slice(0, 40)}"]`);
        }
    }
    return names;
}
/** Find all instances of a component set on the current page */
async function scanUsageOnPage(componentSetId) {
    const allInstances = figma.currentPage.findAll((n) => n.type === "INSTANCE");
    const contexts = [];
    const pageName = figma.currentPage.name;
    for (const inst of allInstances) {
        let mainComp = null;
        try {
            mainComp = await inst.getMainComponentAsync();
        }
        catch (_a) {
            continue;
        }
        if (!mainComp)
            continue;
        const parentSet = mainComp.parent;
        if (!parentSet || parentSet.type !== "COMPONENT_SET")
            continue;
        if (parentSet.id !== componentSetId)
            continue;
        contexts.push({
            instanceName: inst.name,
            parentChain: getParentChain(inst),
            siblingComponents: getSiblingComponentNames(inst),
            pageName,
        });
    }
    return contexts;
}
// ─── Semantic interpretation helpers ─────────────────────────────────────────
function generateSemanticFacts(variants, usageContexts) {
    const facts = [];
    // ── Border radius interpretation ──
    for (const v of variants) {
        for (const f of v.fields) {
            if (f.label === "Border Radius" || f.label.startsWith("Border Radius")) {
                const val = parseInt(f.value, 10);
                if (!isNaN(val)) {
                    const h = parseInt((v.fields.find((ff) => ff.label === "Height") || { value: "0" }).value, 10);
                    if (val > 0 && h > 0 && val >= h / 2) {
                        facts.push({
                            fact: `"${v.name}" uses pill-style (fully rounded) border radius (${f.value}, height ${h}px)`,
                            category: "visual",
                        });
                    }
                }
            }
        }
    }
    // ── Opacity interpretation ──
    for (const v of variants) {
        for (const f of v.fields) {
            if (f.label === "Fill Color" && f.value.startsWith("rgba")) {
                const opacityMatch = f.value.match(/,\s*([\d.]+)\)$/);
                if (opacityMatch) {
                    const opacity = parseFloat(opacityMatch[1]);
                    if (opacity < 1 && opacity > 0) {
                        facts.push({
                            fact: `"${v.name}" uses reduced opacity (${Math.round(opacity * 100)}%) on fill — may indicate disabled or muted state`,
                            category: "states",
                        });
                    }
                }
            }
        }
    }
    // ── Size classification ──
    const heights = new Map();
    for (const v of variants) {
        const hf = v.fields.find((f) => f.label === "Height");
        if (hf) {
            const h = parseInt(hf.value, 10);
            if (!isNaN(h))
                heights.set(v.name, h);
        }
    }
    if (heights.size > 1) {
        const sorted = [...heights.entries()].sort((a, b) => a[1] - b[1]);
        const sizeLabels = sorted.map((e) => `${e[0]}=${e[1]}px`);
        facts.push({
            fact: `Size scale from smallest to largest: ${sizeLabels.join(", ")}`,
            category: "structure",
        });
    }
    // ── Usage context facts ──
    if (usageContexts.length > 0) {
        facts.push({
            fact: `Found ${usageContexts.length} instance(s) of this component on page "${usageContexts[0].pageName}"`,
            category: "structure",
        });
        // Group by parent context (first meaningful parent name)
        const contextGroups = new Map();
        for (const ctx of usageContexts) {
            const parentName = ctx.parentChain[0] || "(root)";
            contextGroups.set(parentName, (contextGroups.get(parentName) || 0) + 1);
        }
        if (contextGroups.size > 0) {
            const grouped = [...contextGroups.entries()]
                .sort((a, b) => b[1] - a[1])
                .map((e) => `"${e[0]}" (${e[1]}x)`);
            facts.push({
                fact: `Used in these contexts: ${grouped.join(", ")}`,
                category: "structure",
            });
        }
        // Exclusive usage detection
        if (contextGroups.size === 1) {
            const onlyContext = [...contextGroups.keys()][0];
            facts.push({
                fact: `All instances appear exclusively within "${onlyContext}" — this component may be specific to that context`,
                category: "structure",
            });
        }
        // Sibling analysis — what components appear alongside
        const siblingCounts = new Map();
        for (const ctx of usageContexts) {
            for (const sib of ctx.siblingComponents) {
                siblingCounts.set(sib, (siblingCounts.get(sib) || 0) + 1);
            }
        }
        const commonSiblings = [...siblingCounts.entries()]
            .filter((e) => e[1] >= Math.ceil(usageContexts.length * 0.5))
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        if (commonSiblings.length > 0) {
            facts.push({
                fact: `Frequently appears alongside: ${commonSiblings.map((e) => `"${e[0]}" (${e[1]}/${usageContexts.length} instances)`).join(", ")}`,
                category: "structure",
            });
        }
    }
    else {
        facts.push({
            fact: "No instances of this component found on the current page",
            category: "structure",
        });
    }
    return facts;
}
/** Main entry: collect facts from multiple selected nodes */
async function collectFactsFromSelection(nodes) {
    var _a, _b;
    const variants = await Promise.all(nodes.map((n) => buildVariantInfo(n)));
    // Try to derive a component set name and component set ID
    let componentName = "Component";
    let componentSetId = null;
    for (const node of nodes) {
        if (node.type === "COMPONENT" && ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === "COMPONENT_SET") {
            componentName = node.parent.name;
            componentSetId = node.parent.id;
            break;
        }
        if (node.type === "INSTANCE") {
            const main = await node.getMainComponentAsync();
            if (((_b = main === null || main === void 0 ? void 0 : main.parent) === null || _b === void 0 ? void 0 : _b.type) === "COMPONENT_SET") {
                componentName = main.parent.name;
                componentSetId = main.parent.id;
                break;
            }
        }
        // Fallback: use the common prefix of node names
        if (componentName === "Component") {
            const names = nodes.map((n) => n.name);
            const prefix = commonPrefix(names);
            if (prefix.length > 2)
                componentName = prefix.replace(/[\s/,=-]+$/, "");
        }
    }
    // Collect raw comparison facts
    const rawFacts = generateFacts(variants, componentName);
    // Scan usage across page
    let usageContexts = [];
    if (componentSetId) {
        try {
            usageContexts = await scanUsageOnPage(componentSetId);
        }
        catch (_c) {
            // If scan fails, continue without usage context
        }
    }
    // Generate semantic interpretation facts
    const semanticFacts = generateSemanticFacts(variants, usageContexts);
    const facts = [...rawFacts, ...semanticFacts];
    return { componentName, variants, facts, usageContexts };
}
function commonPrefix(strings) {
    if (strings.length === 0)
        return "";
    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
        while (strings[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (prefix === "")
                return "";
        }
    }
    return prefix;
}
/** Find all instances in a frame tree, grouped by component set */
async function scanFramesForComponents(frames) {
    const groups = new Map();
    for (const frame of frames) {
        const instances = frame.findAll((n) => n.type === "INSTANCE");
        for (const inst of instances) {
            let mainComp = null;
            try {
                mainComp = await inst.getMainComponentAsync();
            }
            catch (_a) {
                continue;
            }
            if (!mainComp)
                continue;
            const parentSet = mainComp.parent;
            if (!parentSet || parentSet.type !== "COMPONENT_SET")
                continue;
            const csId = parentSet.id;
            const csName = parentSet.name;
            if (!groups.has(csId)) {
                groups.set(csId, {
                    componentSetName: csName,
                    componentSetId: csId,
                    instances: [],
                    usedVariantIds: new Set(),
                    variantPropsUsed: new Map(),
                });
            }
            const group = groups.get(csId);
            group.instances.push({ instance: inst, frameName: frame.name });
            // Track the actual component node (variant) used
            group.usedVariantIds.add(mainComp.id);
            // Track which variant properties are used
            const vProps = mainComp.variantProperties;
            if (vProps) {
                for (const [key, val] of Object.entries(vProps)) {
                    if (!group.variantPropsUsed.has(key)) {
                        group.variantPropsUsed.set(key, new Set());
                    }
                    group.variantPropsUsed.get(key).add(val);
                }
            }
        }
    }
    // Build summary for UI
    const frameNames = frames.map((f) => f.name);
    const componentGroups = [];
    for (const [, group] of groups) {
        // Group instances by frame
        const byFrame = new Map();
        for (const { instance, frameName } of group.instances) {
            if (!byFrame.has(frameName)) {
                byFrame.set(frameName, { count: 0, parentChains: [], siblingNames: [] });
            }
            const f = byFrame.get(frameName);
            f.count++;
            if (f.parentChains.length < 5) {
                f.parentChains.push(getParentChain(instance));
                f.siblingNames.push(getSiblingComponentNames(instance));
            }
        }
        const frameContexts = [];
        for (const [fn, data] of byFrame) {
            frameContexts.push(Object.assign({ frameName: fn }, data));
        }
        const variantPropertiesUsed = {};
        for (const [key, vals] of group.variantPropsUsed) {
            variantPropertiesUsed[key] = [...vals];
        }
        componentGroups.push({
            componentSetName: group.componentSetName,
            componentSetId: group.componentSetId,
            instanceCount: group.instances.length,
            usedVariantIds: [...group.usedVariantIds],
            frameContexts,
            variantPropertiesUsed,
        });
    }
    // Sort by instance count descending
    componentGroups.sort((a, b) => b.instanceCount - a.instanceCount);
    figma.ui.postMessage({
        type: "frame-scan-data",
        payload: {
            frameNames,
            totalComponents: componentGroups.length,
            groups: componentGroups,
        },
    });
}
/** When UI requests facts for a specific component from frame scan */
async function generateFactsForComponentInFrames(componentSetId, usedVariantIds, frameContexts, variantPropertiesUsed) {
    // Find the component set node
    const csNode = await figma.getNodeByIdAsync(componentSetId);
    if (!csNode || csNode.type !== "COMPONENT_SET") {
        figma.ui.postMessage({ type: "error", message: "Component Set не знайдено." });
        return;
    }
    // Only analyze variants that are actually used on the selected frames
    const usedIdSet = new Set(usedVariantIds);
    const usedChildren = csNode.children.filter((c) => usedIdSet.has(c.id));
    // Fallback to all children if no matches (shouldn't happen)
    const children = usedChildren.length > 0 ? usedChildren : csNode.children;
    // Limit to 30 max
    const limited = children.length > 30 ? children.slice(0, 30) : children;
    const variants = await Promise.all(limited.map((n) => buildVariantInfo(n)));
    // Generate comparison facts
    const rawFacts = generateFacts(variants, csNode.name);
    // Build usage contexts from the frame scan data
    const usageContexts = [];
    for (const fc of frameContexts) {
        for (let i = 0; i < fc.parentChains.length; i++) {
            usageContexts.push({
                instanceName: csNode.name,
                parentChain: fc.parentChains[i],
                siblingComponents: fc.siblingNames[i] || [],
                pageName: figma.currentPage.name,
            });
        }
    }
    // Add frame-specific context facts
    const frameFacts = [];
    for (const fc of frameContexts) {
        frameFacts.push({
            fact: `Used ${fc.count} time(s) in frame "${fc.frameName}"`,
            category: "structure",
        });
        // Unique parent names within this frame
        const parentNames = new Set();
        for (const chain of fc.parentChains) {
            if (chain[0])
                parentNames.add(chain[0]);
        }
        if (parentNames.size > 0) {
            frameFacts.push({
                fact: `In "${fc.frameName}", placed inside: ${[...parentNames].join(", ")}`,
                category: "structure",
            });
        }
    }
    // Which variant properties are actually used across frames
    for (const [key, vals] of Object.entries(variantPropertiesUsed)) {
        frameFacts.push({
            fact: `Variant "${key}" values used across frames: ${vals.join(", ")}`,
            category: "structure",
        });
    }
    const semanticFacts = generateSemanticFacts(variants, usageContexts);
    const facts = [...rawFacts, ...frameFacts, ...semanticFacts];
    figma.ui.postMessage({
        type: "component-facts-data",
        payload: {
            componentSetId: csNode.id,
            componentName: csNode.name,
            variantCount: variants.length,
            variants: variants.map((v) => ({
                name: v.name,
                variantProperties: v.variantProperties,
                fields: v.fields,
                textContent: v.textContent,
                hasIcon: v.hasIcon,
            })),
            facts,
            usageContexts,
        },
    });
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
        // Determine if selection is frames/sections (screen scan) or components/instances (variant comparison)
        const allContainers = sel.every((n) => n.type === "FRAME" || n.type === "SECTION" || n.type === "GROUP");
        if (allContainers) {
            // Frame scan mode → find all components used across selected frames
            try {
                await scanFramesForComponents(sel);
            }
            catch (_a) {
                figma.ui.postMessage({
                    type: "error",
                    message: "Не вдалося просканувати виділені фрейми.",
                });
            }
        }
        else {
            // Component/instance multi-selection → collect facts
            try {
                const result = await collectFactsFromSelection(sel);
                figma.ui.postMessage({
                    type: "component-facts-data",
                    payload: {
                        componentName: result.componentName,
                        variantCount: result.variants.length,
                        variants: result.variants.map((v) => ({
                            name: v.name,
                            variantProperties: v.variantProperties,
                            fields: v.fields,
                            textContent: v.textContent,
                            hasIcon: v.hasIcon,
                        })),
                        facts: result.facts,
                        usageContexts: result.usageContexts,
                    },
                });
            }
            catch (_b) {
                figma.ui.postMessage({
                    type: "error",
                    message: "Не вдалося проаналізувати виділені елементи.",
                });
            }
        }
        return;
    }
    const node = sel[0];
    // COMPONENT_SET selected → collect facts from all children (variants)
    if (node.type === "COMPONENT_SET") {
        try {
            const csNode = node;
            const allChildren = csNode.children;
            if (allChildren.length === 0) {
                figma.ui.postMessage({ type: "no-components-in-frame" });
                return;
            }
            // Limit to 30 variants to avoid performance issues
            const children = allChildren.length > 30 ? allChildren.slice(0, 30) : allChildren;
            const result = await collectFactsFromSelection(children);
            // Override component name with the set name
            figma.ui.postMessage({
                type: "component-facts-data",
                payload: {
                    componentName: csNode.name,
                    variantCount: result.variants.length,
                    variants: result.variants.map((v) => ({
                        name: v.name,
                        variantProperties: v.variantProperties,
                        fields: v.fields,
                        textContent: v.textContent,
                        hasIcon: v.hasIcon,
                    })),
                    facts: result.facts,
                    usageContexts: result.usageContexts,
                },
            });
        }
        catch (_c) {
            figma.ui.postMessage({
                type: "error",
                message: "Не вдалося проаналізувати Component Set.",
            });
        }
        return;
    }
    // Frame/Section/Group selected → frame scan mode (find components inside)
    if (node.type === "FRAME" || node.type === "SECTION" || node.type === "GROUP") {
        try {
            await scanFramesForComponents([node]);
        }
        catch (_d) {
            figma.ui.postMessage({
                type: "error",
                message: "Не вдалося просканувати фрейм.",
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
    catch (_e) {
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
    catch (_f) {
        figma.ui.postMessage({
            type: "error",
            message: "Не вдалося прочитати цей елемент. Спробуйте обрати компонент, а не текстовий шар чи довільну групу.",
        });
    }
}
async function loadSavedDoc(componentSetId) {
    try {
        const data = await figma.clientStorage.getAsync(`doc:${componentSetId}`);
        return data || null;
    }
    catch (_a) {
        return null;
    }
}
async function saveDocs(doc) {
    try {
        await figma.clientStorage.setAsync(`doc:${doc.componentSetId}`, doc);
    }
    catch (_a) {
        // Silently fail
    }
}
async function deleteSavedDoc(componentSetId) {
    try {
        await figma.clientStorage.deleteAsync(`doc:${componentSetId}`);
    }
    catch (_a) {
        // Silently fail
    }
}
// Handle messages from UI
figma.ui.onmessage = async (msg) => {
    if (msg.type === "generate-component-from-scan") {
        try {
            await generateFactsForComponentInFrames(msg.componentSetId, msg.usedVariantIds || [], msg.frameContexts, msg.variantPropertiesUsed);
        }
        catch (_a) {
            figma.ui.postMessage({ type: "error", message: "Не вдалося згенерувати факти для компонента." });
        }
    }
    if (msg.type === "check-saved-doc") {
        const saved = await loadSavedDoc(msg.componentSetId);
        figma.ui.postMessage({
            type: "saved-doc-result",
            payload: saved,
        });
    }
    if (msg.type === "save-doc") {
        if (msg.savedDoc) {
            await saveDocs(msg.savedDoc);
        }
    }
    if (msg.type === "delete-doc") {
        await deleteSavedDoc(msg.componentSetId);
    }
};
// Run once immediately on open
analyzeSelection();
