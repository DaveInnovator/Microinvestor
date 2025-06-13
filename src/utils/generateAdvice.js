export async function generateInvestmentAdvice(income, goal, risk) {
  const hfToken = import.meta.env.VITE_HF_API_TOKEN
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY

  const prompt = `I'm a financial advisor AI. The user's info:\n
- Income: ₦${income}
- Goal: ${goal}
- Risk: ${risk}

Give a short personalized investment advice.`

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
    )

    if (!hfRes.ok) throw new Error("Hugging Face failed")

    const result = await hfRes.json()
    if (result.error) throw new Error(result.error)

    return result[0]?.generated_text || "AI couldn't generate advice."
  } catch (hfErr) {
    console.warn("Hugging Face failed:", hfErr.message)

    // Fallback to OpenAI
    try {
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
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
          max_tokens: 150,
        }),
      })

      if (!openaiRes.ok) throw new Error("OpenAI failed")

      const result = await openaiRes.json()
      return result.choices?.[0]?.message?.content || "No advice generated."
    } catch (openaiErr) {
      console.error("OpenAI fallback failed:", openaiErr.message)
      return "AI is sleeping. Try again later."
    }
  }
}
