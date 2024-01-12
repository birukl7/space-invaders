// import {Player} from "./scripts/Player.js";
const canvas = document.querySelector('canvas');


export const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// c.fillStyle = 'red'
// c.fillRect(12,12,100,199);


class Player{
  constructor(){
    this.velocity = {
      x:0,
      y:0
    };
    const image = new Image();
    image.src = 'images/humanSpaceShip.png';

    image.onload = ()=>{
      const scale = 0.05;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: canvas.width/2 -this.width/2,
        y: canvas.height - this.height - 5
      };
    }
    this.opacity = 1

  };

  draw(){
  //  c.fillStyle = "red";
  //  c.fillRect(this.position.x, this.position.y, this.width, this.height); 
      c.save()
      c.globalAlpha = this.opacity;
      c.drawImage(
        this.image, 
        this.position.x, 
        this.position.y, 
        this.width, 
        this.height);
        c.restore()
  }

  update(){
    if(this.image){
      this.draw();
      this.position.x += this.velocity.x;
    }
  }
}

class Bullet{
  constructor({position, velocity}){
    this.position = position
    this.velocity = velocity
    this.radius = 4
  }
  draw(){
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius,0, Math.PI * 2)
    c.fillStyle = "red"
    c.fill()
    c.closePath()
  }
  update(){
    this.draw();
    this.position.x +=this.velocity.x;
    this.position.y +=this.velocity.y;
  }
}


class Partiicles{
  constructor({position, velocity, radius, color, fades}){
    this.position = position
    this.velocity = velocity
    this.radius = radius
    this.color = color
    this.opacity = 1
    this.fades = fades
  }
  draw(){
    c.save()
    c.globalAlpha = this.opacity
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius,0, Math.PI * 2)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }
  update(){
    this.draw();
    this.position.x +=this.velocity.x;
    this.position.y +=this.velocity.y;
    if(this.fades)
    this.opacity -= 0.01;
  }
}


class AlienBullet{
  constructor({position, velocity}){
    this.position = position
    this.velocity = velocity
    this.width =4 
    this.height=7
 
  }
  draw(){
    c.fillStyle = "white"
    c.fillRect(this.position.x, this.position.y, this.width, this.height); 
  
  }
  update(){
    this.draw();
    this.position.x +=this.velocity.x;
    this.position.y +=this.velocity.y;
  }
}



class Invader{
  constructor( {position} ){
    this.velocity = {
      x:0,
      y:0
    };
    const image = new Image();
    image.src = 'images/alienSpaceShip.png';

    image.onload = ()=>{
      const scale = 0.019;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: position.x,
        y: position.y
      };
    }

  };

  draw(){
  //  c.fillStyle = "red";
  //  c.fillRect(this.position.x, this.position.y, this.width, this.height); 
    
    c.drawImage(
      this.image, 
      this.position.x, 
      this.position.y, 
      this.width, 
      this.height);
    
  }

  update({velocity}){
    if(this.image){
      this.draw();
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }

  shoot(invaderBullets){
    if(this.position){
      invaderBullets.push(new AlienBullet({
        position: {
          x: this.position.x + this.width/2,
          y: this.position.y + this.height
        },
        velocity: {
          x: 0,
          y: 2
        }
      }));
    }
  }
}



class InvaderContainer{
  constructor(){
    this.position = {
      x: 0,
      y: 0
    }  

    this.velocity = {
      x: 5,
      y: 0
    }
    
    this.invaders = [];
    const column = Math.ceil(Math.random()*9 + 3);
    const row = Math.ceil(Math.random()*8 + 3);

    this.width = column * 45;
    this.height = row * 45;

    for(let i=0; i<column; i++){
      for(let j=0; j<row; j++){
        this.invaders.push(new Invader({
          position:{
            x: i * 45,
            y: j * 45
          }
        }));
      }
    }
  }

  update(){
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.y =0;
    if(this.position.x <= 0 || this.position.x + this.width >= canvas.width){
      this.velocity.x = -this.velocity.x;
      this.velocity.y += 40;
    }
  }
}


const player = new Player();
const invContainerArray = [new InvaderContainer()]
const bullets = [];
const invaderBullets = [];
const particles = []
// const invContainer = new InvaderContainer();
const isKeyPressed = {
  a : {
    pressed: false
  },
  d : {
    pressed: false
  },
  space:{
    pressed: false
  }

}

let randomRaining = 0;
let randomNum = Math.ceil(Math.random()*500 + 400)
const game = {
  over: false,
  isActive: true
};


//stars
for(let i=0; i<100; i++){ 
  particles.push(new Partiicles({
    position: {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
    },
    velocity : {
      x: 0.1,
      y: 0.2
    }, 
    radius: Math.random() * 2,
    color: "white" 
  }));
}


function createParticle({invader, color, radius, fades}){
  for(let i=0; i<15; i++){ 
    particles.push(new Partiicles({
      position: {
        x: invader.position.x + invader.width / 2,
        y: invader.position.y + invader.height /2
      },
      velocity : {
        x: Math.random(),
        y: Math.random()
      }, 
      radius: radius ||Math.random() * 2,
      color: color || "green" ,
      fades: true
    }));
  }
}

