// Game State variables
let score = 0;
let currentAnswer = 0;

// DOM Elements
const questionEl = document.getElementById('question');
const inputEl = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const scoreEl = document.getElementById('score');
const bubbleEl = document.getElementById('archie-bubble');

// Archie's dialogue banks
const correctPhrases = ["Soar high! Correct!", "Excellent calculation!", "Archie approves! 🦅", "You're a math genius!"];
const wrongPhrases = ["Not quite, try again!", "Let's spread our wings and try another.", "Focus up, you got this!"];

// Generate a random math question
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    currentAnswer = num1 + num2;
    questionEl.textContent = `${num1} + ${num2} = ?`;
    inputEl.value = '';
    inputEl.focus();
}

// Check the player's submission
function checkAnswer() {
    const userAnswer = parseInt(inputEl.value, 10);
    
    if (isNaN(userAnswer)) return;

    if (userAnswer === currentAnswer) {
        score++;
        scoreEl.textContent = score;
        // Pick a random success phrase
        bubbleEl.textContent = correctPhrases[Math.floor(Math.random() * correctPhrases.length)];
        bubbleEl.style.borderColor = "#bbf7d0";
        bubbleEl.style.backgroundColor = "#f0fdf4";
    } else {
        // Pick a random failure phrase
        bubbleEl.textContent = wrongPhrases[Math.floor(Math.random() * wrongPhrases.length)];
        bubbleEl.style.borderColor = "#fecaca";
        bubbleEl.style.backgroundColor = "#fef2f2";
    }
    
    generateQuestion();
}

// Event Listeners
submitBtn.addEventListener('click', checkAnswer);
inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});

// Initialize the first question on load
generateQuestion();
