import birdsDataRu from '../quiz/birdsRu.js';

//burger
const blackout = document.querySelector('.blackout'),
      burger = document.querySelector('.burger'),
      body = document.querySelector('body'),
      navList = document.querySelector('.nav__list'),
      navLinks = document.querySelectorAll('.nav__link');

function openMenu() {
  blackout.classList.toggle('display-block');
  burger.classList.toggle('burger-active');
  navList.classList.toggle('nav__list-active');
  body.classList.toggle('not-scroll');
  for (let navLink of navLinks) {
      navLink.classList.toggle('nav__link-active');
   }
}

function closeMenu() {
  blackout.classList.remove('display-block');
  burger.classList.remove('burger-active');
  navList.classList.remove('nav__list-active');
  body.classList.remove('not-scroll');
}

burger.addEventListener('click', openMenu);
blackout.addEventListener('click', closeMenu);
for (let navLink of navLinks) {
  navLink.addEventListener('click', closeMenu);
}
//galery
const galery = document.querySelector('.galery');
function renderGalery() {
  let htmlCatalog = '';
  for (let i = 0; i < birdsDataRu.length; i++) {
    for (let j = 0; j < birdsDataRu[i].length; j++) {

        htmlCatalog += `<li class="galery__card"><div class="description__card">
        <div class="card__top">
          <img src="${birdsDataRu[i][j].image}" alt="bird image" class="card__img">
          <div class="card__info">
            <h3 class="card__title">${birdsDataRu[i][j].name}</h3>
            <h4 class="card__latin">${birdsDataRu[i][j].species}</h4>
            <div class="card__audio">
              <div class="card__btn-play"> <img src="../../assets/icons/play.svg" class="card__btn-play-img" alt="prev" width="40" height="40"> </div>
              <div class="card__container">
                <div class="card__bar">
                  <div class="card__bar-time">
                    <div class="card__current-time"></div>
                    <div class="card__duration-time"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="card__text">${birdsDataRu[i][j].description}</p>
      </div>
      <audio src="${birdsDataRu[i][j].audio}" id="audioCard"></audio></li>`




    }
    const htmlUl = `
      <ul class="galery__cards">
         ${htmlCatalog}
      </ul>
    `;
  galery.innerHTML = htmlUl;
  }

}
renderGalery()

//Card audio player

const cardContainer = document.querySelector('.card__container'),
      cardBtnPlay = document.querySelector('.card__btn-play-img'),
      cardBar = document.querySelector('.card__bar'),
      cardCurrentTimes = document.querySelector('.card__current-time'),
      cardDurationTime = document.querySelector('.card__duration-time'),
      audioCard = document.getElementById('audioCard');

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