let step = 0;
let progress = 0;

function updateProgress() {
    document.getElementById("progressBar").style.width = progress + "%";
}

function answer(ans) {
    const question = document.getElementById("question");

    if (step === 0) {
        if (ans === "no") {
            showResult([
                "🧾 You are not registered.",
                "👉 Go to: https://voterportal.eci.gov.in/",
                "📄 Fill Form 6 to register"
            ]);
            return;
        }
        step++;
        progress += 33;
        updateProgress();
        question.innerText = "Do you have your voter ID?";
    }

    else if (step === 1) {
        if (ans === "no") {
            showResult([
                "🪪 You need a voter ID.",
                "👉 Apply here: https://voterportal.eci.gov.in/",
                "📥 Download e-EPIC after approval"
            ]);
            return;
        }
        step++;
        progress += 33;
        updateProgress();
        question.innerText = "Do you know your polling booth?";
    }

    else if (step === 2) {
        if (ans === "no") {
            showResult([
                "📍 Find your polling booth:",
                "👉 https://electoralsearch.eci.gov.in/",
                "🗺️ Opening map..."
            ]);
            window.open("https://www.google.com/maps/search/polling+booth+near+me");
            return;
        }

        progress += 34;
        updateProgress();

        showResult([
            "🎉 You are fully ready to vote!",
            "🗳️ Just carry your ID and visit your booth.",
            "✅ Follow EVM instructions"
        ]);
    }
}

function showResult(lines) {
    const wizard = document.getElementById("wizard");
    const result = document.getElementById("resultCard");

    wizard.classList.add("hidden");
    result.classList.remove("hidden");

    result.innerHTML = `
    <h2>🎯 Your Result</h2>
    <ul>
      ${lines.map(l => `<li>${l}</li>`).join("")}
    </ul>
    <button onclick="location.reload()">Restart</button>
  `;
}