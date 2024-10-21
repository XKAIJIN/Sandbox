/***
 * 
 * For Second Edition:
 * 1. Level Difficulty
 * 2. More Games
 * 3. More CPU Players
 * 4. More Colors
 * 
If a lot of people like this, I will probably make another MINI STIX game, so feel free to give any suggestions. I was thinking of making a MINI STIX SPORTS edition or something.

To activate CPU, turn "users" to "1". Thank You for your support!!
***/
/*
Here is the complete manual for controls:

PLAYER 1:
Jump is UP
Right is RIGHT
Left is LEFT
Attack is ENTER
Fall is DOWN

PLAYER 2:
Jump is "I"
Right is "L"
Left is "J"
Attack is "N"
Fall is "K"


PLAYER 3:
Jump is "W"
Right is "D"
Left is "A"
Attack is "Z"
Fall is "S"

PLAYER 4:
Jump is (NUMBER PAD) 8
Right is (NUMBER PAD) 6
Left is (NUMBER PAD) 4
Attack is (NUMBER PAD) 0
Fall is (NUMBER PAD) 5

***/








var battleTimer = 0;
var morePlayers = true;
var lessPlayers = true;
var buttonTimer = 0;
var oneWon = false;
var gameToPlay = "";
var winAlpha = 255;
var canWin = [true, true, true, true];
var numberOfPlayers = 1;
var font = createFont("AR Christy");
var mono = createFont("monoSpace");
textFont(font);
textAlign(CENTER, CENTER);
var gameState = "mainMenu";
var scaleAmount = 1.3;
var ballsTaken = [];
var ballsX = [];
var ballsY = [];
var ballsTimer = [];
var blocksRed = [];
var blocksGreen = [];
var blocksBlue = [];
var blocksX = [];
var blocksY = [];
var blocksRotate = [];
var blocksLength = [];
var numberOfBalls = 8;
var numberOfBlocks = 24;
var gameStartTimer = false;
var gameTimer = 180;
var updateBlocks = true;
var updateBalls = true;
var updatePlayers = true;
var rotateTimer = 0;
var rotateUp = true;
var friction = 0.1;
var drawDefeatedPerson = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-23, 10, 8);
    line(x, y-19, x, y-6);
    //arc(x, y-10, 10, 10, 90, 270);
    //arc(x, y-10, 10, 10, 90+180, 270+180);
    line(x, y-15, x-5, y-10);
    line(x, y-6, x-5, y-10);
    line(x, y-15, x+6, y-10);
    line(x, y-6, x+6, y-10);
    line(x, y-6, x+5, y+6);
    line(x, y-6, x-5, y+6);
};
var drawPunchPersonL1 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-6, x-5, y+6);
    line(x, y-6, x+5, y+6);
    arc(x+1, y-23, 15, 15, 370-270, 450-270);
    arc(x, y-9, 15, 15, 190-270, 270-270);
};
var drawPunchPersonL2 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-6, x+5, y+6);
    line(x, y-6, x-5, y+6);
    arc(x-9, y-16, 19, 19, 0, 60);
    arc(x-1, y-25, 19, 19, 0, 80);
};
var drawPunchPersonL3 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-6, x+5, y+6);
    line(x, y-6, x-5, y+6);
    arc(x-4, y-10, 19, 19, -60, 20);
    line(x, y-17, x-10, y-26);
};
var drawPunchPerson1 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-6, x+5, y+6);
    line(x, y-6, x-5, y+6);
    arc(x, y-23, 15, 15, 370, 450);
    arc(x, y-9, 15, 15, 190, 270);
};
var drawPunchPerson2 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-6, x+5, y+6);
    line(x, y-6, x-5, y+6);
    arc(x+10, y-16, 19, 19, 480, 560);
    arc(x+2, y-25, 19, 19, 190-90, 270-90);
};
var drawPunchPerson3 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-6, x+5, y+6);
    line(x, y-6, x-5, y+6);
    arc(x+5, y-10, 19, 19, 520, 600);
    line(x, y-17, x+11, y-26);
};
var drawKickPerson1 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x+1, y-6);
    line(x, y-16, x+4, y-6);
    line(x, y-16, x-4, y-6);
    line(x+1, y-6, x+5, y+6);
    line(x+1, y-6, x, y+6);
};
var drawKickPerson2 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x+2, y-26, 10, 10);
    line(x+2, y-21, x+3, y-6);
    line(x+3, y-16, x+4, y-6);
    line(x+3, y-16, x-4, y-6);
    line(x+3, y-6, x+3, y+5);
    line(x+3, y-6, x+11, y+4);
};
var drawKickPerson3 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x+2, y-26, 10, 10);
    line(x+2, y-21, x+3, y-6);
    line(x+3, y-16, x+4, y-6);
    line(x+3, y-16, x-4, y-6);
    line(x+3, y-6, x+3, y+5);
    line(x+3, y-6, x+16, y-1);
};
var drawKickPersonL1 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x-1, y-6);
    line(x, y-16, x-4, y-6);
    line(x, y-16, x+4, y-6);
    line(x-1, y-6, x-5, y+6);
    line(x-1, y-6, x, y+6);
};
var drawKickPersonL2 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x-2, y-26, 10, 10);
    line(x-2, y-21, x-3, y-6);
    line(x-3, y-16, x-4, y-6);
    line(x-3, y-16, x+4, y-6);
    line(x-3, y-6, x-3, y+5);
    line(x-3, y-6, x-11, y+4);
};
var drawKickPersonL3 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x-2, y-26, 10, 10);
    line(x-2, y-21, x-3, y-6);
    line(x-3, y-16, x-4, y-6);
    line(x-3, y-16, x+4, y-6);
    line(x-3, y-6, x-3, y+5);
    line(x-3, y-6, x-16, y-1);
};
var drawThrowPerson1 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-16, x+9, y-9);
    line(x, y-16, x-10, y-22);
    line(x, y-6, x+5, y+6);
    line(x, y-6, x-5, y+6);
};
var drawThrowPerson2 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-16, x+3, y-3);
    line(x, y-16, x-7, y-28);
    line(x, y-6, x+5, y+6);
    line(x, y-6, x-5, y+6);
};
var drawThrowPerson3 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-16, x-5, y-4);
    line(x, y-16, x+9, y-27);
    line(x, y-6, x+5, y+6);
    line(x, y-6, x-5, y+6);
};
var drawRecoverPersonL1 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x+39, y, 10, 10);
    line(x+34, y-1, x+14, y-6);
    line(x+26, y-4, x+15, y+4);
    line(x+26, y-4, x+25, y+4);
    line(x+14, y-6, x+5, y+4);
    line(x+14, y-6, x+11, y+4);
};
var drawRecoverPersonL2 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x+39, y-10, 10, 10);
    line(x+34, y-10, x+14, y-6);
    line(x+26, y-8, x+15, y+2);
    line(x+26, y-8, x+25, y+2);
    line(x+14, y-6, x+12, y+4);
    line(x+14, y-6, x+17, y+4);
};
var drawRecoverPersonL3 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x+30, y-22, 10, 10);
    line(x+27, y-18, x+14, y-6);
    line(x+23, y-14, x+19, y-2);
    line(x+23, y-14, x+25, y-2);
    line(x+14, y-6, x+12, y+4);
    line(x+14, y-6, x+17, y+4);
};
var drawRecoverPerson1 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x-39, y, 10, 10);
    line(x-34, y-1, x-14, y-6);
    line(x-26, y-4, x-15, y+4);
    line(x-26, y-4, x-25, y+4);
    line(x-14, y-6, x-5, y+4);
    line(x-14, y-6, x-11, y+4);
};
var drawRecoverPerson2 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x-39, y-10, 10, 10);
    line(x-34, y-10, x-14, y-6);
    line(x-26, y-8, x-15, y+2);
    line(x-26, y-8, x-25, y+2);
    line(x-14, y-6, x-12, y+4);
    line(x-14, y-6, x-17, y+4);
};
var drawRecoverPerson3 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x-30, y-22, 10, 10);
    line(x-27, y-18, x-14, y-6);
    line(x-23, y-14, x-19, y-2);
    line(x-23, y-14, x-25, y-2);
    line(x-14, y-6, x-12, y+4);
    line(x-14, y-6, x-17, y+4);
};
var drawHitPersonL1 = function(x, y, r, g, b) {
    noFill();
    pushMatrix();
    translate(-10, 0);
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x-5*-1, y-21, x-5*-1, y-6);
    line(x-5*-1, y-16, x+8*-1, y-14);
    line(x-5*-1, y-16, x+6*-1, y-12);
    line(x-5*-1, y-6, x+1*-1, y+6);
    line(x-5*-1, y-6, x-3*-1, y+6);
    popMatrix();
};
var drawHitPersonL2 = function(x, y, r, g, b) {
    pushMatrix();
    translate(-10, 0);
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x-11*-1, y-26, 10, 10);
    line(x-18*-1, y-21, x-14*-1, y-6);
    line(x-17*-1, y-16, x-7*-1, y-28);
    line(x-17*-1, y-16, x-4*-1, y-26);
    line(x-14*-1, y-6, x-5*-1, y+1);
    line(x-14*-1, y-6, x-8*-1, y+1);
    popMatrix();
};
var drawHitPersonL3 = function(x, y, r, g, b) {
    pushMatrix();
    translate(-10, 0);
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x-20*-1, y-22, 10, 10);
    line(x-29*-1, y-17, x-19*-1, y-6);
    line(x-22*-1, y-12, x-14*-1, y-23);
    line(x-22*-1, y-12, x-9*-1, y-20);
    line(x-19*-1, y-6, x-7*-1, y-6);
    line(x-19*-1, y-6, x-8*-1, y-1);
    popMatrix();
};
var drawHitPersonL4 = function(x, y, r, g, b) {
    pushMatrix();
    translate(-10, 0);
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x-39*-1, y, 10, 10);
    line(x-34*-1, y+3, x-14*-1, y+6);
    line(x-26*-1, y+4, x-15*-1, y-4);
    line(x-26*-1, y+4, x-25*-1, y-6);
    line(x-14*-1, y+6, x-5*-1, y-4);
    line(x-14*-1, y+6, x-11*-1, y-7);
    popMatrix();
};
var drawHitPerson1 = function(x, y, r, g, b) {
    pushMatrix();
    translate(10, 0);
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x-5, y-21, x-5, y-6);
    line(x-5, y-16, x+8, y-14);
    line(x-5, y-16, x+6, y-12);
    line(x-5, y-6, x+1, y+6);
    line(x-5, y-6, x-3, y+6);
    popMatrix();
};
var drawHitPerson2 = function(x, y, r, g, b) {
    pushMatrix();
    translate(10, 0);
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x-11, y-26, 10, 10);
    line(x-18, y-21, x-14, y-6);
    line(x-17, y-16, x-7, y-28);
    line(x-17, y-16, x-4, y-26);
    line(x-14, y-6, x-5, y+1);
    line(x-14, y-6, x-8, y+1);
    popMatrix();
};
var drawHitPerson3 = function(x, y, r, g, b) {
    pushMatrix();
    translate(10, 0);
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x-20, y-22, 10, 10);
    line(x-29, y-17, x-19, y-6);
    line(x-22, y-12, x-14, y-23);
    line(x-22, y-12, x-9, y-20);
    line(x-19, y-6, x-7, y-6);
    line(x-19, y-6, x-8, y-1);
    popMatrix();
};
var drawHitPerson4 = function(x, y, r, g, b) {
    pushMatrix();
    translate(10, 0);
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x-39, y, 10, 10);
    line(x-34, y+3, x-14, y+6);
    line(x-26, y+4, x-15, y-4);
    line(x-26, y+4, x-25, y-6);
    line(x-14, y+6, x-5, y-4);
    line(x-14, y+6, x-11, y-7);
    popMatrix();
};
var drawFallingPerson = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-16, x+8, y-26);
    line(x, y-16, x-8, y-26);
    line(x, y-6, x+5, y+6);
    line(x, y-6, x-5, y+6);
};
var drawIdlePerson1 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-16, x+5, y-6);
    line(x, y-16, x-5, y-6);
    line(x, y-6, x+5, y+6);
    line(x, y-6, x-5, y+6);
};
var drawIdlePerson2 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-25, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-16, x+7, y-8);
    line(x, y-16, x-6, y-7);
    line(x, y-6, x+6, y+6);
    line(x, y-6, x-6, y+6);
};
var drawIdlePerson3 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    line(x, y-16, x+6, y-7);
    line(x, y-16, x-7, y-8);
    line(x, y-6, x+5, y+6);
    line(x, y-6, x-5, y+6);
};
var drawPerson1 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    arc(x-12, y+16, 50, 50, 300, 330);
    arc(x-22, y-18, 50, 50, 390, 420);
    arc(x, y-23, 15, 15, 370, 450);
    arc(x, y-9, 15, 15, 190, 270);
};
var drawPerson2 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-27, 10, 10);
    line(x, y-22, x, y-6);
    arc(x-29, y+18, 80, 80, 320, 340);
    arc(x-39, y-15, 80, 80, 370, 390);
    arc(x, y-21, 10, 10, 350, 450);
    arc(x, y-10, 10, 10, 170, 270);
};
var drawPerson3 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-27, 10, 10);
    line(x, y-22, x, y-6);
    line(x, y-5, x+2, y+8);
    line(x, y-5, x-2, y+8);
    arc(x+4, y-15, 10, 10, 410, 580);
    
    
};
var drawPersonL1 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-26, 10, 10);
    line(x, y-21, x, y-6);
    arc(x+22, y-18, 50, 50, 300-180, 330-180);
    arc(x+12, y+16, 50, 50, 210, 240);
    
    
    arc(x, y-9, 15, 15, 280, 360);
    arc(x+1, y-23, 15, 15, 100, 180);
    
};
var drawPersonL2 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-27, 10, 10);
    line(x, y-22, x, y-6);
    arc(x+38, y-22, 80, 80, 320-180, 340-180);
    arc(x+35, y+11, 80, 80, 370-180, 390-180);
    
    //arc(x-39, y-15, 80, 80, 370, 390);
    
    arc(x, y-21, 10, 10, 350+90, 450+90);
    arc(x, y-10, 10, 10, 170+90, 270+90);
};
var drawPersonL3 = function(x, y, r, g, b) {
    noFill();
    strokeWeight(1);
    stroke(r, g, b);
    ellipse(x, y-27, 10, 10);
    line(x, y-22, x, y-6);
    line(x, y-5, x-2, y+8);
    line(x, y-5, x+2, y+8);
    arc(x-3, y-15, 10, 10, 410-90, 580-90);
    
    
};
var drawBattlePicture = function(x, y) {
    noFill();
    strokeWeight(1);
    stroke(255, 255, 0);
    rect(x-20, y+3, 40, 4, 4);
    drawPunchPerson3(x-5, y-2, 255, 255, 0);
    ellipse(x+27, y-21, 6, 6);
    drawHitPersonL2(x+25, y-7, 255, 0, 0);
};
var drawKingPicture = function(x, y) {
    
    pushMatrix();
    translate(x-25, y);
    rotate(10);
    noFill();
    strokeWeight(1);
    stroke(255, 255, 255);
    rect(0, 0, 50, 4, 4);
    popMatrix();
    drawFallingPerson(x+33, y+40, 0, 0, 255);
    drawHitPerson1(x-34, y-5, 0, 255, 0);

};
var drawBlockPicture = function(x, y) {
    noFill();
    strokeWeight(1);
    stroke(255, 0, 0);
    rect(x-20, y+7, 40, 4, 4);
    drawPerson1(x-35, y-8, 0, 0, 255);
    drawPersonL2(x+35, y-3, 255, 0, 0);
};
var keys = [];
var keyPressed = function(){
    keys[keyCode] = true;
};
var keyReleased = function(){
    keys[keyCode] = false;
};
var colorText = function(word) {
 for(var i = 0; i < word.length; i ++) {
     fill(255, 0, 0);
     rect(200, i*20, 5, 5);
 }
};
var drawWord = function(word, x, y, size){
    var wordArray = [];
    for(var i = 0; i<= word.length; i++){
        wordArray[i] = word.charAt(i);
    }
    for(i = 0; i <= wordArray.length; i++){
        if(wordArray[i] !== " "){
            for(var e = 0; e < wordArray.length; e += 4) {
                if(i === e) {fill(255, 0, 0);}
                if(i === e+1) {fill(255, 255, 0);}
                if(i === e+2) {fill(0, 255, 0);}
                if(i === e+3) {fill(0, 0, 255);}
            textSize(size);
            text(wordArray[i], x+i*size/1.9, y);
            }
        }
    }
    };

