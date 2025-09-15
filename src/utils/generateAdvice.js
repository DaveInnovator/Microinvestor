export async function generateInvestmentAdvice(income, goal, risk) {
  const hfToken = import.meta.env.VITE_HF_API_TOKEN;
  const groqKey = import.meta.env.VITE_GROQ_API_KEY;

  const prompt = `I'm a financial advisor AI. The user's info:\n
- Income: ₦${income}
- Goal: ${goal}
- Risk: ${risk}

Give a short personalized investment advice with advice on stocks and crypto they can buy and how they can generate more with it.`

  // Try Hugging Face first
  try {
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!hfRes.ok) throw new Error("Hugging Face failed");

    const result = await hfRes.json();
    if (result.error) throw new Error(result.error);

    return result[0]?.generated_text || "AI couldn't generate advice.";
  } catch (hfErr) {
    console.warn("Hugging Face failed:", hfErr.message);

    // Fallback to Groq
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: "You are an investment advisor AI.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (!res.ok) throw new Error("Groq API failed");

      const data = await res.json();
      return data.choices?.[0]?.message?.content.trim() || "AI is sleeping.";
    } catch (groqErr) {
      console.error("Groq failed:", groqErr.message);
      return "Both Hugging Face and Groq failed. Try again later.";
    }
  }
}
