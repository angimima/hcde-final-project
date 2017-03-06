/* Created by Angela Rosette-Tavares and Jessica Bao
Program accesses the webcam on the users computer and creates a display feed from it. It loads costume 
images that the user can click on to drag and drop on the video feed. The user can then save a snapshot of the screen or 
reset the costume items back to their original starting point.
Consulted Daniel Shiffman Coding Train videos on YouTube for how to create array of objects.
Googled for how to use MousePressed/Released to move objects.
last edited on 3/5/2017 at 5:39pm
*/

var capture; // variable for enabling the computer camera
var vidX = 0; // variable for placing the vidoe screen in the center of the screen
var costumeObjectArray = []; // making an array for the costume images
var isCanvasHidden = 'hide';  // hide the canvas initally 
var imgFilter = 0; // the default filter is fist element from the set below 
var filters = ['gray', 'invert', 'opaque', 'posterize', 'dilate'] // differnt available filters

// Function to hide the onboarding and show canvas 
var startCamera = function() {
  isCanvasHidden = '' // remove the hide class 
  onboarding = document.querySelector('.onboarding') // Get the onboarding screen 
  onboarding.className = 'hide';  // Hide the onboarding screen 
}

// loading all the array images before the program so they are ready
// starting points are currently on the video feed - will change those to be on the sides to start. Just wanted to get this working for now
function preload() {
  costumeObjectArray[0] = new CostumeObject(280, 380, "assets/lips.png");
  costumeObjectArray[1] = new CostumeObject(260, 350, "assets/moustache.png");
  costumeObjectArray[2] = new CostumeObject(230, 360, "assets/beard.png");
  costumeObjectArray[3] = new CostumeObject(230, 215, "assets/glasses.png");
  costumeObjectArray[4] = new CostumeObject(175, 70, "assets/hair.png");
  costumeObjectArray[5] = new CostumeObject(235, 5, "assets/hat.png");
}

// create a large canvas with a video feed that is smaller than the canvas size
// not really sure what capture.hide does but it was in the book source code
function setup() {
  canvas = createCanvas(700, 585);
  canvas.parent('container') // Add the canvas to the container 
  canvas.class(isCanvasHidden); // by defualt the canvas is hidden 
  capture = createCapture(VIDEO);
  capture.size(700, 585);
  // capture.hide();

  canvas.mouseClicked(canvasPressed); // Add the mouse click event handler 
  
  btn = createElement('button', 'Save as image'); // Add the save butotn 
  btn.position(550, 570);
  btn.hide(); // Hide the button by default 
  btn.mouseClicked(downloadImage);  // Att the event handler 

}

// function helps to download the canvas image 
function downloadImage() {
  saveCanvas(canvas, 'canvas', 'jpg');
}

// funciton to change the filter when clicked on the canvas 
function canvasPressed() {
  if (mouseButton == LEFT) { // Change the filter only on the left button
    ++imgFilter; // Goto the next filter 
    imgFilter = imgFilter % filters.length; // make sure that the filter number is always between 0 and 4
  }
}

// place the video screen in the center and loop through the array of objects to add them to the screen
function draw() {
  canvas.class(isCanvasHidden);
  background(255);
  
  if(isCanvasHidden == '') { // if the canvas is not hidden then show the button 
    btn.show();
  }
  
  image(capture, vidX, 0, 700, 585);
  filter(filters[imgFilter], 2);// creates the filter
  
// for every object in the array draw the image and place it in its designated x and y spots
  for (i = 0; i < costumeObjectArray.length; i++) {
    image(costumeObjectArray[i].img, costumeObjectArray[i].x, costumeObjectArray[i].y);
  }
}


// make a generic function that sets the starting x and y coordinates for each image 
function CostumeObject(xParam, yParam, imgFileNameParam) {
   this.xHome = xParam; // starting x value for costume item for reset
   this.yHome = yParam; // starting y value for costume item for reset
   this.x = xParam; // actual x value of object, will be dynamic
   this.y = yParam; // actual y value of object, will be dynamic
   this.imgFileName = imgFileNameParam; // name of image file to load
   this.img = loadImage(this.imgFileName); // load the image
}