var elBenoTextX = [];
var elBenoTextY = [];
var elBenoLogoText = ["e", "l", "B", "e", "n", "o"];
var programsLogoText = ["p", "r", "o", "g", "r", "a", "m", "s"];

var logo = function(x, y, logoSize, logoTextX, logoTextY, logoText, logoVar, logoRed, logoGreen, logoBlue, rotationState, threeDstate, rotationSpeed) {
    textFont(mono);
textAlign(CENTER, CENTER);
for(var i= 0 ; i< logoText.length; i ++) {
    
if(rotationState === "clockWise") {
   logoTextX[i] = x+(cos((frameCount*rotationSpeed+i*logoVar)*3)*70)*(logoSize/40);
   logoTextY[i] = y+(sin((frameCount*rotationSpeed+i*logoVar)*3)*70)*(logoSize/40); 
}
if(rotationState === "counterClockWise") {
   logoTextX[i] = x-(cos((frameCount*rotationSpeed+i*logoVar)*3)*70)*(logoSize/40);
   logoTextY[i] = y+(sin((frameCount*rotationSpeed+i*logoVar)*3)*70)*(logoSize/40); 
}}
if(threeDstate === "3D") {
for(var i = 0; i < logoText.length;i++) {
for(var e = 0; e < 14; e ++) {
textSize(logoSize*1.5+e*logoSize/30);
fill((sin(frameCount)*110+logoRed)-e*10, (sin(frameCount+120)*110+logoGreen)-e*10, (sin(frameCount-120)*110+logoBlue)-e*10);
text(logoText[i], logoTextX[logoText.length-(i+1)], logoTextY[logoText.length-(i+1)]);
}}}
if(threeDstate === "2D") {
for(var i = 0; i < logoText.length;i++) {
textSize(logoSize*1.5);
fill((sin(frameCount)*110+logoBlue), (sin(frameCount+120)*110+logoBlue), (sin(frameCount-120)*110+logoBlue));
text(logoText[i], logoTextX[logoText.length-(i+1)], logoTextY[logoText.length-(i+1)]);
}}};



var button = function(x, y, size, first, second, third, fourth, onClick) {
    this.xPos = x;
    this.yPos = [y, y, y, y];
    this.initialY = y;
    this.over = false;
    this.timer = 0;
    this.size = size;
    this.first = first;
    this.second = second;
    this.third = third;
    this.fourth = fourth;
    this.eligible = [false, false, false, false];
    this.goUp = [false, false, false, false];
    this.goDown = [false, false, false, false];
    this.onClick = onClick || function() {
        
    };
    
};
button.prototype.isMouseInside = function() {
    return mouseX > this.xPos-this.size && 
    mouseX < this.xPos+this.size && 
    mouseY > this.initialY-this.size/2 && 
    mouseY < this.initialY+this.size/2;
           
};
button.prototype.handleMouseClick = function() {
    if (this.isMouseInside()) {
        this.onClick();
    }
};
button.prototype.draw = function() {
    textAlign(CENTER, CENTER);
fill(255, 0, 0);
textSize(this.size);
text(this.first, this.xPos-49*(this.size/60), this.yPos[0]);
fill(255, 255, 0);
text(this.second, this.xPos-17*(this.size/60), this.yPos[1]);
fill(0, 255, 0);
text(this.third, this.xPos+17*(this.size/60), this.yPos[2]);
fill(0, 0, 255);
text(this.fourth, this.xPos+49*(this.size/60), this.yPos[3]);


if(mouseX > this.xPos-this.size && mouseX < this.xPos+this.size && mouseY > this.initialY-this.size/2 && mouseY < this.initialY+this.size/2 && this.over === false) {
    this.over = true;
    this.timer = 0;
}
if(mouseX < this.xPos-this.size || mouseX > this.xPos+this.size || mouseY < this.initialY-this.size/2 || mouseY > this.initialY+this.size/2) {
    this.over = false;
    for(var i = 0; i < 4; i ++) {
        if(this.yPos[i] < this.initialY) {
            this.yPos[i] ++;
        }
    }
    this.eligible = [false, false, false, false];
}
if(this.over === true) {
    this.timer ++;
    for(var i = 0;i < 4; i ++) {
        if(this.timer > i*6) {
            this.eligible[i] = true;
        }
    if(this.eligible[i] === true) {
        
    if(this.yPos[i] > this.initialY - 1) {
        this.goUp[i] = true;
        this.goDown[i] = false;
    }
    if(this.yPos[i] < this.initialY-20) {
        this.goUp[i] = false;
        this.goDown[i] = true;
    }
    if(this.goUp[i] === true) {
        this.yPos[i] -=2;
    }
    if(this.goDown[i] === true) {
        this.yPos[i] +=2;
    }
    }
    }

}
};

