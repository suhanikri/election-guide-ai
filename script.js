function askAI() {
    let input = document.getElementById("userInput").value.toLowerCase();
    let reply = "";

    if (input.includes("register")) {
        reply = "You can register as a voter on the official Election Commission website or through voter registration centers.";
    }
    else if (input.includes("voter id")) {
        reply = "You need a voter ID card. You can apply online or offline using Form 6.";
    }
    else if (input.includes("booth")) {
        reply = "You can check your polling booth location online using your voter ID number.";
    }
    else if (input.includes("vote")) {
        reply = "On election day, go to your polling booth with your voter ID and cast your vote securely.";
    }
    else {
        reply = "Try asking about registration, voter ID, polling booth, or voting process.";
    }

    document.getElementById("response").innerText = reply;
}

function quickHelp(type) {
    let reply = "";

    if (type === "first") {
        reply = "As a first-time voter: Register → Get voter ID → Check booth → Go vote on election day.";
    }
    else if (type === "id") {
        reply = "If you lost your voter ID, you can use alternative ID proofs or download your e-EPIC online.";
    }
    else if (type === "booth") {
        reply = "You can find your polling booth using your voter ID on official election portals.";
    }

    document.getElementById("response").innerText = reply;
}