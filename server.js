import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // This line enables the cross-origin connection

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const chat = model.startChat({
            history: [{
                role: 'user',
                parts: [{ text: "You are an AI apprenticeship tutor for UK learners. Your role is to provide clear, concise, and helpful information about various apprenticeship topics. You should always be encouraging and conversational. Start by introducing yourself and asking what the learner needs help with." }],
            }, {
                role: 'model',
                parts: [{ text: "Hello! I am your AI apprenticeship tutor. How can I help you today?" }],
            }],
        });
        
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        
        res.json({ text });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ error: 'Sorry, something went wrong.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
