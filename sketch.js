var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var ground,background, backgroundImage, score;

function preload(){
 playerImage = loadImage("images/player.png");
  
  backgroundImage = loadImage("images/background.jpg");
  
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");
  obstacle5 = loadImage("images/obstacle5.png");
  obstacle6 = loadImage("images/obstacle6.png");

  restartImage = loadImage("images/reset.png");
}

function setup() {
  createCanvas(600, 200);

  ground = createSprite(200,200,800,20);
  ground.x = ground.width /2;
  
  player = createSprite(200,120,50,50);
  player.addImage(playerImage);
  player.scale = 0.1;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  restart = createSprite(300,100,50,50);
  restart.addImage(restartImage);
  restart.scale = 0.3;
  
  score = 0;
  
  player.setCollider("rectangle",0,0,player.width,player.height);
  player.debug = true;
}

function draw() {
  background(backgroundImage);
  
  //displaying score
  text("Score: "+ score, 500,50);
  console.log(player.y);
  
  if(gameState === PLAY){

    restart.visible = false;

    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&&player.y > 100){
        player.velocityY = -12;
    }
    
    //add gravity
    player.velocityY = player.velocityY + 0.8;
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
      
    }
  }
   else if (gameState === END) {
    
    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();
    }

      ground.velocityX = 0;
      player.velocityY = 0
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    
   }
  player.collide(ground);
  drawSprites();
}


function reset(){
  gameState = PLAY;
  score = 0;
  obstaclesGroup.destroyEach();
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }        
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}
