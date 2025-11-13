const questions = [
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "NaCl", correct: false },
      { text: "O2", correct: false }
    ]
  },
  {
    question: "In computing, what does CPU stand for?",
    answers: [
      { text: "Complex Processing Unit", correct: false },
      { text: "Central Processing Unit", correct: true },
      { text: "Control Program Utility", correct: false },
      { text: "Computer Power Usage", correct: false }
    ]
  },
  {
    question: "Which famous scientist developed the theory of relativity?",
    answers: [
      { text: "Albert Einstein", correct: true },
      { text: "Isaac Newton", correct: false },
      { text: "Galileo Galilei", correct: false },
      { text: "Stephen Hawking", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;
let answersSummary = [];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answersSummary = [];
  nextButton.innerHTML = "Next";
  resultContainer.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(button, correct) {
  const selectedAnswer = button.innerText;
  const currentQuestion = questions[currentQuestionIndex];

  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    const answer = currentQuestion.answers.find(a => a.text === btn.innerText);
    if (answer.correct) btn.classList.add("correct");
  });

  if (correct) {
    button.classList.add("correct");
    score++;
    answersSummary.push({ q: currentQuestion.question, result: "✅ Correct" });
  } else {
    button.classList.add("wrong");
    answersSummary.push({ q: currentQuestion.question, result: "❌ Wrong" });
  }

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (nextButton.innerText === "Restart Quiz") {
    startQuiz();
    return;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
  resultContainer.innerHTML = `
    <h3>Summary</h3>
    ${answersSummary.map(a => `<p>${a.q}<br>${a.result}</p>`).join("")}
  `;
  resultContainer.style.display = "block";
  nextButton.innerText = "Restart Quiz";
  nextButton.style.display = "block";
}

startQuiz();
