/*
  Game idea: create a line; player can switch back and forth between above the line
            and below the line. there will be coins player needs to collect but also 
            need to watch out for enemies; maybe add color restriction too
*/
 

title = "cool game";

description = `
[TAP] to be cool
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
]; //for custom sprties 6x6

options = {
  theme: "pixel"
};

/** @type {Vector[]} */
let coins;
let nextCoinDist;

function update() {
  //init --> anything u want to happen before update?
  if (!ticks) {
    coins = [];
    nextCoinDist = 0;

  }
  //most of game happens after
  color("red")
  // rect(15, 15, 25, 10);

  char("a", 30, 30)

  color("yellow")
  char("b", 50, 10)

  color("cyan");
  rect(0, 50, 100, 2);

}



