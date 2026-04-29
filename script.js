const steps = [
    "🧾 Step 1: Register as a voter on the official portal.",
    "🪪 Step 2: Apply and receive your voter ID.",
    "📍 Step 3: Check your polling booth location.",
    "🗳️ Step 4: Visit the booth and cast your vote.",
    "📊 Step 5: Votes are counted and results declared."
];

function addMessage(text, sender) {
    const chatBox = document.getElementById("chatBox");
    const msg = document.createElement("div");

    msg.classList.add("message", sender);
    msg.innerText = text;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

window.onload = function () {
    addMessage("👋 Hi! I’ll help you understand the election process step-by-step.", "bot");
};

function startJourney() {
    const box = document.getElementById("journeyBox");
    const container = document.getElementById("journeySteps");

    box.classList.remove("hidden");
    container.innerHTML = "";

    steps.forEach((step, index) => {
        setTimeout(() => {
            const div = document.createElement("div");
            div.className = "step";
            div.innerText = step;
            container.appendChild(div);
        }, index * 700);
    });

    addMessage("✨ I've started your voting journey above. Follow the steps!", "bot");
}

function handleScenario(type) {
    let reply = "";

    if (type === "first") {
        reply = "🎉 First-time voter? Just follow: Register → Get ID → Check booth → Vote!";
    } else if (type === "lost") {
        reply = "🔁 Lost your voter ID? You can use alternative ID or download e-EPIC.";
    } else if (type === "booth") {
        reply = "📍 Use your voter ID on official portals to find your polling booth.";
    }

    addMessage(reply, "bot");
}

function askAI() {
    const input = document.getElementById("userInput");
    const text = input.value.toLowerCase();

    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    let reply = "";

    if (text.includes("register")) {
        reply = "You can register online using Form 6 on the Election Commission website.";
    } else if (text.includes("voter id")) {
        reply = "Apply for a voter ID or download your e-EPIC online.";
    } else if (text.includes("booth")) {
        reply = "Check your polling booth using your voter ID.";
    } else if (text.includes("vote")) {
        reply = "Visit your polling booth on election day and cast your vote.";
    } else {
        reply = "Try asking about registration, voter ID, or voting process.";
    }

    setTimeout(() => {
        addMessage(reply, "bot");
    }, 600);
}