var playButton = new button (200, 360, 50, "P", "L", "A", "Y", function() {
    if(gameState === "mainMenu") {
    gameState = "choosePlayer";
    buttonTimer = 0;
    }
});
var otherPlayButton = new button (200, 300, 50, "P", "L", "A", "Y", function() {
    if(gameState === "choosePlayer" && buttonTimer > 20) {
    gameState = "gameMenu";
    buttonTimer = 0;
    }
});
var helpButton = new button (200, 360, 50, "H", "E", "L", "P", function() {
    if(gameState === "choosePlayer" && buttonTimer > 20) {
    gameState = "howTo";
    buttonTimer = 0;
    }
});
var evenOtherPlayButton = new button (200, 360, 50, "P", "L", "A", "Y", function() {
    if(gameState === "wins") {
    gameState = gameToPlay;
    buttonTimer = 0;
    }
});
var backButton = new button (200, 360, 50, "B", "A", "C", "K", function() {
    if(gameState === "gameMenu" && buttonTimer > 20) {
    gameState = "choosePlayer";
    buttonTimer = 0;
    }
});
var otherBackButton = new button (200, 300, 50, "B", "A", "C", "K", function() {
    if(gameState === "wins" || gameState === "howTo") {
        if(gameState === "wins") {
    gameState = "gameMenu";
        }
        if(gameState === "howTo") {
            gameState = "choosePlayer";
        }
    buttonTimer = 0;
    }
});
mouseClicked = function() {
playButton.handleMouseClick();
otherPlayButton.handleMouseClick();
helpButton.handleMouseClick();
backButton.handleMouseClick();
evenOtherPlayButton.handleMouseClick();
otherBackButton.handleMouseClick();
};



var drawPerson = function(x, y, rightkey, leftkey, jumpkey, downkey, shootkey, speed, jumpingAbility, red, green, blue, playerNumber) {
    this.x = x;
    this.y = y;
    this.win = false;
    this.wins = 0;
    this.playerNumber = playerNumber;
    this.platformsOwned = 0;
    this.rightkey = rightkey;
    this.leftkey = leftkey;
    this.jumpkey = jumpkey;
    this.downkey = downkey;
    this.shootkey = shootkey;
    this.CPUright = false;
    this.CPUleft = false;
    this.CPUup = false;
    this.CUPshoot = false;
    this.jumpCount = 0;
    this.jumping = false;
    this.jumpTimer = 0;
    this.throwing = false;
    this.speed = speed;
    this.jumpingAbility = jumpingAbility;
    this.runTimer = 0;
    this.runTimerSpeed = 1;
    this.personArray = 0;
    this.yDiff = 0;
    this.xDiff = 0;
    this.balls = 0;
    this.bulletX = x;
    this.bulletY = y-10;
    this.bulletDir = 1;
    this.kick = false;
    this.kickTimer = 0;
    this.kickOrPunch = 0;
    this.kickOrPunchBool = true;
    this.shot = false;
    this.hit = false;
    this.hitL = false;
    this.hitUpdate = false;
    this.otherHitUpdate = false;
    this.hitTimer = 0;
    this.landTimer = 0;
    this.landTimerBool = false;
    this.lives = 3;
    this.red = red;
    this.blue = blue;
    this.green = green;
    this.height = 36;
    this.CPU = false;
    this.personRunPicturesRight = [drawPerson1, drawPerson2, drawPerson3];
    this.personRunPicturesLeft = [drawPersonL1, drawPersonL2, drawPersonL3];
    this.personIdlePictures = [drawIdlePerson1, drawIdlePerson2, drawIdlePerson3];
    this.personHitPicturesL = [drawHitPerson1, drawHitPerson2, drawHitPerson3];
    this.personHitPictures = [drawHitPersonL1, drawHitPersonL2, drawHitPersonL3];
    this.personRecoverPictures = [drawRecoverPerson1, drawRecoverPerson2, drawRecoverPerson3];
    this.personRecoverPicturesL = [drawRecoverPersonL1, drawRecoverPersonL2, drawRecoverPersonL3];
    this.personThrowPictures = [drawThrowPerson1, drawThrowPerson2, drawThrowPerson3];
    this.personKickPictures = [drawKickPerson1, drawKickPerson2, drawKickPerson3];
    this.personPunchPictures = [drawPunchPerson1, drawPunchPerson2, drawPunchPerson3];
    this.personPunchPicturesL = [drawPunchPersonL1, drawPunchPersonL2, drawPunchPersonL3];
    this.personKickPicturesL = [drawKickPersonL1, drawKickPersonL2, drawKickPersonL3];
    this.fallingPersonPicture = drawFallingPerson;
    this.defeatedPerson = drawDefeatedPerson;
    this.hitPersonL = drawHitPerson4;
    this.hitPerson = drawHitPersonL4;

};
drawPerson.prototype.collect = function() {
    for(var i = 0; i < numberOfBalls; i ++) {
        if(ballsTaken[i] === true) {
            ballsTimer[i] ++;
            if(ballsTimer[i] > 1500) {
                ballsTaken[i] = false;
            }
        }
    if(this.x > ballsX[i]-10 && this.x < ballsX[i]+10 && this.y > ballsY[i]-10 && this.y < ballsY[i]+30 && ballsTaken[i] === false) {
        if(gameState === "battle") {
            if(blocksRed[i*3] === this.red && this.green === blocksGreen[i*3] && this.blue === blocksBlue[i*3]) {
                if(this.balls < 5) {
                this.balls +=1;
                }
                ballsTaken[i] = true;
                ballsTimer[i] = 0;
            }
        }else{
        ballsX[i] = random(10, 390);
        ballsY[i] = random(10, 280);
        this.balls += 3;
        }
        
    }
    }
};
drawPerson.prototype.Land = function() {
    pushMatrix();
    for(var i = 0; i < numberOfBlocks; i ++) {
   if(this.x > blocksX[i]-blocksLength[i]/2-3+(blocksRotate[i])/(50/blocksRotate[i]) && this.x < blocksX[i]+blocksLength[i]/2+3-(blocksRotate[i])/(50/blocksRotate[i])  && this.y < blocksY[i]+(this.x-blocksX[i])/(50/blocksRotate[i]) && this.y > blocksY[i]-8+(this.x-blocksX[i])/(50/blocksRotate[i]) && this.yDiff > 0 && !keys[this.downkey]) {
       if(this.y > blocksY[i]-7+(this.x-blocksX[i])/(50/blocksRotate[i]) && this.yDiff > -0.05 && this.yDiff < 0.5 && gameState === "king") {
           if(blocksRotate[i] > 359) {
               blocksRotate[i] = 0;
           }
           this.y -=1;
           if(keys[this.rightkey]) {
             this.y -= 5;  
           }
           if(keys[this.leftkey]) {
             this.y -= 5;  
           }
           
       }
        this.jumping = false;
        this.yDiff = 0;
        this.jumpCount = 0;
        this.xDiff += (sin(blocksRotate[i]))*1;
        //this.y += (sin(blocksRotate[i]))*1;
        if(gameState !== "battle") {
            this.landTimer = 100;
        }    
        
        this.landTimer ++;
        if(this.landTimer > 30 && this.lives > 0 && gameState !== "king") {
        blocksRed[i] = this.red;
        blocksGreen[i] = this.green;
        blocksBlue[i] = this.blue;
        }
        
    }else{
        if(this.yDiff < -0.01 || this.yDiff > 0.01) {
        this.landTimer = 0;
        }
    }
    if(this.x > blocksX[i]-blocksLength[i]/2 && this.x < blocksX[i]+blocksLength[i]/2 && this.y > blocksY[i]+36 && this.y < blocksY[i]+42 && this.yDiff < 0 && (this.red!== blocksRed[i] || this.green!==blocksGreen[i] || this.blue!==blocksBlue[i]) && (blocksRed[i] !== 255||blocksGreen[i] !== 255||blocksBlue[i] !== 255)) {
        this.yDiff = this.yDiff*-1;
    }
    }
    popMatrix();
    
};
drawPerson.prototype.draw = function() {
    if(this.CPU === true) {
        keys[this.rightkey] = this.CPUright;
        keys[this.leftkey] = this.CPUleft;
        keys[this.jumpkey] = this.CPUup;
        keys[this.shootkey] = this.CPUshoot;
    }
    if(this.CPU === false) {
        this.CPUright = false;
        this.CPUleft = false;
        this.CPUup = false;
        this.CPUshoot = false;
    }
    this.collect();
    this.Land();
    this.runTimer +=this.runTimerSpeed;
    this.yDiff += this.jumpCount/500;
    this.jumpCount +=(1.5)*scaleAmount;
    if(oneWon === false) {
    this.y += this.yDiff;
    }
    if(oneWon === false) {
    this.x += this.xDiff;
    }
    if(oneWon === true && winAlpha*winAlpha > 255) {
        this.yDiff = 0;
        this.hit = false;
        this.hitL = false;
        this.jumpCount = 0;
        this.runTimer = 0;
        this.personArray = 0;
        this.lives = 3;
        this.balls = 0;
    }
    if(this.x > 400*scaleAmount) {
        this.x = 0;
    }
    if(this.x < 0) {
        this.x = 400*scaleAmount;
    }
    if((this.xDiff < -0.1 && !keys[this.leftkey]) || this.hit === true || this.hitL === true) {
    this.xDiff += friction;
    }
    if((this.xDiff > 0.1 && !keys[this.rightkey])  || this.hit === true || this.hitL === true) {
    this.xDiff -= friction;
    }
    if(this.xDiff < 0.1 && this.xDiff > -0.1 && !keys[this.rightkey] && !keys[this.leftkey]) {
        this.xDiff = 0;
    }
    if(this.lives > 3 && gameState === "battle") {
        this.lives --;
    }
    if(this.lives === 3) {
        pushMatrix();
        if(this.hit === true) {
            translate(9, 15);
        }
        if(this.hitL === true) {
            translate(-9, 15);
        }
        noFill();
        stroke(255, 255, 255, 70);
        line(this.x, this.y-9, this.x+10, this.y-35);
        line(this.x, this.y-9, this.x+2, this.y-40);
        line(this.x, this.y-9, this.x-10, this.y-35);
        fill(this.red, this.green, this.blue);
        noStroke();
        stroke(this.red, this.green, this.blue);
        ellipse(this.x+1, this.y-46, 10, 16);
        ellipse(this.x+11, this.y-43, 10, 16);
        ellipse(this.x-10, this.y-43, 10, 16);
        popMatrix();
    }
    if(this.lives === 2) {
        pushMatrix();
        if(this.hit === true) {
            translate(9, 15);
        }
        if(this.hitL === true) {
            translate(-9, 15);
        }
        noFill();
        stroke(255, 255, 255, 70);
        line(this.x, this.y-9, this.x+5, this.y-38);
        //line(this.x, this.y-9, this.x+2, this.y-40);
        line(this.x, this.y-9, this.x-5, this.y-38);
        fill(this.red, this.green, this.blue);
        noStroke();
        stroke(this.red, this.green, this.blue);
        //ellipse(this.x+1, this.y-46, 10, 16);
        ellipse(this.x+6, this.y-44, 10, 16);
        ellipse(this.x-5, this.y-45, 10, 16);
        popMatrix();
    }
    if(this.lives === 1) {
        pushMatrix();
        if(this.hit === true) {
            translate(9, 15);
        }
        if(this.hitL === true) {
            translate(-9, 15);
        }
        noFill();
        stroke(255, 255, 255, 70);
        line(this.x, this.y-9, this.x, this.y-40);
        //line(this.x, this.y-9, this.x+2, this.y-40);
        //line(this.x, this.y-9, this.x-5, this.y-35);
        fill(this.red, this.green, this.blue);
        noStroke();
        stroke(this.red, this.green, this.blue);
        //ellipse(this.x+1, this.y-46, 10, 16);
        //ellipse(this.x+6, this.y-43, 10, 16);
        ellipse(this.x, this.y-46, 10, 16);
        popMatrix();
    }
    if(this.runTimer > 6) {
        this.runTimer = 0;
        this.personArray ++;
    }
    if(this.personArray > 2) {
        this.personArray = 0;
    }
    if(this.y > 360*scaleAmount) {
        this.jumping = false;
        this.jumpCount = 0;
        this.yDiff = 0;
        this.y = 360*scaleAmount;
    }
    if(this.win === false && oneWon === false) {
    if(this.hit === false && this.hitL === false && this.throwing === false  && this.kick === false && oneWon === false) {
        this.height = 36;
    if(!keys[this.rightkey] && !keys[this.leftkey]) {
        if(this.yDiff < 2) {
        this.personIdlePictures[this.personArray](this.x, this.y, this.red, this.green, this.blue);
        }
    }
    if(keys[this.jumpkey] && this.jumping === false) {
        if(this.jumpTimer > 10) {
        this.jumpTimer = 0;
        this.jumping = true;
        }
        this.jumpTimer ++;
        this.yDiff -= (0.26+this.jumpingAbility/100)*scaleAmount;
    
    }else{
        this.jumpTimer = 0;
        this.jumping = true;
    }
    if(this.jumping === true) {
        if(keys[this.downkey]) {
            this.yDiff += 0.1;
        }
    }
    
    if(keys[this.rightkey]) {
        if(this.shot === false) {
        this.bulletDir = 1;
        }
        if(this.yDiff < 2) {
 
    this.personRunPicturesRight[this.personArray](this.x, this.y, this.red, this.green, this.blue);
        }
        if(this.xDiff < (1+this.speed/10)*scaleAmount) {
            this.xDiff += 0.1;
        }
    }else if(keys[this.leftkey]) {
        if(this.shot === false) {
        this.bulletDir = -1;
        }
        if(this.yDiff < 2) {
    this.personRunPicturesLeft[this.personArray](this.x, this.y, this.red, this.green, this.blue);
        }
    if(this.xDiff > -1*(1+this.speed/10)*scaleAmount) {
            this.xDiff -= 0.1;
        }
    }
    if(this.yDiff > 2) {
        this.fallingPersonPicture(this.x, this.y, this.red, this.green, this.blue);
    }
    }
    
    if(this.hit === true || this.hitL === true) {
        this.height = 6;
        if(this.hitUpdate === false) {
            this.hitTimer = 0;
            this.hitUpdate = true;
            this.personArray = 0;
        }
        if(this.personArray === 2) {
            this.otherHitUpdate = true;
        }
        if(this.otherHitUpdate === false) {
            if(this.hit === true && this.hitL === false) {
        this.personHitPictures[this.personArray](this.x, this.y, this.red, this.green, this.blue);
            }
            if(this.hitL === true && this.hit === false) {
        this.personHitPicturesL[this.personArray](this.x, this.y, this.red, this.green, this.blue);
            }
    }
    
    if(this.otherHitUpdate === true) {
        this.hitTimer ++;
        if(this.hit === true && this.hitL === false && this.hitTimer < 81) {
        this.hitPerson(this.x, this.y, this.red, this.green, this.blue);
        }
        if(this.hitL === true && this.hit === false && this.hitTimer < 81) {
        this.hitPersonL(this.x, this.y, this.red, this.green, this.blue);
        }
        if(this.hitTimer === 80) {
            this.personArray = 0;
            this.runTimer = 0;
        }
        if(this.hitTimer > 80) {
            this.runTimerSpeed = 0.8;
            if(this.hitL === true) {
            this.personRecoverPictures[this.personArray](this.x, this.y, this.red, this.green, this.blue);
            }
            if(this.hit === true) {
            this.personRecoverPicturesL[this.personArray](this.x, this.y, this.red, this.green, this.blue);
            }
            if(this.personArray === 2) {
            this.hit = false;
            this.runTimerSpeed = 1;
            this.hitL = false;
            this.hitUpdate = false;
            this.otherHitUpdate = false;
            this.hitTimer = 0;  
            }
        }
    }
    }
    }
    if(this.win === true) {
        this.fallingPersonPicture(this.x, this.y, this.red, this.green, this.blue);
    }
        if(oneWon === true && this.win === false) {
        this.defeatedPerson(this.x, this.y, this.red, this.green, this.blue);
    }
};
drawPerson.prototype.ballsLeft = function(x) {
    textSize(10);
    fill(this.red, this.green, this.blue);
    if(gameState !== "king") {
    text("BALLS: " + this.balls, x, 380*scaleAmount);
    }
};
drawPerson.prototype.blocksOwned = function(x) {
    this.platformsOwned = 0;
    for(var i = 0; i < numberOfBlocks; i ++) {
        if(blocksRed[i] === this.red && blocksGreen[i] === this.green && blocksBlue[i] === this.blue) {
            this.platformsOwned ++;
        }
    }
    if(gameState !== "king") {
    text("BLOCKS: " + this.platformsOwned, x, 390*scaleAmount);
    }
};


