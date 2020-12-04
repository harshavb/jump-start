let pacifico;
let backArrow;
let settings;
let gaming;
let mouseHoverChecker;
let maxTime;
let time;
let radius;
let circleCount;
let circleSizes;
let usedColors;
let drawingLine;
let circleClicked;
let xStart;
let yStart;
let score;
let lost;
let instructions;

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
	strokeWeight(6);
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

function drawInstructions()
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
	rect(3 * windowWidth/13, 4 * windowHeight/9, 7 * windowWidth/13, windowHeight/5, windowWidth/30);
	
	fill(100);
	textAlign(CENTER);
	textSize(72);
	text('Exercise 2: Matching Pairs', windowWidth/2, windowHeight/3);
	textSize(48);
	rectMode(CENTER);
	text('In this exercise, colored circles will appear on your screen. Click on a circle (or use Z and X) and match it with its colored pair.', windowWidth/2, 4 * windowHeight/9, windowWidth/4);
	rectMode(CORNER);
	text('Start', windowWidth/2, 5 * windowHeight/9);
	
	drawArrow();
}

function drawLost()
{
	background(60);
	drawingContext.shadowColor = 'black';
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	
	fill(color('darkred'));
	strokeWeight(6);
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

function drawTimer()
{
	if(frameCount % 60 == 0 && time > 0)
		time--;
	textAlign(CENTER);
	textSize(72);
	text('Time: ' + time, width/2, height/7);
	text('Score: ' + score, width/2, height/4);
	if(time == 0)
	{
		gaming = false;
		drawingLine = false;
		lost = true;
		clear();
		drawLost();
		score = 0;
	}
}

function drawLine()
{
	switch(usedColors[parseInt(circleClicked/2)])
	{
		case 0:
			fill('red');
			stroke('maroon');
			break;
		case 1:
			fill('lawngreen');
			stroke('green');
			break;
		case 2:
			fill('mediumturquoise');
			stroke('mediumblue');
			break;
		case 3:
			fill('yellow');
			stroke('orange');
			break;
		case 4:
			fill('orchid');
			stroke('purple');
			break;
		default:
			break;
	}
	line(xStart, yStart, mouseX, mouseY)
}

function pairSuccessStart()
{
	score++;
	time = maxTime;
	makeNewPair();
}

function drawCircles()
{
	background(60);
	drawingContext.shadowColor = 'black';
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	
	for(i = 0; i < parseInt(circleCount/2); i++)
	{
		switch(usedColors[i])
		{
			case 0:
				fill('red');
				stroke('maroon');
				break;
			case 1:
				fill('lawngreen');
				stroke('green');
				break;
			case 2:
				fill('mediumturquoise');
				stroke('mediumblue');
				break;
			case 3:
				fill('yellow');
				stroke('orange');
				break;
			case 4:
				fill('orchid');
				stroke('purple');
				break;
			default:
				break;
		}
		circle(circleXPositions[i * 2], circleYPositions[i * 2], radius * 2)
		circle(circleXPositions[i * 2 + 1], circleYPositions[i * 2 + 1], radius * 2)
	}
}

function makeNewPair()
{
	background(60);
	drawingContext.shadowColor = 'black';
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	
	radius *= 0.98;
	
	let newX;
	let newY;
	let newX2;
	let newY2;
	let newIsAway = false;
	let colorIsUnique = false;
	console.log(usedColors);
	usedColors[parseInt(circleClicked/2)] = 100;
	while(!colorIsUnique)
	{
		switch(Math.floor(Math.random() * 5))
		{
			case 0:
				if(!usedColors.includes(0))
				{
					usedColors[parseInt(circleClicked/2)] = 0;
					colorIsUnique = true;
				}
				break;
			case 1:
				if(!usedColors.includes(1))
				{
					usedColors[parseInt(circleClicked/2)] = 1;
					colorIsUnique = true;
				}
				break;
			case 2:
				if(!usedColors.includes(2))
				{
					usedColors[parseInt(circleClicked/2)] = 2;
					colorIsUnique = true;
				}
				break;
			case 3:
				if(!usedColors.includes(3))
				{
					usedColors[parseInt(circleClicked/2)] = 3;
					colorIsUnique = true;
				}
				break;
			case 4:
				if(!usedColors.includes(4))
				{
					usedColors[parseInt(circleClicked/2)] = 4;
					colorIsUnique = true;
				}
				break;
			default:
				break;
		}
	}
	let a = Math.sqrt(windowHeight * windowHeight + (windowWidth * windowWidth))
	while(!newIsAway)
	{
		newIsAway = true;
		newX = Math.random() * (windowWidth - (4 * radius)) + (radius * 2);
		newY = Math.random() * (windowHeight - (4 * radius)) + (radius * 2);
		newX2 = Math.random() * (windowWidth - (4 * radius)) + (radius * 2);
		newY2 = Math.random() * (windowHeight - (4 * radius)) + (radius * 2);
		if(dist(newX, newY, newX2, newY2) < a/4) 
		{
			newIsAway = false;
			continue;
		}
		if(newIsAway)
		{
			if(circleClicked % 2 == 1)
			{
				circleXPositions[circleClicked] = newX;
				circleXPositions[circleClicked] = newX2;
				circleYPositions[circleClicked - 1] = newY;
				circleYPositions[circleClicked - 1] = newY2;
			}
			else if(circleClicked % 2 == 0)
			{
				circleXPositions[circleClicked] = newX;
				circleXPositions[circleClicked] = newX2;
				circleYPositions[circleClicked + 1] = newY;
				circleYPositions[circleClicked + 1] = newY2;
			}
			
			circle(newX, newY, radius * 2);
			circle(newX, newY, radius * 2);
		}
	}
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
	score = 0;
	lost = false;
	settings = false;
	drawingLine = false;
	instructions = true;
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

function draw()
{
	if(gaming) 
	{
		clear();
		background(60);
		drawCircles();
		drawTimer();
		drawArrow();
	}
	if(drawingLine) drawLine();
}

function mouseMoved()
{
	if(instructions)
	{
		if(mouseY > 4 * windowHeight/9 && mouseY < 29 * windowHeight/45 && mouseX > 3 * windowWidth/13 && mouseX < 10 * windowWidth/13)
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
			else if(mouseX > 30 && mouseX < 54 && mouseY > 30 && mouseY < 54)
			{
				mouseHoverChecker = 5;
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
		let isCircleHovered = false;
		for(i = 0; i < circleCount; i++)
		{
			if(dist(circleXPositions[i], circleYPositions[i], mouseX, mouseY) < radius) 
			{
				cursor(HAND);
				isCircleHovered = true;
				return;
			}
		}
		if(!isCircleHovered) cursor(ARROW);
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
				maxTime = 10;
				radius = 65;
				circleCount = 8;
				break;
			case 2: 
				maxTime = 5;
				radius = 50;
				circleCount = 4;
				break;
			case 3:
				maxTime = 3;
				radius = 35;
				circleCount = 2;
				break;
			default:
				break;
		}
		
		if(mouseHoverChecker > 0)
		{
			textAlign(CENTER);
			textSize(100);
			time = maxTime;
			text(time, width/2, height/7);
			let newX;
			let newY;
			let newIsAway;
			let colorIsUnique;
			
			usedColors = [];
			
			circleXPositions = [];
			circleYPositions = [];
			
			clear();
			background(60);
			cursor(ARROW);
			gaming = true;
			settings = false;
			
			strokeWeight(1);
			for(i = 0; i < parseInt(circleCount/2); i++)
			{
				newIsAway = false;
				colorIsUnique = false;
				while(!colorIsUnique)
				{
					switch(Math.floor(Math.random() * 5))
					{
						case 0:
							if(!usedColors.includes(0))
							{
								usedColors[i] = 0;
								colorIsUnique = true;
							}
							break;
						case 1:
							if(!usedColors.includes(1))
							{
								usedColors[i] = 1;
								colorIsUnique = true;
							}
							break;
						case 2:
							if(!usedColors.includes(2))
							{
								usedColors[i] = 2;
								colorIsUnique = true;
							}
							break;
						case 3:
							if(!usedColors.includes(3))
							{
								usedColors[i] = 3;
								colorIsUnique = true;
							}
							break;
						case 4:
							if(!usedColors.includes(4))
							{
								usedColors[i] = 4;
								colorIsUnique = true;
							}
							break;
						default:
							break;
					}
				}
				let a = Math.sqrt(windowHeight * windowHeight + (windowWidth * windowWidth));
				while(!newIsAway)
				{
					newIsAway = true;
					console.log('bruh');
					newX = Math.random() * (windowWidth - (4 * radius)) + (radius * 2);
					newY = Math.random() * (windowHeight - (4 * radius)) + (radius * 2);
					newX2 = Math.random() * (windowWidth - (4 * radius)) + (radius * 2);
					newY2 = Math.random() * (windowHeight - (4 * radius)) + (radius * 2);
					if(dist(newX, newY, newX2, newY2) < a/4) 
					{
						newIsAway = false;
						continue;
					}
					if(newIsAway)
					{
						circleXPositions.push(newX);
						circleXPositions.push(newX2);
						circleYPositions.push(newY);
						circleYPositions.push(newY2);
						
						circle(circleXPositions[i * 2], circleYPositions[i * 2], radius * 2);
						circle(circleXPositions[i * 2 + 1], circleYPositions[i * 2 + 1], radius * 2);
					}
				}
			}
		}
	}
	else if(gaming)
	{
		let success;
		for(i = 0; i < circleCount; i++)
		{
			if(dist(circleXPositions[i], circleYPositions[i], mouseX, mouseY) < radius)
			{
				if(!drawingLine) 
				{
					circleClicked = i;
					xStart = circleXPositions[i];
					yStart = circleYPositions[i];
					success = true;
					switch(usedColors[parseInt(circleClicked/2)])
					{
						case 0:
							fill('red');
							stroke('maroon');
							break;
						case 1:
							fill('lawngreen');
							stroke('green');
							break;
						case 2:
							fill('mediumturquoise');
							stroke('mediumblue');
							break;
						case 3:
							fill('yellow');
							stroke('orange');
							break;
						case 4:
							fill('orchid');
							stroke('purple');
							break;
						default:
							break;
					}
					drawingLine = true;
				}
				else if(circleClicked % 2 == 1) 
				{
					if(i == circleClicked - 1)
					{
						success = true;
						pairSuccessStart();
						drawingLine = false;
						break;
					}
				}
				else if(circleClicked % 2 == 0)
				{
					if(i == circleClicked + 1)
					{
						success = true;
						pairSuccessStart();
						drawingLine = false;
						break;
					}
				}
			}
		}
		if(!success) drawingLine = false;
	}
	else if(lost)
	{
		if(mouseHoverChecker == 4)
		{
			lost = false;
			settings = true;
			clear();
			drawSettings();
		}
	}
}

function keyPressed()
{
	if(gaming)
	{
		if(key === 'z' || key === 'x')
		{
			let success;
		for(i = 0; i < circleCount; i++)
		{
			if(dist(circleXPositions[i], circleYPositions[i], mouseX, mouseY) < radius)
			{
				if(!drawingLine) 
				{
					circleClicked = i;
					xStart = circleXPositions[i];
					yStart = circleYPositions[i];
					success = true;
					switch(usedColors[parseInt(circleClicked/2)])
					{
						case 0:
							fill('red');
							stroke('maroon');
							break;
						case 1:
							fill('lawngreen');
							stroke('green');
							break;
						case 2:
							fill('mediumturquoise');
							stroke('mediumblue');
							break;
						case 3:
							fill('yellow');
							stroke('orange');
							break;
						case 4:
							if(!usedColors.includes(4))
							fill('orchid');
							stroke('purple');
							break;
						default:
							break;
					}
					drawingLine = true;
				}
				else if(circleClicked % 2 == 1) 
				{
					if(i == circleClicked - 1)
					{
						success = true;
						pairSuccessStart();
						drawingLine = false;
						break;
					}
				}
				else if(circleClicked % 2 == 0)
				{
					if(i == circleClicked + 1)
					{
						success = true;
						pairSuccessStart();
						drawingLine = false;
						break;
					}
				}
			}
		}
		if(!success) drawingLine = false;
		}
	}
}