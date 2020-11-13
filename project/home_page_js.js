//let pacifico;
let frames1;
let frames2;
let frames3;
let mouseHoverChecker;

function preload()
{
	//pacifico = loadFont('assets/Pacifico-Regular.otf'); 
}

function drawHomePage(frames1, frames2, frames3, parallaxX, parallaxY)
{
	clear();
	
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
	
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	fill(25, 154, 75);
	rect(0, 2 * windowHeight/7 - (5 * frames1)/2 + parallaxY, 2 * windowWidth/5 + (5 * frames1) + parallaxX, windowHeight/7 + (5 * frames1), 0, windowWidth/14, windowWidth/14, 0);
	rect(3 * windowWidth/5 + parallaxX - (5 * frames2), 3 * windowHeight/7 - (5 * frames2)/2 + parallaxY, 2 * windowWidth/5 + (5 * frames2) - parallaxX, windowHeight/7 + (5 * frames2), windowWidth/14, 0, 0, windowWidth/14);
	rect(0, 4 * windowHeight/7 - (5 * frames3)/2 + parallaxY, 2 * windowWidth/5 + (5 * frames3) + parallaxX, windowHeight/7 + (5 * frames3), 0, windowWidth/14, windowWidth/14, 0);
	
	textAlign(CENTER);
	fill('white');
	textSize(2 * frames1 + 48);
	text('Exercise One', windowWidth/5 + parallaxX, 3 * windowHeight/8 + parallaxY);
	textSize(2 * frames2 + 48);
	text('Exercise Two', 4 * windowWidth/5 + parallaxX, 15 * windowHeight/29 + parallaxY);
	textSize(2 * frames3 + 48);
	text('Exercise Three', windowWidth/5 + parallaxX, 27 * windowHeight/41 + parallaxY);
	
	fill(25, 154, 75);
	stroke(20, 102, 51);
	strokeWeight(8);
	textSize(72);
	text('JumpStart', windowWidth/2, windowHeight/9);
}

function setup() 
{
	frames1 = 0;
	frames2 = 0;
	frames3 = 0;
	createCanvas(windowWidth, windowHeight);
	drawHomePage(frames1, frames2, frames3, 0, 0);
}

function windowResized() 
{
	frames1 = 0;
	frames2 = 0;
	frames3 = 0;
	resizeCanvas(windowWidth, windowHeight);
	drawHomePage(frames1, frames2, frames3, 0, 0);
}

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
	
	drawHomePage(frames1, frames2, frames3, (windowWidth/2 - mouseX)/30, (windowHeight/2 - mouseY)/30);
}

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