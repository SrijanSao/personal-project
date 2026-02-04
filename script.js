const steps = [
    {
        question: "Date when we first met?",
        type: "dropdown",
        options: [
            "28th February 2025",
            "1st March 2025", // correct
        ],
        correct: "1st March 2025"
    },
    {
        question: "Who is the boss?",
        type: "dropdown",
        options: [
            "Sumit",
            "Srijan" // correct
        ],
        correct: "Srijan"
    },
    {
        question: "What was your first impression of me?",
        placeholder: "Type your answer...",
        key: "firstImpression"
    },
    {
        question: "What is your favorite memory with me so far?",
        placeholder: "Type your answer...",
        key: "favoriteMemory"
    },
    {
        question: "Will you be my forever Valentine?",
        type: "dropdown",
        options: [
            "Yes forever! 💖",// correct
            "No"
        ],
        correct: "Yes forever! 💖"
        // type: "final"
    },
    {
        type: "final",
        question: "Okay, bye!"
    }
];

let currentStep = 0;
const answers = {};

function showStep() {
    const stepsDiv = document.getElementById('steps');
    stepsDiv.innerHTML = '';
    const step = steps[currentStep];

    if (step.type === "final") {
        const div = document.createElement('div');
        div.className = 'step';
        div.innerHTML = `
      <h2>Will you be my forever Valentine?</h2>
      <button onclick="showFinalMessage(true)">Of course, you will have to! 💖</button>
      <button onclick="showFinalMessage(false)">There is no second option for you  😢</button>
    `;
        stepsDiv.appendChild(div);
    } else if (step.type === "dropdown") {
        const div = document.createElement('div');
        div.className = 'step';
        div.innerHTML = `
      <label>${step.question}</label><br>
      <select id="dropdown-answer">
        <option value="">Select...</option>
        ${step.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
      </select>
      <br>
      <button onclick="nextStep()">Next</button>
    `;
        stepsDiv.appendChild(div);
        document.getElementById('dropdown-answer').focus();
    } else {
        const div = document.createElement('div');
        div.className = 'step';
        div.innerHTML = `
      <label>${step.question}</label><br>
      <input type="text" id="answer" placeholder="${step.placeholder}" autocomplete="off">
      <br>
      <button onclick="nextStep()">Next</button>
    `;
        stepsDiv.appendChild(div);
        document.getElementById('answer').focus();
    }
}

window.nextStep = function () {
    const step = steps[currentStep];
    let val;
    if (step.type === "dropdown") {
        val = document.getElementById('dropdown-answer').value;
        if (!val) {
            alert("Please select an option!");
            return;
        }
        if (val !== step.correct) {
            alert("Oops! Try again 😜");
            return;
        }
        answers[step.question] = val;
    } else if (step.type === "final") {
        // handled in showFinalMessage
        return;
    } else {
        val = document.getElementById('answer').value.trim();
        if (!val) {
            alert("Please answer before proceeding!");
            return;
        }
        answers[step.key] = val;
    }
    currentStep++;
    showStep();
};

window.showFinalMessage = function (yes) {
    const stepsDiv = document.getElementById('steps');
    if (yes) {
        stepsDiv.innerHTML = `<div class="final-message">Yay! You are my forever Valentine! 💖<br><br>Happy First Valentine's Day Together!</div>`;
    } else {
        stepsDiv.innerHTML = `<div class="final-message">There is no second option for you!<br><br>You are my forever Valentine! 💖<br><br>Happy First Valentine's Day Together! 😘</div>`;
    }
};

// Prevent pausing/muting the audio easily
const audio = document.getElementById('valentine-audio');
audio.volume = 0.7;
audio.controls = false;
audio.setAttribute('controls', 'false');
audio.setAttribute('autoplay', 'true');
audio.setAttribute('loop', 'true');
audio.addEventListener('ended', () => audio.play());

// Try to force autoplay with sound
audio.muted = true;
audio.play().then(() => {
    setTimeout(() => {
        audio.muted = false;
        audio.play();
    }, 500);
}).catch(() => {
    // If autoplay fails, try again on user interaction
    const enableAudio = () => {
        audio.muted = false;
        audio.play();
        window.removeEventListener('click', enableAudio);
        window.removeEventListener('touchstart', enableAudio);
    };
    window.addEventListener('click', enableAudio);
    window.addEventListener('touchstart', enableAudio);
});

showStep();
