var sliderSpace = 100;
var sliderV;
var sliderP;
var sliderT;

var boxPos;
var dim = 175;
var oldDim;
var thickness = 3;

var cel;
var btm;
var lft;
var rgt;

var particles = [];
var maxParticles = 100;
var numParticles;

var temp;
var oldTemp;

function setup() {
  var cnv = createCanvas(400, 400 + sliderSpace);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);  rectMode(CENTER);

  //Slider Volume
  sliderV = createSlider(50, 300, 175);
  sliderV.position(10 + x, height - sliderSpace + 10 + y);
  sliderV.style('width', '300px');

  //Slider Particles
  sliderP = createSlider(20, maxParticles, 60);
  sliderP.position(10 + x, height - sliderSpace / 2 - 10 + y);
  sliderP.style('width', '300px');

  //Slider Temperature
  sliderT = createSlider(20, 300, 160);
  sliderT.position(10 + x, height - sliderSpace / 3 + 3 + y);
  sliderT.style('width', '300px');

  //Create Particles
  boxPos = createVector(0, 0);
  cel = boxPos.y - dim / 2 + thickness;
  btm = boxPos.y + dim / 2 - thickness;
  lft = boxPos.x - dim / 2 + thickness;
  rgt = boxPos.x + dim / 2 - thickness;

  for (let i = 0; i < maxParticles; i++) {
    let p = new Particle();
    particles.push(p);
  }
}

function draw() {
  background(20);
  translate(width / 2, (height - sliderSpace) / 2);

  //Slider Area
  push();
  stroke(50);
  line(-width / 2, (height - sliderSpace) / 2, width / 2, (height - sliderSpace) / 2);
  pop();

  //Labels
  push();
  stroke(220);
  strokeWeight(1)
  text('Volume', 120, (height - sliderSpace) / 2 + 24);
  text('Particles', 120, height / 2 + 4);
  text('Temperature', 120, height / 2 + sliderSpace / 6 + 17);
  pop();

  //Volume
  noFill();
  stroke(100);
  strokeWeight(thickness);
  dim = sliderV.value();
  boxPos = createVector(0, 0);

  cel = boxPos.y - dim / 2 + thickness;
  btm = boxPos.y + dim / 2 - thickness;
  lft = boxPos.x - dim / 2 + thickness;
  rgt = boxPos.x + dim / 2 - thickness;

  if (oldDim != dim) {
    for (let i = 0; i < maxParticles; i++) {
      particles[i].pos.setMag(dim / 3);
    }
  }

  oldDim = dim

  //Particles
  numParticles = sliderP.value();
  for (let i = 0; i < numParticles; i++) {
    particles[i].show();
    particles[i].move();
    particles[i].bounce();
  }

  //Temperature
  temp = sliderT.value() / 100;

  if (oldTemp != temp) {
    for (let i = 0; i < maxParticles; i++) {
      particles[i].vel.setMag(temp);
    }
  }
  
  oldTemp = temp;

  //Box
  rect(boxPos.x, boxPos.y, dim, dim);
}
