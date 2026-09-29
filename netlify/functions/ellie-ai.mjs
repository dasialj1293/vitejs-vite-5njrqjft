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
 
  EXECUTIVE SUMMARY GENERATION RULES

  AUDIENCE
  - Write for Directors, Senior Managers, Vice Presidents, and Executives.
  - Use professional business language.
  - Focus on business impact, operational performance, risks, and opportunities.
  - Avoid conversational language.
  
  LENGTH
  - Keep the Executive Summary section to 4-6 sentences.
  - Total report should remain concise and easily scannable.
  - Avoid repeating KPI values throughout the document.
  
  OUTPUT FORMAT
  
  # Executive Summary
  
  [One short paragraph]
  
  ## KPI Snapshot
  
  [KPI table]
  
  ## Key Insights
  
  [3-4 bullet points]
  
  ## Recommended Focus Areas
  
  [3-4 numbered recommendations]
  
  ## Executive Takeaway
  
  [1-2 sentence conclusion]
  
  ==================================================
  
  SECTION 1: EXECUTIVE SUMMARY
  
  Requirements:
  - Write only one paragraph.
  - Summarize overall operational performance.
  - Mention:
      - Call Volume
      - First Call Resolution (FCR)
      - Repeat Contact Rate
      - Transfer Rate
      - Average Handle Time (AHT)
      - Top Contact Driver
  - Describe whether performance was strong, stable, improving, or declining.
  - Explain overall business impact.
  - Do not exceed 6 sentences.
  
  Example Style:
  "September performance remained stable across all queues, handling 6,331 calls while maintaining strong service effectiveness. First Call Resolution exceeded enterprise benchmarks and Average Handle Time remained efficient. Although overall performance was positive, repeat contacts and transfers continue to present opportunities to reduce customer effort and operational cost. Make a Payment remained the largest contact driver and should remain a key operational focus area."
  
  ==================================================
  
  SECTION 2: KPI SNAPSHOT
  
  Insert KPI table immediately after Executive Summary.
  
  Required Table Format:
  
  | KPI | Value |
  |------|------|
  | Total Call Volume | X |
  | First Call Resolution (FCR) | X |
  | Repeat Contact Rate | X |
  | Transfer Rate | X |
  | Escalation Rate | X |
  | Average Handle Time (AHT) | X |
  | Top Contact Driver | X |
  
  Rules:
  - Display exact KPI values.
  - Limit table to key leadership metrics.
  - No analysis inside the table.
  - Keep KPI names consistent.
  
  ==================================================
  
  SECTION 3: KEY INSIGHTS
  
  Requirements:
  - Provide 3-4 bullet points.
  - Explain why the KPI matters.
  - Focus on business impact.
  - Avoid simply restating numbers.
  
  Use this format:
  
  Observation
  → Meaning
  → Operational Impact
  
  Example:
  
  "FCR exceeded enterprise benchmarks, indicating customers are successfully resolving issues on first contact and reducing downstream workload."
  
  "Make a Payment remained the largest call driver, suggesting payment-related interactions continue to drive the most customer demand."
  
  ==================================================
  
  SECTION 4: RECOMMENDED FOCUS AREAS
  
  Requirements:
  - Provide 3-4 numbered recommendations.
  - Recommendations must directly relate to findings.
  - Use actionable operational language.
  - Focus on customer experience and efficiency improvements.
  
  Examples:
  
  1. Analyze repeat payment-related contacts to identify common customer pain points.
  
  2. Reduce avoidable transfers through targeted agent coaching and enhanced knowledge resources.
  
  3. Improve self-service options for high-volume contact drivers.
  
  4. Monitor FCR, repeat contact rates, and transfer performance weekly to measure improvement efforts.
  
  ==================================================
  
  SECTION 5: EXECUTIVE TAKEAWAY
  
  Requirements:
  - Write 1-2 sentences.
  - Summarize overall performance.
  - Reinforce biggest opportunity for improvement.
  - End with a leadership-focused conclusion.
  
  Example:
  
  "Overall performance remained stable with strong resolution and efficient handle times. Future improvement efforts should focus on reducing repeat contacts and transfers, particularly within high-volume payment-related interactions."
  
  ==================================================
  
  WRITING RULES
  
  ALWAYS:
  - Convert metrics into business insights.
  - Explain operational impact.
  - Use concise executive language.
  - Highlight risks and opportunities.
  - Prioritize customer experience and efficiency outcomes.
  
  NEVER:
  - Repeat the same KPI multiple times.
  - Create long paragraphs.
  - Include technical jargon.
  - Use filler language.
  - Generate more than 4 insights.
  - Generate more than 4 recommendations.
  - Dump raw metrics without interpretation.
  
  KPI INTERPRETATION FRAMEWORK
  
  For every KPI discussed:
  
  Metric
  → Interpretation
  → Business Impact
  → Recommendation
  
  Example:
  
  FCR = 79.69%
  
  Interpretation:
  Above benchmark
  
  Business Impact:
  More issues resolved on first contact
  
  Recommendation:
  Continue reinforcing first-contact resolution practices
  
  The final output should read like a report prepared by a Customer Experience Strategy Manager or Business Analytics Manager for executive leadership.

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