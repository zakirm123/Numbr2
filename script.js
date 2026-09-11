// Game State Profile Configuration
let playerProfile = {
    xp: 0,
    level: 1,
    energy: 30,
    lastResetDate: ""
};

let currentAnswer = 0;
let currentGrade = 1;
let sessionCorrectAnswers = 0;
let timerInterval = null;
let timeLeft = 15;

// DOM Elements Reference Links
const gradeScreen = document.getElementById('grade-screen');
const gameScreen = document.getElementById('game-screen');
const questionEl = document.getElementById('question');
const inputEl = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const timerEl = document.getElementById('timer-count');
const bubbleEl = document.getElementById('archie-bubble');

// UI Headers Trackers 
const energyDisplay = document.getElementById('energy-count');
const levelDisplay = document.getElementById('level-display');
const xpDisplay = document.getElementById('xp-display');

// Load profile info immediately on execution
loadProfile();

function loadProfile() {
    const saved = localStorage.getItem('numbr_profile');
    if (saved) {
        playerProfile = JSON.parse(saved);
    }
    
    // Check if configuration dictates a midnight refresh loop criteria match
    checkDailyReset();
    updateHeaderUI();
}

function saveProfile() {
    localStorage.setItem('numbr_profile', JSON.stringify(playerProfile));
    updateHeaderUI();
}

function updateHeaderUI() {
    energyDisplay.textContent = playerProfile.energy;
    levelDisplay.textContent = playerProfile.level;
    xpDisplay.textContent = playerProfile.xp;
}

function checkDailyReset() {
    const todayStr = new Date().toDateString(); // Formats uniquely per individual calendar day
    if (playerProfile.lastResetDate !== todayStr) {
        playerProfile.energy = 30; // Max Refill baseline rule execution
        playerProfile.lastResetDate = todayStr;
        saveProfile();
    }
}

// Start Game and process Grade parameters
function startGame(grade) {
    checkDailyReset(); // Verify energy validity check window frame rule processing right before layout launch

    if (playerProfile.energy <= 0) {
        alert("🦅 Archie says: You are out of energy today! Check back tomorrow past midnight 12:00 AM.");
        return;
    }

    currentGrade = grade;
    sessionCorrectAnswers = 0;
    
    // UI Screen Swap layout engine rules
    gradeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    generateQuestion();
    startTimer();
}

// Generates Math Problems depending directly on selected user Grade level
function generateQuestion() {
    let num1, num2, operator;
    const operatorsMap = {
        1: ['+', '-'],
        2: ['+', '-'],
        3: ['+', '-', '*'],
        4: ['+', '-', '*', '/']
    };

    const allowedOps = operatorsMap[currentGrade];
    operator = allowedOps[Math.floor(Math.random() * allowedOps.length)];

    if (currentGrade === 1) {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
    } else if (currentGrade === 2) {
        num1 = Math.floor(Math.random() * 50) + 10;
        num2 = Math.floor(Math.random() * 50) + 10;
    } else {
        num1 = Math.floor(Math.random() * 100) + 10;
        num2 = Math.floor(Math.random() * 12) + 2; // Easier multi/div baseline arrays standard setup definitions
    }

    // Math Rule Safeguards to prevent negatives or decimal fractions inside game structures
    if (operator === '-') {
        if (num1 < num2) { [num1, num2] = [num2, num1]; } // Swap positions to avoid negatives
    } else if (operator === '/') {
        num1 = num2 * (Math.floor(Math.random() * 10) + 1); // Ensures clean integer operations
    }

    // Compute direct targets based on dynamically sampled expression fields
    switch (operator) {
        case '+': currentAnswer = num1 + num2; break;
        case '-': currentAnswer = num1 - num2; break;
        case '*': currentAnswer = num1 * num2; break;
        case '/': currentAnswer = num1 / num2; break;
    }

    questionEl.textContent = `${num1} ${operator} ${num2} = ?`;
    inputEl.value = '';
    inputEl.focus();
}

function checkAnswer() {
    const userAnswer = parseInt(inputEl.value, 10);
    if (isNaN(userAnswer)) return;

    if (userAnswer === currentAnswer) {
        sessionCorrectAnswers++;
        bubbleEl.textContent = "Great job! Keep going! 🦅";
    } else {
        bubbleEl.textContent = "Oops! Try the next one!";
    }
    generateQuestion();
}

// Fast countdown processing infrastructure block
function startTimer() {
    timeLeft = 15;
    timerEl.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            endRound();
        }
    }, 1000);
}

// End of 15s Timer Event Loop Execution
function endRound() {
    clearInterval(timerInterval);
    
    // Energy cost allocation structure
    playerProfile.energy = Math.max(0, playerProfile.energy - 1);

    // XP math computation matrix rules
    const xpGained = sessionCorrectAnswers * 10;
    playerProfile.xp += xpGained;

    // Progression verification algorithms
    const nextLevelThreshold = playerProfile.level * 100;
    if (playerProfile.xp >= nextLevelThreshold) {
        playerProfile.level++;
        alert(`🎉 Level Up! Archie rewards you! You are now Level ${playerProfile.level}!`);
    }

    saveProfile();

    // End layout notification screen feedback prompt alert matrix system processing loop logic structures
    alert(`⏳ Time's Up!\nYou answered ${sessionCorrectAnswers} questions correctly and gained ${xpGained} XP!\n⚡ Energy consumed: 1.`);

    // Screen restoration settings fallback engine mapping routing configurations
    gameScreen.classList.add('hidden');
    gradeScreen.classList.remove('hidden');
    bubbleEl.textContent = "Let's solve this!";
}

// Submission trigger handling logic rules mapping arrays variables links assignments
submitBtn.addEventListener('click', checkAnswer);
inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});