var playerOne = new drawPerson(80*scaleAmount, 360*scaleAmount, RIGHT, LEFT, UP, DOWN, ENTER, 6, 6, 255, 0, 0, 0);
var playerTwo = new drawPerson(240*scaleAmount, 360*scaleAmount, 76, 74, 73, 75, 78, 6, 6, 0, 0, 255, 1);
var playerThree = new drawPerson(160*scaleAmount, 360*scaleAmount, 102, 100, 104, 101, 96, 6, 6, 255, 255, 0, 2);
var playerFour = new drawPerson(320*scaleAmount, 360*scaleAmount, 68, 65, 87, 83, 90, 6, 6, 0, 255, 0, 3);

var players = [playerOne, playerTwo, playerThree, playerFour];
var drawTimer = function() {
    if(gameState === "blockMode") {
        if(gameTimer > 0) {
    gameTimer -= 0.08;
        }
    textSize(15*scaleAmount);
    fill(255);
    text(round(gameTimer), 365*scaleAmount, 10*scaleAmount);
    }
};
drawPerson.prototype.shoot = function() {
    this.kickTimer ++;
    if(keys[this.shootkey] && this.shot === false && this.hit === false && this.hitL === false) {
        if((this.balls < 1 || this.lives < 1) && this.kickTimer > 40) {
        this.kick = true;
        this.kickTimer = 0;
        this.personArray = 0;
        this.runTimer = 0;
        }
        if(this.balls > 0 && this.lives > 0) {
       this.shot = true;
       this.balls -= 1;
       this.personArray = 0;
       this.throwing = true;
       this.bulletX = this.x;
       this.bulletY = this.y-20;
        }
    }
    if(this.kick === true) {
        this.xDiff = 0;
        this.runTimerSpeed = 1;
        if(this.bulletDir === 1) {
            if(this.kickOrPunch === 0 && this.kickOrPunchBool === true) {
        this.personKickPictures[this.personArray](this.x, this.y, this.red, this.green, this.blue);
        if(this.personArray === 2 && this.runTimer > 5) {
        this.kickOrPunchBool = false;
        this.kickOrPunch = 1;
        }
            }
            if(this.kickOrPunch === 1 && this.kickOrPunchBool === true) {
        this.personPunchPictures[this.personArray](this.x, this.y, this.red, this.green, this.blue);
        if(this.personArray === 2 && this.runTimer > 5) {
        this.kickOrPunchBool = false;
        this.kickOrPunch = 0;
        }
            }
        }
        if(this.bulletDir === -1) {
        if(this.kickOrPunch === 0 && this.kickOrPunchBool === true) {
        this.personKickPicturesL[this.personArray](this.x, this.y, this.red, this.green, this.blue);
        if(this.personArray === 2 && this.runTimer > 5) {
        this.kickOrPunchBool = false;
        this.kickOrPunch = 1;
        }
            }
            if(this.kickOrPunch === 1 && this.kickOrPunchBool === true) {
        this.personPunchPicturesL[this.personArray](this.x, this.y, this.red, this.green, this.blue);
        if(this.personArray === 2 && this.runTimer > 5) {
        this.kickOrPunchBool = false;
        this.kickOrPunch = 0;
        }
            }
        }
        for(var i = 0; i < players.length; i ++) {
           if(this.x > players[i].x-(12+12*this.bulletDir) && this.x < players[i].x+(12-12*this.bulletDir) && this.y > players[i].y -36 && this.y < players[i].y+10 && this.x !== players[i].x && this.personArray === 2) {
               players[i].x += 20*this.bulletDir;
               if(players[i].hit === false && players[i].hitL === false) {
                   if(this.lives > 0 && players[i].lives > 0) {
               this.lives ++;
               }
               players[i].lives --;
               
               }
               if(this.bulletDir === 1) {
                 players[i].hit = true;
               }
               if(this.bulletDir === -1) {
                 players[i].hitL = true;  
               }
               this.shot = false;
           }
       }
        if(this.personArray === 2 && this.runTimer > 5) {
            this.kick = false;
            this.runTimerSpeed = 1;
            this.kickOrPunchBool = true;
        }
        }
    if(this.shot === true) {
        
        if(this.throwing === true) {
            this.runTimerSpeed = 1;
        this.personThrowPictures[this.personArray](this.x, this.y, this.red, this.green, this.blue);
        if(this.personArray === 2 && this.runTimer > 5) {
            this.throwing = false;
            this.runTimerSpeed = 1;
            this.bulletX = this.x;
            this.bulletY = this.y-20;
        }
        }
        if(this.throwing === false) {
       noFill();
       stroke(this.red, this.green, this.blue);
       ellipse(this.bulletX, this.bulletY, 6, 6);
       this.bulletX += 7*this.bulletDir;
       }
       if(this.bulletX > 400*scaleAmount || this.bulletX < 0*scaleAmount) {
           this.shot = false;
           //this.throwing = false;
       }
       
       for(var i = 0; i < players.length; i ++) {
           if(this.bulletX > players[i].x-5 && this.bulletX < players[i].x+5 && this.bulletY > players[i].y -players[i].height && this.bulletY < players[i].y-8 && this.x !== players[i].x) {
               players[i].x += 10*this.bulletDir;
               if(players[i].hit === false && players[i].hitL === false) {
               if(players[i].lives > 0) {
                   if(this.lives > 0) {
               this.lives ++;
                   }
               }
               if(this.lives > 0) {
               players[i].lives --;
               }
               }
               if(this.bulletDir === 1) {
                 players[i].hit = true;
               }
               if(this.bulletDir === -1) {
                 players[i].hitL = true;  
               }
               this.shot = false;
           }
       }
       
    }
    for(var i = 0; i < players.length;i++) {
        if(this.x > players[i].x - 6 && this.x < players[i].x + 6 && this.y > players[i].y - players[i].height && this.y < players[i].y + this.height && this.x !== players[i].x) {
            if(this.x > players[i].x) {
                if(gameState !== "king") {
                this.hit = true;
                this.xDiff = 0;
                }else{
                    this.xDiff *= -1;
                }
                this.x += 15;
                if(players[i].hit === false) {
                    if(gameState !== "king") {
                players[i].hitL = true;
                    }
                players[i].x -= 15;
                }
            }
            if(this.x < players[i].x) {
                if(gameState !== "king") {
                this.hitL = true;
                this.xDiff = 0;
                }else{
                    this.xDiff *= -1;
                }
                this.x -= 15;
                if(players[i].hitL === false) {
                    if(gameState !== "king") {
                players[i].hit = true;
                    }
                players[i].x += 15;
                }
            }
        }
       }
};
drawPerson.prototype.checkWin = function() {
    if(gameState === "battle") {
    for(var i = 0; i < players.length; i ++) {
    
            canWin[i] = true;
    
            if(players[i].lives > 0 && i !== this.playerNumber) {
              canWin[i] = false; 
            }
        }
    if(canWin[0] === true && canWin[1] === true && canWin[2] === true && canWin[3] === true && oneWon === false) {
        this.win = true;
        this.wins ++;
        oneWon = true;
    }}
    if(gameState === "blockMode") {
        for(var i = 0; i < players.length; i ++) {
            if(gameTimer < 1) {
        canWin[i] = true;
            }
    
            if(players[i].platformsOwned >= this.platformsOwned && i !== this.playerNumber) {
              canWin[i] = false; 
            }
        }
    if(canWin[0] === true && canWin[1] === true && canWin[2] === true && canWin[3] === true && oneWon === false) {
        this.win = true;
        this.wins ++;
        oneWon = true;
    }
    }
    if(gameState === "king") {
        for(var i = 0; i < players.length; i ++) {
            
        canWin[i] = true;
            if(rotateTimer < 2) {
                canWin[i] = false;
            }
    
            if(players[i].y < 359*scaleAmount && i !== this.playerNumber) {
              canWin[i] = false; 
            }
        }
    if(canWin[0] === true && canWin[1] === true && canWin[2] === true && canWin[3] === true && oneWon === false) {
        this.win = true;
        this.wins ++;
        oneWon = true;
    }
    }
};
drawPerson.prototype.createCPU = function() {
   this.CPU = true;
   this.speed = 8;
   this.jumpingAbility = 12;
   if(gameState === "king") {
       if(playerOne.y < 100) {
        this.CPUup = true;   
       }else{this.CPUup = false;}
     if(playerOne.x > this.x) {
        this.CPUright = true; 
        this.CPUleft = false;
     }
     if(playerOne.x < this.x) {
        this.CPUleft = true; 
        this.CPUright = false;
     }
     if(playerOne.x > this.x - 40 && playerOne.x < this.x + 40 && playerOne.y > this.y -50 && playerOne.y < this.y + 50) {
     this.CPUshoot = true;
     }else{this.CPUshoot = false;}
       
       
   }
   if(gameState === "blockMode") {
       this.CPUup = true;
     if(playerOne.x > this.x) {
        this.CPUright = true; 
        this.CPUleft = false;
     }
     if(playerOne.x < this.x) {
        this.CPUleft = true; 
        this.CPUright = false;
     }
     if(playerOne.y > this.y -50 && playerOne.y < this.y + 50) {
     this.CPUshoot = true;
     if(playerOne.x > this.x) {
        this.CPUright = true; 
        this.CPUleft = false;
     }
     if(playerOne.x < this.x) {
        this.CPUleft = true; 
        this.CPUright = false;
     }
     }else{this.CPUshoot = false;
     this.CPUright = true;
     }
       
       
   }
   if(gameState === "battle") {
       this.CPUright = true;
       if(this.y > 80) {
       this.CPUup = true;
       }else{this.CPUup = false;}
       if(playerOne.y > this.y -50 && playerOne.y < this.y + 50) {
     this.CPUshoot = true;
     if(playerOne.x > this.x) {
        this.CPUright = true; 
        this.CPUleft = false;
     }
     if(playerOne.x < this.x) {
        this.CPUleft = true; 
        this.CPUright = false;
     }
     }else{this.CPUshoot = false;
     this.CPUright = true;
     }
    for(var i = 0; i < 16; i ++) {
       if(this.x > blocksX[i] -30 && this.x < blocksX[i] + 30 && (this.red !== blocksRed[i]||this.green!==blocksGreen[i]||this.blue !== blocksBlue[i]) && this.y > blocksY[i]-90 && this.y < blocksY[i]) {
       this.CPUright = false;
       this.CPUleft = false;
       this.CPUup = false;
           
       }
        
    }
       
   }
};

