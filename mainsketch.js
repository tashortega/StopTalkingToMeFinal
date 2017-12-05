var playerSprite;
var playerresting;
var playerrestingleft;
var playerleft;
var playerright;
var playerstop;
var screaming
var greenSprite;
var greenpeace;
var blueapron;
var freehugs;
var i = 0;
var bg;
var lastbg;
var lowmeter;
var goodmeter;
var highmeter;
var offmeter;
var mic;


function preload() {
    playerresting = loadAnimation("assets/resting1.png", "assets/resting8.png");
    playerrestingleft = loadAnimation("assets/restingleft1.png", "assets/restingleft8.png");
    playerstop = loadAnimation("assets/stopped1.png", "assets/stopped8.png");
    playerleft = loadAnimation("assets/leftrun01.png", "assets/leftrun13.png");
    playerright = loadAnimation("assets/rightrun01.png", "assets/rightrun13.png");
    screaming = loadAnimation("assets/scream01.png", "assets/scream13.png");
    greenpeace = loadAnimation("assets/greenpeace1.png", "assets/greenpeace4.png");
    blueapron = loadAnimation("assets/blueapron1.png", "assets/blueapron4.png");
    freehugs = loadAnimation("assets/freehugs1.png", "assets/freehugs4.png");
    back1 = loadImage("assets/bg1.png");
    back2 = loadImage("assets/bg2.png");
    back3 = loadImage("assets/bg3.png");
    back4 = loadImage("assets/bg4.png");
    back5 = loadImage("assets/finished1.png");
    lowmeter = loadAnimation("assets/meterlow1.png", "assets/meterlow4.png");
    goodmeter = loadAnimation("assets/metergood1.png", "assets/metergood4.png");
    highmeter = loadAnimation("assets/meterhigh1.png", "assets/meterhigh4.png");
    offmeter = loadAnimation("assets/meteroff1.png", "assets/meteroff2.png");
    
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    mic = new p5.AudioIn();
    mic.start();

    greenSprite = createSprite(1500, 719);
    greenSprite.addAnimation("green", greenpeace);
    greenSprite.setCollider("rectangle", -150, -200, 250, 525);

    blueSprite = createSprite(1100, 719);
    blueSprite.addAnimation("blue", blueapron);
    blueSprite.setCollider("rectangle", -150, -200, 250, 550);

    redSprite = createSprite(700, 719);
    redSprite.addAnimation("red", freehugs);
    redSprite.setCollider("rectangle", -150, -200, 250, 525);

    playerSprite = createSprite(100, 719);
    playerSprite.addAnimation("resting", playerresting);
    playerSprite.addAnimation("restingleft", playerrestingleft);
    playerSprite.addAnimation("stopped", playerstop);
    playerSprite.addAnimation("run right", playerright);
    playerSprite.addAnimation("run left", playerleft);
    playerSprite.addAnimation("scream", screaming);
    playerSprite.setCollider("rectangle", 0, -200, 475, 525);
    
    meterSprite = createSprite(575, -5);
    meterSprite.addAnimation("low", lowmeter);
    meterSprite.addAnimation("good", goodmeter);
    meterSprite.addAnimation("high", highmeter);
     meterSprite.addAnimation("off", offmeter);
    
    bg = [back1, back2, back3, back4, back5];
    lastbg = bg.length-1;

}

function draw() {
    background(255);

//get mic sound
     var micLevel = mic.getLevel(0.0);
    var volume = map(micLevel, 0.0, 1.0, 0, 1000);
    
    console.log("sound level", volume);
    
//meter sprite volume change
    if (volume >= 0 && volume < 125 ) {
        meterSprite.changeAnimation("off");
    }
    
    if (volume >= 125 && volume < 300) {
        meterSprite.changeAnimation("low");
    }
    
    if (volume >= 300 && volume < 450) {
        meterSprite.changeAnimation("good");
        }
    
    if (volume >=450) {
        meterSprite.changeAnimation("high");
    }
    
    image (bg [i], 0, -200);
    
    drawSprite(playerSprite);
    drawSprite(meterSprite);

    playerSprite.velocity.x = 0

//resting animation
    if (keyIsPressed === false) {
        playerSprite.changeAnimation("resting");
    }

    
//run right
    if (keyIsDown(RIGHT_ARROW)) {
        playerSprite.velocity.x = 20;
        playerSprite.changeAnimation("run right");
    }

//run left
    if (keyIsDown(LEFT_ARROW)) {
        playerSprite.velocity.x = -20;
        playerSprite.changeAnimation("run left");
    }

//screen edge reset and counter
   if(playerSprite.position.x > width && i < lastbg)
    {playerSprite.position.x = 0;
     i++;
    }

/*     if(playerSprite.position.x < 0 && i > 0) {
        playerSprite.position.x = width;
        i--;
    }*/

//map edges stop
    if (playerSprite.position.x < 0) {
        playerSprite.position.x = 5;
    }
    
    if (playerSprite.position.x > width && i>= lastbg) {
        playerSprite.position.x = width - 5;
    }


//load stoppers their functions
    if (i == 0) {
        drawSprite(blueSprite);
        if (volume >= 125 && volume < 300) {
            playerSprite.changeAnimation("scream");
            playerSprite.overlap(blueSprite);
        } else {
            playerSprite.collide(blueSprite, playerstopped);
        }
    } else if (i == 1) {
        removeSprite(blueSprite);
        playerSprite.overlap(blueSprite);
           }
    
      if (i == 1) {
        drawSprite(greenSprite);
        if (volume >= 300 && volume < 450) {
            playerSprite.changeAnimation("scream");
            playerSprite.overlap(greenSprite);
        } else {
            playerSprite.collide(greenSprite, playerstopped);
        }
    } else if (i == 2) {
        removeSprite(greenSprite);
        playerSprite.overlap(greenSprite);
           }  
    
    if (i == 2) {
        drawSprite(redSprite);
        if (volume >=450 && volume < 1000) {
            playerSprite.changeAnimation("scream");
            playerSprite.overlap(redSprite);
        } else {
            playerSprite.collide(redSprite, playerstopped);
        }
    } else if (i == 3) {
        removeSprite(redSprite);
        playerSprite.overlap(redSprite);
           }
    
//screaming
/*
    if (keyIsDown(SHIFT)) {
        playerSprite.changeAnimation("scream");
        playerSprite.overlap(greenSprite);
    } else {
        return false;
        playerSprite.collide(greenSprite, playerstopped);
    } 
*/

//stopped change animation
    function playerstopped(playerSprite) {
        playerSprite.changeAnimation("stopped");
    }


//debug
    playerSprite.debug = mouseIsPressed;
    greenSprite.debug = mouseIsPressed;
    blueSprite.debug = mouseIsPressed;
    

}