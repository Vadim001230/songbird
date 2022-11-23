import birdsDataRu from './birdsRu.js';

//Vars
const audioQuestion = document.getElementById('audioQuestion'),
      audioTrue = document.getElementById('audioTrue'),
      audioFalse = document.getElementById('audioFalse'),
      audioWin = document.getElementById('audioWin'),
      audioCard = document.getElementById('audioCard');

const scoreCounter = document.querySelector('.header__score-counter'),
      pageItems = document.querySelectorAll('.page-item'),
      progressContainer = document.querySelector('.progress__container'),
      progressBtnPlay = document.querySelector('.progress__btn-play-img'),
      progressBar = document.querySelector('.progress__bar'),
      currentTimes = document.querySelector('.current-time'),
      durationTime = document.querySelector('.duration-time'),
      questionBirdTitle = document.querySelector('.question__bird-title'),
      questionBirdImg = document.querySelector('.question__bird-img'),
      answerItems = document.querySelectorAll('.answer__item'),
      mainButton = document.querySelector('.main__button');

const descriptionPreview = document.querySelector('.description__preview'),
      descriptionCard = document.querySelector('.description__card'),
      cardImg = document.querySelector('.card__img'),
      cardTitle = document.querySelector('.card__title'),
      cardLatin = document.querySelector('.card__latin'),
      cardText = document.querySelector('.card__text');

const cardContainer = document.querySelector('.card__container'),
      cardBtnPlay = document.querySelector('.card__btn-play-img'),
      cardBar = document.querySelector('.card__bar'),
      cardCurrentTimes = document.querySelector('.card__current-time'),
      cardDurationTime = document.querySelector('.card__duration-time');

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

//Algoritm
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


let questionNumber = 0;
let randomQuestionArr;

function randomQuestion() {
  randomQuestionArr = randomInteger(0, 5);
}
randomQuestion()

function startGame() {
  questionBirdTitle.textContent = '******'
  questionBirdImg.src = 'https://birds-quiz.netlify.app/static/media/bird.06a46938.jpg';
  if (questionNumber === 6) {
    questionNumber = 0;
    endGame();
  }
  audioQuestion.src = birdsDataRu[questionNumber][randomQuestionArr].audio;
  descriptionCard.style.display = 'none';
  descriptionPreview.style.display = 'block';
  let answerIndex = 0;
  for(let answerItem of answerItems) {
    answerItem.innerHTML = '<span class="answer__item_led"></span>' + birdsDataRu[questionNumber][answerIndex].name;
    answerIndex++;
    answerItem.classList.remove('wrong');
    answerItem.classList.remove('right');
  }
}
startGame()
let scoreCount = 0;
let count = 5;
function trueOrFalseAnswer(e) {
  let trueObj = birdsDataRu[questionNumber][randomQuestionArr]
  if (e.target.textContent == trueObj.name) {
    e.target.classList.add('right')
    audioTrue.play();
    audioQuestion.pause();
    progressBtnPlay.src = '../../assets/icons/play.svg';
    progressBtnPlay.classList.remove('active');
    scoreCount += count;
    scoreCounter.textContent = scoreCount;
    count = 5;
    for (let answerItem of answerItems) {
      answerItem.removeEventListener('click', trueOrFalseAnswer);
      answerItem.addEventListener('click', afterTrueInfo);
    }
    questionBirdImg.src = trueObj.image;
    questionBirdTitle.textContent = trueObj.name;
    //card
    descriptionPreview.style.display = 'none';
    descriptionCard.style.display = 'block';
    cardImg.src = trueObj.image;
    cardTitle.textContent = trueObj.name;
    cardLatin.textContent = trueObj.species;
    cardText.textContent = trueObj.description;
    audioCard.src = trueObj.audio;
    mainButton.classList.add('active-btn');
  } else {
    if (count <= 0) {
      count = 0
    }
    if (!(e.target.classList.contains('wrong'))){
      count--;
    }
    e.target.classList.add('wrong');
    audioFalse.play();
    audioFalse.playbackRate = 1.3;
    //card
    let targetData = birdsDataRu[questionNumber][e.target.id - 1];
    descriptionPreview.style.display = 'none';
    descriptionCard.style.display = 'block'
    cardImg.src = targetData.image;
    cardTitle.textContent = targetData.name;
    cardLatin.textContent = targetData.species;
    cardText.textContent = targetData.description;
    audioCard.src = targetData.audio;
  }
}
function afterTrueInfo(e) {
  let targetData = birdsDataRu[questionNumber][e.target.id - 1];
    descriptionPreview.style.display = 'none';
    descriptionCard.style.display = 'block'
    cardImg.src = targetData.image;
    cardTitle.textContent = targetData.name;
    cardLatin.textContent = targetData.species;
    cardText.textContent = targetData.description;
    audioCard.src = targetData.audio;
}

