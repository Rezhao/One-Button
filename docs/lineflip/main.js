//game title
title = "LINE FLIP"; 

//instructions
description = ` 
[TAP] to 
flip sides
`;

//character designs
characters = [
  `
lllll
ll ll
llllll
lllll
lllll
l   l
`,
  `
 llll
ll lll
ll lll
ll lll
ll lll
 llll
`,
`
  l
 lll
lllll
 lll
  l
`,
]; //for custom sprties 6x6

//setting background and music
options = {
  theme: "pixel",
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 11
};

//defining variables
/** @type {Vector[]} */
let coins; //vector of coins to collect
let nextCoinDist; //distance between coins
let enemies; //vector of enemies to avoid

//how much items shift by each frame/to make them slide across the screen
let scr;

//player variables
let player;
let playerFlip;
let playerY;
const playerX = 10;

let coinCounter; //used for increasing speed each time you collect 3 coins

function update() {
  //init --> anything you want to happen before update
  //setting default parameters
  if (!ticks) {
    coins = [vec(100, 46)];
    nextCoinDist = 5; 
    enemies = [];
    scr = 0.25;
    playerFlip = 1;
    playerY = 47;
    coinCounter = 0;
  }

  //creating character and making it green
  color("green");
  player = char("a", playerX, playerY, {
    // @ts-ignore
    mirror: { y: playerFlip },
  });

  //creating yellow coins and removing it when player and coins collide
  color("yellow")
  remove(coins, (c) => {
    c.x -= scr; //moves coins across the screen by scr amount each frame

    const isCoin = char("b", c).isColliding.char; //creates colliding coin
    if(isCoin.a || isCoin.b){ //checks if the coin collided
      coinCounter++;
      if(coinCounter == 3){ //increase speed for every 3 coins collected
        scr += 0.05;
        coinCounter = 0;
      }
      play("coin"); //play coin sound
      addScore(1); //update score
      return true;
    }
    
  });

  //creating red enemies and ending the game when player collides with enemy
  color("red")
  remove(enemies, (e) => {
    e.x -= scr; //moves enemy by scr amount each frame
    const isEnemy = char("c", e).isColliding.char; //creating colliding enemy
    if(isEnemy.a || isEnemy.b){ //check if enemy collided with player
      play("powerUp"); //play sound
      end(); //end the game
      return true;
    }
  });

  //updating coin distance
  nextCoinDist += scr;
  while (nextCoinDist > 0){ 
    //randomly pushing coins and enemies to appear in each row
    if(Math.random() < 0.5 ? true : false){
      coins.push(vec(102 + nextCoinDist, Math.random() < 0.5 ? 46 : 56)); //pushes coin randomly to top or bottom row
    } else {
      enemies.push(vec(102 + nextCoinDist, Math.random() < 0.5 ? 46 : 56)); //pushes enemy randomly to top or bottom row
    }
    nextCoinDist -= rnd(20, 30); //updating coin distance to random value
  }

  //draws blue line/platform
  color("cyan");
  rect(0, 50, 100, 2);

  //checking for user input
  if(input.isJustPressed){
    //if pressed, switch the player to top or bottom of the line
    if(playerY == 47){
      playerY = 55;
    } else {
      playerY = 47;
    }
    playerFlip = -playerFlip; //used to mirror the character image when flipped
  }
}


