import './styles/main.scss';

//variables
const paddleA = document.querySelector('#paddleA');
const paddleB = document.querySelector('#paddleB');

const playground = document.querySelector('#playground');
const playingBall = document.querySelector('#ball');

const playerOne = document.querySelector('.playerOneScore');

const playerTwo = document.querySelector('.playerTwoScore');

const scoreBoard = document.querySelector('.scoreBoard');

//data for game
const pingPong = {
	playground: {
		//get how far the playing space is from top of page
		offsetTop: playground.getBoundingClientRect().top,
		height: playground.getBoundingClientRect().height,
		width: playground.getBoundingClientRect().width,
	},
	paddleA: {
		x: 80,
		y: 0,
		width: 20,
		height: 70,
	},
	paddleB: {
		x: 520,
		y: 100,
		width: 20,
		height: 70,
	},

	ball: {
		speed: 5,
		x: 150,
		y: 100,
		directionX: 1,
		directionY: 1,
		height: 20,
		width: 20,
		directionChange: [-1, 1],
	},
	playerAScore: 0,
	playerBScore: 0,
};

const renderPaddles = () => {
	paddleA.style.top = `${pingPong.paddleA.y}px`;

	paddleB.style.top = `${pingPong.paddleB.y}px`;
};

renderPaddles();

const handleMouseInputs = () => {
	//run game while mouse is on playground
	playground.addEventListener('mouseenter', () => {
		pingPong.isPaused = false;
	});

	//pause game when mouse leaves playground
	playground.addEventListener('mouseleave', () => {
		pingPong.isPaused = true;
	});

	//calculate the paddle position by mouse position
	playground.addEventListener('mousemove', e => {
		//checks if mouse is within playground area and moves paddle accordingly
		if (
			e.y - playground.getBoundingClientRect().top > 0 &&
			e.y - playground.getBoundingClientRect().top < pingPong.playground.height
		) {
			pingPong.paddleB.y = e.y - playground.getBoundingClientRect().top - pingPong.paddleB.height / 2;
		}
	});
};

const ballHitsTopBottom = () => {
	const y = pingPong.ball.y;
	return y < 0 || y > pingPong.playground.height - pingPong.ball.height;
};

const ballHitsRightWall = () => {
	return pingPong.ball.x > pingPong.playground.width;
};

const ballHitsLeftWall = () => {
	return pingPong.ball.x < 0;
};

const playerAWin = () => {
	//reset ball
	pingPong.ball.x = 400;
	pingPong.ball.y = 200;

	//update move direction
	pingPong.ball.directionX = -1;

	//update score
	pingPong.playerAScore += 1;
};

const playerBWin = () => {
	//reset ball
	pingPong.ball.x = 200;
	pingPong.ball.y = 200;

	//update move direction
	pingPong.ball.directionX = 1;
	pingPong.ball.directionY = pingPong.ball.directionChange[Math.floor(Math.random() * 2)];

	//update score
	pingPong.playerBScore += 1;
};

const moveBall = () => {
	const ball = pingPong.ball;

	//check if ball hits top or bottom
	if (ballHitsTopBottom()) {
		//reverse direction
		ball.directionY *= -1;
	}

	//check winner
	if (ballHitsRightWall()) {
		playerAWin();
	}

	if (ballHitsLeftWall()) {
		playerBWin();
	}

	//check right paddle
	if (
		pingPong.ball.x === pingPong.paddleB.x - (pingPong.ball.width + pingPong.paddleB.width) &&
		(pingPong.ball.y >= pingPong.paddleB.y && pingPong.ball.y <= pingPong.paddleB.y + pingPong.paddleB.height)
	) {
		pingPong.ball.directionX *= -1;
	}

	//check left paddle
	if (
		pingPong.ball.x === pingPong.paddleA.x + pingPong.ball.width &&
		(pingPong.ball.y >= pingPong.paddleA.y && pingPong.ball.y <= pingPong.paddleA.y + pingPong.paddleA.height)
	) {
		pingPong.ball.directionX *= -1;
	}

	//update ball position
	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;
};

const renderBall = () => {
	const ball = pingPong.ball;
	playingBall.style.top = `${ball.y + ball.speed * ball.directionY}px`;
	playingBall.style.left = `${ball.x + ball.speed * ball.directionX}px`;
};

const gameLoop = () => {
	moveBall();
};

const scores = () => {
	//scores
	playerOne.textContent = 'player one score: ' + pingPong.playerAScore;

	playerTwo.textContent = 'player Two score: ' + pingPong.playerBScore;
};

const render = () => {
	scores();
	renderBall();
	renderPaddles();
	requestAnimationFrame(render);
};

const init = () => {
	//create a timer for ball movement that is slower then request animationframe
	pingPong.timer = setInterval(gameLoop, 25);

	//view rendering
	requestAnimationFrame(render);

	//inputs
	handleMouseInputs();
};

if (pingPong.playerAScore < 10 && pingPong.playerBScore < 10) {
	init();
}
