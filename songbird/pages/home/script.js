//video change
const video = document.getElementById('video');
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function videoChande() {
  if(window.matchMedia("(min-width: 450px)").matches) {
    let i = randomInteger(1, 16);
    video.setAttribute('src', `../../assets/video/video${i}.mp4`);
  } else {
    let i = randomInteger(17, 25);
    video.setAttribute('src', `../../assets/video/video${i}.mp4`);
  }
}

videoChande()
setInterval(() => {
  videoChande();
}, 10000);

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