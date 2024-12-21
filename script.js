var minutesInput = document.getElementById('minutes');
var secondsInput = document.getElementById('seconds');
var submitBtn = document.getElementById('start');
var resetBtn = document.getElementById('reset');
var timerDisplay = document.getElementById('timer');
var progressBar = document.querySelector('.progress-bar');

let timer, totalSeconds, originalTotalSeconds;

function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgressBar() {
    const progress = (1 - totalSeconds / originalTotalSeconds) * 100;
    progressBar.style.width = `${progress}%`;
}

function startTimer() {
    if (timer) clearInterval(timer);

    totalSeconds = parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
        alert("Please enter a valid time.");
        return;
    }

    originalTotalSeconds = totalSeconds;
    updateDisplay();
    updateProgressBar();

    timer = setInterval(() => {
        totalSeconds--;
        updateDisplay();
        updateProgressBar();

        if (totalSeconds <= 0) {
            clearInterval(timer);
            alert('Time\'s up! Take a break.');
            submitBtn.disabled = false;
        }
    }, 1000);

    submitBtn.disabled = true;
}

function resetTimer() {
    if (timer) clearInterval(timer);

    totalSeconds = originalTotalSeconds;
    updateDisplay();
    updateProgressBar();
    submitBtn.disabled = false;
}

submitBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

minutesInput.addEventListener('change', () => {
    totalSeconds = parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
    if (totalSeconds <= 0 || isNaN(totalSeconds)) {
        return;
    }
    updateDisplay();
    updateProgressBar();
});

secondsInput.addEventListener('change', () => {
    totalSeconds = parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
    if (totalSeconds <= 0 || isNaN(totalSeconds)) {
        return;
    }
    updateDisplay();
    updateProgressBar();
});

totalSeconds = 1800;
originalTotalSeconds = totalSeconds;
secondsInput.value = '0';
minutesInput.value = '30';
updateDisplay();
updateProgressBar();