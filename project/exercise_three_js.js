let pacifico;
let backArrow;
let settings;
let gaming;
let mouseHoverChecker;
let mouseXStartPosition;
let mouseYStartPosition;
let weight;
let drawingLine;
let shapeXPosition;
let shapeYPosition;
let shape;
let size;
let x;
let y;
let drawChecks;
let b;
let score;
let strikes;
let lost;

//load back arrow and font
function preload()
{
	backArrow = loadImage('assets/back-arrow.svg');
	pacifico = loadFont('assets/Pacifico-Regular.otf');
}


//draws several boxes and text within the boxes to display settings
function drawSettings()
{
	background(60);
	
	//drop shadow effect
	drawingContext.shadowColor = 'black';
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	
	fill(40);
	strokeWeight(4);
	stroke('black');
	rect(windowWidth/5, windowHeight/5, 3 * windowWidth/5, 3 * windowHeight/6, windowWidth/20);
	
	fill(20);
	rect(3 * windowWidth/13, 4 * windowHeight/9, windowWidth/6, windowHeight/5, windowWidth/30);
	rect(5 * windowWidth/12, 4 * windowHeight/9, windowWidth/6, windowHeight/5, windowWidth/30);
	rect(47 * windowWidth/78, 4 * windowHeight/9, windowWidth/6, windowHeight/5, windowWidth/30);
	
	fill(100);
	textAlign(CENTER);
	textSize(72);
	text('Difficulty', windowWidth/2, windowHeight/3);
	textSize(48);
	text('Easy', 49 * windowWidth/156, 5 * windowHeight/9);
	text('Medium', windowWidth/2, 5 * windowHeight/9);
	text('Hard', 107 * windowWidth/156, 5 * windowHeight/9);
	
	drawArrow();
}

//draws several boxes with text within them to display instructions
function drawInstructions()
{
	background(60);
	
	//drop shadow effect
	drawingContext.shadowColor = 'black';
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	
	fill(40);
	strokeWeight(4);
	stroke('black');
	rect(windowWidth/5, windowHeight/8, 3 * windowWidth/5, 3 * windowHeight/4, windowWidth/20);
	
	fill(20);
	rect(3 * windowWidth/13, 3 * windowHeight/5, 7 * windowWidth/13, windowHeight/5, windowWidth/30);
	
	fill(100);
	textAlign(CENTER);
	textSize(72);
	text('Exercise 3: Tracing Shapes', windowWidth/2, 4 * windowHeight/15);
	textSize(48);
	rectMode(CENTER);
	text('In this exercise, various shapes will appear on your screen. Trace the edges without losing 3 strikes.', windowWidth/2, 5 * windowHeight/9, windowWidth/2, windowHeight/2);
	rectMode(CORNER);
	text('Start', windowWidth/2, 32 * windowHeight/45);
	
	drawArrow();
}

//displays the current score and strikes
function drawScore()
{
	//drop shadow effect
	drawingContext.shadowColor = 'black';
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	textSize(72);
	strokeWeight(4);
	text('Score: ' + score, windowWidth/2, windowHeight/7);
	text('Strikes: ' + (3 - strikes), windowWidth/2, windowHeight/4);
	strokeWeight(weight);
}

//displays the game over screen using rectangles and text
function drawLost()
{
	background(60);
	
	//drop shadow effect
	drawingContext.shadowColor = 'black';
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	
	fill(color('darkred'));
	strokeWeight(4);
	stroke('black');
	rect(windowWidth/5, windowHeight/5, 3 * windowWidth/5, 3 * windowHeight/6, windowWidth/20);
	
	fill('#660000');
	rect(3 * windowWidth/13, 4 * windowHeight/9, 7 * windowWidth/13, windowHeight/5, windowWidth/30);
	
	fill(color('red'));
	textAlign(CENTER);
	textSize(72);
	text('Game Over (Score: ' + score + ')', windowWidth/2, windowHeight/3);
	textSize(48);
	text('Try Again?', windowWidth/2, 5 * windowHeight/9);
	
	drawArrow();
}

