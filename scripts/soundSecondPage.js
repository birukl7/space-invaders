const image = document.querySelector('.right-container .sound img')
const btn = document.querySelector('.right-container .sound')
console.log(btn)
console.log(image)

const goBack = document.querySelector(".go-back")

const backgroudSound = document.querySelector('.background')
const volumeUpAndDown = document.querySelector('#volumeControl')

backgroudSound.volume = volumeUpAndDown.value;

volumeUpAndDown.addEventListener('input', (e)=>{
  backgroudSound.volume = Number(e.target.value);
  console.log(e.target.value);
  if(Number(e.target.value) === 0){
    image.src = "../images/volume-xmark-solid.svg"
    backgroudSound.pause();
  } else {
    image.src ="../images/volume-high-solid.svg";
    backgroudSound.play();
  }
})


let isOff = true
function turnOnBackgroundSound(){
  if(isOff){
    image.src ="../images/volume-high-solid.svg";
    volumeUpAndDown.value = 0.5;
    backgroudSound.volume = 0.5;
    backgroudSound.play();
  } else if(!isOff){
    image.src = "../images/volume-xmark-solid.svg"
    volumeUpAndDown.value = 0;
    backgroudSound.pause();
  }
  isOff = !isOff;
  console.log(isOff)
}

btn.addEventListener('click', turnOnBackgroundSound);
goBack.addEventListener('click',()=>{
  let value = confirm("Are you sure you want to go back to main menu?")
  if(value == true){
    location.href = '../index.html';
  }
})