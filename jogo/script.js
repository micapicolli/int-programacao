let score = 0;
let time = 10; // Tempo inicial para cada pergunta
let currentAnswer;
let interval;

function generateProblem() {
  const num1 = Math.floor(Math.random() * (10 + score)) + 1;
  const num2 = Math.floor(Math.random() * (10 + score)) + 1;
  const operations = ["+", "-", "*"];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  const problem = `${num1} ${operation} ${num2}`;
  currentAnswer = eval(problem); // Calcula a resposta

  document.getElementById("problem-container").innerHTML = `
    <p>Resolva: ${problem}</p>
    <input type="number" id="answer" placeholder="Sua resposta">
    <button onclick="checkAnswer()">Responder</button>
  `;
}

function checkAnswer() {
  const playerAnswer = parseFloat(document.getElementById("answer").value);
  const feedback = document.getElementById("feedback");

  if (playerAnswer === currentAnswer) {
    feedback.textContent = "Correto!";
    feedback.style.color = "green";
    score++;
    time = 10 + score; // Aumenta o tempo com base na pontuação
    playSound("success");
  } else {
    feedback.textContent = "Errado. Tente novamente!";
    feedback.style.color = "red";
    playSound("error");
  }

  document.querySelector(".score").textContent = `Pontuação: ${score}`;
  generateProblem();
}

function startTimer() {
  const timer = document.querySelector(".timer");
  interval = setInterval(() => {
    time--;
    timer.textContent = `Tempo restante: ${time}s`;

    if (time <= 0) {
      clearInterval(interval);
      alert("Tempo esgotado! Fim de jogo.");
      resetGame();
    }
  }, 1000);
}

function startGame() {
  score = 0;
  time = 10;
  document.querySelector(".score").textContent = `Pontuação: ${score}`;
  document.getElementById("feedback").textContent = "";
  generateProblem();
  startTimer();
}

function resetGame() {
  clearInterval(interval);
  document.getElementById("problem-container").innerHTML = "";
  document.querySelector(".timer").textContent = "";
}

function playSound(type) {
  const audio = new Audio(type === "success" ? "success.mp3" : "error.mp3");
  audio.play();
}
