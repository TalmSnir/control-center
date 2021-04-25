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
  if (brightnessIcon.classList.contains("fa-moon")) {
    brightnessIcon.classList.remove("fa-moon");
    brightnessIcon.classList.add("fa-sun");
    brightnessMode.innerText = "light mode";
    body.style.setProperty("filter", "invert(1) hue-rotate(180deg)");
  } else {
    brightnessIcon.classList.remove("fa-sun");
    brightnessIcon.classList.add("fa-moon");
    brightnessMode.innerText = "dark mode";
    body.style.removeProperty("filter");
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
