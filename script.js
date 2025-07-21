const quotes = [
  "Typing is a valuable skill.",
  "Backend developers love clean logic.",
  "JavaScript makes pages interactive.",
  "Fast typing saves valuable time.",
  "Akash builds with clarity and focus."
];

const quoteDisplay = document.getElementById("quote");
const input = document.getElementById("input");
const timerDisplay = document.getElementById("timer");
const accuracyDisplay = document.getElementById("accuracy");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const historyList = document.getElementById("history-list");

let quote = "";
let startTime, interval;

function generateQuote() {
  quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = quote;
}

function updateTimer() {
  const currentTime = new Date().getTime();
  const seconds = Math.floor((currentTime - startTime) / 1000);
  timerDisplay.textContent = seconds;
}

startBtn.onclick = () => {
  generateQuote();
  input.value = "";
  input.disabled = false;
  input.focus();
  startTime = new Date().getTime();
  timerDisplay.textContent = "0";
  accuracyDisplay.textContent = "0%";
  stopBtn.disabled = false;

  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
};

stopBtn.onclick = () => {
  clearInterval(interval);
  input.disabled = true;
  stopBtn.disabled = true;
  logResult();
};

input.addEventListener("input", () => {
  const typed = input.value.trim();
  const originalWords = quote.trim().split(/\s+/);
  const typedWords = typed.split(/\s+/);

  let correct = 0;
  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === originalWords[i]) {
      correct++;
    }
  }

  const accuracy = typedWords.length > 0
    ? Math.floor((correct / typedWords.length) * 100)
    : 0;

  accuracyDisplay.textContent = `${accuracy}%`;

  if (typed === quote) {
    clearInterval(interval);
    input.disabled = true;
    stopBtn.disabled = true;
    logResult();
  }
});

function logResult() {
  const time = timerDisplay.textContent;
  const accuracy = accuracyDisplay.textContent;

  const listItem = document.createElement("li");
  listItem.innerHTML = `Time: ${time}s | Accuracy: ${accuracy} <button onclick="this.parentElement.remove()">Delete</button>`;
  historyList.appendChild(listItem);
}
