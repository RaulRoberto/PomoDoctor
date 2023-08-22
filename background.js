let timerID;
let cycleIndex = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "startTimers") {
    clearInterval(timerID);
    const workTime = request.workTime;
    const breakTime = request.breakTime;
    const cycleCount = request.cycleCount;

    startTimer(workTime, breakTime, cycleCount);
  }
});

function startTimer(workTime, breakTime, cycleCount) {
  let remainingTime = parseTime(workTime);

  timerID = setInterval(function() {
    chrome.action.setBadgeText({ text: formatTime(remainingTime) });
    remainingTime--;

    if (remainingTime < 0) {
      clearInterval(timerID);
      chrome.action.setBadgeText({ text: "" });

      // playNotificationSound();

      if (cycleIndex < cycleCount - 1) {
        cycleIndex++;
        startBreakTimer(breakTime, cycleCount);
      } else {
        showNotification("Ciclos concluídos!");
      }
    }
  }, 1000);
}

function startBreakTimer(breakTime, cycleCount) {
  let remainingTime = parseTime(breakTime);

  timerID = setInterval(function() {
    chrome.action.setBadgeText({ text: formatTime(remainingTime) });
    remainingTime--;

    if (remainingTime < 0) {
      clearInterval(timerID);
      chrome.action.setBadgeText({ text: "" });
      startTimer(parseTime(document.getElementById("workTime").value), breakTime, cycleCount);
    }
  }, 1000);
}

function parseTime(timeString) {
  const parts = timeString.split(":").map(part => parseInt(part));
  return parts[0] * 60 + parts[1];
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function playNotificationSound() {
  const audio = new Audio("timer.mp3");
  audio.play();
}

function showNotification(message) {
  chrome.notifications.create({
    type: "basic",
    title: "PomoDoctor",
    message: message,
    iconUrl: "icon.png"
  });
}
