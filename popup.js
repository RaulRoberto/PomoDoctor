document.addEventListener("DOMContentLoaded", function() {
  const startButton = document.getElementById("startButton");

  startButton.addEventListener("click", function() {
    const workTime = document.getElementById("workTime").value;
    const breakTime = document.getElementById("breakTime").value;
    const cycleCount = parseInt(document.getElementById("cycleCount").value);

    chrome.runtime.sendMessage({ type: "startTimers", workTime, breakTime, cycleCount });
  });
});
