export default async function handler(
    request
  ) {
    const headers = {
      "Content-Type":
        "application/json; charset=utf-8",
      "X-Content-Type-Options":
        "nosniff",
    
      "Access-Control-Allow-Origin":
        "*",
    
      "Access-Control-Allow-Headers":
        "Content-Type",
    
      "Access-Control-Allow-Methods":
        "POST, OPTIONS",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers,
      });
    }
  
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({
          message:
            "Only POST requests are supported.",
        }),
        {
          status: 405,
          headers,
        }
      );
    }
  
    try {
      const {
        question,
        context,
      } = await request.json();
  
      const cleanedQuestion =
        String(question || "").trim();
  
      if (!cleanedQuestion) {
        return new Response(
          JSON.stringify({
            message:
              "A question is required.",
          }),
          {
            status: 400,
            headers,
          }
        );
      }
  
      if (
        !process.env.OPENAI_API_KEY
      ) {
        throw new Error(
          "OPENAI_API_KEY is missing from the Netlify environment variables."
        );
      }
  
      const systemInstructions = `
  You are Ellie, the AI analytics assistant inside Pulse Intelligence.
  
  Your job is to answer questions about customer-service analytics using only the supplied Pulse context.
 
  EXECUTIVE SUMMARY REPORT REQUIREMENTS

CRITICAL FORMAT RULE

The KPI Snapshot table is REQUIRED.
The report is considered incomplete if the KPI Snapshot table is missing.

ALWAYS produce output in the exact order below:

1. Executive Summary
2. KPI Snapshot (TABLE REQUIRED)
3. Key Insights
4. Recommended Focus Areas
5. Executive Takeaway

Do not skip, combine, rename, or reorder sections.

==================================================

# Executive Summary

Requirements:
- Write exactly one paragraph.
- Length: 4-6 sentences.
- Summarize overall performance.
- Reference the most significant KPIs.
- Mention the primary contact driver.
- Explain business impact.
- Do not repeat every KPI value.

==================================================

## KPI Snapshot

MANDATORY REQUIREMENT:

A KPI table MUST ALWAYS be included directly after the Executive Summary.

If KPI data exists, the KPI Snapshot table must be generated.

Follow this exact structure:

| KPI | Value |
|------|------|
| Total Call Volume | {value} |
| First Call Resolution (FCR) | {value} |
| Repeat Contact Rate | {value} |
| Transfer Rate | {value} |
| Escalation Rate | {value} |
| Average Handle Time (AHT) | {value} |
| Top Contact Driver | {value} |

Rules:
- Never omit the KPI table.
- Never replace the table with bullets.
- Never summarize KPI values in paragraph form instead of a table.
- The KPI table must appear before Key Insights.
- Keep KPI names exactly as shown above.
- Populate every KPI available from the dataset.

==================================================

## Key Insights

Requirements:
- Provide 3-4 bullet points.
- Explain operational significance.
- Use business language.
- Focus on trends, strengths, risks, and opportunities.
- Do not simply repeat KPI values.

Example:
- FCR exceeded the enterprise benchmark, indicating strong first-contact issue resolution and reduced downstream workload.

==================================================

## Recommended Focus Areas

Requirements:
- Provide 3-4 numbered recommendations.
- Tie recommendations directly to findings.
- Be actionable and operationally focused.
- Prioritize customer experience and efficiency improvements.

==================================================

## Executive Takeaway

Requirements:
- Write 1-2 sentences.
- Summarize overall performance.
- State the primary opportunity for improvement.
- End with a leadership-focused conclusion.

==================================================

WRITING RULES

For every KPI:

Metric
→ Interpretation
→ Business Impact
→ Recommendation

Use executive language.

Translate metrics into business outcomes.

Good:
"Repeat contact rates remain an opportunity to reduce customer effort and improve operational efficiency."

Bad:
"Repeat Contact Rate was 19.54%."

==================================================

FINAL OUTPUT VALIDATION

Before generating the final response, verify that ALL sections exist:

✅ Executive Summary
✅ KPI Snapshot Table
✅ Key Insights
✅ Recommended Focus Areas
✅ Executive Takeaway

If the KPI Snapshot table is missing, regenerate the response until the table is included.

The KPI Snapshot table is mandatory and may never be omitted.

  `;
  
      const aiResponse =
        await fetch(
          process.env
            .OPENAI_RESPONSES_URL,
          {
            method: "POST",
  
            headers: {
              Authorization:
                `Bearer ${process.env.OPENAI_API_KEY}`,
  
              "Content-Type":
                "application/json",
            },
  
            body: JSON.stringify({
              model:
                process.env
                  .OPENAI_MODEL,
  
              instructions:
                systemInstructions,
              
              reasoning: {
                effort: "minimal",
              },

              text: {
                verbosity: "medium",
              },

              max_output_tokens: 1800, 

  
              input: `
  User question:
  ${cleanedQuestion}
  
  Pulse analytics context:
  ${JSON.stringify(
    context
  )}
  `,
            }),
          }
        );
  
      const responseText =
        await aiResponse.text();
  
      let aiResult;
  
      try {
        aiResult =
          JSON.parse(responseText);
      } catch {
        throw new Error(
          `The AI service returned invalid JSON. Status ${aiResponse.status}.`
        );
      }
  
      if (!aiResponse.ok) {
        throw new Error(
          aiResult?.error?.message ||
            `The AI request failed with status ${aiResponse.status}.`
        );
      }
  
      const answer =
        aiResult.output_text ||
        aiResult.output
          ?.flatMap(
            (item) =>
              item.content || []
          )
          ?.find(
            (item) =>
              item.type ===
              "output_text"
          )?.text;
  
      if (!answer) {
        throw new Error(
          "The AI service did not return an answer."
        );
      }
  
      return new Response(
        JSON.stringify({
          answer,
        }),
        {
          status: 200,
          headers,
        }
      );
    } catch (error) {
      console.error(
        "Ellie AI function error:",
        error
      );
  
      return new Response(
        JSON.stringify({
          message:
            error instanceof Error
              ? error.message
              : "Ellie could not generate a response.",
        }),
        {
          status: 500,
          headers,
        }
      );
    }
  }