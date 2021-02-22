var spaceship, opponent, space, gameover
var spaceshipImg, opponentImg, spaceshipImg, gameoverImg, spaceship2Img

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  spaceImg = loadImage("images/Space.jpg");
  spaceshipImg = loadImage("images/spaceship.png");
  opponentImg = loadImage("images/alien2.png");
  gameoverImg = loadImage("images/gameover.png");
  spaceship2Img = loadImage("images/ship2.png");
  console.log(spaceship2Img);
}

function setup(){

  createCanvas(500,300);

  space=createSprite(250,150,500,150);
  space.addImage(spaceImg);
  space.velocityX = -1;
  space.x=space.width/2

  spaceship  = createSprite(70,150);
  spaceship.addImage(spaceship2Img);
  spaceship.scale=0.07;
    
  gameover = createSprite(250,150);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.4;
  gameover.visible = false;  
    
  opponentG = new Group();
    
  }

  function draw() {
    background(0);
    
    drawSprites();
    textSize(20);
    fill(255);
    text("Distance: "+ distance,900,30);
    
    if(gameState===PLAY){
      
     distance = distance + Math.round(getFrameRate()/50);
     space.velocityX = -(6 + 2*distance/150);
    
     spaceship.y = World.mouseY;
    
     edges= createEdgeSprites();
     spaceship.collide(edges);
    
    if(space.x < 150 ){
      space.x = space.width/2;
    }

    //if (World.frameCount % 50 == 0) {
      //if (select_oppPlayer == 1) {
        //opponents();
      //}
    
  
     //creating continous opponent players
 // var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 50 == 0) {
   // if (select_oppPlayer == 1) {
      opponents();
  }
  
  if(opponentG.isTouching(spaceship)){
    gameState = END;
    spaceship.velocityY = 0;
   }
  }else if (gameState === END) {
    gameover.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    space.velocityX = 0;
    spaceship.velocityY = 0;
    spaceship.addImage(spaceship2Img);
  
    opponentG.setVelocityXEach(0);
    opponentG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}

    
    }


  function opponents(){
    opponent = createSprite(1100,Math.round(random(50, 250)));
    opponent.scale =0.06;
    opponent.velocityX = -(6 + 2*distance/150);
    opponent.addImage(opponentImg);
    opponent.setLifetime=170;
    opponentG.add(opponent);
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  spaceship.addImage(spaceship2Img);
  
  opponentG.destroyEach();
  
  distance = 0;
}