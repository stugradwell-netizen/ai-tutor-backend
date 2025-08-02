const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error('GEMINI_API_KEY is not set in environment variables.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const chat = model.startChat({
    history: [{
        role: "user",
        parts: [{ text: "You are an AI apprenticeship tutor for UK learners. Your role is to provide clear, concise, and helpful information about various apprenticeship topics. You should always be encouraging and conversational. Start by introducing yourself and asking what the learner needs help with." }],
    }, {
        role: "model",
        parts: [{ text: "Hello! I am your AI apprenticeship tutor. How can I help you today?" }],
    }],
});

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).send('Message is required');
    }

    try {
        const result = await chat.sendMessage(userMessage);
        const responseText = result.response.text();
        res.json({ text: responseText });
    } catch (error) {
        console.error('Error with AI chat:', error);
        res.status(500).send('Error processing your request.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
