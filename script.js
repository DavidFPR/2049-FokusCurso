const html = document.querySelector('html');
const shortButton = document.querySelector('.app__card-button--short');
const focusButton = document.querySelector('.app__card-button--focus');
const longButton = document.querySelector('.app__card-button--long');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const button = document.querySelectorAll('.app__card-button');
const inputFocusMusic = document.querySelector('#switch-music');
const music = new Audio('./sounds/luna-rise-part-one.mp3');
const playSound = new Audio('./sounds/play.wav');
const pauseSound = new Audio('./sounds/pause.mp3');
const finishSound = new Audio('./sounds/beep.mp3');
const startPauseButton = document.querySelector('#start-pause');
const startPauseText = document.querySelector('#start-pause span');
const startPauseButtonIcon = document.querySelector(
  '.app__card-primary-button-icon'
);
const timerCard = document.querySelector('#timer');

let timeInSeconds = 1500;
let idInterval = null;

music.loop = true;

window.addEventListener('DOMContentLoaded', () => {
  if (inputFocusMusic.checked) {
    music.play();
  } else {
    music.pause();
  }
});

inputFocusMusic.addEventListener('change', () => {
  if (inputFocusMusic.checked) {
    music.play();
  } else {
    music.pause();
  }
});

shortButton.addEventListener('click', () => {
  timeInSeconds = 300;
  changeAttribute('short-break');
  shortButton.classList.add('active');
});

focusButton.addEventListener('click', () => {
  timeInSeconds = 1500;
  changeAttribute('focus');
  focusButton.classList.add('active');
});

longButton.addEventListener('click', () => {
  timeInSeconds = 900;
  changeAttribute('long-break');
  longButton.classList.add('active');
});

function changeAttribute(attribute) {
  showTimer();
  html.setAttribute('data-context', attribute);
  banner.setAttribute('src', `./images/${attribute}.png`);

  button.forEach(function (attribute) {
    attribute.classList.remove('active');
  });

  switch (attribute) {
    case 'focus':
      title.innerHTML = `Enhace your productivity<br>
                <strong class="app__title-strong" >one tomato at a time.</strong>`;
      break;
    case 'short-break':
      title.innerHTML = `Good job!<br>
                  <strong class="app__title-strong" >Let's take a breather.</strong>`;
      break;

    case 'long-break':
      title.innerHTML = `Excellent.<br>
                  <strong class="app__title-strong" >Take a well-deserved break.</strong>`;
      break;

    default:
      break;
  }
}

const timer = () => {
  if (timeInSeconds <= 0) {
    finishSound.play();
    alert('Time is up!');
    restartTimer();
    return;
  }

  timeInSeconds -= 1;
  console.log('Timer: ' + timeInSeconds);
  showTimer();
};

startPauseButton.addEventListener('click', startStop);

function startStop() {
  if (idInterval) {
    restartTimer();
    pauseSound.play();
    return;
  }
  idInterval = setInterval(timer, 1000);
  startPauseButtonIcon.src = './images/pause.png';
  startPauseText.textContent = 'Pause';
  playSound.play();
}

function restartTimer() {
  clearInterval(idInterval);
  idInterval = null;
  startPauseButtonIcon.src = './images/play_arrow.png';
  startPauseText.textContent = 'Start';
}

function showTimer() {
  const time = new Date(timeInSeconds * 1000);
  const formattedTime = time.toLocaleTimeString('en-US', {
    minute: '2-digit',
    second: '2-digit',
  });
  timerCard.innerHTML = `${formattedTime}`;
}

showTimer();
