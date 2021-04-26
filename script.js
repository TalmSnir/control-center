//Elements

//body element
const body = document.querySelector("body");

//network section
const wifiBtn = document.querySelector(".wifi-btn");
const wifiConnectionMode = document.querySelector(".wifi-connection");
const bluetoothConnectionMode = document.querySelector(".bluetooth-connection");
const bluetoothBtn = document.querySelector(".bluetooth-btn");
const airdropBtn = document.querySelector(".airdrop-btn");
const airdropConnectionMode = document.querySelector(".airdrop-connection");

//darkmode section
const brightnessBtn = document.querySelector(".brightness-btn");
const brightnessIcon = document.querySelector(".brightness-icon");
const brightnessMode = document.querySelector(".brightness-mode");

//display bar section
const displayFill = document.querySelector(".display-slider-fill");
const displaySliderBtn = document.querySelector(".display-slider-btn");
const displaySlider = document.querySelector(".display-slider");

//sound bar section
const soundFill = document.querySelector(".sound-slider-fill");
const soundSliderBtn = document.querySelector(".sound-slider-btn");
const soundSlider = document.querySelector(".sound-slider");
const volumeIcon = document.querySelector(".volume");

//music section
const recordAudio = document.querySelector(".music-audio");
const recordImage = document.querySelector(".record-image");
const recordName = document.querySelector(".record-name");
const songName = document.querySelector(".song-name");
const playBtn = document.querySelector(".play-pause");
const backwardBtn = document.querySelector(".fa-backward");
const forwardBtn = document.querySelector(".fa-forward");
let songs = [];
let songsInx = 0;

//functions: networks
function changeModeText() {}
function changeState(currentElement, elementName) {
  currentElement.classList.toggle("active");
  let elementConnection = elementName.replace("Btn", "ConnectionMode");
  elementConnection = Function(`'use strict'; return (${elementConnection})`)();
  elementConnection.innerText = elementConnection.innerText.includes(
    "Connected"
  )
    ? "disconnected"
    : "connected";
}
//functions: darkmode
function invertFilter() {
  body.classList.toggle("filter");
  if (brightnessIcon.classList.contains("fa-moon")) {
    brightnessIcon.classList.remove("fa-moon");
    brightnessIcon.classList.add("fa-sun");
    brightnessMode.innerText = "light mode";
    body.style.setProperty("filter", "invert(1) hue-rotate(180deg)");
    displaySlider.style["pointer-events"] = "none";
  } else {
    brightnessIcon.classList.remove("fa-sun");
    brightnessIcon.classList.add("fa-moon");
    brightnessMode.innerText = "dark mode";
    body.style.removeProperty("filter");
    displaySlider.style["pointer-events"] = "auto";
  }
}
//functions: display bar
function adjustBrightness(xPosition, elementWidth) {
  body.style.setProperty(
    "filter",
    `brightness(${Math.trunc((xPosition / elementWidth) * 100)}%)`
  );
}

function adjustDisplayByClick(e) {
  const xPosition = e.offsetX;
  displayFill.style.setProperty("width", String(xPosition + "px"));
  displaySliderBtn.style.setProperty("left", xPosition + "px");
  adjustBrightness(xPosition, this.clientWidth);
}

function adjustDisplayByDrag() {
  const rect = this.getBoundingClientRect();
  const maxRelToDocument = rect.right;
  const minRelToDocument = rect.left;
  const sliderWidth = maxRelToDocument - minRelToDocument;

  document.onmousemove = (e) => {
    let newPosition = e.offsetX;
    newPosition =
      sliderWidth < newPosition
        ? sliderWidth
        : 0 > newPosition
        ? 0
        : newPosition;
    displayFill.style.width = newPosition + "px";
    displaySliderBtn.style.left = newPosition + "px";
    adjustBrightness(newPosition, sliderWidth);
  };
  document.onmouseup = () => {
    document.onmousemove = null;
  };
}

//functions: sound bar
function adjustSoundByClick(e) {
  const xPosition = e.offsetX;
  let relativePos = 1;
  soundFill.style.setProperty("width", String(xPosition + "px"));
  soundSliderBtn.style.setProperty("left", xPosition + "px");
  relativePos = xPosition / this.clientWidth;
  recordAudio.volume = relativePos > 1 ? 1 : relativePos;
  volumeIconAdjust(relativePos);
}

