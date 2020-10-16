function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	var context = p5.drawingContext;
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