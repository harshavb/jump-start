function setup() {
	createCanvas(windowWidth, windowHeight);
	drawingContext.shadowColor = 'black';
	strokeWeight(3);
	fill(32, 63, 153);
	rect(0, 0, windowWidth, windowHeight/6);
	strokeWeight(1);
	setGradient(0, windowHeight/6, windowWidth, 29 * windowHeight/42, color(75, 154, 208), color(221, 236, 246));
	strokeWeight(1);
	stroke('black');
	fill(48, 45, 46);
	rect(0, 6 * windowHeight/7, windowWidth, windowHeight/7);
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	fill(25, 154, 75);
	rect(0, 2 * windowHeight/7, 2 * windowWidth/5, windowHeight/7, 0, windowWidth/14, windowWidth/14, 0);
	rect(3 * windowWidth/5, 3 * windowHeight/7, 2 * windowWidth/5, windowHeight/7, windowWidth/14, 0, 0, windowWidth/14);
	rect(0, 4 * windowHeight/7, 2 * windowWidth/5, windowHeight/7, 0, windowWidth/14, windowWidth/14, 0);
}

function draw() {
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	drawingContext.shadowBlur = 0;
	drawingContext.shadowOffsetX = 0;
	drawingContext.shadowOffsetY = 0;
	strokeWeight(3);
	fill(32, 63, 153);
	rect(0, 0, windowWidth, windowHeight/6);
	strokeWeight(1);
	setGradient(0, windowHeight/6, windowWidth, 29 * windowHeight/42, color(75, 154, 208), color(221, 236, 246));
	strokeWeight(1);
	stroke('black');
	fill(48, 45, 46);
	rect(0, 6 * windowHeight/7, windowWidth, windowHeight/7);
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	fill(25, 154, 75);
	rect(0, 2 * windowHeight/7, 2 * windowWidth/5, windowHeight/7, 0, windowWidth/14, windowWidth/14, 0);
	rect(3 * windowWidth/5, 3 * windowHeight/7, 2 * windowWidth/5, windowHeight/7, windowWidth/14, 0, 0, windowWidth/14);
	rect(0, 4 * windowHeight/7, 2 * windowWidth/5, windowHeight/7, 0, windowWidth/14, windowWidth/14, 0);
}

function setGradient(x, y, w, h, c1, c2) {
	noFill();
	for (let i = y; i <= y + h; i++) 
	{
	  let inter = map(i, y, y + h, 0, 1);
	  let c = lerpColor(c1, c2, inter);
	  stroke(c);
	  line(x, i, x + w, i);
	}
}