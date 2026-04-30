// --- API CONFIGURATION ---
const GEMINI_API_KEY = "AIzaSyBsM3ECW7Mh5ixuRkcNy6ZOn4IuCQFcl2";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// --- DOM ELEMENTS ---
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// --- CONVERSATION STATE (MEMORY) ---
let conversationHistory = [
    {
        role: "user",
        parts: [{ text: "System Instructions: You are Election Guide AI, a highly intelligent assistant helping users understand the Indian election process. Speak strictly in an authentic, student-led voice. Do NOT use corporate jargon or typical AI phrasing. Keep your tone direct, helpful, and highly actionable. \n\nCRITICAL INSTRUCTION FOR MAPS: If the user asks where to vote or asks to find a booth AND provides a location, you MUST include exactly this tag anywhere in your text response: [MAP_SEARCH: the location they provided]. Example: 'I can help you find that. [MAP_SEARCH: Kanpur]. Make sure you carry your Voter ID.'" }]
    },
    {
        role: "model",
        parts: [{ text: "Understood. I will keep my language direct and jargon-free. I will use the [MAP_SEARCH: location] tag precisely when a user needs to find a polling booth." }]
    }
];

// --- EVENT LISTENERS ---
sendBtn.addEventListener('click', handleUserSubmit);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserSubmit();
});

// --- CORE LOGIC ---
async function handleUserSubmit() {
    const text = userInput.value.trim();
    if (!text) return;

    userInput.value = '';
    appendMessage(text, 'user-message');
    conversationHistory.push({ role: "user", parts: [{ text: text }] });

    const loadingId = appendMessage("Thinking...", 'ai-message');

    try {
        const responseText = await fetchGeminiResponse(conversationHistory);
        replaceMessage(loadingId, responseText, 'ai-message');
        conversationHistory.push({ role: "model", parts: [{ text: responseText }] });
    } catch (error) {
        console.error("API Error:", error);
        replaceMessage(loadingId, "Connection error. Please check your internet or API key.", 'ai-message');
        conversationHistory.pop();
    }
}

function sendQuickReply(text) {
    userInput.value = text;
    handleUserSubmit();
}

async function fetchGeminiResponse(history) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: history })
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// --- UI RENDERERS ---
function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.id = `msg-${Date.now()}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return messageDiv.id;
}

function replaceMessage(id, newText, className) {
    const messageDiv = document.getElementById(id);
    if (!messageDiv) return;

    let formattedText = newText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\n/g, '<br>');

    const mapRegex = /\[MAP_SEARCH:\s*(.*?)\]/g;
    formattedText = formattedText.replace(mapRegex, (match, location) => {
        return renderMapButton(location);
    });

    messageDiv.innerHTML = formattedText;
    messageDiv.className = `message ${className}`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function renderMapButton(location) {
    const query = encodeURIComponent(location + " polling booth");
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    return `
        <div style="margin-top: 15px; margin-bottom: 15px;">
            <a href="${mapsUrl}" target="_blank" style="display: inline-block; background: linear-gradient(90deg, #00E5FF, #B026FF); color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-family: 'Montserrat', sans-serif; font-weight: 700; box-shadow: 0 4px 15px rgba(0, 229, 255, 0.2); transition: opacity 0.3s ease;">
                📍 Find Booth on Google Maps
            </a>
        </div>
    `;
}