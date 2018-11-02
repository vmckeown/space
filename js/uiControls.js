const KEY_W = 87; // "W"
const KEY_S = 83; // "S"
const KEY_A = 65; // "A"
const KEY_D = 68; // "D"

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_SPACEBAR = 32;

function initInput(){
	canvas.addEventListener('mousemove', function(evt) {
	
	var mousePos = calculateMousePos(evt);
	
	MousePosX = mousePos.x;
	MousePosY = mousePos.y;
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	playerOne.setupControls(KEY_W, KEY_A, KEY_D,KEY_SPACEBAR);
}

function keyPressed(evt) {
	setKeyHoldState(evt.keyCode, playerOne, true);
	evt.preventDefault();
	
	if(evt.keyCode == playerOne.controlKeyForShotFire){
		playerOne.cannonFire();
	}	
	
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, playerOne, false);
}


function setKeyHoldState(thisKey, thisShip, setTo) {

	if(thisKey == thisShip.controlKeyForThrust){
		thisShip.keyHeld_Thrust = setTo;
	}
	if(thisKey == thisShip.controlKeyForTurnLeft){
		thisShip.keyHeld_TurnLeft = setTo;
	}
	if(thisKey == thisShip.controlKeyForTurnRight){
		thisShip.keyHeld_TurnRight = setTo;
	}
}

