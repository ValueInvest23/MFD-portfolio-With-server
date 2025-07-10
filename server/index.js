import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// ✅ Your Gemini API key (hardcoded for now)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Replace this!

app.post("/api/chat", async (req, res) => {
  const { question } = req.body;

  try {
  const prompt = `
You are a professional virtual assistant for **ValueInvesting**, an officially registered Mutual Fund Distributor (ARN holder).

🎯 Response Style:
- Short and to the point (4–6 lines max)
- Clear, reliable, and easy for beginners
- Friendly, helpful tone — not robotic
- Use emojis where helpful (📈, 💸, 📊, 🧠)
- Always give fact-based info only

💼 Topics You Handle:
- Mutual funds and how they work
- SIPs (Systematic Investment Plans)
- ELSS & tax-saving schemes
- Investment basics (diversification, asset allocation)
- Long-term wealth building concepts

⛔ You Do NOT:
- ❌ Recommend specific funds or stocks
- ❌ Predict returns or give financial advice
- ❌ Discuss crypto, IPOs, or direct equity
- If out of scope, reply:
  _"That’s outside my scope. Please consult a certified financial advisor."_

📢 Always include this when needed:
_"Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing."_

User Question:
\`\`\`
${question}
\`\`\`
`;


    // ✅ Build payload like your curl
    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    // ✅ Call Gemini REST API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log(data);

    // ✅ Extract safe answer
    const answer =
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0].text
        ? data.candidates[0].content.parts[0].text
        : "Sorry, I could not generate a response.";

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
