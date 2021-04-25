//body element
const body = document.querySelector("body");

const recordAudio = document.querySelector(".music-audio");
const recordImage = document.querySelector(".record-image");
const recordName = document.querySelector(".record-name");
const songName = document.querySelector(".song-name");
const playBtn = document.querySelector(".play-pause");
const backwardBtn = document.querySelector(".fa-backward");
const forwardBtn = document.querySelector(".fa-forward");
let songs = [];
let songsInx = 0;

//text nodes

const wifiConnectionMode = document.querySelector(".wifi-connection");

const bluetoothConnectionMode = document.querySelector(".bluetooth-connection");
const airdropConnectionMode = document.querySelector(".airdrop-connection");
const brightnessMode = document.querySelector(".brightness-mode");
// const brightnessMode = document.querySelector(".brightness-mode");
// const brightnessMode = document.querySelector(".brightness-mode");
// const brightnessMode = document.querySelector(".brightness-mode");

//buttons
const wifiBtn = document.querySelector(".wifi-btn");
const bluetoothBtn = document.querySelector(".bluetooth-btn");
const airdropBtn = document.querySelector(".airdrop-btn");
const brightnessBtn = document.querySelector(".brightness-btn");
const brightnessIcon = document.querySelector(".brightness-icon");

const displayFill = document.querySelector(".display-slider-fill");
const displaySliderBtn = document.querySelector(".display-slider-btn");
const displaySlider = document.querySelector(".display-slider");

const soundFill = document.querySelector(".sound-slider-fill");
const soundSliderBtn = document.querySelector(".sound-slider-btn");
const soundSlider = document.querySelector(".sound-slider");

//functions
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

function adjustDisplayByDrag(e) {
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

function adjustSoundByClick(e) {
  const xPosition = e.offsetX;
  soundFill.style.setProperty("width", String(xPosition + "px"));
  soundSliderBtn.style.setProperty("left", xPosition + "px");
}

function adjustSoundByDrag(e) {
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
    soundFill.style.width = newPosition + "px";
    soundSliderBtn.style.left = newPosition + "px";
  };
  document.onmouseup = () => {
    document.onmousemove = null;
  };
}

async function loadSongs() {
  songs = await fetch("records.json")
    .then((response) => response.json())
    .then((data) => data);
  recordImage.setAttribute("src", songs[0]["record-image"]);
  recordName.innerText = songs[0]["record-name"];
  songName.innerText = songs[0]["song-name"];
  recordAudio.setAttribute("src", songs[0]["audio"]);
}
function loadSong() {
  recordImage.setAttribute("src", songs[songsInx]["record-image"]);
  recordName.innerText = songs[songsInx]["record-name"];
  songName.innerText = songs[songsInx]["song-name"];
  recordAudio.setAttribute("src", songs[songsInx]["audio"]);
  playPauseAudio();
}
function playPauseAudio() {
  if (playBtn.classList.contains("fa-play")) {
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
    recordAudio.play();
  } else {
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
    recordAudio.pause();
  }
}

function nextSong() {
  songsInx = songsInx + 1 > songs.length - 1 ? 0 : songsInx + 1;
  loadSong();
}
function previousSong() {
  songsInx = songsInx - 1 < 0 ? songs.length - 1 : songsInx - 1;
  loadSong();
}
//event listeners
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
