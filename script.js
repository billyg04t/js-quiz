// Questions and answers array
const questions = [
    {
      question: "Question 1: In Java, how would you insert a new node or reposition an existing node as the last child of a particular parent node?",
      options: ["Append Child", "Add Event Listener"],
      correctAnswer: "Append Child"
    },
    {
      question: "Question 2:In Java, what is a block of code that, when called, performs specific actions mentioned in it?",
      options: ["A method", "An element"],
      correctAnswer: "A method"
    },
    {
      question: "In Java, what is a software intermediary that allows two applications to talk to each other?",
      options: ["A jquery", "An API (An application programming interface)"],
      correctAnswer: "An API (An application programming interface)"
    },
    {
      question: "In Java, what is a way that you can wait for user interaction like a click or keypress?",
      options: ["Adding an event listener", "Adding a psudoclass"],
      correctAnswer: "Adding an event listener"
    },
    {
      question: "In Java, what is a set of statements that performs a task or calculates a value?",
      options: ["A function", "An iteration"],
      correctAnswer: "A function"
    }
    // Add more questions in the future
  ];
    // Beginning of quiz
  let currentQuestionIndex = 0;
  let score = 0;
let timeLeft = 40;
let timerInterval;

const startButton = document.getElementById("start");
const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const timeLeftElement = document.getElementById("time-left");
const resultContainer = document.getElementById("result-container");
const initialsInput = document.getElementById("initials");
const saveScoreButton = document.getElementById("save-score");

startButton.addEventListener("click", startQuiz);
optionsElement.addEventListener("click", checkAnswer);
saveScoreButton.addEventListener("click", saveScore);

function startQuiz() {
  startContainer.style.display = "none";
  quizContainer.style.display = "block";
  displayQuestion();
  timerInterval = setInterval(updateTimer, 1000);
}
// Pulls up new question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";

  currentQuestion.options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    optionsElement.appendChild(li);
  });
}

function checkAnswer(event) {
  const selectedOption = event.target.textContent;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
  } else {
    // Subtracts time for incorrect answers
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
}

currentQuestionIndex++;

if (currentQuestionIndex < questions.length) {
  displayQuestion();
} else {
  displayResults();
}
}

function displayResults() {
clearInterval(timerInterval);
quizContainer.style.display = "none";
resultContainer.style.display = "block";
scoreElement.textContent = "Score: " + score;
}

function updateTimer() {
  timeLeft--;
  timeLeftElement.textContent = timeLeft + " seconds";

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    displayResults();
  }
}

function saveScore() {
    const initials = initialsInput.value.trim();
  
    if (initials !== "") {
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ initials, score });
      localStorage.setItem("highScores", JSON.stringify(highScores));
  
      // Redirect to the high scores page
      window.location.href = "highscores.html";
    }
  }
  
