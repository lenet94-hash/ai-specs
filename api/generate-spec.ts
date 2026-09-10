export const config = {
  runtime: "edge",
  maxDuration: 60,
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

    systemPrompt = `You are a senior design system lead writing component documentation for your team. Your audience is product designers and developers who need to know WHEN, WHERE, and HOW to use this component correctly.

You receive raw data extracted from Figma (variant properties, visual values, tokens, usage contexts, sibling components). Your job is to INTERPRET this data into clear, human-readable design guidelines — not to repeat the raw data.

WRITING STYLE:
- Write like a design system guide, not a data report.
- Lead with the design intent and rationale, not with hex codes or pixel values.
- Use token names (e.g., "primary fill token") instead of raw values (e.g., "#5C276E") whenever possible.
- Mention specific values only when they reveal something important (e.g., "9999px radius creates a pill shape").
- Focus on WHAT designers should DO, not WHAT the data says.

GOOD: "Use the Outline variant as a secondary action alongside a Primary button — it pairs a neutral fill with a subtle drop shadow to create visual hierarchy."
BAD: "Outline variant uses fill: general/input #FFFFFF, shadow: xs/x (0px 1px 2px rgba(0,0,0,0.05)), stroke: general/border #E5E5E5."

GOOD: "The Disabled state signals inactivity through reduced opacity (10%) while keeping the same color tokens — no color change occurs."
BAD: "Disabled state uses rgba fill with 10% opacity, same token general/primary #5C276E."

Respond ONLY with a valid JSON object:
{
  "usageGuidelines": ["...", "..."],
  "contentGuidelines": ["...", "..."],
  "behavior": ["...", "..."],
  "edgeCases": ["...", "..."]
}

Section guidance:
- usageGuidelines: WHEN and WHERE to use each variant. Derive from usage contexts (which screens/sections), sibling components (what it pairs with), and variant properties. Explain the design rationale.
- contentGuidelines: What content patterns exist — text labels, icons, optional elements. When to use icons vs text-only. Any labeling conventions.
- behavior: How the component visually changes across states (Default → Hover → Disabled etc.). Describe the visual effect in design language, not raw values.
- edgeCases: Practical warnings — variants that lack certain features, token inconsistencies, sizing constraints, contexts where the component might not work well.

Rules:
- Each array: 3-5 bullets.
- Each bullet: 15-30 words, clear and actionable.
- No markdown, no extra keys, no explanation outside JSON.
- Every bullet must be grounded in the provided data — do not invent guidelines.`;

    // Limit facts to keep prompt concise
    const limitedFacts = fb.facts.slice(0, 40);
    const factsText = limitedFacts
      .map((f) => `[${f.category}] ${f.fact}`)
      .join("\n");

    // Only send variant summary (properties + content), skip full field specs
    const limitedVariants = fb.variants.slice(0, 15);
    const variantsText = limitedVariants
      .map((v) => {
        const props = Object.entries(v.variantProperties)
          .map(([k, val]) => `${k}=${val}`)
          .join(", ");
        const texts = v.textContent.length > 0 ? `Text: "${v.textContent.slice(0, 3).join('", "')}"` : "No text";
        const icon = v.hasIcon ? "Has icon" : "No icon";
        return `- ${v.name} (${props}) — ${texts}, ${icon}`;
      })
      .join("\n");

    const limitedContexts = (fb.usageContexts || []).slice(0, 15);
    const usageText =
      limitedContexts.length > 0
        ? limitedContexts
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
      signal: AbortSignal.timeout(55000),
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
