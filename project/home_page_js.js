let pacifico;
let frames1;
let frames2;
let frames3;
let mouseHoverChecker;

//loads the font
function preload()
{
	pacifico = loadFont('assets/Pacifico-Regular.otf'); 
}

//Draws the background and all three buttons in the correct position using the parallaxX and parallaxY variables
function drawHomePage(frames1, frames2, frames3, parallaxX, parallaxY)
{
	clear();
	
	//remove drop shadow effect
	drawingContext.shadowColor = 'black';
	drawingContext.shadowBlur = 0;
	drawingContext.shadowOffsetX = 0;
	drawingContext.shadowOffsetY = 0;
	
	strokeWeight(0);
	fill(32, 63, 153);
	rect(0, 0, windowWidth, windowHeight/6);
	
	strokeWeight(1);
	setGradient(0, windowHeight/6, windowWidth, 29 * windowHeight/42, color(75, 154, 208), color(221, 236, 246));
	stroke('black');
	fill(48, 45, 46);
	rect(0, 6 * windowHeight/7, windowWidth, windowHeight/7);
	
	//drop shadow effect
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	
	fill(25, 154, 75);
	rect(0, 2 * windowHeight/7 - (5 * frames1)/2 + parallaxY, 2 * windowWidth/5 + (5 * frames1) + parallaxX, windowHeight/7 + (5 * frames1), 0, windowWidth/14, windowWidth/14, 0);
	rect(3 * windowWidth/5 + parallaxX - (5 * frames2), 3 * windowHeight/7 - (5 * frames2)/2 + parallaxY, 2 * windowWidth/5 + (5 * frames2) - parallaxX, windowHeight/7 + (5 * frames2), windowWidth/14, 0, 0, windowWidth/14);
	rect(0, 4 * windowHeight/7 - (5 * frames3)/2 + parallaxY, 2 * windowWidth/5 + (5 * frames3) + parallaxX, windowHeight/7 + (5 * frames3), 0, windowWidth/14, windowWidth/14, 0);
	
	textAlign(CENTER);
	fill('white');
	textSize(min(windowHeight/488.5, windowWidth/960) * frames1 + min(windowHeight/20.35, windowWidth/40));
	text('Exercise One: Circle Popping', windowWidth/5 + parallaxX, 3 * windowHeight/8 + parallaxY);
	textSize(min(windowHeight/488.5, windowWidth/960) * frames2 + min(windowHeight/20.35, windowWidth/40));
	text('Exercise Two: Matching Pairs', 4 * windowWidth/5 + parallaxX, 15 * windowHeight/29 + parallaxY);
	textSize(min(windowHeight/488.5, windowWidth/960) * frames3 + min(windowHeight/20.35, windowWidth/40));
	text('Exercise Three: Tracing Shapes', windowWidth/5 + parallaxX, 27 * windowHeight/41 + parallaxY);
	
	fill(25, 154, 75);
	stroke(20, 102, 51);
	strokeWeight(6);
	textSize(min(windowHeight/13.57, windowWidth/26.67));
	text('JumpStart', windowWidth/2, windowHeight/9);
}

//draws the homepage the first time
function setup() 
{
	textFont(pacifico);
	frames1 = 0;
	frames2 = 0;
	frames3 = 0;
	createCanvas(windowWidth, windowHeight);
	drawHomePage(frames1, frames2, frames3, 0, 0);
}

//redraws on window resize
function windowResized() 
{
	frames1 = 0;
	frames2 = 0;
	frames3 = 0;
	resizeCanvas(windowWidth, windowHeight);
	drawHomePage(frames1, frames2, frames3, 0, 0);
}

//checks where the mouse is upon moving mouse, depending on the gamestate we're in, and sets mouseHoverChecker accordingly
function mouseMoved()
{
	if(mouseY > 2 * windowHeight/7 && mouseY < 3 * windowHeight/7 && mouseX < 2 * windowWidth/5)
	{
		mouseHoverChecker = 1;
		cursor(HAND);
	}
	else if(mouseY > 3 * windowHeight/7 && mouseY < 4 * windowHeight/7 && mouseX > 3 * windowWidth/5)
	{
		mouseHoverChecker = 2;
		cursor(HAND);
	}
	else if(mouseY > 4 * windowHeight/7 && mouseY < 5 * windowHeight/7 && mouseX < 2 * windowWidth/5)
	{
		mouseHoverChecker = 3;
		cursor(HAND);
	} 
	else
	{
		mouseHoverChecker = 0;
		cursor(ARROW);
	}
}

//This one is tricky. It utilizes a system of detecting for how many frames any given button out of the three buttons has been hovered.
//Essentially, we only grow buttons for a couple frames after being hovered over, and then we stop growing them.
function draw() 
{
	switch(mouseHoverChecker)
	{
		case 1:
			if(frames1 < 5)
			{
				frames1++;
				if(frames2 > 0) frames2--;
				if(frames3 > 0) frames3--;
			}
			break;
		case 2:
			if(frames2 < 5)
			{
				frames2++;
				if(frames1 > 0) frames1--;
				if(frames3 > 0) frames3--;
			}
			break;
		case 3:
			if(frames3 < 5)
			{
				frames3++;
				if(frames1 > 0) frames1--;
				if(frames2 > 0) frames2--;
			}
			break;
		default:
			if(frames1 > 0) frames1--;
			if(frames2 > 0) frames2--;
			if(frames3 > 0) frames3--;
			break;
	}
	
	drawHomePage(frames1, frames2, frames3, (windowWidth/2 - mouseX)/100, (windowHeight/2 - mouseY)/100);
}

//if the user clicks, use the determined mouse position from mouseHoverChecker to do whatever action necessary
function mouseClicked()
{
	switch(mouseHoverChecker)
	{
		case 1:
			window.location.replace('exercise_one.html');
			break;
		case 2: 
			window.location.replace('exercise_two.html');
			break;
		case 3:
			window.location.replace('exercise_three.html');
			break;
		default:
			break;
	}
}

//Sets a gradient for a given rectangular region. It was taken from the p5js website. I have no idea how it works.
function setGradient(x, y, w, h, c1, c2) 
{
	noFill();
	for (let i = y; i <= y + h; i++) 
	{
	  let inter = map(i, y, y + h, 0, 1);
	  let c = lerpColor(c1, c2, inter);
	  stroke(c);
	  line(x, i, x + w, i);
	}
}