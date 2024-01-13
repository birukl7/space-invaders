
const canva ={
  width: 0
}
export function setDimenstion(){
  if(window.matchMedia('(max-width: 600px)').matches){
    canva.width = 700;
  }else if(window.matchMedia('(min-width: 601px) and (max-width: 1024px)').matches){
    canva.width = 1024;
  } else {
    canva.width = 1350;
  }

  return canva;
}
