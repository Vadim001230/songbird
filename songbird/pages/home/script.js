//video change

const video = document.getElementById("video");
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function videoChande() {
  let i = randomInteger(1, 16);
  video.setAttribute('src', `../../assets/video/video${i}.mp4`);
}

videoChande()
setInterval(() => {
  videoChande();
}, 10000);

