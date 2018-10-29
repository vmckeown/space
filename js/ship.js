const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;
const SPACESPEED_DECAY_MULT = 0.99;

function shipClass() {
	this.myShot = new shotClass();
	
	this.x = 60;
	this.y = 60;
	
	this.keyHeld_Thrust = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.picture = document.createElement("img");
	
	this.setupControls = function(forwardKey,leftKey,rightKey,shotKey) {
		this.controlKeyForThrust = forwardKey;			
		this.controlKeyForTurnLeft = leftKey;
		this.controlKeyForTurnRight = rightKey;
		this.controlKeyForShotFire = shotKey;
	}

	this.vehicleReset = function() {
		this.driftX = 0;
		this.driftY = 0;
		this.ang = -0.5 * Math.PI;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.myShot.reset();
	}
					
	this.init = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.vehicleReset();
	}	
	 
	this.handleScreenWrap = function(){
		if(this.x <= 0){
			this.x = canvas.width;
		}
		else if(this.x >= canvas.width){
			this.x = 0;
		}
		else if(this.y <= 0){
			this.y = canvas.height;
		}
		else if(this.y >= canvas.height){
			this.y = 0;
		}
	}	
	 
	this.movement = function() {
		
		if(this.keyHeld_TurnLeft){
			this.ang -= TURN_RATE*Math.PI;
		}
		if(this.keyHeld_TurnRight){
			this.ang += TURN_RATE*Math.PI;
		}
		if(this.keyHeld_Thrust){
			this.driftX += THRUST_POWER * Math.cos(this.ang);
			this.driftY += THRUST_POWER * Math.sin(this.ang);
		}
		
		// Motion X and Y of the ship
		var nextX = Math.cos(this.ang) * this.driftX + this.x;  // I think I'm writing this line wrong
		var nextY = Math.sin(this.ang) * this.driftY + this.y;  // I think I'm writing this line wrong 	
		
		this.x = nextX;
		this.y = nextY; 
		
		this.handleScreenWrap();
		
		this.driftX *= SPACESPEED_DECAY_MULT;
		this.driftY *= SPACESPEED_DECAY_MULT;
		
		this.myShot.movement();
	}	
	
	this.draw = function(){
		this.myShot.draw();
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
	}
	
	this.cannonFire = function(){
		this.myShot.shootFrom(this);
		console.log("X: " + this.x);
		console.log("Y: " + this.y);
	}
}