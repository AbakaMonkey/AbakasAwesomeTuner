var bpm = 45

var is_on = false

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
let currentOscillator = null;
let currentGain = null;

function playFrequency(frequencyInHz) {
    if (currentOscillator) {
        currentOscillator.stop();
        currentOscillator.disconnect();
        currentGain.disconnect();
    }

    currentOscillator = audioCtx.createOscillator();
    currentGain = audioCtx.createGain();

    currentOscillator.frequency.setValueAtTime(
        frequencyInHz,
        audioCtx.currentTime
    );

    currentOscillator.type = "sine";

    currentGain.gain.setValueAtTime(1, audioCtx.currentTime);

    currentOscillator.connect(currentGain);
    currentGain.connect(audioCtx.destination);

    currentOscillator.start();
}

function stopFrequency() {
    if (currentOscillator) {
        currentOscillator.stop();
        currentOscillator.disconnect();
        currentGain.disconnect();

        currentOscillator = null;
        currentGain = null;
    }

  is_on = false
}

function playbackControls() {
  if (is_on == false) {
    playFrequency(findSemitoneFromA4(pitch), 1.5);
    changeBpmDisplays();
    document.getElementById("playback").textContent = "||"

    is_on = true
  } else {
    stopFrequency()

    document.getElementById("playback").textContent = ">"

    is_on = false
  }
}

function changeBpmDisplays() {
    document.getElementById("bpmDisplay").textContent = bpm.toString()
}


function increaseBpm() {
    bpm += 1
  
    changeBpmDisplays();
}

function decreaseBpm() {
    bm -= 1

    changeBpmDisplays();
}
