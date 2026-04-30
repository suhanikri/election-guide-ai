// Configuration
// IMPORTANT: For the hackathon submission, do not hardcode your real API key in the public repo.
// Either use environment variables in Antigravity, or prompt the user/judge to enter it.
const GEMINI_API_KEY = "YOUR_API_KEY_HERE";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// DOM Elements
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Conversation State (Memory)
// We seed it with a system prompt to enforce the authentic, direct tone.
let conversationHistory = [
    {
        role: "user",
        parts: [{ text: "System Instructions: You are an election guide assistant. Speak directly and authentically, like a knowledgeable student helping a peer. Never use corporate jargon, buzzwords, or robotic AI phrasing. Keep answers concise, actionable, and focused on the Indian election process." }]
    },
    {
        role: "model",
        parts: [{ text: "Got it. I'll keep it clear, direct, and jargon-free." }]
    }
];

// Event Listeners
sendBtn.addEventListener('click', handleUserSubmit);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserSubmit();
});

// Main Submit Handler
async function handleUserSubmit() {
    const text = userInput.value.trim();
    if (!text) return;

    // 1. Clear input and append user message
    userInput.value = '';
    appendMessage(text, 'user-message');

    // 2. Add user message to memory
    conversationHistory.push({
        role: "user",
        parts: [{ text: text }]
    });

    // 3. Show a loading indicator
    const loadingId = appendMessage("Thinking...", 'ai-message');

    // 4. Fetch AI response
    try {
        const responseText = await fetchGeminiResponse(conversationHistory);

        // 5. Update UI and Memory
        replaceMessage(loadingId, responseText, 'ai-message');
        conversationHistory.push({
            role: "model",
            parts: [{ text: responseText }]
        });

    } catch (error) {
        console.error("API Error:", error);
        replaceMessage(loadingId, "Sorry, I ran into a network issue. Check the console or your API key.", 'ai-message');
        // Remove the failed user prompt from history so it doesn't corrupt future requests
        conversationHistory.pop();
    }
}

// Quick Reply Handler (connected to HTML buttons)
function sendQuickReply(text) {
    userInput.value = text;
    handleUserSubmit();
}

// API Call Logic
async function fetchGeminiResponse(history) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: history })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// UI Updaters
function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.id = `msg-${Date.now()}`; // Unique ID for updating later

    // Simple markdown to HTML for bold text (Gemini uses **bold**)
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    messageDiv.innerHTML = `<p>${formattedText}</p>`;

    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll

    return messageDiv.id;
}

function replaceMessage(id, newText, className) {
    const messageDiv = document.getElementById(id);
    if (messageDiv) {
        const formattedText = newText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        messageDiv.innerHTML = `<p>${formattedText}</p>`;
        messageDiv.className = `message ${className}`; // Reset classes
    }
}