function resetCardBtn() {
  cardBtnPlay.src = '../../assets/icons/play.svg';
  cardBtnPlay.classList.remove('active');
  cardBar.style.width = '0';
  audioFalse.pause();
}

function resetCard() {
  for (let answerItem of answerItems) {
    if (answerItem.classList.contains('wrong')) {
      resetCardBtn();
    }
  }
}
for (let answerItem of answerItems) {
  answerItem.addEventListener('click', resetCard);
}

for (let answerItem of answerItems) {
  answerItem.addEventListener('click', trueOrFalseAnswer);
}

//Next questions

function nextQuestion() {
  if (mainButton.classList.contains('active-btn')) {
    questionNumber++;
    mainButton.classList.remove('active-btn');
    randomQuestion();
    startGame();
    pauseAudio();
    progressBar.style.width = '0'
    pauseAudioCard();

    for (let pageItem of pageItems) {
      pageItem.classList.remove('active')
      pageItems[questionNumber].classList.add('active')
    }
    for (let answerItem of answerItems) {
      answerItem.addEventListener('click', trueOrFalseAnswer);
    }
  }
}

mainButton.addEventListener('click', nextQuestion);

function endGame() {
  console.log('game')
}

//Card audio player
function playAudioCard() {
  cardBtnPlay.classList.add('active');
  audioCard.play();
  cardBtnPlay.src = '../../assets/icons/pause.svg';
}

function pauseAudioCard() {
  cardBtnPlay.classList.remove('active');
  audioCard.pause();
  cardBtnPlay.src = '../../assets/icons/play.svg';
}

cardBtnPlay.addEventListener("click", function(){
let isPlaying = cardBtnPlay.classList.contains('active');
  if (isPlaying) {
    pauseAudioCard();
  } else {
    playAudioCard();
  }
});

function percentProgressCard(e) {
  const {duration, currentTime} = e.target;
  const progressPercent = (currentTime / duration) * 100;
  cardBar.style.width = (`${progressPercent}%`);
}

audioCard.addEventListener('timeupdate', percentProgressCard);

function setProgressCard(e) {
  const width = this.clientWidth;
  const clickWith = e.offsetX;
  const duration = audioCard.duration;

  audioCard.currentTime = (clickWith / width) * duration;
}

cardContainer.addEventListener('click', setProgressCard);

audioCard.onloadedmetadata = function() {
  let timestamp = Math.floor(audioCard.duration);
  cardDurationTime.innerHTML = (`${Math.floor(timestamp / 60)}:${timestamp % 60}`);
};

function currentCard(e) {
  const {currentTime} = e.target;
  const n = currentTime % 60;
    if (n < 10) {
      cardCurrentTimes.innerHTML = (`${Math.floor(currentTime / 60)}:0${Math.floor(n)}`);
    } else {
      cardCurrentTimes.innerHTML = (`${Math.floor(currentTime / 60)}:${Math.floor(n)}`);
    }
}

audioCard.addEventListener('timeupdate', currentCard);





