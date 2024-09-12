let song;
let fft;
let lyrics;// lyrics.txt
let lyricIndex = 0;
let volumeData; // volumes.csv
let currentIndex = 0;

function preload() {
  song = loadSound('The 1975 - I Like America & America Likes Me.mp3');
  lyrics = loadStrings('lyrics.txt'); // each line is a timestamped lyric
  volumeData = loadTable('volumes.csv'); // should load the CSV file
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
  song.play();
}

function draw() {
  background(0); //black so the other colours stand out
  
 // analyze audio channels
  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass"); 
  let drums = fft.getEnergy("lowMid");
  let vocals = fft.getEnergy("mid");
  let other = fft.getEnergy("highMid");// other is highMid don't know what to name it
  
  // visual reaction based on audio channels
  drawVisuals(bass, drums, vocals, other);
  // displayLyrics(); // not sure if I want lyrics displayed might get messy
}

function drawVisuals(bass, drums, vocals, other) {
  noStroke();

  // abstract shap of "1" to react to the bass
  fill(255, 0, 0, bass); // transparent red based on bass
  drawNumberOne(width / 5, height / 2, bass);

  // Draw number "9" for drums
  fill(0, 255, 0, drums); // transparent green based on drums
  drawNumberNine((2 * width) / 5, height / 2, drums);

  // Draw number "7" for vocals
  fill(0, 0, 255, vocals); //transparent blue based on vocals
  drawNumberSeven((3 * width) / 5, height / 2, vocals);

  // Draw number "5" for other
  fill(255, 255, 0, other); // transparent yellow based on "other" - "midHigh"
  drawNumberFive((4 * width) / 5, height / 2, other);
}

function drawNumberOne(x, y, sizeFactor) {
  // draw number "1" using rectangles
  let thickness = map(sizeFactor, 0, 255, 10, 50);
  let heightFactor = map(sizeFactor, 0, 255, 50, 200);

  // vertical line
  rect(x - thickness / 2, y - heightFactor / 2, thickness, heightFactor);

  // top horizontal line
  rect(x - thickness, y - heightFactor / 2, thickness * 2, thickness / 2);
}

function drawNumberNine(x, y, sizeFactor) {
  // draw number "9" using ellipses and rectangles
  let size = map(sizeFactor, 0, 255, 30, 150);

  // upper circle
  ellipse(x, y - size / 2, size, size);

  // lower vertical line
  rect(x - size / 4, y - size / 2, size / 2, size);
}

function drawNumberSeven(x, y, sizeFactor) {
  // draw number "7" using rectangles
  let thickness = map(sizeFactor, 0, 255, 10, 50);
  let widthFactor = map(sizeFactor, 0, 255, 50, 200);

  // top horizontal line
  rect(x - widthFactor / 2, y - widthFactor / 2, widthFactor, thickness);

  // diagonal line
  beginShape();
  vertex(x - widthFactor / 2, y - widthFactor / 2);
  vertex(x + widthFactor / 2, y - widthFactor / 2);
  vertex(x, y + widthFactor / 2);
  endShape(CLOSE);
}

function drawNumberFive(x, y, sizeFactor) {
  // draw number "5" using rectangles and ellipses
  let size = map(sizeFactor, 0, 255, 30, 150);
  let thickness = map(sizeFactor, 0, 255, 10, 50);

  // top horizontal line
  rect(x - size / 2, y - size / 2, size, thickness);

  // vertical line
  rect(x - size / 2, y - size / 2, thickness, size / 2);

  // bottom half-circle
  arc(x, y + size / 4, size, size / 2, 0, PI);
}

function displayLyrics() {
  let currentTime = song.currentTime();
  if (lyricIndex < lyrics.length && currentTime > getTimeForLyric(lyricIndex)) {
    // Display current lyric line
    textAlign(CENTER, CENTER);
    fill(255);  // not going to display lyircs 
    textSize(32);
    text(lyrics[lyricIndex], width / 2, height - 100);

    lyricIndex++; 
  }
}


function getTimeForLyric(index) {
  // function to map lyric index to the time in the song
  // lyrics are timestamped 
  return parseFloat(lyrics[index].split('lyrics.txt')[80]); //  lyrics start with a timestamp
}

// to pause or play the song when the mouse is pressed
function mousePressed() { // press mouse 2 times at first so it plays
  if (song.isPlaying()) {
    song.pause(); // pause the song
  } else {
    song.play(); // play the song
  }

}