function adjustSoundByDrag() {
  const rect = this.getBoundingClientRect();
  const maxRelToDocument = rect.right;
  const minRelToDocument = rect.left;
  const sliderWidth = maxRelToDocument - minRelToDocument;

  document.onmousemove = (e) => {
    let newPosition = e.offsetX;
    let relativePos = 1;
    newPosition =
      sliderWidth < newPosition
        ? sliderWidth
        : 0 > newPosition
        ? 0
        : newPosition;
    relativePos = newPosition / this.clientWidth;
    soundFill.style.width = newPosition + "px";
    soundSliderBtn.style.left = newPosition + "px";
    recordAudio.volume = relativePos > 1 ? 1 : relativePos;
    volumeIconAdjust(relativePos);
  };
  document.onmouseup = () => {
    document.onmousemove = null;
  };
}

function volumeIconAdjust(relativePos) {
  if (relativePos > 0.8 && !volumeIcon.classList.contains("fa-volume-up")) {
    volumeIcon.classList.add("fa-volume-up");
    volumeIcon.classList.remove("fa-volume-down");
    volumeIcon.classList.remove("fa-volume-mute");
    volumeIcon.classList.remove("fa-volume-off");
  }
  if (relativePos > 0.5 && relativePos < 0.8) {
    volumeIcon.classList.add("fa-volume-down");
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.remove("fa-volume-mute");
    volumeIcon.classList.remove("fa-volume-off");
  }
  if (relativePos > 0.05 && relativePos < 0.4) {
    volumeIcon.classList.add("fa-volume-off");
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.remove("fa-volume-down");
    volumeIcon.classList.remove("fa-volume-mute");
  }
  if (relativePos < 0.05) {
    volumeIcon.classList.add("fa-volume-mute");
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.remove("fa-volume-down");
    volumeIcon.classList.remove("fa-volume-off");
    recordAudio.volume = 0;
  }
}
//functions: music section
async function loadSongs() {
  songs = await fetch("records.json")
    .then((response) => response.json())
    .then((data) => data);
  loadSong();
}
function loadSong() {
  recordImage.setAttribute("src", songs[songsInx]["record-image"]);
  recordName.innerText = songs[songsInx]["record-name"];
  songName.innerText = songs[songsInx]["song-name"];
  recordAudio.setAttribute("src", songs[songsInx]["audio"]);
  playBtn.classList.contains("fa-play") ? pauseAudio() : playAudio();
}
function playPauseAudio() {
  playBtn.classList.contains("fa-play") ? playAudio() : pauseAudio();
}
function pauseAudio() {
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
  recordAudio.pause();
}
function playAudio() {
  playBtn.classList.remove("fa-play");
  playBtn.classList.add("fa-pause");
  recordAudio.play();
}

function nextSong() {
  songsInx = songsInx + 1 > songs.length - 1 ? 0 : songsInx + 1;
  loadSong();
}
function previousSong() {
  songsInx = songsInx - 1 < 0 ? songs.length - 1 : songsInx - 1;
  loadSong();
}

//Event Listeners
wifiBtn.addEventListener("click", () => {
  changeState(wifiBtn, "wifiBtn");
});
bluetoothBtn.addEventListener("click", () => {
  changeState(bluetoothBtn, "bluetoothBtn");
});

airdropBtn.addEventListener("click", () => {
  changeState(airdropBtn, "airdropBtn");
});

brightnessBtn.addEventListener("click", invertFilter);

displaySlider.addEventListener("click", adjustDisplayByClick);
displaySlider.addEventListener("mousedown", adjustDisplayByDrag);

soundSlider.addEventListener("click", adjustSoundByClick);
soundSlider.addEventListener("mousedown", adjustSoundByDrag);

window.addEventListener("load", loadSongs);
playBtn.addEventListener("click", playPauseAudio);
forwardBtn.addEventListener("click", nextSong);
backwardBtn.addEventListener("click", previousSong);
recordAudio.addEventListener("ended", nextSong);
volumeIcon.addEventListener("click", () => {
  volumeIconAdjust(0);
});
