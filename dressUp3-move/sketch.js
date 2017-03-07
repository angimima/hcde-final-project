/* Created by Angela Rosette-Tavares and Jessica Bao
Program accesses the webcam on the users computer and creates a display feed from it. It loads costume 
images that the user can click on to drag and drop on the video feed. The user can then save a snapshot of the screen or 
reset the costume items back to their original starting point.
Consulted Daniel Shiffman Coding Train videos on YouTube for how to create array of objects.
Googled for how to use MousePressed/Released to move objects.
last edited on 3/6/2017 at 3:02pm
*/

var capture; // variable for enabling the computer camera
var vidX = 150; // variable for placing the vidoe screen in the center of the screen
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

// loading all the array images onto the sides of the video feed before the program so they are ready to use
// loading smallest to largest
function preload() {
  costumeObjectArray[0] = new CostumeObject(780, 300, 100, 70, "assets/lips.png");
  costumeObjectArray[1] = new CostumeObject(780, 150, 150, 43, "assets/moustache.png");
  costumeObjectArray[2] = new CostumeObject(780, 400, 200, 139, "assets/beard.png");
  costumeObjectArray[3] = new CostumeObject(780, 10, 200, 100, "assets/glasses.png");
  costumeObjectArray[4] = new CostumeObject(25, 5, 210, 167, "assets/hat.png");
  costumeObjectArray[5] = new CostumeObject(5, 170, 325, 449, "assets/hair.png");
}

function setup() {
  canvas = createCanvas(1200, 625);
  canvas.parent('container') // Add the canvas to the container 
  canvas.class(isCanvasHidden); // by defualt the canvas is hidden 
  capture = createCapture(VIDEO);
  capture.size(1000, 585);

  canvas.mouseClicked(canvasPressed); // Add the mouse click event handler 
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

function draw() {
  canvas.class(isCanvasHidden);
  background(160); // gray background color
  image(capture, vidX, 0, 700, 550); // place the video screen in the center
  filter(filters[imgFilter], 2);// creates the filter
  fill(160); // gray rectangle color
  noStroke(); // eliminate stroke from reset text
  rect(0, 0, 300, window.height); // rectangle block on side of video feed
  rect(750, 0, 300, window.height); // rectangle block on side of video feed
  // for every object in the array draw the image and place it in its designated x and y spots
  for (i = 0; i < costumeObjectArray.length; i++) { // loops through each costume object
    costumeObjectArray[i].move(mouseX, mouseY); // tells costume object to move itself if it needs to 
    image(costumeObjectArray[i].img, costumeObjectArray[i].x, costumeObjectArray[i].y); // draw the costume object at the new coordinates
  }
  button(); // reset function called
}

// This is a costume object which represents an item that can be dragged over the video. It owns
// its position, right left, image and has methods for telling if the object should move, actually
// moving the object and resetting the position.
function CostumeObject(xParam, yParam, widthParam, heightParam, imgFileNameParam) { // constructor for a generic object that represents any object that can be used
  this.xHome = xParam; // Starting x value for costume, this is also cached to be default if it is reset
  this.yHome = yParam; // Starting y value for costume, this is also cached to be default if it is reset
  this.x = xParam; // active x value
  this.y = yParam; // active y value
  this.imgFileName = imgFileNameParam; // name of image file to load
  this.img = loadImage(this.imgFileName); // load the image
  this.width = widthParam; // width of image
  this.height = heightParam; // height of image
  this.right = this.x + widthParam; // sets the x value of the right side of the costume object based on objects size
  this.bottom = this.y + heightParam; // sets the bottom value of the costume object based on objects size
  this.moveState = false; // set default of not moving object at this time
  
  // resets the position of the object to the original values
  this.reset = function() {
    this.x = this.xHome; // original value of x
    this.y = this.yHome; // original value of y
    this.right = this.x + this.width; // original right value
    this.bottom = this.y + this.height // original bottom value
   }
   
   // this is called every frame to see if object is currently being moved
  this.move = function(xParam, yParam) { 
   if (this.moveState) { // if it is being moved
     this.x = xParam; // set x value to new x value being passed in 
     this.y = yParam; // set y value to new y value being passed in
     this.right = this.x + this.width; // adjust right position accordingly
     this.bottom = this.y + this.height // adjust bottom position accordingly
   }  
  }
   
//  Tests to see if the passed in coordinates are within the object. Sets an object variable so that the object
//  knows it is being moved. This is used for telling if the user clicked within the boundaries of the image.
   this.enterMoveState = function(xParam, yParam) {
    if ((xParam > this.x) && (xParam < this.right) && (yParam > this.y) && (yParam < this.bottom)) { // do the coordiantes being passed in fall within boundaries of object
      this.moveState = true; // if it does then put object into move state
      return true; // return true if object is entering move state
    } 
    return false; // return false if object is not
   }
   this.exitMoveState = function() { // called when mouse is released
    this.moveState = false; // take object out of move state
   }
} // End of CostumeObject function

// determines if mouse is pressed 
function mousePressed() {
  for (i = 0; i < costumeObjectArray.length; i++) { // asks every object if it is entering move state
    if (costumeObjectArray[i].enterMoveState(mouseX, mouseY)) { // if object enters move state exit the function in order to not move 2 objects at once
      return;
    }
  }
}

// controls what happens when the user releases the mouse on an item or when they click reset text 
function mouseReleased() {
  for (i = 0; i < costumeObjectArray.length; i++) { // loops through the objects
    costumeObjectArray[i].exitMoveState(); // if mouse is released it stops moving the items
  }
  if (mouseX > 350 && mouseX < 500 && mouseY > 500 && mouseY < 700) { // determines if the user clicked the reset text
    for (i = 0; i < costumeObjectArray.length; i++) { // if mouse is pressed and released within text area it loops through all items
      costumeObjectArray[i].reset(); // and postions them back at their original x y coordinates
    }
  }
}

// Creates clickable text that says reset. The actual function to move objects is in CostumeObject function
function button() {
  fill(255); // color of text
  textSize(40); // text size
  text("Reset", 350, 600); // text and location
}