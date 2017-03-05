var capture;
var vidX = 150;
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;

function preload() {
  img1 = loadImage("assets/lips.png");
  img2 = loadImage("assets/moustache.png");
  img3 = loadImage("assets/beard.png");
  img4 = loadImage("assets/glasses.png");  
  img5 = loadImage("assets/hair.png");
  img6 = loadImage("assets/hat.png");
}

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

//for testing costume item placement
//  fill(160);
//  rect(150, 0, 700, 575);
  image(img1, 430, 380);
  image(img2, 410, 350);
  image(img3, 380, 360); 
  image(img4, 380, 215);   
  image(img5, 325, 70); 
  image(img6, 380, 5); 
}
