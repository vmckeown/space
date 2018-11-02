const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;
const SPACESPEED_DECAY_MULT = 0.99;

shipClass.prototype = new movingWrapPositionClass();

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

	this.superclassReset = this.reset; //saves a reference to the parent's class movement
	this.reset = function() {
		this.ang = -0.5 * Math.PI;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.myShot.reset();
	}
					
	this.init = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.reset();
	}	
	 	 
	this.superclassMove = this.movement; //saves a reference to the parent's class movement
	this.movement = function() {
		
		if(this.keyHeld_TurnLeft){
			this.ang -= TURN_RATE*Math.PI;
		}
		if(this.keyHeld_TurnRight){
			this.ang += TURN_RATE*Math.PI;
		}
		if(this.keyHeld_Thrust){
			this.xv += THRUST_POWER * Math.cos(this.ang);
			this.yv += THRUST_POWER * Math.sin(this.ang);
		}
			
		this.superclassMove();		
		
		this.xv *= SPACESPEED_DECAY_MULT;
		this.yv *= SPACESPEED_DECAY_MULT;
		
		this.myShot.movement();
	}	
	
	this.draw = function(){
		this.myShot.draw();
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
	}
	
	this.cannonFire = function(){
		if(this.myShot.isShotReadyToFire()){
			this.myShot.shootFrom(this);
		}
	}
}