function askAI() {
    let input = document.getElementById("userInput").value.toLowerCase();
    let reply = "";

    if (input.includes("register")) {
        reply = "🧾 You can register as a voter on the Election Commission website using Form 6.";
    }
    else if (input.includes("voter id")) {
        reply = "🪪 Apply for a voter ID online or offline. You can also download your e-EPIC.";
    }
    else if (input.includes("booth")) {
        reply = "📍 Use your voter ID to check your polling booth location online.";
    }
    else if (input.includes("vote")) {
        reply = "🗳️ Visit your polling booth on election day with valid ID and cast your vote.";
    }
    else {
        reply = "Try asking about voter registration, voter ID, or polling booth.";
    }

    document.getElementById("response").innerText = reply;
}

function quickHelp(type) {
    let reply = "";

    if (type === "first") {
        reply = "🎉 First-time voter? Register → Get voter ID → Find booth → Vote confidently!";
    }
    else if (type === "id") {
        reply = "🔁 Lost your voter ID? Use alternative ID or download your e-EPIC online.";
    }
    else if (type === "booth") {
        reply = "📍 Find your polling booth using official election portals or your voter ID.";
    }

    document.getElementById("response").innerText = reply;
}