"use server";

export default async function AIContent({
  text,
  customInstructions = "",
  contentGen = false,
}) {
  let basePrompt;
  if (contentGen) {
    basePrompt = `You are a professional content writer. 
    Your task: generate clean, structured content for a rich-text editor (no greetings, no explanations).
    Rules:
    - Use only headings (h2, h3), paragraphs, and numbered/bullet lists.
    - Do not add commentary about what you are doing.
    - Do not include phrases like "Here is the content" or "Sure, here you go."
    - Dont include comments

    Content topic: ${text}
    Additional instructions: ${customInstructions}`;
  } else {
    basePrompt = `You are a professional content editor. 
    Your task: rewrite the given text into clear, simple language for a rich-text editor.
    Rules:
    - Keep headings (h2, h3), paragraphs, and lists intact.
    - Do not add commentary, explanations, or greetings.
    - Dont include comments
    
    Original content: ${text}
    Additional instructions: ${customInstructions}`;
  }
  try {
    const res = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: basePrompt }],
        max_tokens: contentGen ? 1700 : 800,
      }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Groq API error: ${res.status} ${res.statusText} - ${errorText}`
      );
    }
    const data = await res.json();
    const output =
      data.choices[0].message.content ?? "No content genrated by AI.";
    return output;
  } catch (error) {
    console.error("AIContent error:", error);
    return "An error occurred while generating content.";
  }
}