var drawPlayerChoose = function(x, y, whichPlayer) {
    this.x = x;
    this.y = y;
    this.drawChoosePlayer = [];
    this.selected = [];
    this.drawChoosePlayer[0] = drawIdlePerson1;
    this.drawChoosePlayer[1] = drawIdlePerson1;
    this.drawChoosePlayer[2] = drawIdlePerson1;
    this.drawChoosePlayer[3] = drawIdlePerson1;
    this.selected = [false, false, false, false];
    this.whichPlayer = whichPlayer;
    if(whichPlayer === playerOne) {
        this.selected[0] = true;
        this.drawChoosePlayer[0] = drawFallingPerson;
    }
    if(whichPlayer === playerTwo) {
        this.selected[3] = true;
        this.drawChoosePlayer[3] = drawFallingPerson;
    }
    if(whichPlayer === playerThree) {
        this.selected[1] = true;
        this.drawChoosePlayer[1] = drawFallingPerson;
    }
    if(whichPlayer === playerFour) {
        this.selected[2] = true;
        this.drawChoosePlayer[2] = drawFallingPerson;
    }
};
drawPlayerChoose.prototype.draw = function() {
    this.drawChoosePlayer[0](this.x-25, this.y-25, 255, 0, 0);
    this.drawChoosePlayer[1](this.x+25, this.y-25, 255, 255, 0);
    this.drawChoosePlayer[2](this.x-25, this.y+25, 0, 255, 0);
    this.drawChoosePlayer[3](this.x+25, this.y+25, 0, 0, 255);
    if(mouseX > this.x-30 && mouseX < this.x - 20 && mouseY > this.y - 55 && mouseY < this.y - 15) {
        this.drawChoosePlayer[0] = drawFallingPerson;
        if(mouseIsPressed) {
            this.selected[0] = true;
            this.selected[1] = false;
            this.selected[2] = false;
            this.selected[3] = false;
            this.whichPlayer.red = 255;
            this.whichPlayer.green = 0;
            this.whichPlayer.blue = 0;
        }
    }else{if(this.selected[0] === false) {
        this.drawChoosePlayer[0] = drawIdlePerson1;
    }}
    if(mouseX < this.x+30 && mouseX > this.x + 20 && mouseY > this.y - 55 && mouseY < this.y - 15) {
        this.drawChoosePlayer[1] = drawFallingPerson;
        if(mouseIsPressed) {
            this.selected[1] = true;
            this.selected[0] = false;
            this.selected[2] = false;
            this.selected[3] = false;
            this.whichPlayer.red = 255;
            this.whichPlayer.green = 255;
            this.whichPlayer.blue = 0;
        }
    }else{if(this.selected[1] === false) {
        this.drawChoosePlayer[1] = drawIdlePerson1;
    }}
    if(mouseX > this.x-30 && mouseX < this.x - 20 && mouseY > this.y - 5 && mouseY < this.y + 35) {
        this.drawChoosePlayer[2] = drawFallingPerson;
        if(mouseIsPressed) {
            this.selected[2] = true;
            this.selected[1] = false;
            this.selected[0] = false;
            this.selected[3] = false;
            this.whichPlayer.red = 0;
            this.whichPlayer.green = 255;
            this.whichPlayer.blue = 0;
        }
    }else{if(this.selected[2] === false) {
        this.drawChoosePlayer[2] = drawIdlePerson1;
    }}
    if(mouseX < this.x+30 && mouseX > this.x + 20 && mouseY > this.y - 5 && mouseY < this.y + 35) {
        this.drawChoosePlayer[3] = drawFallingPerson;
        if(mouseIsPressed) {
            this.selected[3] = true;
            this.selected[0] = false;
            this.selected[2] = false;
            this.selected[1] = false;
            this.whichPlayer.red = 0;
            this.whichPlayer.green = 0;
            this.whichPlayer.blue = 255;
        }
    }else{if(this.selected[3] === false) {
        this.drawChoosePlayer[3] = drawIdlePerson1;
    }}
};

var player1Choose = new drawPlayerChoose(80, 208, playerOne);
var otherPlayer1Choose = new drawPlayerChoose(200, 208, playerOne);
var player2Choose = new drawPlayerChoose(292, 208, playerTwo);
var player3Choose = new drawPlayerChoose(80, 338, playerThree);
var player4Choose = new drawPlayerChoose(292, 338, playerFour);





