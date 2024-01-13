const image = document.querySelector('.sound-img-container img');
const btn = document.querySelector('.sound-img-container')

const backgroudSound = document.querySelector('.front-page-background-sound');


let isOff = true;
function turnOnBackgroundSound(){
  if(isOff){
    image.src ="images/volume-high-solid.svg";
    backgroudSound.play();
  } else if(!isOff){
    image.src = "images/volume-xmark-solid.svg"
    backgroudSound.pause();
  }
  isOff = !isOff;
  console.log(isOff)
}

btn.addEventListener('click', turnOnBackgroundSound);