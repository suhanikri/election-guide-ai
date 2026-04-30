// CHAT
function addMessage(text, sender) {
    const chatBox = document.getElementById("chatBox");
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

window.onload = function () {
    addMessage("👋 Hi! I’ll guide you through the election process.", "bot");
};

// JOURNEY
const steps = [
    "🧾 Register as a voter (Form 6)",
    "🪪 Get your voter ID",
    "📍 Find your polling booth",
    "🗳️ Go to booth and vote",
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

    addMessage("✨ Your voting journey is shown above.", "bot");
}

// DECISION ENGINE
function decision(type) {
    let flow = [];

    if (type === "not_registered") {
        flow = [
            "🧾 Go to https://voterportal.eci.gov.in/",
            "📄 Fill Form 6",
            "📌 Submit documents",
            "⏳ Wait for approval"
        ];
    } else if (type === "no_id") {
        flow = [
            "🪪 Apply at https://voterportal.eci.gov.in/",
            "📥 Download e-EPIC"
        ];
    } else if (type === "lost_id") {
        flow = [
            "🔁 Download e-EPIC",
            "🆔 Carry alternate ID"
        ];
    } else if (type === "booth") {
        flow = [
            "📍 Check https://electoralsearch.eci.gov.in/",
            "🗺️ Opening map..."
        ];
        openMap();
    } else if (type === "vote") {
        flow = [
            "🗳️ Carry ID",
            "📍 Visit booth",
            "✅ Vote using EVM"
        ];
    }

    flow.forEach((step, i) => {
        setTimeout(() => addMessage(step, "bot"), i * 500);
    });
}

// MAP
function openMap() {
    window.open("https://www.google.com/maps/search/polling+booth+near+me");
}

// READINESS CHECK
let userStatus = {
    registered: false,
    has_id: false,
    know_booth: false
};

function setStatus(key) {
    userStatus[key] = true;
    addMessage(`✅ ${key} marked`, "bot");
}

function checkReadiness() {
    let score = 0;
    let missing = [];

    if (userStatus.registered) score += 33;
    else missing.push("Register as voter");

    if (userStatus.has_id) score += 33;
    else missing.push("Get voter ID");

    if (userStatus.know_booth) score += 34;
    else missing.push("Find polling booth");

    const box = document.getElementById("resultBox");
    box.classList.remove("hidden");

    box.innerHTML = `
    <h3>🧠 Readiness Score: ${score}%</h3>
    <ul>
      ${missing.map(m => `<li>👉 ${m}</li>`).join("")}
    </ul>
  `;

    addMessage(`🎯 Your readiness is ${score}%`, "bot");
}

// CHAT LOGIC
function askAI() {
    const input = document.getElementById("userInput");
    const text = input.value.toLowerCase();

    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    let reply = "";

    if (text.includes("register")) {
        reply = "🧾 Register here: https://voterportal.eci.gov.in/";
    } else if (text.includes("voter id")) {
        reply = "🪪 Get ID: https://voterportal.eci.gov.in/";
    } else if (text.includes("booth")) {
        reply = "📍 Check booth: https://electoralsearch.eci.gov.in/";
    } else {
        reply = "Use Smart Assistant above for guided help.";
    }

    setTimeout(() => addMessage(reply, "bot"), 500);
}