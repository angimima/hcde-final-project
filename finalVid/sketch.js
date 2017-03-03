var capture;
var vidX = 150;

function setup() {
  createCanvas(1000, 625);
  capture = createCapture(VIDEO);
  capture.size(700, 585);
  capture.hide();
}

function draw() {
  background(255);
  image(capture, vidX, 0, 700, 585);
//  image(capture, vidX,0, 320, 480);

}