var gamePictures = [drawBattlePicture, drawKingPicture, drawBlockPicture];
var drawGame = function(x, y, pictureArray, nextGameState) {
    this.x = x;
    this.y = y;
    this.pictureArray = pictureArray;
    this.sAmount = 1;
    this.nextGameState = nextGameState;
};
drawGame.prototype.draw = function() {
    pushMatrix();
    scale(this.sAmount);
    if(this.pictureArray === 0) {
        fill(255, 0, 0);
        textSize(20);
        text("B", this.x/(this.sAmount)-37, this.y/this.sAmount-50);
        text("L", this.x/(this.sAmount)+23, this.y/this.sAmount-50);
        fill(255, 255, 0);
        text("A", this.x/(this.sAmount)-22, this.y/this.sAmount-50);
        text("E", this.x/(this.sAmount)+38, this.y/this.sAmount-50);
        fill(0, 255, 0);
        text("T", this.x/(this.sAmount)-7, this.y/this.sAmount-50);
        fill(0, 0, 255);
        text("T", this.x/(this.sAmount)+8, this.y/this.sAmount-50);
    }
    if(this.pictureArray === 1) {
        fill(255, 0, 0);
        textSize(20);
        text("K", this.x/(this.sAmount)-22, this.y/this.sAmount-90);
        text("O", this.x/(this.sAmount)-37, this.y/this.sAmount-70);
        text("E", this.x/(this.sAmount)+37, this.y/this.sAmount-70);
        text("L", this.x/(this.sAmount)+23, this.y/this.sAmount-50);
        fill(255, 255, 0);
        text("I", this.x/(this.sAmount)-8, this.y/this.sAmount-90);
        text("F", this.x/(this.sAmount)-22, this.y/this.sAmount-70);
        text("H", this.x/(this.sAmount)-22, this.y/this.sAmount-50);
        fill(0, 255, 0);
        text("N", this.x/(this.sAmount)+7, this.y/this.sAmount-90);
        text("T", this.x/(this.sAmount)+7, this.y/this.sAmount-70);
        text("I", this.x/(this.sAmount)-7, this.y/this.sAmount-50);
        fill(0, 0, 255);
        text("G", this.x/(this.sAmount)+23, this.y/this.sAmount-90);
        text("H", this.x/(this.sAmount)+22, this.y/this.sAmount-70);
        text("L", this.x/(this.sAmount)+8, this.y/this.sAmount-50);
    }
    if(this.pictureArray === 2) {
        fill(255, 0, 0);
        textSize(20);
        text("C", this.x/(this.sAmount)-45, this.y/this.sAmount-90);
        text("U", this.x/(this.sAmount)+15, this.y/this.sAmount-90);
        text("H", this.x/(this.sAmount), this.y/this.sAmount-70);
        text("O", this.x/(this.sAmount)-7, this.y/this.sAmount-50);
        fill(255, 255, 0);
        text("O", this.x/(this.sAmount)-30, this.y/this.sAmount-90);
        text("E", this.x/(this.sAmount)+30, this.y/this.sAmount-90);
        text("E", this.x/(this.sAmount)+15, this.y/this.sAmount-70);
        text("C", this.x/(this.sAmount)+7, this.y/this.sAmount-50);
        
        fill(0, 255, 0);
        text("N", this.x/(this.sAmount)-15, this.y/this.sAmount-90);
        text("R", this.x/(this.sAmount)+45, this.y/this.sAmount-90);
        text("B", this.x/(this.sAmount)-37, this.y/this.sAmount-50);
        text("K", this.x/(this.sAmount)+22, this.y/this.sAmount-50);
        fill(0, 0, 255);
        text("Q", this.x/(this.sAmount)+0, this.y/this.sAmount-90);
        text("T", this.x/(this.sAmount)-15, this.y/this.sAmount-70);
        text("L", this.x/(this.sAmount)-22, this.y/this.sAmount-50);
        text("S", this.x/(this.sAmount)+37, this.y/this.sAmount-50);
    }
    gamePictures[this.pictureArray](this.x/this.sAmount, this.y/this.sAmount);
    if(mouseX > this.x - 30 && mouseX < this.x + 30 && mouseY > this.y - 70 && mouseY < this.y + 30) {
        this.sAmount = 1.4;
        if(mouseIsPressed) {
            gameToPlay = this.nextGameState;
            gameState = this.nextGameState;
            if(numberOfPlayers === 1) {
                var r = round(random(1, 3));
                if(playerOne.red === 255 && playerOne.green === 0 && playerOne.blue === 0) {
                    if(r === 1) {
                        playerTwo.red = 255;
                        playerTwo.green = 255;
                        playerTwo.blue = 0;
                    }
                    if(r === 2) {
                        playerTwo.red = 0;
                        playerTwo.green = 255;
                        playerTwo.blue = 0;
                    }
                    if(r === 3) {
                        playerTwo.red = 0;
                        playerTwo.green = 0;
                        playerTwo.blue = 255;
                    }
                }
                if(playerOne.red === 255 && playerOne.green === 255 && playerOne.blue === 0) {
                    if(r === 1) {
                        playerTwo.red = 255;
                        playerTwo.green = 0;
                        playerTwo.blue = 0;
                    }
                    if(r === 2) {
                        playerTwo.red = 0;
                        playerTwo.green = 255;
                        playerTwo.blue = 0;
                    }
                    if(r === 3) {
                        playerTwo.red = 0;
                        playerTwo.green = 0;
                        playerTwo.blue = 255;
                    }
                }
                if(playerOne.red === 0 && playerOne.green === 255 && playerOne.blue === 0) {
                    if(r === 1) {
                        playerTwo.red = 255;
                        playerTwo.green = 255;
                        playerTwo.blue = 0;
                    }
                    if(r === 2) {
                        playerTwo.red = 255;
                        playerTwo.green = 0;
                        playerTwo.blue = 0;
                    }
                    if(r === 3) {
                        playerTwo.red = 0;
                        playerTwo.green = 0;
                        playerTwo.blue = 255;
                    }
                }
                if(playerOne.red === 0 && playerOne.green === 0 && playerOne.blue === 255) {
                    if(r === 1) {
                        playerTwo.red = 255;
                        playerTwo.green = 255;
                        playerTwo.blue = 0;
                    }
                    if(r === 2) {
                        playerTwo.red = 0;
                        playerTwo.green = 255;
                        playerTwo.blue = 0;
                    }
                    if(r === 3) {
                        playerTwo.red = 255;
                        playerTwo.green = 255;
                        playerTwo.blue = 0;
                    }
                }
            }
        }
    }else{
        this.sAmount = 1;
    }
    popMatrix();
};

var battle = new drawGame(80, 230, 0, "battle");
var king = new drawGame(200, 230, 1, "king");
var blockMode = new drawGame(320, 230, 2, "blockMode");

var drawWinCount = function(x, y, player) {
    this.x = x;
    this.y = y;
    this.player = player;
};
drawWinCount.prototype.draw = function() {
    
    pushMatrix();
    scale(2.8);
     drawIdlePerson1(this.x/2.8, this.y/2.8, this.player.red, this.player.green, this.player.blue);
     noFill();
     strokeWeight(1);
     stroke(this.player.red, this.player.green, this.player.blue);
     rect((this.x-45)/2.8, (this.y+16)/2.8, 90/2.8, 2, 4);
     fill(this.player.red, this.player.green, this.player.blue);
     textSize(10);
     text("WINS: " + this.player.wins, (this.x+6)/2.8, (this.y+42)/2.8);
     popMatrix();
};

var playerOneWinCount = new drawWinCount(45, 200, playerOne);
var playerTwoWinCount = new drawWinCount(145, 200, playerTwo);
var playerThreeWinCount = new drawWinCount(245, 200, playerThree);
var playerFourWinCount = new drawWinCount(345, 200, playerFour);

var drawPlayers = function() {
    
    if(numberOfPlayers === 1) {
        scaleAmount = 1;
      players = [playerOne, playerTwo]; 
      playerTwo.createCPU();
    }else{
        playerTwo.CPU = false;
    }
    if(numberOfPlayers === 2) {
        scaleAmount = 1;
        players = [playerOne, playerTwo];
    }
    if(numberOfPlayers === 3) {
        scaleAmount = 1.3;
        players = [playerOne, playerTwo, playerThree];
    }
    if(numberOfPlayers === 4) {
        scaleAmount = 1.3;
        players = [playerOne, playerTwo, playerThree, playerFour];
    }
    for(var i = 0; i < players.length; i++) {
        players[i].draw();
        players[i].shoot();
        players[i].ballsLeft((80+i*80)*scaleAmount); 
        players[i].blocksOwned((80+i*80)*scaleAmount);
        if(players[i].lives < 10 && gameState === "blockMode") {
        players[i].lives ++;
        }
        players[i].checkWin();
        
    }
    if(updatePlayers === true) {
        updatePlayers = false;
        if(gameState === "battle") {
            friction = 0.1;
        playerOne.x = 130;
        playerOne.y = 50;
        playerTwo.x = 368;
        playerTwo.y = 150;
        playerThree.x = 130;
        playerThree.y = 250;
        playerFour.x = 368;
        playerFour.y = 350;
        }
        if(gameState === "king") {
            friction = 0.01;
            playerOne.lives = 20;
            playerTwo.lives = 20;
            playerThree.lives = 20;
            playerFour.lives = 20;
        playerOne.x = 140*scaleAmount;
        playerOne.y = 70*scaleAmount;
        playerTwo.x = 260*scaleAmount;
        playerTwo.y = 70*scaleAmount;
        playerThree.x = 140*scaleAmount;
        playerThree.y = 170*scaleAmount;
        playerFour.x = 260*scaleAmount;
        playerFour.y = 170*scaleAmount;
        if(numberOfPlayers < 3) {
         playerOne.y = 160*scaleAmount;   
         playerTwo.y = 160*scaleAmount;   
            
        }}
        if(gameState === "blockMode") {
            friction = 0.1;
            playerOne.lives = 20;
            playerTwo.lives = 20;
            playerThree.lives = 20;
            playerFour.lives = 20;
        playerOne.x = 80*scaleAmount;
        playerOne.y = 340*scaleAmount;
        playerTwo.x = 240*scaleAmount;
        playerTwo.y = 340*scaleAmount;
        playerThree.x = 160*scaleAmount;
        playerThree.y = 340*scaleAmount;
        playerFour.x = 320*scaleAmount;
        playerFour.y = 340*scaleAmount;
        }
        
    }
};
var drawMainBackground = function() {
    background(0);
        pushMatrix();
        scale(1.9);
        fill(255, 0, 0, 255);
        textSize(23);
        text("M", 150/1.9, 30/1.9);
        fill(255, 255, 0, 255);
        text("I", 185/1.9, 30/1.9);
        fill(0, 255, 0, 255);
        text("N", 215/1.9, 30/1.9);
        fill(0, 0, 255, 255);
        text("I", 250/1.9, 30/1.9);
        textSize(45);
        fill(255, 0, 0, 255);
        text("s", 130/1.9, 92/1.9);
        fill(255, 255, 0, 255);
        text("T", 180/1.9, 92/1.9);
        fill(0, 255, 0, 255);
        text("I", 225/1.9, 92/1.9);
        fill(0, 0, 255, 255);
        text("X", 260/1.9, 92/1.9);
        
        noFill();
        strokeWeight(1);
        stroke(255, 255, 0);
        ellipse(150/1.9, 240/1.9, 6/1.9, 6/1.9);
        stroke(255, 0, 0);
        rect(105/1.9, 212/1.9, 120/1.9, 4/1.9, 4/1.9);
        stroke(255, 255, 0);
        rect(55/1.9, 312/1.9, 180/1.9, 4/1.9, 4/1.9);
        stroke(0, 255, 0);
        rect(305/1.9, 302/1.9, 60/1.9, 4/1.9, 4/1.9);
        stroke(0, 0, 255);
        //rect(365/2.2, 232/2.2, 35/2.2, 4/2.2, 4/2.2);
        drawThrowPerson3(110/1.9, 298/1.9, 255, 255, 0);
        drawPerson1(260/1.9, 280/1.9, 0, 255, 0);
        drawFallingPerson(80/1.9, 214/1.9, 0, 0, 255);
        drawKickPersonL3(130/1.9, 204/1.9, 255, 0, 0);
        popMatrix();
        };
