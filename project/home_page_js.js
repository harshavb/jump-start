function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	drawingContext.shadowBlur = 5;
	drawingContext.shadowColor = 'light-gray';
	fill(25, 154, 75);
	beginShape();
	vertex(0, 2 * windowHeight/7);
	vertex(windowWidth/3, 2 * windowHeight/7);
	bezierVertex(windowWidth/3 + windowWidth/14, 2 * windowHeight/7, windowWidth/3 + windowWidth/14, 3 * windowHeight/7, windowWidth/3, 3 * windowHeight/7);
	vertex(0, 3 * windowHeight/7);
	endShape(CLOSE);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}