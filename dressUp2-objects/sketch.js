/* Created by Angela Rosette-Tavares and Jessica Bao
Program accesses the webcam on the users computer and creates a display feed from it. It loads costume 
images that the user can click on to drag and drop on the video feed. The user can then save a snapshot of the screen or 
reset the costume items back to their original starting point.
Consulted Daniel Shiffman Coding Train videos on YouTube for how to create array of objects.
Googled for how to use MousePressed/Released to move objects.
last edited on 3/4/2017 at 10:58pm
*/

var capture; // variable for enabling the computer camera
var vidX = 150; // variable for placing the vidoe screen in the center of the screen
var costumeObjectArray = []; // making an array for the costume images

// loading all the array images before the program so they are ready
// starting points are currently on the video feed - will change those to be on the sides to start. Just wanted to get this working for now
function preload() {
  costumeObjectArray[0] = new CostumeObject(430, 380, "assets/lips.png");
  costumeObjectArray[1] = new CostumeObject(410, 350, "assets/moustache.png");
  costumeObjectArray[2] = new CostumeObject(380, 360, "assets/beard.png");
  costumeObjectArray[3] = new CostumeObject(380, 215, "assets/glasses.png");
  costumeObjectArray[4] = new CostumeObject(325, 70, "assets/hair.png");
  costumeObjectArray[5] = new CostumeObject(385, 5, "assets/hat.png");
}

// create a large canvas with a video feed that is smaller than the canvas size
// not really sure what capture.hide does but it was in the book source code
function setup() {
  createCanvas(1000, 625);
  capture = createCapture(VIDEO);
  capture.size(700, 585);
  capture.hide();
}

// place the video screen in the center and loop through the array of objects to add them to the screen
function draw() {
  background(255);
  image(capture, vidX, 0, 700, 585);
  filter(GRAY);// creates the filter
  
// for every object in the array draw the image and place it in its designated x and y spots
  for (i = 0; i < costumeObjectArray.length; i++) {
    image(costumeObjectArray[i].img, costumeObjectArray[i].x, costumeObjectArray[i].y);
  }
}

  // if (keyIsPressed === true) {
  //   image(capture, vidX, 0, 700, 585);
  //   filter(GRAY);
  // } else {
  //   filter(OPAQUE);
  // }

// make a generic function that sets the starting x and y coordinates for each image 
function CostumeObject(xParam, yParam, imgFileNameParam) {
   this.xHome = xParam; // starting x value for costume item for reset
   this.yHome = yParam; // starting y value for costume item for reset
   this.x = xParam; // actual x value of object, will be dynamic
   this.y = yParam; // actual y value of object, will be dynamic
   this.imgFileName = imgFileNameParam; // name of image file to load
   this.img = loadImage(this.imgFileName); // load the image
}