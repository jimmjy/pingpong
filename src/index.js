import './styles/main.scss';

//variables
const paddleA = document.querySelector('#paddleA');
const paddleB = document.querySelector('#paddleB');

const playground = document.querySelector('#playground');
const playingBall = document.querySelector('#ball');

//data for game
const pingPong = {
	paddleA: {
		x: 50,
		y: 0,
		width: 20,
		height: 70,
	},
	paddleB: {
		x: 320,
		y: 100,
		width: 20,
		height: 70,
	},
	playground: {
		//get how far the playing space is from top of page
		offsetTop: playground.getBoundingClientRect().top,
		height: playground.getBoundingClientRect().height,
		width: playground.getBoundingClientRect().width,
	},
	ball: {
		speed: 5,
		x: 150,
		y: 100,
		directionX: 1,
		directionY: 1,
		height: 20,
		directionChange: [-1, 1],
	},
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
	console.log(y);
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
};

const playerBWin = () => {
	//reset ball
	pingPong.ball.x = 200;
	pingPong.ball.y = 200;

	//update move direction
	pingPong.ball.directionX = 1;
	pingPong.ball.directionY = pingPong.ball.directionChange[Math.floor(Math.random() * 2)];
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

	//check paddles (later)

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

const render = () => {
	renderBall();
	renderPaddles();
	window.requestAnimationFrame(render);
};

const init = () => {
	//create a timer for ball movement
	pingPong.timer = setInterval(gameLoop, 25);

	//view rendering
	window.requestAnimationFrame(render);

	//inputs
	handleMouseInputs();
};

init();
