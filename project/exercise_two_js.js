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

function drawSettings()
{
	background(60);
	drawingContext.shadowColor = 'black';
	drawingContext.shadowBlur = 5;
	drawingContext.shadowOffsetX = 2;
	drawingContext.shadowOffsetY = 2;
	
	fill(40);
	strokeWeight(8);
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
}

function drawTimer()
{
	if(frameCount % 60 == 0 && time > 0)
		time--;
	textAlign(CENTER, CENTER);
	textSize(100);
	text(time, width/2, height/7);
}

function drawLine(difficulty)
{
	line(xStart, yStart, mouseX, mouseY)
}

function pairSuccessStart()
{
	time = maxTime;
	makeNewPair();
}

function drawCircles()
{
	for(i = 0; i < circleCount/2; i++)
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
				fill('mediumturquiose');
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
	let newX;
	let newY;
	let newX2;
	let newY2;
	let newIsAway = false;
	let colorIsUnique = false;
	usedColors[circleClicked] = 100;
	while(!colorIsUnique)
	{
		switch(Math.floor(Math.random() * 5))
		{
			case 0:
				if(!usedColors.includes(0))
				{
					fill('red');
					stroke('maroon');
					usedColors[circleClicked/2] = 0;
					colorIsUnique = true;
				}
				break;
			case 1:
				if(!usedColors.includes(1))
				{
					fill('lawngreen');
					stroke('green');
					usedColors[circleClicked/2] = 1;
					colorIsUnique = true;
				}
				break;
			case 2:
				if(!usedColors.includes(2))
				{
					fill('mediumturquiose');
					stroke('mediumblue');
					usedColors[circleClicked/2] = 2;
					colorIsUnique = true;
				}
				break;
			case 3:
				if(!usedColors.includes(3))
				{
					fill('yellow');
					stroke('orange');
					usedColors[circleClicked/2] = 3;
					colorIsUnique = true;
				}
				break;
			case 4:
				if(!usedColors.includes(4))
				{
					fill('orchid');
					stroke('purple');
					usedColors[circleClicked/2] = 4;
					colorIsUnique = true;
				}
				break;
			default:
				break;
		}
	}
	while(!newIsAway)
	{
		newIsAway = true;
		newX = Math.random() * windowWidth;
		newY = Math.random() * windowHeight;
		newX2 = Math.random() * windowWidth;
		newY2 = Math.random() * windowHeight;
		for(j = 0; j < circleCount; j++)
		{
			if(dist(newX, newY, circleXPositions[j], circleYPositions[j]) > radius
				&& dist(newX2, newY2, circleXPositions[j], circleYPositions[j]) > radius
				&& dist(newX, newY, newX2, newY2) > windowHeight/4) newIsAway = true;
			else newIsAway = false;
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
			
			circle(circleXPositions[circleClicked * 2], circleYPositions[circleClicked * 2], radius * 2);
			circle(circleXPositions[circleClicked * 2 + 1], circleYPositions[circleClicked * 2 + 1], radius * 2);
		}
	}
}

function preload()
{
	//backArrow = loadImage('assets/back-arrow.png');
}
	
function setup()
{
	//image(backArrow, 0, 0);
	settings = true;
	drawingLine = false;
	createCanvas(windowWidth, windowHeight);
	drawSettings();
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
	if(settings) drawSettings();
}

function draw()
{
	if(gaming) 
	{
		clear();
		background(60);
		drawCircles();
		drawTimer();
	}
	if(drawingLine) drawLine();
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
		let isCircleHovered = false;
		for(i = 0; i < circleCount; i++)
		{
			if(dist(circleXPositions[i], circleYPositions[i], mouseX, mouseY) < radius) 
			{
				cursor(HAND);
				isCircleHovered = true;
				break;
			}
		}
		if(!isCircleHovered) cursor(ARROW);
	}
}

function mousePressed()
{
	if(settings)
	{
		switch(mouseHoverChecker)
		{
			case 1:
				maxTime = 10;
				radius = 75;
				circleCount = 8;
				break;
			case 2: 
				maxTime = 5;
				radius = 50;
				circleCount = 4;
				break;
			case 3:
				maxTime = 3;
				radius = 25;
				circleCount = 2;
				break;
			default:
				break;
		}
		
		if(mouseHoverChecker > 0)
		{
			textAlign(CENTER, CENTER);
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
			
			fill('red');
			stroke('maroon');
			strokeWeight(1);
			for(i = 0; i < circleCount/2; i++)
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
								fill('red');
								stroke('maroon');
								usedColors[i] = 0;
								colorIsUnique = true;
							}
							break;
						case 1:
							if(!usedColors.includes(1))
							{
								fill('lawngreen');
								stroke('green');
								usedColors[i] = 1;
								colorIsUnique = true;
							}
							break;
						case 2:
							if(!usedColors.includes(2))
							{
								fill('mediumturquiose');
								stroke('mediumblue');
								usedColors[i] = 2;
								colorIsUnique = true;
							}
							break;
						case 3:
							if(!usedColors.includes(3))
							{
								fill('yellow');
								stroke('orange');
								usedColors[i] = 3;
								colorIsUnique = true;
							}
							break;
						case 4:
							if(!usedColors.includes(4))
							{
								fill('orchid');
								stroke('purple');
								usedColors[i] = 4;
								colorIsUnique = true;
							}
							break;
						default:
							break;
					}
				}
				
				while(!newIsAway)
				{
					newIsAway = true;
					newX = Math.random() * windowWidth;
					newY = Math.random() * windowHeight;
					newX2 = Math.random() * windowWidth;
					newY2 = Math.random() * windowHeight;
					for(j = 0; j < circleXPositions.length; j++)
					{
						if(dist(newX, newY, circleXPositions[j], circleYPositions[j]) > radius
							&& dist(newX2, newY2, circleXPositions[j], circleYPositions[j]) > radius
							&& dist(newX, newY, newX2, newY2) > windowHeight/8) newIsAway = true;
						else newIsAway = false;
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
				circleClicked = i;
				if(!drawingLine) 
				{
					xStart = circleXPositions[i];
					yStart = circleYPositions[i];
					success = true;
					drawingLine = true;
					switch(usedColors[circleClicked/2])
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
							fill('mediumturquiose');
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
				circleClicked = i;
				if(!drawingLine) 
				{
					xStart = circleXPositions[i];
					yStart = circleYPositions[i];
					success = true;
					drawingLine = true;
					switch(usedColors[circleClicked/2])
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
							fill('mediumturquiose');
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