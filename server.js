const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 1. Create the app
const app = express();
app.use(express.json());

// 2. Connect to Google Gemini
const genAI = new GoogleGenerativeAI("AIzaSyAx3R2cyuOU3_xDuvksnQus3IXcrCoZt10"); // ← Paste your key here

// 3. Handle questions
app.post('/ask', async (req, res) => {
  const { question } = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(question);
  const answer = (await result.response).text();
  res.json({ answer });
});

// 4. Start the server
app.listen(3000, () => console.log("Server is running!"));
