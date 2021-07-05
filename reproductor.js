let vids = ['01.mp4', '02.mp4', '03.mp4', '04.mp4', '05.mp4', '06.mp4', '07.mp4', '08.mp4', '09.mp4', '10.mp4', '11.mp4', '12.mp4', '13.mp4', '14.mp4', '15.mp4', '16.mp4', '17.mp4', '18.mp4', '19.mp4', '20.mp4', '21.mp4', '22.mp4'];

// la longitud del array de los videos
let leng = vids.length;
// un numero utilizado para saber que video se está reproduciendo
let n = 0;
let vid = document.getElementById('vid');
let rd1 = document.querySelector("#rd1");

window.onload = () => {
  rd1.checked = true;
  media.ontimeupdate = actualizar;
}

let rd2 = document.querySelector("#rd2");
let list = document.getElementById('list');
let btnList = document.getElementById('btn-list');
let videoTitle = document.getElementById('videoTitle');
let tituloh5 = document.getElementById('tituloh5');

const media = document.querySelector('video');
const controls = document.querySelector('.controls');

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timerdiv');
const sonido = document.querySelector('.sonido');
const next = document.querySelector('.siguiente');
const reducir = document.querySelector('.reducir');
const barra1 = document.querySelector('.barra1');

media.removeAttribute('controls');

controls.style.visibility = 'visible';

play.addEventListener('click', playPauseMedia);
sonido.addEventListener('click', volumen);
next.addEventListener('click', siguiente);
reducir.addEventListener('click', expandir);
barra1.addEventListener('click', buscar);
media.addEventListener('click', playPauseMedia);

function playPauseMedia() {
    if(media.paused) {
    play.setAttribute('data-icon','u');
    media.play();
    } else {
    play.setAttribute('data-icon','P');
    media.pause();
    }
}

function siguiente() {
  if (n + 1 == leng) {
    n = 0;
    selected(n);
  } else {
    selected(n+1);
  }
}

function volumen() {
    if(media.volume == 1) {
      media.volume = 0;
      sonido.setAttribute('data-icon','o');
    } else {
      media.volume = 1
    sonido.setAttribute('data-icon','Q');
    }
}

stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);

function stopMedia() {
  media.pause();
  media.currentTime = 0;
  play.setAttribute('data-icon','P');
}

rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

let intervalFwd;
let intervalRwd;

function mediaBackward() {
  clearInterval(intervalFwd);
  fwd.classList.remove('active');

  if(rwd.classList.contains('active')) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    media.play();
  } else {
    rwd.classList.add('active');
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove('active');

  if(fwd.classList.contains('active')) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add('active');
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windBackward() {
  if(media.currentTime <= 3) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}

function windForward() {
  if(media.currentTime >= media.duration - 3) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}

media.addEventListener('timeupdate', setTime);

function setTime() {
  let minutes = Math.floor(media.currentTime / 60);
  let seconds = Math.floor(media.currentTime - minutes * 60);
  let minuteValue;
  let secondValue;

  if (minutes < 10) {
    minuteValue = '0' + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondValue = '0' + seconds;
  } else {
    secondValue = seconds;
  }

  let mediaTime = minuteValue + ':' + secondValue;
  timer.textContent = mediaTime;

  let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
  timerBar.style.width = barLength + 'px';
}

rwd.classList.remove('active');
fwd.classList.remove('active');
clearInterval(intervalRwd);
clearInterval(intervalFwd);

rd1.addEventListener('click',() => vid.setAttribute('loop', true));
rd2.addEventListener('click', () => vid.removeAttribute('loop'));
btnList.addEventListener('click', playList);

// utilizo el evento "ended" para saber si el video se ha acabado
vid.addEventListener("ended",()=>{
    remActive();
    // si el video se ha acabado cambia el atributo src
    n++;
    vid.setAttribute("src", `media/videos/${vids[n%leng]}`);
    videoTitle.innerHTML = `Video ${n%leng + 1}`;
    /*let enfocar = document.getElementById(`btn${n+1}`);
    enfocar.focus({preventScroll:false});*/
    atributos(n);
    playPauseMedia();
    }
);

const insertButton = document.getElementById('insertButton');

function playList() {
  videoTitle.removeAttribute("style");
  for (let i = 0; i <= leng-1; i++) {
      const anchor = document.createElement('button');
      const htmlList = document.getElementById('list');
      const li = document.createElement('li');
      anchor.setAttribute('id', `btn${i+1}`);
      anchor.setAttribute('onclick', `selected(${i})`);
      anchor.innerText = `video ${i+1}`;
      li.appendChild(anchor);
      htmlList.appendChild(li);

      btnList.style.display = 'none';
      tituloh5.removeAttribute("style");
  }

}

function selected(i) {
    remActive();
    atributos(i);
    vid.setAttribute("src", `media/videos/${vids[i]}`);
    videoTitle.innerHTML = `Video ${i + 1}`;
    n = i;
    playPauseMedia();
}

function atributos(i) {
    let setAtt = document.getElementById(`btn${i+1}`);
    setAtt.setAttribute('class', 'active');
    /*let enfocar = document.getElementById(`btn${i+1}`);*/
    setAtt.focus({preventScroll:false});
}

function remActive() {
    for (let j = 0; j <= leng-1; j++) {
        let btn_selec = document.getElementById(`btn${j+1}`);
            btn_selec.removeAttribute('class');
    }
}

function expandir(){
  let section = document.querySelector('section');
  if(section.style.transform == "scale(0.7)") {
    section.style.transform = "scale(1)";
    reducir.setAttribute('data-icon', 'M');
    } else {
    section.style.transform = "scale(0.7)";
    reducir.setAttribute('data-icon', 'b');
    }
}

function actualizar(){
  document.querySelector("#estado1").innerHTML = ` ${conversion(media.currentTime)} / ${conversion(media.duration)}`;
  let porcentaje = (100 * media.currentTime)/media.duration;
  document.querySelector(".barra2").style.width = `${porcentaje}%`

}

function conversion(segundos){
  let d = new Date(segundos*1000);
  let segundo = (d.getSeconds()<=9) ? '0'+d.getSeconds() : d.getSeconds();
  let minuto = (d.getMinutes()<=9) ? '0'+d.getMinutes() : d.getMinutes();
  return `${minuto}:${segundo}`;
}

function buscar(e){
  let dondeClick = e.offsetX;
  let anchoVideo = barra1.offsetWidth;
  let porcentaje = (100 * dondeClick) / anchoVideo;
  let posicion = Math.floor(media.duration * (porcentaje/100));
  media.currentTime = posicion;
}
