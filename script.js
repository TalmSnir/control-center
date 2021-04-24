//body element
const body = document.querySelector("body");
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
  if (body.classList.contains("filter")) {
    brightnessIcon.classList.remove("fa-moon");
    brightnessIcon.classList.add("fa-sun");
    brightnessMode.innerText = "light mode";
  } else {
    brightnessIcon.classList.remove("fa-sun");
    brightnessIcon.classList.add("fa-moon");
    brightnessMode.innerText = "dark mode";
  }
}

function adjustDisplay(e) {
  const xPosition = e.offsetX;
  displayFill.style.setProperty("width", String(xPosition + "px"));
  displaySliderBtn.style.setProperty("left", xPosition + "px");
  body.style.setProperty(
    "filter",
    `brightness(${Math.trunc((xPosition / this.clientWidth) * 100)}%)`
  );
}

function adjustSound(e) {
  const xPosition = e.offsetX;
  soundFill.style.setProperty("width", String(xPosition + "px"));
  soundSliderBtn.style.setProperty("left", xPosition + "px");
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

displaySlider.addEventListener("click", adjustDisplay);

soundSlider.addEventListener("click", adjustSound);
