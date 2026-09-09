export const config = {
  runtime: "edge",
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req: Request): Promise<Response> {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  // Parse and validate body
  let body: { componentName?: string; componentType?: string; properties?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const { componentName, componentType, properties } = body;
  if (!componentName || !componentType) {
    return json({ error: "componentName and componentType are required" }, 400);
  }

  const apiKey = (process.env as Record<string, string | undefined>).ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json({ error: "Server misconfiguration: missing API key" }, 500);
  }

  // Build prompt
  const propsText = properties
    ? Object.entries(properties)
        .map(([k, v]) => `  ${k}: ${JSON.stringify(v)}`)
        .join("\n")
    : "  (no properties provided)";

  const systemPrompt = `You are a UX documentation assistant. You generate concise design-system documentation sections for UI components.

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

  const userMessage = `Component name: ${componentName}
Component type: ${componentType}
Extracted properties:
${propsText}

Generate the four documentation sections for this component.`;

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
      // Edge runtime supports AbortSignal for timeouts
      signal: AbortSignal.timeout(25000),
    });
  } catch (err: unknown) {
    const isTimeout =
      err instanceof Error && err.name === "TimeoutError";
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

  const anthropicData = await anthropicRes.json() as {
    content?: { type: string; text: string }[];
  };

  const rawText = anthropicData.content?.find((b) => b.type === "text")?.text ?? "";

  // Extract JSON from the response (strip possible markdown fences)
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

  // Validate shape
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
