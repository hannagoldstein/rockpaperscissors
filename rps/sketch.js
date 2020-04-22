// Teachable Machine
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
// https://editor.p5js.org/codingtrain/sketches/PoZXqbu4v

// The video
let video;
// For displaying the label
let label = "loading...";
// The classifier
let classifier;
let pointsOpponent = 0
let pointsPlayer = 0
let counter = 0;

let playerMove = '';
let opponentMove = '';

let moves = ['Rock', 'Paper', 'Scissors'];

let scoreChange = '';

const emoji = {
  rock: '✊',
  paper: '🖐',
  scissor: '✌️',
  opponent: '👤',
  player: '🙋‍♀️',
};

let modelURL = 'https://teachablemachine.withgoogle.com/models/KixgvLb8C/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  rock = loadImage('rock.png')
  paper = loadImage('paper.png')
  scissors = loadImage ('scissors.png')
  black = loadImage ('black.jpg')
}

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  
opponentMove = random(moves);
    print(opponentMove);
   

  // STEP 2: Start classifying
  classifyVideo();
}
  
// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}




// if ((opponentMove == "Rock" && label == "Paper") ||
    //  (opponentMove == "Paper" && label == "Scissors") ||
    //  (opponentMove == "Scissors" && label == "Rock")) { // win
   //   scoreChange = `${emoji.player}+1`;
   //   pointsPlayer += 1;
  //  } else if (opponentMove == label && label == "Neutral") { // tie
  //    scoreChange = '±0';
  //  } else { // loose
  //    scoreChange = `${emoji.opponent}+1`;
   //   pointsOpponent += 1;
 //   }

function draw() {
  background(0);
  // Draw the video
  image(video, 320, 0);
   fill(255, 0, 255);
  if (playerMove != '') rect(0, 0, map(counter, 0, 10, 0, width), 12);
  fill(255);
  
  // STEP 4: Draw the label
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(255);
  

  
  
  text(label, 470, height - 20);
  text(opponentMove, 160, 500);
  
 
  if (opponentMove == "Rock") {
    image(rock, 50,150, width / 3, height / 3)
  } else if (opponentMove == "Paper") {
    image(paper, 35, 150, width / 2.5, height / 2.5)
  } else if (opponentMove == "Scissors") {
    image(scissors, 45, 170, width / 3, height / 4)
  }
  

  if (label == "Rock") {
    image(rock, 375,150, width / 3, height / 3)
  } else if (label == "Paper") {
    image(paper, 355, 150, width / 2.5, height / 2.5)
  } else if (label == "Scissors") {
    image(scissors, 380, 170, width / 3, height / 4)
  } else if (label == "Neutral") {
    image(black, 0, 0, width / 2, height )
  } else if (label == "loading...") {
    image(black, 0, 0, width / 2, height )
  }

  if (opponentMove == '' && label == "Neutral") {
    scoreChange = '±0';
    noLoop();
  } else if (opponentMove == label) {
    scoreChange = '±0';
    noLoop();
  } else if (opponentMove == "Rock" && label == "Paper") {
    scoreChange = `${emoji.player}+1`;
    pointsPlayer += 1;
    noLoop();
  } else if (opponentMove == "Scissors" && label == "Rock") {
    scoreChange = `${emoji.player}+1`;
    pointsPlayer += 1;
    noLoop();
  } else if (opponentMove == "Paper" && label == "Scissors") {
    scoreChange = `${emoji.player}+1`;
    pointsPlayer += 1;
    noLoop();
  } else if (label == "Rock" && opponentMove == "Paper") {
    scoreChange = `${emoji.opponent}+1`;
    pointsOpponent += 1;
    noLoop();
  } else if (label == "Scissors" && opponentMove == "Rock") {
    scoreChange = `${emoji.opponent}+1`;
    pointsOpponent += 1;
    noLoop();
  } else if (label == "Paper" && opponentMove == "Scissors") {
    scoreChange = `${emoji.opponent}+1`;
    pointsOpponent += 1;
    noLoop();
  } 

  textSize(24);
  text(`${emoji.opponent} ${pointsOpponent} : ${pointsPlayer} ${emoji.player}`, 320, 30);
  fill(255);
}
  // Draw the emoji

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  classifyVideo();
}
