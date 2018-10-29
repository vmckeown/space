const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

var trackGrid = [
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
					1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
					1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,
					1,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,
					1,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,
					1,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,
					1,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,
					1,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,					
					1,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,
					1,0,0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,1,
					1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,
					1,2,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
					1,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					];
					
	const TRACK_ROAD = 0;
	const TRACK_WALL = 1;
	const TRACK_PLAYER = 2;
	const TRACK_GRASS = 3;
	const TRACK_FINISH = 4;


					
function drawTracks(){
	var trackIndex = 0;
	var trackLeftEdgeX = 0;
	var trackTopEdgeY = 0;
	
	for(var eachRow = 0; eachRow<TRACK_ROWS; eachRow++){
		
		trackLeftEdgeX = 0;
		
		for(var eachCol=0; eachCol<TRACK_COLS; eachCol++) {
			
			var trackTypeHere = trackGrid[trackIndex];
			
			canvasContext.drawImage(trackPics[trackTypeHere], trackLeftEdgeX, trackTopEdgeY);
			
			trackIndex++;
			trackLeftEdgeX += TRACK_W;
				
		} // end of each col
		
		trackTopEdgeY += TRACK_H;
		
	} // end of each row
}



function isWallAtTileCoord(trackTileCol, trackTileRow){
				var trackIndex = trackTileCol + TRACK_COLS*trackTileRow;
				return (trackGrid[trackIndex] == TRACK_WALL);
}

function rowColToArrayIndex(col, row) {
	return col + TRACK_COLS * row;
}			

			
function getTrackAtPixelCoord(pixelX,pixelY){
	var tileCol = pixelX / TRACK_W;		
	var tileRow = pixelY / TRACK_H;
				
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);
				
	if(tileCol < 0 || tileCol >= TRACK_COLS || tileRow < 0 || tileRow >= TRACK_ROWS) {
		return TRACK_WALL; // This returns Track Wall to prevent out of bounds as a wall.
	}
				
	var trackIndex = trackTileToIndex(tileCol, tileRow);
	return (trackGrid[trackIndex]);
}		

			
function trackTileToIndex(tileCol, tileRow) {
	return(tileCol + TRACK_COLS*tileRow);
}
			