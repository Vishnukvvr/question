const questions = [
    {
        question: "1. Which of the following is the deepest point in the Earth's oceans?",
        answers: [
            { text: "A) Mariana Trench", correct: true },
            { text: "B) Tonga Trench", correct: false },
            { text: "C) Java Trench", correct: false },
            { text: "D) Philippine Trench", correct: false }
        ]
    },
    {
        question: "2. Which mathematical conjecture, still unproven, suggests that every even integer greater than 2 is the sum of two primes?",
        answers: [
            { text: "A) Riemann Hypothesis", correct: false },
            { text: "B) Fermat's Last Theorem", correct: false },
            { text: "C) Poincaré Conjecture", correct: false },
            { text: "D) Goldbach Conjecture", correct: true }
        ]
    },
    {
        question: "3. What is the name of the boundary separating the Earth's atmosphere and outer space?",
        answers: [
            { text: "A) Van Allen Belt", correct: false },
            { text: "B) Kármán Line", correct: true },
            { text: "C) Ozone Layer", correct: false },
            { text: "D) Tropopause", correct: false }
        ]
    },
    {
        question: "4. Which physicist developed the theory of quantum electrodynamics, for which he won a Nobel Prize?",
        answers: [
            { text: "A) Albert Einstein", correct: false },
            { text: "B) Niels Bohr", correct: false },
            { text: "C) Richard Feynman", correct: true },
            { text: "D) Max Planck", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("que-heading");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