//creates a new shape on the screen
function createNewShape()
{
	clear();
	background(60);
	strokeWeight(weight);
	stroke('black');
	
	//drop shadow effect
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	
	x = Math.random() * (windowWidth - windowWidth/2) + (windowWidth/4);
	y = Math.random() * (windowHeight - windowHeight/2) + (windowHeight/4);
	size = Math.random() * windowWidth/8 + windowWidth/10;
	
	//picks between circle and square
	switch(Math.floor(Math.random() * 2))
	{
		case 0:
			shape = 0;
			rect(x - size/2, y - size/2, size, size);
			break;
		case 1:
			shape = 2;
			b = (size/2)/(Math.sqrt(2));
			circle(x, y, size);
			break;
		default:
			break;
	}
	drawArrow();
	drawScore();
}

//draws the back arrow
function drawArrow()
{
	drawingContext.shadowColor = 'black';
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	image(backArrow, 30, 30);
}

//initializes instructions
function setup()
{
	textFont(pacifico);
	settings = false;
	lost = false;
	drawingLine = false;
	instructions = true;
	score = 0;
	createCanvas(windowWidth, windowHeight);
	drawInstructions();
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
	if(settings) drawSettings();
	if(instructions) drawInstructions();
	if(lost) drawLost();
}

function mouseMoved()
{
	if(instructions)
	{
		if(mouseY > 3 * windowHeight/5 && mouseY < 4 * windowHeight/5 && mouseX > 3 * windowWidth/13 && mouseX < 10 * windowWidth/13)
		{
			mouseHoverChecker = 6;
			cursor(HAND);
		}
		else
		{
			mouseHoverChecker = 0;
			cursor(ARROW);
		}
	}
	if(settings)
	{
		if(mouseY > 4 * windowHeight/9 && mouseY < 29 * windowHeight/45)
		{
			if(mouseX > 3 * windowWidth/13 && mouseX < 31 * windowWidth/78)
			{
				mouseHoverChecker = 1;
				cursor(HAND);
			}
			else if(mouseX > 5 * windowWidth/12 && mouseX < 7 * windowWidth/12)
			{
				mouseHoverChecker = 2;
				cursor(HAND);
			}
			else if(mouseX > 47 * windowWidth/78 && mouseX < 10 * windowWidth/13)
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
		else
		{
			mouseHoverChecker = 0;
			cursor(ARROW);
		}
	}
	if(gaming)
	{
		if(!drawingLine)
		{
			switch(shape)
			{
				case 0:
					if(((Math.abs(mouseX - (x - size/2)) < weight/2) || (Math.abs(mouseX - (x + size/2)) < weight/2)))
					{
						if(mouseY < y + (size/2 + weight/2) && mouseY > y - (size/2 + weight/2))
						{
							drawChecks = [];
							for(i = 0; i < 8; i++)
							{
								drawChecks.push(0);
							}
							mouseXStartPosition = mouseX;
							mouseYStartPosition = mouseY;
							drawingContext.shadowBlur = 0;
							drawingContext.shadowOffsetX = 0;
							drawingContext.shadowOffsetY = 0;
							strokeWeight(0);
							fill('lawngreen');
							drawingLine = true;
							circle(mouseX, mouseY, 8);
						}
					}
					else if(((Math.abs(mouseY - (y - size/2)) < weight/2) || (Math.abs(mouseY - (y + size/2)) < weight/2)))
					{
						if(mouseX < x + (size/2 + weight/2) && mouseX > x - (size/2 + weight/2))
						{
							drawChecks = [];
							for(i = 0; i < 8; i++)
							{
								drawChecks.push(0);
							}
							mouseXStartPosition = mouseX;
							mouseYStartPosition = mouseY;
							drawingContext.shadowBlur = 0;
							drawingContext.shadowOffsetX = 0;
							drawingContext.shadowOffsetY = 0;
							strokeWeight(0);
							fill('lawngreen');
							drawingLine = true;
							circle(mouseX, mouseY, 8);
						}
					}
					break;
				case 2:
					if(dist(mouseX, mouseY, x, y) > size/2 - weight/2 && dist(mouseX, mouseY, x, y) < size/2 + weight/2)
					{
						drawChecks = [];
						for(i = 0; i < 8; i++)
						{
							drawChecks.push(0);
						}
						mouseXStartPosition = mouseX;
						mouseYStartPosition = mouseY;
						drawingContext.shadowBlur = 0;
						drawingContext.shadowOffsetX = 0;
						drawingContext.shadowOffsetY = 0;
						strokeWeight(0);
						fill('lawngreen');
						drawingLine = true;
						circle(mouseX, mouseY, 8);
					}
					break;
				default:
					break;
			}
		}
		else if(drawingLine)
		{
			let inbounds = false;
			switch(shape)
			{
				case 0:
					if(((Math.abs(mouseX - (x - size/2)) < weight/2) || (Math.abs(mouseX - (x + size/2)) < weight/2)))
					{
						if(mouseY < y + (size/2 + weight/2) && mouseY > y - (size/2 + weight/2))
						{
							drawingContext.shadowBlur = 0;
							drawingContext.shadowOffsetX = 0;
							drawingContext.shadowOffsetY = 0;
							strokeWeight(0);
							fill('lawngreen');
							circle(mouseX, mouseY, 8);
							if(Math.abs(mouseX - (x - size/2)) < weight/2)
							{
								if(Math.abs(mouseY - (y - size/2)) < weight/2)
									drawChecks[0] = 1;
								if(Math.abs(mouseY - (y + size/2)) < weight/2)
									drawChecks[1] = 1;
								if(Math.abs(mouseY - y) < weight/2)
									drawChecks[2] = 1;
							}
							if(Math.abs(mouseX - (x + size/2)) < weight/2)
							{
								if(Math.abs(mouseY - (y - size/2)) < weight/2)
									drawChecks[3] = 1;
								if(Math.abs(mouseY - (y + size/2)) < weight/2)
									drawChecks[4] = 1;
								if(Math.abs(mouseY - y) < weight/2)
									drawChecks[5] = 1;
							}
							inbounds = true;
						}
					}
					else if(((Math.abs(mouseY - (y - size/2)) < weight/2) || (Math.abs(mouseY - (y + size/2)) < weight/2)))
					{
						if(mouseX < x + (size/2 + weight/2) && mouseX > x - (size/2 + weight/2))
						{
							drawingContext.shadowBlur = 0;
							drawingContext.shadowOffsetX = 0;
							drawingContext.shadowOffsetY = 0;
							strokeWeight(0);
							fill('lawngreen');
							circle(mouseX, mouseY, 8);
							if(Math.abs(mouseY - (y - size/2)) < weight/2)
							{
								if(Math.abs(mouseX - x) < weight/2)
									drawChecks[6] = 1;
							}
							if(Math.abs(mouseY - (y + size/2)) < weight/2)
							{
								if(Math.abs(mouseX - x) < weight/2)
									drawChecks[7] = 1;
							}
							inbounds = true;
						}
					}
					if(!inbounds)
					{
						strikes--;
						if(strikes == 0)
						{
							lost = true;
							gaming = false;
							drawLost();
							return;
						}
						drawingContext.shadowColor = 'black';
						drawingContext.shadowBlur = 5;
						drawingContext.shadowOffsetX = 2;
						drawingContext.shadowOffsetY = 2;
						drawingLine = false;
						fill(100);
						strokeWeight(weight);
						stroke('black');
						clear();
						background(60);
						rect(x - size/2, y - size/2, size, size);
						drawScore();
						drawArrow();
					}
					break;
				case 2:
					if(dist(mouseX, mouseY, x, y) > size/2 - weight/2 && dist(mouseX, mouseY, x, y) < size/2 + weight/2)
					{
						drawingContext.shadowBlur = 0;
						drawingContext.shadowOffsetX = 0;
						drawingContext.shadowOffsetY = 0;
						strokeWeight(0);
						fill('lawngreen');
						circle(mouseX, mouseY, 8);
						if(Math.abs(mouseX - x) < weight/2)
						{
							if(Math.abs(mouseY - (y - size/2)) < weight/2)
								drawChecks[0] = 1;
							if(Math.abs(mouseY - (y + size/2)) < weight/2)
								drawChecks[1] = 1;
						}
						if(Math.abs(mouseY - y) < weight/2)
						{
							if(Math.abs(mouseX - (x - size/2)) < weight/2)
								drawChecks[2] = 1;
							if(Math.abs(mouseX - (x + size/2)) < weight/2)
								drawChecks[3] = 1;
						}
						if(Math.abs(mouseX - (x + b)) < weight/2)
						{
							if(Math.abs(mouseY - (y + b)) < weight/2)
								drawChecks[4] = 1;
							if(Math.abs(mouseY - (y - b)) < weight/2)
								drawChecks[5] = 1;
						}
						if(Math.abs(mouseX - (x - b)) < weight/2)
						{
							if(Math.abs(mouseY - (y + b)) < weight/2)
								drawChecks[6] = 1;
							if(Math.abs(mouseY - (y - b)) < weight/2)
								drawChecks[7] = 1;
						}
					}
					else
					{
						strikes--;
						if(strikes == 0)
						{
							lost = true;
							gaming = false;
							drawLost();
							return;
						}
						drawingContext.shadowColor = 'black';
						drawingContext.shadowBlur = 5;
						drawingContext.shadowOffsetX = 2;
						drawingContext.shadowOffsetY = 2;
						drawingLine = false;
						fill(100);
						strokeWeight(weight);
						stroke('black');
						clear();
						background(60);
						circle(x, y, size);
						drawScore();
						drawArrow();
					}
					break;
				default:
					break;
			}
			if(dist(mouseX, mouseY, mouseXStartPosition, mouseYStartPosition) < 8)
			{
				let drawCheck = true;
				for(i = 0; i < 8; i++)
				{
					if(drawChecks[i] == 0) drawCheck = false;
				}
				if(drawCheck)
				{
					drawingLine = false;
					drawingContext.shadowColor = 'black';
					drawingContext.shadowBlur = 5;
					drawingContext.shadowOffsetX = 2;
					drawingContext.shadowOffsetY = 2;
		
					fill(100);
					strokeWeight(weight);
					stroke('black');
					clear();
					background(60);
					createNewShape();
					score++;
				}
			}
		}
	}
	if(lost)
	{
		if(mouseY > 4 * windowHeight/9 && mouseY < 29 * windowHeight/45 && mouseX > 3 * windowWidth/13 && mouseX < 10 * windowWidth/13)
		{
			mouseHoverChecker = 4;
			cursor(HAND);
		}
		else
		{
			mouseHoverChecker = 0;
			cursor(ARROW);
		}
	}
	if(mouseX > 50 && mouseX < 150 && mouseY > 60 && mouseY < 150)
	{
		mouseHoverChecker = 5;
		cursor(HAND);
	}
}

function mousePressed()
{
	if(mouseHoverChecker == 5)
		window.location.replace('home_page.html');
	else if(instructions)
	{
		if(mouseHoverChecker == 6)
		{
			instructions = false;
			settings = true;
			clear();
			drawSettings();
		}
	}
	else if(settings)
	{
		switch(mouseHoverChecker)
		{
			case 1:
				strikes = 3;
				weight = 50;
				break;
			case 2: 
				strikes = 3;
				weight = 40;
				break;
			case 3:
				strikes = 3;
				weight = 30;
				break;
			default:
				break;
		}
		
		if(mouseHoverChecker > 0)
		{
			clear();
			background(60);
			cursor(ARROW);
			gaming = true;
			settings = false;
			createNewShape();
		}
	}
	else if(lost)
	{
		if(mouseHoverChecker == 4)
		{
			lost = false;
			settings = true;
			score = 0;
			clear();
			drawSettings();
		}
	}
}