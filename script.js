var pitch = 45
const A4_INDEX = 45;

var notes = ["C1","Db1","D1","Eb1","E1","F1","Gb1","G1","Ab1","A1","Bb1","B1","C2","Db2","D2","Eb2","E2","F2","Gb2","G2","Ab2","A2","Bb2","B2","C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3","A3","Bb3","B3","C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4","A4","Bb4","B4","C5","Db5","D5","Eb5","E5","F5","Gb5","G5","Ab5","A5","Bb5","B5","C6","Db6","D6","Eb6","E6","F6","Gb6","G6","Ab6","A6","Bb6","B6"]
var bbnotes = ["D1","Eb1","E1","F1","Gb1","G1","Ab1","A1","Bb1","B1","C2","Db2","D2","Eb2","E2","F2","Gb2","G2","Ab2","A2","Bb2","B2","C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3","A3","Bb3","B3","C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4","A4","Bb4","B4","C5","Db5","D5","Eb5","E5","F5","Gb5","G5","Ab5","A5","Bb5","B5","C6","Db6","D6","Eb6","E6","F6","Gb6","G6","Ab6","A6","Bb6","B6","C7","Db7"]
var fnotes = ["G1","Ab1","A1","Bb1","B1","C2","Db2","D2","Eb2","E2","F2","Gb2","G2","Ab2","A2","Bb2","B2","C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3","A3","Bb3","B3","C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4","A4","Bb4","B4","C5","Db5","D5","Eb5","E5","F5","Gb5","G5","Ab5","A5","Bb5","B5","C6","Db6","D6","Eb6","E6","F6","Gb6","G6","Ab6","A6","Bb6","B6","C7","Db7","D7","Eb7","E7","F7","Gb7"]
var anotes = ["Eb1","E1","F1","Gb1","G1","Ab1","A1","Bb1","B1","C2","Db2","D2","Eb2","E2","F2","Gb2","G2","Ab2","A2","Bb2","B2","C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3","A3","Bb3","B3","C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4","A4","Bb4","B4","C5","Db5","D5","Eb5","E5","F5","Gb5","G5","Ab5","A5","Bb5","B5","C6","Db6","D6","Eb6","E6","F6","Gb6","G6","Ab6","A6","Bb6","B6","C7","Db7","D7"]
var ebnotes = ["A1","Bb1","B1","C2","Db2","D2","Eb2","E2","F2","Gb2","G2","Ab2","A2","Bb2","B2","C3","Db3","D3","Eb3","E3","F3","Gb3","G3","Ab3","A3","Bb3","B3","C4","Db4","D4","Eb4","E4","F4","Gb4","G4","Ab4","A4","Bb4","B4","C5","Db5","D5","Eb5","E5","F5","Gb5","G5","Ab5","A5","Bb5","B5","C6","Db6","D6","Eb6","E6","F6","Gb6","G6","Ab6","A6","Bb6","B6","C7","Db7","D7","Eb7","E7","F7","Gb7","G7","Ab7",]

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

function findSemitoneFromA4(n) {
  var semitonesFromA4 = n - A4_INDEX;
  return 440 * 2 ** (semitonesFromA4 / 12);
}

function playbackControls() {
  if (is_on == false) {
    playFrequency(findSemitoneFromA4(pitch), 1.5);
    changePitchDisplays();
    document.getElementById("playback").textContent = "||"

    is_on = true
  } else {
    stopFrequency()

    document.getElementById("playback").textContent = ">"
  }
}

function changePitchDisplays() {
  console.log(notes[pitch])
  document.getElementById("concertDisplay").textContent = notes[pitch];
  document.getElementById("bbDisplay").textContent = bbnotes[pitch];
  document.getElementById("fDisplay").textContent = fnotes[pitch];
  document.getElementById("aDisplay").textContent = anotes[pitch];
  document.getElementById("ebDisplay").textContent = ebnotes[pitch];
}


function increaseFrequency() {
  pitch += 1
  
    playFrequency(findSemitoneFromA4(pitch), 1.5);
    changePitchDisplays();

    document.getElementById("playback").textContent = "||"

    is_on = true  
}

function decreaseFrequency() {
    pitch -= 1
  
    playFrequency(findSemitoneFromA4(pitch), 1.5);
    changePitchDisplays();

    document.getElementById("playback").textContent = "||"

    is_on = true
}

changePitchDisplays();