const animate = ()=>{
  if(!game.isActive){
    return;
  }
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();

  particles.forEach((particle, i)=>{

    if(particle.position.y - particle.radius >= canvas.height){
      particle.position.x = Math.random() * canvas.width;
      particle.position.y = -particle.radius
    }

    if(particle.opacity <= 0){
      setTimeout(()=>{
        particles.splice(i, 1);
      }, 0);
    } else {
      particle.update();
    }
  });

  // console.log(particles);

  invaderBullets.forEach((alienBullet, index)=>{
    if(alienBullet.position.y + alienBullet.height >= canvas.height){
      setTimeout(()=>{
        invaderBullets.splice(index, 1);
      }, 0);
    } else {
      alienBullet.update();
    }
 
    //projectile hits player
    if(
      alienBullet.position.y + alienBullet.height >= player.position.y &&
      alienBullet.position.x + alienBullet.width >= player.position.x &&
      alienBullet.position.x <= player.position.x + player.width
    ){
      setTimeout(()=>{
        invaderBullets.splice(index, 1);
        player.opacity = 0;
        game.over = true;
      }, 0);

      setTimeout(()=>{
        game.isActive = false;
      }, 2000);
      console.log("you are loser.")
      createParticle({
        invader: player, 
        color: "white",
        radius: 3 
      });
    }
  });

  bullets.forEach((element, index) => {
    if(element.position.y + element.radius <= 0){
      bullets.splice(index,1);
    } else {
      element.update();
    }
    console.log(bullets)
  });

  
  invContainerArray.forEach((grid, index)=>{
    if(grid.position.y >= canvas.height){
      setTimeout(()=>{
        invContainerArray.splice(index, 1);
      },0)
    }

    grid.update();
    if(randomRaining % 200 === 0 && grid.invaders.length > 0){
    grid.invaders[Math.floor(Math.random()*grid.invaders.length)].shoot(invaderBullets);
      console.log("hjh")
    }
    
    grid.invaders.forEach((invader, i)=>{       
      invader.update({velocity: grid.velocity})

      //
      
      // if(
      //   invader.position.y + invader.height >= player.position.y &&
      //   invader.position.x + invader.width >= player.position.x &&
      //   invader.position.x <= player.position.x + player.width
      // ){
      //   setTimeout(()=>{
      //     player.opacity = 0;
      //     game.over = true;
      //   }, 0);
  
      //   setTimeout(()=>{
      //     game.isActive = false;
      //   }, 2000);
      //   console.log("you are loser.")
      //   createParticle({
      //     invader: player, 
      //     color: "white",
      //     radius: 3 
      //   });
      //   return;
      // }
  


      bullets.forEach((bullet, j)=>{
        if( //collision detection conditions for the humanShip hitting alienSpaceShip
          bullet.position.y - bullet.radius <= invader.position.y + invader.height && 
          bullet.position.x + bullet.radius >= invader.position.x &&
          bullet.position.x - bullet.radius <= invader.position.x+invader.width && 
          bullet.position.y + bullet.radius >= invader.position.y
          ){

          setTimeout(()=>{
            const alienFound = grid.invaders.find((invader1)=>{
              return invader1 === invader;
            })
            const bulletFound = bullets.find((bullet1)=>{  
              return bullet1 === bullet;
            })
            if(alienFound && bulletFound){
              createParticle({
                invader, 
                color: "green"});


              setTimeout(()=>{
                grid.invaders.splice(i, 1);  
                bullets.splice(j,1)
              },0);

              if(grid.invaders.length >0){
                const firstInvader = grid.invaders[0];
                const lastInvader = grid.invaders[grid.invaders.length -1]; 
                grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
                grid.position.x = firstInvader.position.x;
                grid.position.y = lastInvader.position.y + lastInvader.width;

                // grid.height = lastInvader.position.y + lastInvader.height;
              }

              


            }
          }, 0);
        }
      })

      

      // setTimeout(()=>{
      //   if(grid.position.y + grid.height >= player.position.y){
      //     createParticle({
      //       invader: player, 
      //       color: "white",
      //       radius: 3 
      //     });
       
      //     player.opacity = 0;
      //     game.over = true;
    
      //   setTimeout(()=>{
      //     game.isActive = false;
      //   }, 2000);
      //   console.log("you are loser.")
      // }
      // }, 0)
      
  
    })
    // console.log(invContainerArray);
  })
 
  if(isKeyPressed.a.pressed && player.position.x >=0){
    player.velocity.x = -7;
  } else if(isKeyPressed.d.pressed && player.position.x + player.width <= canvas.width){
    player.velocity.x = 7;
  }  else {
    player.velocity.x = 0;
  }

  // raining the different invContainers
  if(randomRaining % randomNum === 0 ){
    invContainerArray.push(new InvaderContainer());
    randomNum = Math.ceil(Math.random()*500 + 400);
    randomRaining = 0;
  }
  randomRaining++;
}
animate();

window.addEventListener('keydown', (event)=>{
  if(game.over){
    return;
  }
  const theKey = event.key.toLowerCase();
  switch(theKey){
    case 'a':
      console.log('left')
      isKeyPressed.a.pressed = true;
      break;
    case 'd':
      isKeyPressed.d.pressed = true;
      break;
    case ' ':
      console.log("space")
      bullets.push(new Bullet({
        position:{
          x: player.position.x + player.width/2,
          y: player.position.y
        },
        velocity:{
          x: 0,
          y: -10
        }
      }))
      isKeyPressed.space.pressed = true;
      break;
  }
});

window.addEventListener('keyup', (event)=>{
  const theKey = event.key.toLowerCase();
  switch(theKey){
    case 'a':
      console.log("Left")
      isKeyPressed.a.pressed = false;
      break;
    case 'd':
      console.log("right")
      isKeyPressed.d.pressed = false;
      break;
    case ' ':
      isKeyPressed.space.pressed = false;
      break;
  }
});

