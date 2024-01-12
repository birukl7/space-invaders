import { c } from "../index.js";

export class Player{
  constructor(){

    this.velocity = {
      x:0,
      y:0
    };
    const image = new Image();
    image.src = 'images/humanSpaceShip.png';

    image.onload = ()=>{
      const scale = 0.04;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: canvas.width/2 -this.width/2,
        y: canvas.height - this.height - 5
      };
    }

  }

  draw(){
      c.drawImage(
        this.image, 
        this.position.x, 
        this.position.y, 
        this.width, 
        this.height);
      
    }
  
    update(){
      if(this.image){
        this.draw();
        this.position.x += this.velocity.x;
      }
    }
} 