var gameMenuBackground = function() {
    
    

};
var choosePlayersButtons = function(x, y, rotation) {
  pushMatrix();
  translate(x, y);
  rotate(rotation);
  stroke(255, 255, 0);
  fill(255, 255, 0);
  quad(0, 0, 5, 0, -5, 10, -10, 10);
  quad(0, 20, 5,20, -5, 10, -10, 10);
  popMatrix();
};
var drawChoosePlayerButtons = function() {
        battle.draw();
        king.draw();
        blockMode.draw();
        drawWord("CHOOSE A GAME", 60, 40, 45);
};
var drawFloor = function() {
    noFill();
    stroke(255);
    rect(0, 365*scaleAmount, 400*scaleAmount, 4, 4);
};
var drawBall = function(x, y, r, g, b) {
    if(gameState === "battle") {
    noFill();
    strokeWeight(0.5);
    stroke(r, g, b);
    ellipse(x, y, 5, 5);
    }else{
       noFill();
    strokeWeight(0.5);
    stroke(0, 0, 255);
    arc(x, y, 5, 5, 0, 90);
    stroke(0, 255, 0);
    arc(x, y, 5, 5, 90, 180);
    stroke(255, 255, 0);
    arc(x, y, 5, 5, 180, 270);
    stroke(255, 0, 0);
    arc(x, y, 5, 5, 270, 360); 
    }
    
};
var drawBlocks = function() {
    if(updateBlocks === true) {
if(gameState === "blockMode") {
    if(numberOfPlayers < 3) {scaleAmount = 1;}
    if(numberOfPlayers > 3) {scaleAmount = 1.3;}
    numberOfBlocks = 24;
    for(var i = 0; i < numberOfBlocks; i ++) {
        blocksRotate[i] = 0;
    blocksRed[i] = 255;
    blocksGreen[i] = 255;
    blocksBlue[i] = 255;
    if(i < 4) {
    blocksX[i]= random(70, 100);
    }
    if(i < 8 && i > 3) {
    blocksX[i]= random(180, 230);
    }
    if(i < 12 && i > 7) {
    blocksX[i]= random(300, 340);
    }
    if(i < 16 && i > 11) {
    blocksX[i]= random(425, 460);
    }
    if(i === 0 || i === 4 || i === 8 || i === 12) {
    blocksY[i] = random(30*scaleAmount, 80*scaleAmount);
    }
    if(i === 1 || i === 5 || i === 9 || i === 13) {
    blocksY[i] = random(130*scaleAmount, 160*scaleAmount);
    }
    if(i === 2 || i === 6 || i === 10 || i === 14) {
    blocksY[i] = random(200*scaleAmount, 240*scaleAmount);
    }
    if(i === 3 || i === 7 || i === 11 || i === 15) {
    blocksY[i] = random(290*scaleAmount, 340*scaleAmount);
    }
    blocksLength[i] = random(40, 80);
}
}
if(gameState === "battle") {
    if(numberOfPlayers < 3) {scaleAmount = 1;}
    if(numberOfPlayers > 3) {scaleAmount = 1.3;}
    numberOfBlocks = 24;
    for(var i = 0; i < numberOfBlocks; i ++) {
        blocksRotate[i] = 0;
    if(i < 4) {
        if(i < 2) {
            blocksRed[i] = playerOne.red;
            blocksGreen[i] = playerOne.green;
            blocksBlue[i] = playerOne.blue;
        }
        if(i > 1) {
            blocksRed[i] = playerThree.red;
            blocksGreen[i] = playerThree.green;
            blocksBlue[i] = playerThree.blue;
        }
    blocksX[i]= 50;
    }
    if(i < 8 && i > 3) {
        if(i < 6) {
            blocksRed[i] = playerOne.red;
            blocksGreen[i] = playerOne.green;
            blocksBlue[i] = playerOne.blue;
        }
        if(i > 5) {
            blocksRed[i] = playerThree.red;
            blocksGreen[i] = playerThree.green;
            blocksBlue[i] = playerThree.blue;
        }
    blocksX[i]= 130;
    }
    if(i < 12 && i > 7) {
        if(i < 10) {
            blocksRed[i] = playerOne.red;
            blocksGreen[i] = playerOne.green;
            blocksBlue[i] = playerOne.blue;
        }
        if(i > 9) {
            blocksRed[i] = playerThree.red;
            blocksGreen[i] = playerThree.green;
            blocksBlue[i] = playerThree.blue;
        }
    blocksX[i]= 210;
    }
    if(i < 16 && i > 11) {
        if(i < 14) {
            blocksRed[i] = playerTwo.red;
            blocksGreen[i] = playerTwo.green;
            blocksBlue[i] = playerTwo.blue;
        }
        if(i > 13) {
            blocksRed[i] = playerFour.red;
            blocksGreen[i] = playerFour.green;
            blocksBlue[i] = playerFour.blue;
        }
    blocksX[i]= 290;
    }
    if(i < 20 && i > 15) {
        if(i < 18) {
            blocksRed[i] = playerTwo.red;
            blocksGreen[i] = playerTwo.green;
            blocksBlue[i] = playerTwo.blue;
        }
        if(i > 17) {
            blocksRed[i] = playerFour.red;
            blocksGreen[i] = playerFour.green;
            blocksBlue[i] = playerFour.blue;
        }
    blocksX[i]= 370;
    }
    if(i < 24 && i > 19) {
        if(i < 22) {
            blocksRed[i] = playerTwo.red;
            blocksGreen[i] = playerTwo.green;
            blocksBlue[i] = playerTwo.blue;
        }
        if(i > 21) {
            blocksRed[i] = playerFour.red;
            blocksGreen[i] = playerFour.green;
            blocksBlue[i] = playerFour.blue;
        }
    blocksX[i]= 450;
    }
    if(i === 0 || i === 4 || i === 8 || i === 12 || i === 16|| i === 20) {
    blocksY[i] = 55*1.3;
    }
    if(i === 1 || i === 5 || i === 9 || i === 13|| i === 17|| i === 21) {
    blocksY[i] = 135*1.3;
    }
    if(i === 2 || i === 6 || i === 10 || i === 14|| i === 18|| i === 22) {
    blocksY[i] = 215*1.3;
    }
    if(i === 3 || i === 7 || i === 11 || i === 15|| i === 19|| i === 23) {
    blocksY[i] = 295*1.3;
    }
    if(numberOfPlayers < 3) {
        
       if(i === 3 || i === 7 || i === 11 || i === 15|| i === 19|| i === 23) {
    blocksY[i] = 495*1.3;
    } 
    if(i < 4) {
        if(i < 2) {
            blocksRed[i] = playerOne.red;
            blocksGreen[i] = playerOne.green;
            blocksBlue[i] = playerOne.blue;
        }
        if(i > 1) {
            blocksRed[i] = playerOne.red;
            blocksGreen[i] = playerOne.green;
            blocksBlue[i] = playerOne.blue;
        }
        if(i === 3) {
          blocksRed[i] = 255;
            blocksGreen[i] = 255;
            blocksBlue[i] = 255;  
        }
    blocksX[i]= 50;
    }
    if(i < 8 && i > 3) {
        if(i < 6) {
            blocksRed[i] = playerOne.red;
            blocksGreen[i] = playerOne.green;
            blocksBlue[i] = playerOne.blue;
        }
        if(i > 5) {
            blocksRed[i] = playerOne.red;
            blocksGreen[i] = playerOne.green;
            blocksBlue[i] = playerOne.blue;
        }
        if(i === 7) {
          blocksRed[i] = 255;
            blocksGreen[i] = 255;
            blocksBlue[i] = 255;  
        }
    blocksX[i]= 150;
    }
    if(i < 12 && i > 7) {
        if(i < 10) {
            blocksRed[i] = playerTwo.red;
            blocksGreen[i] = playerTwo.green;
            blocksBlue[i] = playerTwo.blue;
        }
        if(i > 9) {
            blocksRed[i] = playerTwo.red;
            blocksGreen[i] = playerTwo.green;
            blocksBlue[i] = playerTwo.blue;
        }
        if(i === 11) {
          blocksRed[i] = 255;
            blocksGreen[i] = 255;
            blocksBlue[i] = 255;  
        }
    blocksX[i]= 250;
    }
    if(i < 16 && i > 11) {
        if(i < 14) {
            blocksRed[i] = playerTwo.red;
            blocksGreen[i] = playerTwo.green;
            blocksBlue[i] = playerTwo.blue;
        }
        if(i > 13) {
            blocksRed[i] = playerTwo.red;
            blocksGreen[i] = playerTwo.green;
            blocksBlue[i] = playerTwo.blue;
        }
        if(i === 15) {
          blocksRed[i] = 255;
            blocksGreen[i] = 255;
            blocksBlue[i] = 255;  
        }
    blocksX[i]= 350;
    }
    if(i < 20 && i > 15) {
        if(i < 18) {
            blocksRed[i] = 255;
            blocksGreen[i] = 255;
            blocksBlue[i] = 255;
        }
        if(i > 17) {
            blocksRed[i] = 255;
            blocksGreen[i] = 255;
            blocksBlue[i] = 255;
        }
    blocksX[i]= 450;
    }
    if(i < 24 && i > 19) {
        if(i < 22) {
            blocksRed[i] = 255;
            blocksGreen[i] = 255;
            blocksBlue[i] = 255;
        }
        if(i > 21) {
            blocksRed[i] = 255;
            blocksGreen[i] = 255;
            blocksBlue[i] = 255;
        }
    blocksX[i]= 450;
    }
    }
    blocksLength[i] = 60;
}
}
if(gameState === "king") {
    blocksRotate[0] = 0;
    blocksRotate[1] = 0;
    blocksRed[0] = 255;
    blocksGreen[0] = 255;
    blocksBlue[0] = 255;
    blocksRed[1] = 255;
    blocksGreen[1] = 255;
    blocksBlue[1] = 255;
    if(numberOfPlayers > 2) {
    numberOfBlocks = 2;
    blocksX[0] = 200*1.3;
    blocksY[0] = 200*1.3;
    blocksX[1] = 200*1.3;
    blocksY[1] = 100*1.3;
    }
    if(numberOfPlayers < 3) {
        numberOfBlocks = 1;
    blocksX[0] = 200;
    blocksY[0] = 200;
    blocksX[1] = 200;
    blocksY[1] = 100;
    }
    blocksLength[0] = 260;
    blocksLength[1] = 260;
}
updateBlocks = false;
}
    noFill();
    strokeWeight(scaleAmount);
    for(var i = 0; i < numberOfBlocks; i ++) {
    stroke(blocksRed[i], blocksGreen[i], blocksBlue[i]);
    pushMatrix();
        translate(blocksX[i], blocksY[i]);
        rotate(blocksRotate[i]);
        rectMode(CENTER);
    rect(0, 0, blocksLength[i], 4, 4);
    rectMode(LEFT);
    popMatrix();
    }
    
};
var drawBalls = function() {
    if(updateBalls === true) {
        if(gameState === "blockMode") {
            numberOfBalls = 8;
    for(var i = 0; i < numberOfBalls; i ++) {
    ballsTaken[i] = false;
    ballsX[i] = random(10, 390*scaleAmount);
    ballsY[i] = random(10, 280*scaleAmount);
}
updateBalls = false;
}
if(gameState === "battle") {
    numberOfBalls = 8;
    for(var i = 0; i < numberOfBalls; i ++) {
    ballsTaken[i] = false;
    ballsX[i] = blocksX[i*3];
    ballsY[i] = blocksY[i*3]-40;
    ballsTimer[i] = 0;
}
updateBalls = false;
}
}
if(gameState === "king") {
    numberOfBalls = 0;
}
    for(var i = 0; i < numberOfBalls; i ++) {
        
        if(ballsTaken[i] === false) {
    drawBall(ballsX[i], ballsY[i], blocksRed[i*3], blocksGreen[i*3], blocksBlue[i*3]);
        }
    }
};
var draw = function() {
    textFont(font);
    if(gameState === "mainMenu") {
        background(0);
        drawMainBackground();
        playButton.draw();
        logo(370, 370, 10, elBenoTextX, elBenoTextY, elBenoLogoText, 18, 250, 250, 250, "counterClockWise", "3D", 2);
        //playerOneWinCount.draw();
        
        
    }
    textFont(font);
    if(gameState === "gameMenu") {
        background(0);
        buttonTimer ++;
        drawChoosePlayerButtons();
        backButton.draw();

    }
    if(gameState === "choosePlayer") {
     buttonTimer ++;
     background(0);
     drawWord("USERS", 160, 30, 40);
     if(numberOfPlayers > 0) {
         if(numberOfPlayers > 1) {
         drawWord("PLAYER 1", 30, 130, 30);
         player1Choose.draw();
         }
         if(numberOfPlayers < 2) {
            drawWord("PLAYER 1", 150, 130, 30); 
            otherPlayer1Choose.draw();
         }
     }
     if(numberOfPlayers > 2) {
         player3Choose.draw();
         drawWord("PLAYER 3", 30, 260, 30);
     }
     if(numberOfPlayers > 1) {
         drawWord("PLAYER 2", 240, 130, 30);
         player2Choose.draw();
     }
     if(numberOfPlayers > 3) {
         player4Choose.draw();
         drawWord("PLAYER 4", 240, 260, 30);
     }
     fill(255, 0, 0);
        text(numberOfPlayers, 200, 360-270);
        choosePlayersButtons(170, 352-270, 0);
        choosePlayersButtons(230, 372-270, 180);
        if(mouseX > 150 && mouseX < 180 && mouseY > 350-270 && mouseY < 380-270) {
            if(mouseIsPressed && lessPlayers === true && numberOfPlayers > 1) {
              numberOfPlayers --;
              if(numberOfPlayers === 3) {numberOfPlayers = 2;
              }
              lessPlayers = false;
            }
        }
        if(mouseX > 220 && mouseX < 250 && mouseY > 350-270 && mouseY < 380-270) {
            if(mouseIsPressed && morePlayers === true && numberOfPlayers < 4) {
              numberOfPlayers ++; 
              if(numberOfPlayers === 3) {numberOfPlayers = 4;
              }
              morePlayers = false;
            }
        }
        if(!mouseIsPressed) {
          morePlayers = true;
          lessPlayers = true;
        }
        otherPlayButton.draw();
        helpButton.draw();
    }
    if(gameState === "howTo") {
       background(0);
       fill(255, 0, 0);
       textSize(20);
       text("USE THE ARROW KEYS TO CONTROL YOUR", 200, 40);
       fill(255, 255, 0);
       text("PLAYER. UP IS JUMP, RIGHT IS MOVE", 200, 70);
       fill(0, 255, 0);
       text("RIGHT, LEFT IS MOVE LEFT, ENTER IS", 200, 100);
       fill(0, 0, 255);
       text("ATTACK OR THROW BALLS. YOU CAN THROW ", 200, 130);
       fill(255, 0, 0);
       text("BALLS ONLY IF YOUR PLAYER HAS BALLS", 200, 160);
       fill(255, 255, 0);
       text("TO THROW.", 200, 190);
       otherBackButton.draw();
        
        
        
        
    }
    if(gameState === "wins") {
        background(0);
        playerOneWinCount.draw();
        playerTwoWinCount.draw();
        playerThreeWinCount.draw();
        playerFourWinCount.draw();
        otherBackButton.draw();
        evenOtherPlayButton.draw();
    }
    if(gameState === "battle"){
        battleTimer ++;
        if(battleTimer < 400) {
            background(0);
            fill(255, 255, 0);
            textSize(20);
            text("THE OBJECT OF BATTLE IS TO TAKE\n AWAY ALL OF YOUR OPPONENTS' BALLOONS", 200, 40);
            fill(0,  (cos(frameCount*5))*255+255, 0);
            text("SKIP", 200, 350);
            if(mouseIsPressed && mouseY > 330) {
                battleTimer = 401;
            }
        }
    if(battleTimer > 400) {
    pushMatrix();
    scale(1/scaleAmount);
    background(0);
    drawBlocks();
    drawBalls();
    drawPlayers();
    drawFloor();
    popMatrix();
    if(oneWon === false) {
    winAlpha = 0;
    }
    
    }}
    if(gameState === "blockMode"){
        battleTimer ++;
        if(battleTimer < 400) {
            background(0);
            fill(0, 255, 0);
            textSize(20);
            text("THE OBJECT OF CONQUER THE BLOCKS IS TO \nTURN AS MANY BLOCKS AS POSSIBLE TO \nYOUR COLOR", 200, 40);
            fill( (cos(frameCount*5))*255+255, 0, 0);
            text("SKIP", 200, 350);
            if(mouseIsPressed && mouseY > 330) {
                battleTimer = 401;
            }
        }
        if(battleTimer > 400) {
            
    pushMatrix();
    scale(1/scaleAmount);
    background(0);
    drawTimer();
    drawBlocks();
    drawBalls();
    drawPlayers();
    drawFloor();
    fill(0);
    noStroke();
    rect(0, 0, 60, 10);
    if(oneWon === false) {
    winAlpha = 0;
    }
    popMatrix();
    }}
    if(gameState === "king") {
        battleTimer ++;
        if(battleTimer < 400) {
            background(0);
            fill(255, 0, 0);
            textSize(20);
            text("THE OBJECT OF KING OF THE HILL IS TO\n KNOCK YOUR OPPONENT(S) ONTO THE \nGROUND BELOW", 200, 40);
            fill(0, 0, (cos(frameCount*5))*255+255);
            text("SKIP", 200, 350);
            if(mouseIsPressed && mouseY > 330) {
                battleTimer = 401;
            }
        }
        if(battleTimer > 400) {
        pushMatrix();
    scale(1/scaleAmount);
    background(0);
    drawBlocks();
    drawBalls();
    drawPlayers();
    drawFloor();
    if(blocksRotate[0] > rotateTimer) {
        rotateUp = false;
        rotateTimer +=1;
    }
    if(blocksRotate[0] < (-1*rotateTimer)) {
        rotateUp = true;
        rotateTimer +=1;
    }
    if(rotateUp === true) {
        blocksRotate[0] +=0.1;
        blocksRotate[1] -=0.1;
    }
    if(rotateUp === false) {
        blocksRotate[0] -=0.1;
        blocksRotate[1] +=0.1;
    }
    if(oneWon === false) {
        winAlpha = 0;
    }
    popMatrix();
    }}
    if(oneWon === true) {
        winAlpha +=0.1;
        fill(0, 0, 0, winAlpha*winAlpha);
        rect(0, 0, 400, 400);
        if(winAlpha*winAlpha > 400) {
            gameState = "wins";
            battleTimer = 0;
            oneWon = false;
            rotateTimer = false;
            updatePlayers = true;
            updateBalls = true;
            updateBlocks = true;
            playerOne.win = false;
            playerTwo.win = false;
            playerThree.win = false;
            playerFour.win = false;
            gameTimer = 180;
            if(numberOfPlayers === 4) {
               playerOneWinCount.x = 45;
               playerTwoWinCount.x = 145;
               playerThreeWinCount.x = 245;
               playerFourWinCount.x = 345;
            }
            if(numberOfPlayers < 3) {
               playerOneWinCount.x = 145;
               playerTwoWinCount.x = 245;
               playerThreeWinCount.x = 845;
               playerFourWinCount.x = 845;
            }
            
        }
        
    }
    
    
     
};
// 200 votes in 24 hrs