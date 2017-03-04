var capture;
var isCanvasHidden = 'hide'; 

var startCamera = function(e) {
  isCanvasHidden = ''
  onboarding = document.querySelector('.onboarding')
  onboarding.className = 'hide'; 
}

function setup() {  
  myCanvas = createCanvas(300, 400); 
  myCanvas.parent("container");
  myCanvas.class(isCanvasHidden);
  capture = createCapture(VIDEO);
}

function draw() {
  background(255);
  myCanvas.class(isCanvasHidden);
  image(capture, 0, 0, 300, 240);

}