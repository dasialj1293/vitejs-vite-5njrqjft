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
 
  Generate a leadership-ready executive summary.

The summary should tell a story:

1. What happened this month?
2. Why did it happen?
3. What risks exist?
4. What should leadership do next?

Always include:

EXECUTIVE OVERVIEW
- Overall volume
- FCR
- Repeat Rate
- Transfer Rate
- AHT
- Top Driver

KEY FINDINGS
- Explain the largest driver.
- Explain operational effectiveness.
- Explain customer effort indicators.
- Explain efficiency indicators.

OPERATIONAL RISKS
- Repeat contacts
- Transfer impact
- Volume concentration risk
- Customer experience risks

RECOMMENDED ACTIONS
- Specific operational improvements.
- Training opportunities.
- Process improvements.
- Monitoring recommendations.

Important:
The output should read like it was written by a Customer Experience Strategy Manager presenting to senior leadership, not by an AI.

Use complete business narratives instead of repeating KPI values.
For every KPI discussed, explain the business impact.

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