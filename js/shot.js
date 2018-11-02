const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;

shotClass.prototype = new movingWrapPositionClass();

function shotClass(){
	this.x = 60;
	this.y = 60;
	
	this.picture = document.createElement("img");
	
	this.superclassReset = this.reset;
	this.reset = function() {
		this.shotLife = 0;
		this.ang = -0.5 * Math.PI;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
	}
		
	this.isShotReadyToFire = function(){
		return (this.shotLife <= 0);
	}
	
	this.shootFrom = function(shipFiring){
		this.x = shipFiring.x;
		this.y = shipFiring.y;
		
		this.xv = Math.cos(shipFiring.ang) * SHOT_SPEED + shipFiring.xv;
		this.yv = Math.sin(shipFiring.ang) * SHOT_SPEED + shipFiring.yv;
		
		this.shotLife = SHOT_LIFE;
	}
	
	this.superclassMove = this.movement;  // saves a reference to the parent class's move
	this.movement = function() {
 
		if(this.shotLife > 0){
			this.shotLife--;
			this.superclassMove();
		}
	}	
	
	this.draw = function(){
		if(this.shotLife > 0){
			colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 'white')
		}
	}
}