let settings;
let gaming;
let mouseHoverChecker;
//let backArrow;

let circleCount;
let circleXPositions;
let circleYPositions;
let circleXSpeeds;
let circleYSpeeds;
let circleSizes;

let speed;
let growthSpeed;
let maxRadius;

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

function drawGame(difficulty)
{
	updateGame();
	clear();
	background(60);
	for(i = 0; i < circleCount; i++)
	{
		if(circleSizes[i] >= maxRadius * 2) circleFailStart(i);
		circle(circleXPositions[i], circleYPositions[i], circleSizes[i]);
	}
}

function updateGame()
{
	let predictedXPosition;
	let predictedYPosition;

	for(i = 0; i < circleCount; i++)
	{
		circleSizes[i] += growthSpeed;
		
		predictedXPosition = circleXPositions[i] + circleXSpeeds[i];
		predictedYPosition = circleYPositions[i] + circleYSpeeds[i];
		
		if(predictedXPosition - (circleSizes[i]/2) < 0) 
		{
			circleXSpeeds[i] *= -1;
			circleXPositions[i] += circleXSpeeds[i] - circleXPositions[i] + (circleSizes[i]/2);
		}
		else if(predictedXPosition + (circleSizes[i]/2) > windowWidth)
		{
			circleXSpeeds[i] *= -1;
			circleXPositions[i] += circleXSpeeds[i] - windowWidth + circleXPositions[i] + (circleSizes[i]/2);
		}
		else circleXPositions[i] += circleXSpeeds[i];
		
		if(predictedYPosition - (circleSizes[i]/2) < 0) 
		{
			circleYSpeeds[i] *= -1;
			circleYPositions[i] += circleYSpeeds[i] - circleYPositions[i] + (circleSizes[i]/2);
		}
		else if(predictedYPosition + (circleSizes[i]/2) > windowHeight)
		{
			circleYSpeeds[i] *= -1;
			circleYPositions[i] += circleYSpeeds[i] - windowHeight + circleYPositions[i] + (circleSizes[i]/2);
		}
		else circleYPositions[i] += circleYSpeeds[i];
	}
}

function circleFailStart(i)
{
	makeNewCircle(circleXPositions[i], circleYPositions[i], i);
}

function circleSuccessStart(i)
{
	makeNewCircle(circleXPositions[i], circleYPositions[i], i);
}

function makeNewCircle(oldX, oldY, i)
{
	let newX;
	let newY;
	let newIsAway = false;
	while(!newIsAway)
	{
		newX = Math.random() * windowWidth;
		newY = Math.random() * windowHeight;
		for(j = 0; j < circleCount; j++)
		{
			if(dist(newX, newY, circleXPositions[j], circleYPositions[j]) > circleSizes[j]/2) newIsAway = true;
		}
		if(newIsAway) 
		{
			circleXPositions[i] = newX;
			circleYPositions[i] = newY;
			circleSizes[i] = 0;
			circleXSpeeds[i] = (Math.random() * speed * 2) - speed;
			if(Math.random() - 0.5 < 0) circleYSpeeds[i] = -Math.sqrt((speed * speed) - (circleXSpeeds[i] * circleXSpeeds[i]));
			else circleYSpeeds[i] = Math.sqrt((speed * speed) - (circleXSpeeds[i] * circleXSpeeds[i]));
			
			circle(newX, newY, 0);
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
	if(gaming) drawGame();
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
			if(dist(circleXPositions[i], circleYPositions[i], mouseX, mouseY) < circleSizes[i]/2) 
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
				circleCount = 3;
				speed = 1;
				growthSpeed = 0.2;
				maxRadius = 150;
				break;
			case 2: 
				circleCount = 5;
				speed = 2;
				growthSpeed = 0.4;
				maxRadius = 150;
				break;
			case 3:
				circleCount = 7;
				speed = 3;
				growthSpeed = 0.6;
				maxRadius = 150;
				break;
			default:
				break;
		}
		
		if(mouseHoverChecker > 0)
		{
			circleXPositions = [];
			circleYPositions = [];
			circleXSpeeds = [];
			circleYSpeeds = [];
			circleSizes = [];
			
			clear();
			cursor(ARROW);
			gaming = true;
			settings = false;
			
			fill('red');
			stroke('maroon');
			strokeWeight(1);
			for(i = 0; i < circleCount; i++)
			{
				circleXPositions.push(Math.random() * windowWidth);
				circleYPositions.push(Math.random() * windowHeight);
				circleXSpeeds.push((Math.random() * speed * 2) - speed);
				if(Math.random() - 0.5 < 0) circleYSpeeds.push(-Math.sqrt((speed * speed) - (circleXSpeeds[i] * circleXSpeeds[i])));
				else circleYSpeeds.push(Math.sqrt((speed * speed) - (circleXSpeeds[i] * circleXSpeeds[i])));
				
				circleSizes[i] = 0;
				circle(circleXPositions[i], circleYPositions[i], 0);
			}
		}
	}
	else if(gaming)
	{
		for(i = 0; i < circleCount; i++)
		{
			if(dist(circleXPositions[i], circleYPositions[i], mouseX, mouseY) < circleSizes[i]/2)
			{
				circleSuccessStart(i);
				break;
			}
		}
	}
}

function keyPressed()
{
	if(gaming)
	{
		if(key === 'z' || key === 'x')
		{
			for(i = 0; i < circleCount; i++)
			{
				if(dist(circleXPositions[i], circleYPositions[i], mouseX, mouseY) < circleSizes[i]/2)
				{
					circleSuccessStart(i);
					break;
				}
			}
		}
	}
}