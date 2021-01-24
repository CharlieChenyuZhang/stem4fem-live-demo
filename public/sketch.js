let classifier;
let canvas;
let label;
let confidence;
let defaultBackgroundColor = 150;

function preload() {
  classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
  canvas = createCanvas(300, 300);
  background(defaultBackgroundColor);

  canvas.mouseReleased(classifyCanvas);

  let button = createButton("Clear Canvas");
  button.position(7, 370);
  button.mousePressed(clearCanvas);
  label = createDiv("Label: ...");
  confidence = createDiv("Confidence: ...");
}

function draw() {
  strokeWeight(15);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY); // NOTE: mouseIsPressed pmousX etc. are system variables from P5.js
  }
}

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);

  label.html("Label: " + results[0].label);
  confidence.html("Confidence: " + nf(results[0].confidence, 0, 2)); // Round the confidence to 0.01
}

function clearCanvas() {
  background(defaultBackgroundColor);
  label.html("Label: ");
  confidence.html("Confidence: ");
}
