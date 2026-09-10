export const config = {
  runtime: "edge",
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

interface FactsBody {
  mode: "facts";
  componentName: string;
  facts: { fact: string; category: string }[];
  variants: {
    name: string;
    variantProperties: Record<string, string>;
    fields: { label: string; value: string; source: string }[];
    textContent: string[];
    hasIcon: boolean;
  }[];
  usageContexts?: {
    instanceName: string;
    parentChain: string[];
    siblingComponents: string[];
    pageName: string;
  }[];
}

interface LegacyBody {
  mode?: "legacy";
  componentName: string;
  componentType: string;
  properties?: Record<string, unknown>;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body: FactsBody | LegacyBody;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const apiKey = (process.env as Record<string, string | undefined>).ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json({ error: "Server misconfiguration: missing API key" }, 500);
  }

  const isFactsMode = (body as FactsBody).mode === "facts";

  let systemPrompt: string;
  let userMessage: string;

  if (isFactsMode) {
    const fb = body as FactsBody;
    if (!fb.componentName || !fb.facts || !Array.isArray(fb.facts)) {
      return json({ error: "componentName and facts[] are required for facts mode" }, 400);
    }

    systemPrompt = `You are a senior design system documentation writer. You generate component specifications from facts extracted from a Figma file.

You work with TWO types of information:
1. **Facts** — directly extracted from the Figma file (variant properties, values, tokens, usage contexts, sibling components). These are ground truth.
2. **Interpretations** — your professional conclusions derived from combining multiple facts. For example: if a pill-shaped button only appears inside filter containers, you can conclude "Pill-style buttons are used exclusively for filter actions."

RULES:
- Every bullet MUST be grounded in one or more provided facts. No generic UX advice.
- You MAY interpret and synthesize facts into higher-level design guidelines. This is encouraged.
- When you interpret, be specific — reference the actual values, contexts, and token names.
- Use usage context data (where instances appear, what they sit alongside) to derive WHEN and WHERE to use the component.
- Use variant comparison data to derive HOW the component changes across states and sizes.
- If usage data shows exclusive placement (e.g., only in "Filters"), state that clearly.
- If sibling analysis shows common pairings (e.g., always next to a search input), mention it.

Respond ONLY with a valid JSON object:
{
  "usageGuidelines": ["...", "..."],
  "contentGuidelines": ["...", "..."],
  "behavior": ["...", "..."],
  "edgeCases": ["...", "..."]
}

Section guidance:
- usageGuidelines: WHEN and WHERE to use this component. Derive from usage contexts (parent frames), variant properties (types/sizes), and placement patterns. Be specific: "Use the Pill variant exclusively in filter bars" not "Use appropriate variant."
- contentGuidelines: Text and icon patterns. What content appears, what's optional, labeling conventions observed in variants.
- behavior: HOW the component changes across states. Specific visual changes (color shifts, opacity, border additions), referencing actual values and tokens.
- edgeCases: Potential issues derived from the data — missing tokens, unusual sizing, variants lacking icons, contexts where the component might not fit.

Rules:
- Each array: 2-5 bullets.
- Each bullet: under 35 words, specific and actionable.
- No markdown, no extra keys, no explanation outside JSON.`;

    const factsText = fb.facts
      .map((f) => `[${f.category}] ${f.fact}`)
      .join("\n");

    const variantsText = fb.variants
      .map((v) => {
        const props = Object.entries(v.variantProperties)
          .map(([k, val]) => `${k}=${val}`)
          .join(", ");
        const texts = v.textContent.length > 0 ? `Text: "${v.textContent.join('", "')}"` : "No text";
        const icon = v.hasIcon ? "Has icon" : "No icon";
        return `- ${v.name} (${props}) — ${texts}, ${icon}`;
      })
      .join("\n");

    const usageText =
      fb.usageContexts && fb.usageContexts.length > 0
        ? fb.usageContexts
            .map((ctx) => {
              const parents = ctx.parentChain.length > 0 ? ctx.parentChain.join(" > ") : "(root)";
              const siblings =
                ctx.siblingComponents.length > 0
                  ? `Siblings: ${ctx.siblingComponents.join(", ")}`
                  : "No siblings";
              return `- "${ctx.instanceName}" in ${parents} | ${siblings}`;
            })
            .join("\n")
        : "(no instances found on this page)";

    userMessage = `Component: ${fb.componentName}
Variant count: ${fb.variants.length}

=== EXTRACTED FACTS ===
${factsText}

=== VARIANTS ===
${variantsText}

=== USAGE CONTEXTS (where instances live on the page) ===
${usageText}

Generate the four documentation sections. Ground every bullet in the facts and usage data above. You may interpret and synthesize — but do not invent facts not supported by the data.`;
  } else {
    // Legacy mode — backward compatible
    const lb = body as LegacyBody;
    if (!lb.componentName || !lb.componentType) {
      return json({ error: "componentName and componentType are required" }, 400);
    }

    const propsText = lb.properties
      ? Object.entries(lb.properties)
          .map(([k, v]) => `  ${k}: ${JSON.stringify(v)}`)
          .join("\n")
      : "  (no properties provided)";

    systemPrompt = `You are a UX documentation assistant. You generate concise design-system documentation sections for UI components.

IMPORTANT: Your output is based on typical UX patterns and general knowledge about components of this type — NOT on data extracted from Figma. Make no claims about specific Figma values or designs.

Respond ONLY with a valid JSON object matching exactly this shape:
{
  "usageGuidelines": ["...", "...", "..."],
  "contentGuidelines": ["...", "...", "..."],
  "behavior": ["...", "...", "..."],
  "edgeCases": ["...", "...", "..."]
}

Rules:
- Each array must have 2–4 short bullet-point strings.
- No markdown, no extra keys, no explanation outside the JSON.
- Keep each point under 20 words.`;

    userMessage = `Component name: ${lb.componentName}
Component type: ${lb.componentType}
Extracted properties:
${propsText}

Generate the four documentation sections for this component.`;
  }

  // Call Anthropic API
  let anthropicRes: Response;
  try {
    anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
      signal: AbortSignal.timeout(25000),
    });
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === "TimeoutError";
    return json(
      { error: isTimeout ? "Claude API timed out" : "Failed to reach Claude API" },
      502
    );
  }

  if (!anthropicRes.ok) {
    const errText = await anthropicRes.text().catch(() => "");
    if (anthropicRes.status === 429) {
      return json({ error: "Rate limit reached — please try again in a moment" }, 429);
    }
    return json(
      { error: `Claude API error: ${anthropicRes.status}`, detail: errText.slice(0, 200) },
      502
    );
  }

  const anthropicData = (await anthropicRes.json()) as {
    content?: { type: string; text: string }[];
  };

  const rawText = anthropicData.content?.find((b) => b.type === "text")?.text ?? "";

  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return json({ error: "Unexpected response format from Claude", raw: rawText.slice(0, 300) }, 502);
  }

  let parsed: {
    usageGuidelines?: string[];
    contentGuidelines?: string[];
    behavior?: string[];
    edgeCases?: string[];
  };
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch {
    return json({ error: "Could not parse Claude response as JSON", raw: rawText.slice(0, 300) }, 502);
  }

  const sections = ["usageGuidelines", "contentGuidelines", "behavior", "edgeCases"] as const;
  for (const key of sections) {
    if (!Array.isArray(parsed[key])) {
      return json({ error: `Missing or invalid section: ${key}` }, 502);
    }
  }

  return json(
    {
      usageGuidelines: parsed.usageGuidelines!,
      contentGuidelines: parsed.contentGuidelines!,
      behavior: parsed.behavior!,
      edgeCases: parsed.edgeCases!,
    },
    200
  );
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}
