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

    systemPrompt = `You are a design system documentation writer. You generate component specifications based STRICTLY on facts extracted from a Figma file.

CRITICAL RULES:
- ONLY use information from the provided facts and variant data. Do NOT add general UX knowledge or assumptions.
- Every bullet point must be traceable to one or more provided facts.
- If a section cannot be filled from the available facts, include fewer bullets rather than inventing information.
- Write in clear, concise English. Each bullet should be actionable and specific.
- Reference specific values, token names, and variant properties from the facts.

Respond ONLY with a valid JSON object matching exactly this shape:
{
  "usageGuidelines": ["...", "..."],
  "contentGuidelines": ["...", "..."],
  "behavior": ["...", "..."],
  "edgeCases": ["...", "..."]
}

Section guidance:
- usageGuidelines: When and how to use this component, based on its variant properties, sizes, and types found in the file.
- contentGuidelines: Text content patterns, icon usage, and labeling rules observed in the variants.
- behavior: State changes, visual differences between states (colors, opacity, borders), and interactive patterns found in the data.
- edgeCases: Edge cases derivable from the data — e.g. missing tokens, mixed values, variants without icons, extreme sizes.

Rules:
- Each array should have 2-5 bullet-point strings.
- No markdown, no extra keys, no explanation outside the JSON.
- Keep each point under 30 words.
- Prefer specificity ("Disabled state reduces opacity to 0.5") over vagueness ("Consider disabled states").`;

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

    userMessage = `Component: ${fb.componentName}
Variant count: ${fb.variants.length}

=== EXTRACTED FACTS ===
${factsText}

=== VARIANTS ===
${variantsText}

Generate the four documentation sections based ONLY on these facts.`;
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
