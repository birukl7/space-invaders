const image = document.querySelector('.right-container .sound img');
const btn = document.querySelector('.right-container .sound')
console.log(btn)
console.log(image)


const backgroudSound = document.querySelector('.background');


let isOff = true;
function turnOnBackgroundSound(){
  if(isOff){
    image.src ="../images/volume-high-solid.svg";
    backgroudSound.play();
  } else if(!isOff){
    image.src = "../images/volume-xmark-solid.svg"
    backgroudSound.pause();
  }
  isOff = !isOff;
  console.log(isOff)
}

btn.addEventListener('click', turnOnBackgroundSound);