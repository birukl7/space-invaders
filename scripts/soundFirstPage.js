const image = document.querySelector('.sound-img-container img');

const menu = document.querySelector('.humburger-menu');
const controller = document.querySelector('.container .controlles');

const backgroudSound = document.querySelector('.front-page-background-sound');


let isOff = true;
let isOffController = true;
function turnOnBackgroundSound(){
  if(isOff){
    image.src ="images/volume-high-solid.svg";
    backgroudSound.play();
  } else if(!isOff){
    image.src = "images/volume-xmark-solid.svg"
    backgroudSound.pause();
  }
  isOff = !isOff;
}

image.addEventListener('click', turnOnBackgroundSound);
menu.addEventListener('click',()=>{
  console.log('anything')
  if(isOffController){
    setTimeout(()=>{
      controller.classList.add('is-active-controller');
      menu.classList.add('is-active');
    }, 100);
  } else if(!isOffController){
    // controller.style.display = 'none';
    controller.classList.remove('is-active-controller');
    menu.classList.remove('is-active');
  }
  isOffController = !isOffController;
});