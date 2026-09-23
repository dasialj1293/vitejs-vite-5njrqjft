export default async function handler(
    request
  ) {
    const headers = {
      "Content-Type":
        "application/json; charset=utf-8",
      "X-Content-Type-Options":
        "nosniff",
    };
  
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
  
  Requirements:
  - Generate a fresh response for each question.
  - Do not use rigid or prewritten templates.
  - Do not invent metrics, dates, queues, contact types, causes, or forecasts.
  - Clearly distinguish between facts shown in the context and recommendations.
  - If the context cannot answer the question, explain what data is missing.
  - Use a conversational, confident, and approachable voice.
  - Keep routine answers concise.
  - When the user requests an executive brief, full summary, report, or leadership summary, provide a detailed report
      with clear section headings and multiple substantivr paragraphs.
  - For an executive brief, include an Executive Overview, Reporting Period, Performance Analysis, Key Findings,
      Operational Risks, Forecast Outlook when forecast data is available, and Recommended Actions.
  - Do not invent a comparison period or metric that is absent from the supplied context. 

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
  
              input: `
  User question:
  ${cleanedQuestion}
  
  Pulse analytics context:
  ${JSON.stringify(
    context,
    null,
    2
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