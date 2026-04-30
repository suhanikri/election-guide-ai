// -------- CHAT SYSTEM --------
function addMessage(text, sender) {
    const chatBox = document.getElementById("chatBox");
    const msg = document.createElement("div");

    msg.classList.add("message", sender);
    msg.innerText = text;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

window.onload = function () {
    addMessage("👋 Hi! I’ll guide you through the election process. Try the smart assistant above.", "bot");
};

// -------- JOURNEY --------
const steps = [
    "🧾 Register as a voter (Form 6)",
    "🪪 Get your voter ID",
    "📍 Find your polling booth",
    "🗳️ Visit booth and vote",
    "📊 Votes are counted"
];

function startJourney() {
    const box = document.getElementById("journeyBox");
    const container = document.getElementById("journeySteps");

    box.classList.remove("hidden");
    container.innerHTML = "";

    steps.forEach((step, i) => {
        setTimeout(() => {
            const div = document.createElement("div");
            div.className = "step";
            div.innerText = step;
            container.appendChild(div);
        }, i * 600);
    });

    addMessage("✨ Your step-by-step journey is shown above.", "bot");
}

// -------- DECISION ENGINE --------
function decision(type) {
    let flow = [];

    if (type === "not_registered") {
        flow = [
            "🧾 Go to registration portal",
            "🔗 https://voterportal.eci.gov.in/",
            "📄 Fill Form 6",
            "📌 Submit documents",
            "⏳ Wait for approval"
        ];
    }

    else if (type === "no_id") {
        flow = [
            "🪪 Apply for voter ID",
            "🔗 https://voterportal.eci.gov.in/",
            "📥 Download e-EPIC"
        ];
    }

    else if (type === "lost_id") {
        flow = [
            "🔁 Download e-EPIC",
            "🔗 https://voterportal.eci.gov.in/",
            "🆔 Carry alternate ID"
        ];
    }

    else if (type === "booth") {
        flow = [
            "📍 Find your polling booth",
            "🔗 https://electoralsearch.eci.gov.in/",
            "🗺️ Opening map..."
        ];
        openMap();
    }

    else if (type === "vote") {
        flow = [
            "🗳️ Carry valid ID",
            "📍 Visit assigned booth",
            "✅ Follow EVM process",
            "🎉 Vote completed"
        ];
    }

    flow.forEach((step, i) => {
        setTimeout(() => addMessage(step, "bot"), i * 500);
    });
}

// -------- GOOGLE MAP --------
function openMap() {
    window.open("https://www.google.com/maps/search/polling+booth+near+me");
}

// -------- CHAT LOGIC --------
function askAI() {
    const input = document.getElementById("userInput");
    const text = input.value.toLowerCase();

    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    let reply = "";

    if (text.includes("register")) {
        reply = "🧾 Register here: https://voterportal.eci.gov.in/";
    }
    else if (text.includes("voter id")) {
        reply = "🪪 Apply/download here: https://voterportal.eci.gov.in/";
    }
    else if (text.includes("booth")) {
        reply = "📍 Find booth: https://electoralsearch.eci.gov.in/";
    }
    else if (text.includes("documents")) {
        reply = "🆔 Use Aadhaar, PAN, Passport or other valid ID.";
    }
    else {
        reply = "Use the Smart Assistant above for step-by-step help.";
    }

    setTimeout(() => addMessage(reply, "bot"), 500);
}