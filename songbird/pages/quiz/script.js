import birdsDataRu from './birdsRu.js';

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
console.log(birdsDataRu[0][0])
//Start Game
const audioQuestion = document.getElementById('audioQuestion'),
      audioTrue = document.getElementById('audioTrue'),
      audioFalse = document.getElementById('audioFalse'),
      audioWin = document.getElementById('audioWin'),
      audioCard = document.getElementById('audioCard');

const pageItems = document.querySelectorAll('.page-item'),
      progressContainer = document.querySelector('.progress__container'),
      progressBtnPlay = document.querySelector('.progress__btn-play-img'),
      progressBar = document.querySelector('.progress__bar'),
      currentTimes = document.querySelector('.current-time'),
      durationTime = document.querySelector('.duration-time'),
      questionBirdTitle = document.querySelector('.question__bird-title'),
      unknowBirdImg = document.querySelector('.question__bird-img'),
      answerItems = document.querySelectorAll('.answer__item_text'),
      answerItemLeds = document.querySelectorAll('.answer__item_led'),
      mainButton = document.querySelector('.main__button');


function startGame() {
  questionBirdTitle.textContent = '******'
  unknowBirdImg.src = 'https://birds-quiz.netlify.app/static/media/bird.06a46938.jpg';
  let answerIndex = 0;
  for(let answerItem of answerItems) {
    answerItem.textContent = birdsDataRu[0][answerIndex].name;
    answerIndex++
  }

}
startGame()

//volume
document.querySelector('.volume-input').oninput = audioVolume;
function audioVolume() {
  let v = this.value;
  audioQuestion.volume = v / 100;
  audioCard.volume = v / 100;
}

//Play+Pause Songs in question section

function playAudio() {
  progressBtnPlay.classList.add('active');
  audioQuestion.play();
  progressBtnPlay.src = '../../assets/icons/pause.svg';
}

function pauseAudio() {
  progressBtnPlay.classList.remove('active');
  audioQuestion.pause();
  progressBtnPlay.src = '../../assets/icons/play.svg';
}

progressBtnPlay.addEventListener("click", function(){
let isPlaying = progressBtnPlay.classList.contains('active');
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});

//Progress-bar in question section

function percentProgress(e) {
  const {duration, currentTime} = e.target;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = (`${progressPercent}%`);
}

audioQuestion.addEventListener('timeupdate', percentProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickWith = e.offsetX;
  const duration = audioQuestion.duration;

  audioQuestion.currentTime = (clickWith / width) * duration;
}

progressContainer.addEventListener('click', setProgress);

audioQuestion.onloadedmetadata = function() {
  let timestamp = Math.floor(audioQuestion.duration);
  durationTime.innerHTML = (`${Math.floor(timestamp / 60)}:${timestamp % 60}`);
};

function current(e) {
	const {currentTime} = e.target;
  const n = currentTime % 60;
    if (n < 10) {
      currentTimes.innerHTML = (`${Math.floor(currentTime / 60)}:0${Math.floor(n)}`);
    } else {
      currentTimes.innerHTML = (`${Math.floor(currentTime / 60)}:${Math.floor(n)}`);
    }
}

audioQuestion.addEventListener('timeupdate', current);