// Adicione este código ao arquivo 'content.js'

// Cria um elemento de estilo
const style = document.createElement("style");
style.textContent = `
  .pomodoro-floating-text {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 9999;
  }
`;

// Adiciona o elemento de estilo ao head da página
document.head.appendChild(style);

// Cria o elemento de texto flutuante
const floatingText = document.createElement("div");
floatingText.className = "pomodoro-floating-text";
floatingText.textContent = "PomoDoctor - Trabalhando";

// Adiciona o elemento de texto flutuante ao corpo da página
document.body.appendChild(floatingText);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "showNotification") {
    alert(request.message); // Exibe a notificação na página
  }
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "playSound") {
    playSound();
  }
});

function playSound() {
  const audio = new Audio("timer.mp3");
  audio.play();
}

