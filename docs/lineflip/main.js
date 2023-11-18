title = "LINE FLIP";

description = ` 
[TAP] to 
flip sides
`;

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

options = {
  theme: "pixel",
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 6
};

/** @type {Vector[]} */
let coins;
let nextCoinDist;
let enemies;

let scr;

let player;
let playerFlip;
let playerY;
const playerX = 10;

let coinCounter;

// color("red");
// player = char("a", playerX, playerY);

function update() {
  //init --> anything u want to happen before update?
  if (!ticks) {
    coins = [vec(100, 46)];
    nextCoinDist = 5; 
    enemies = [];
    scr = 0.25;
    playerFlip = 1;
    playerY = 47;
    coinCounter = 0
    // player = { y: 10, my: 0, vy: 0, speed: 1, side: 1, state: "jump" };

  }
  //most of game happens after
  color("green");
  player = char("a", playerX, playerY, {
    // @ts-ignore
    mirror: { y: playerFlip },
  });

  color("yellow")

  // scr = 0.25;
  // coins.forEach((c) => {
  remove(coins, (c) => {
    c.x -= scr;
    // char("b", c)
    // let collectable =  Math.random() < 0.5 ? "b" : "c";

    const isCoin = char("b", c).isColliding.char;
    if(isCoin.a || isCoin.b){
      // console.log(isCoin);
      coinCounter++;
      if(coinCounter == 5){
        scr += 0.05;
        coinCounter = 0;
        // console.log(scr);
      }
      play("coin");
      addScore(1);
      return true;
    }
    
  });

  color("red")
  remove(enemies, (e) => {
    e.x -= scr;
    // char("b", c)
    // let collectable =  Math.random() < 0.5 ? "b" : "c";

    const isEnemy = char("c", e).isColliding.char;
    if(isEnemy.a || isEnemy.b){
      play("powerUp");
      end();
      return true;
    }
    
  });

  nextCoinDist += scr;
  while (nextCoinDist > 0){
    if(Math.random() < 0.5 ? true : false){
      coins.push(vec(102 + nextCoinDist, Math.random() < 0.5 ? 46 : 56));
    } else {
      enemies.push(vec(102 + nextCoinDist, Math.random() < 0.5 ? 46 : 56));
    }
    // coins.push(vec(102 + nextCoinDist, Math.random() < 0.5 ? 46 : 56));
    // enemies.push(vec(102 + nextCoinDist, Math.random() < 0.5 ? 46 : 56));
    nextCoinDist -= rnd(20, 30);
  }

  // times(9, (i) => {
  //   console.log(i);
  // });

  // color("red");
  // rect(15, 15, 25, 10);
  // char("a", 10, 47);

  // color("yellow");
  // char("b", 50, 10);

  color("cyan");
  rect(0, 50, 100, 2);

  if(input.isJustPressed){
    if(playerY == 47){
      playerY = 55;
      // player = char("a", playerX, playerY);
    } else {
      playerY = 47;
    }
    playerFlip = -playerFlip;
  }

  // remove(coins, (c) => {
  //   const isCoin = char("c", c).isColliding.char;
  //   if(isCoin.a || isCoin.b){
  //     play("coin");
  //     addScore(1);
  //     return true;
  //   }
  // });

}



