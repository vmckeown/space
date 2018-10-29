const SHOT_SPEED = 0.15;
const SHOT_LIFE = 0.03;
const SHOT_DISPLAY_RADIUS = 2.0;

function shotClass(){
	this.x = 60;
	this.y = 60;
	
	this.picture = document.createElement("img");
	
	this.reset = function() {
		this.shotLife = 0;
		this.driftX = 0;
		this.driftY = 0;
		this.ang = -0.5 * Math.PI;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
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
	
	this.shootFrom = function(shipFiring){
		this.x = shipFiring.x;
		this.y = shipFiring.y;
		
		this.xv = Math.cos(shipFiring.ang) * SHOT_SPEED + shipFiring.driftX;
		this.yv = Math.sin(shipFiring.ang) * SHOT_SPEED + shipFiring.driftY;
		
		this.shotLife = SHOT_LIFE;
	}
	 
	this.movement = function() {
		//if(this.shotLife > 0){
			this.shotLife--;
			this.x += this.xv;
			this.y += this.yv;
			this.handleScreenWrap();
		//}
	}	
	
	this.draw = function(){
		//if(this.shotLife > 0){
			colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 'white')
		//}
	}
}