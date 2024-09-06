// minimum and maximum points for firework 0
let fireworkMinPoint0 = 40;
let fireworkMaxPoint0 = 150;

// minimum and maximum points for firework 1
let fireworkMinPoint1 = 20;
let fireworkMaxPoint1 = 50;


// minimum and maximum points for firework 2
let fireworkMinPoint2 = 50;
let fireworkMaxPoint2 = 250;


// the maximum point of each firework, in order from 0, 1, 2, ... , and so on
// start off the array with the minimum points so that they are not showing.
const fireworksPoints = [fireworkMinPoint0, fireworkMinPoint1, fireworkMinPoint2];


// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20);
  angleMode(DEGREES);

  // this makes firework 0 grow by 1 when counter is higher than 200, 
  // and decay by 1 when the counter is higher than 400
  growOrDecayFirework(counter, 0, fireworkMinPoint0, fireworkMaxPoint0, 200, 400, 1, 1);

  // this makes firework 1 grow by 3 when counter is higher than 0, 
  // and decay by 0.5 when the counter is higher than 100
  growOrDecayFirework(counter, 1, fireworkMinPoint1, fireworkMaxPoint1, 0, 100, 3, 0.5);

  // this makes firework 2 grow by 7 when counter is higher than 50, 
  // and decay by 0.1 when the counter is higher than 250
  growOrDecayFirework(counter, 2, fireworkMinPoint2, fireworkMaxPoint2, 50, 250, 7, 0.1);

  // draws firework 0
  drawFirework(canvasWidth/2, canvasHeight/2, 8, fireworkMinPoint0, fireworksPoints[0]);


  // draws firework 1
  drawFirework(canvasWidth/4, canvasHeight/4, 5, fireworkMinPoint1, fireworksPoints[1]);


  // draws firework 2
  drawFirework(3 * canvasWidth/4, canvasHeight/4, 13, fireworkMinPoint2, fireworksPoints[2]);
}

/**
 * This function is used to make a chosen firwork grow or decay
 * 
 * counter - the counter
 * fireworkNumber - what firework you want to change
 * fireworkMinPoint - what that firework's min point is
 * fireworkMaxPoint - what that firework's max point is
 * start - when to start growing
 * stop - when to stop growing
 * growthAmount - how much to grow by
 * decayAmount - how much to decay by
 */
function growOrDecayFirework(counter, fireworkNumber, fireworkMinPoint, fireworkMaxPoint, start, stop, growthAmount, decayAmount) {
  // if the counter is less than start AND the counter is smaller than stop, make the firework grow by some amount
  if (counter > start && counter < stop) {
    if (fireworksPoints[fireworkNumber] < fireworkMaxPoint) { fireworksPoints[fireworkNumber] += growthAmount; }
  }

  // otherwise, make the firework decay by some amount
  else {
    if (fireworksPoints[fireworkNumber] > fireworkMinPoint) { fireworksPoints[fireworkNumber] -= decayAmount; } 
  }
}

/**
 * This function draws a firework
 * 
 * x - x position of firework
 * y - y position of firework
 * lineCount - number of lines in the firework
 * lineMinPoint - mimimum point of line
 * lineMaxPoint - maximum point of line
 */
function drawFirework(x, y, lineCount, lineMinPoint, lineMaxPoint) {
  push();

  // initial colour stuff
  noFill();
  strokeWeight(3);
  stroke(180, 255, 50);

  // translate to (x, y) for drawing and rotating
  translate(x, y);

  // for each number of lines in the firework (defined by lineCount), draw the line and rotate.
  for (let i=0; i<lineCount; i++) {
    line(0, lineMinPoint, 0, lineMaxPoint);
    rotate(360/lineCount)
  }

  pop();
}