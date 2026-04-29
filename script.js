const API_KEY = "AIzaSyBsM3ECW7Mh5ixuRkcNy6ZOn4IuCQFcl2o";

function addMessage(text, sender) {
    const chatBox = document.getElementById("chatBox");
    const msg = document.createElement("div");

    msg.classList.add("message", sender);
    msg.innerText = text;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function askAI() {
    const inputField = document.getElementById("userInput");
    const userText = inputField.value;

    if (!userText) return;

    addMessage(userText, "user");
    inputField.value = "";

    // Typing animation
    addMessage("Typing...", "bot");

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Explain this in simple election context: ${userText}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        const botReply = data.candidates[0].content.parts[0].text;

        // Remove typing
        const chatBox = document.getElementById("chatBox");
        chatBox.removeChild(chatBox.lastChild);

        addMessage(botReply, "bot");

    } catch (error) {
        addMessage("Error connecting to AI.", "bot");
    }
}