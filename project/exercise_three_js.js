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

function preload()
{
	backArrow = loadImage('assets/back-arrow.svg');
	pacifico = loadFont('assets/Pacifico-Regular.otf');
}

function drawSettings()
{
	background(60);
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

function createNewShape()
{
	clear();
	background(60);
	strokeWeight(weight);
	stroke('black');
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	x = Math.random() * (windowWidth - windowWidth/2) + (windowWidth/4);
	y = Math.random() * (windowHeight - windowHeight/2) + (windowHeight/4);
	size = Math.random() * windowWidth/8 + windowWidth/10;
	switch(Math.floor(Math.random() * 3))
	{
		case 0:
			shape = 0;
			rect(x - size/2, y - size/2, size, size);
			break;
		case 1:
			shape = 1;
			let shift = size/(Math.sqrt(3));
			triangle(x, y - shift, x - shift, y + shift, x + shift, y + shift);
			break;
		case 2:
			shape = 2;
			b = (size/2)/(Math.sqrt(2));
			circle(x, y, size);
			break;
		default:
			break;
	}
	drawArrow();
}

function drawArrow()
{
	drawingContext.shadowColor = 'black';
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	image(backArrow, 30, 30);
}

function setup()
{
	textFont(pacifico);
	settings = true;
	drawingLine = false;
	createCanvas(windowWidth, windowHeight);
	drawSettings();
}

function draw()
{
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
	if(settings) drawSettings();
}

function mouseMoved()
{
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
				}
			}
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
	else if(settings)
	{
		switch(mouseHoverChecker)
		{
			case 1:
				weight = 30;
				break;
			case 2: 
				weight = 20;
				break;
			case 3:
				weight = 10;
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
}