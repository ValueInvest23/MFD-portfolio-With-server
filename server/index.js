import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Your Gemini API key (hardcoded for now)
const GEMINI_API_KEY = "AIzaSyDJMuxqsmCxsM69G0dk3iF0HS5iPRxxOXA"; // Replace this!

app.post("/api/chat", async (req, res) => {
  const { question } = req.body;

  try {
    // ✅ Better prompt: more clear context, disclaimers, behavior instructions
    const prompt = `
You are a professional virtual assistant for **ValueInvesting**, a trusted mutual fund distributor and investment education platform.

Your mission:
- Answer ONLY questions related to mutual funds, SIPs, investment basics, portfolio diversification, tax-saving funds, and related personal finance topics.
- Use simple, clear language understandable by beginners.
- Do not give stock tips, personal financial advice, or legal/tax guarantees.
- If you don’t know something or it’s out of scope, politely say:
  "I'm sorry, but I can’t help with that specific topic. Please consult a certified financial advisor."

About ValueInvesting:
- ValueInvesting helps people plan long-term wealth growth through diversified mutual funds.
- We offer SIP setup, portfolio tracking, retirement planning basics, and educational content.
- Our goal is to empower investors with clear knowledge.

Always keep answers short, friendly, and informative.

User Question:
${question}
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
