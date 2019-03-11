import './styles/main.scss';

//variables
const paddleA = document.querySelector('#paddleA');
const paddleB = document.querySelector('#paddleB');

const playground = document.querySelector('#playground');
const playingBall = document.querySelector('#ball');

const scoreBoard = document.querySelector('.scoreBoard');

//create elements

const playerOne = document.createElement('h1');
const playerTwo = document.createElement('h1');

//new game button
const button = document.createElement('button');
button.innerText = 'New Game';

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
	maxScore: 10,
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

	//check if mouse in play area
	playground.addEventListener('mouseleave', () => {
		pingPong.isPaused = true;
	});

	//move player paddle based off mouse move
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

const autoMovePaddleA = () => {
	//make auto move a little slower then ball
	const speed = 4;
	let direction = 1;

	const paddleAY = pingPong.paddleA.y + pingPong.paddleA.height / 2;

	if (paddleAY > pingPong.ball.y) {
		direction = -1;
	}

	pingPong.paddleA.y += direction * speed;
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
	//if game is not paused make movement happen
	if (!pingPong.isPaused) {
		autoMovePaddleA();
		moveBall();
	}

	//if either player gets to the set score, end game, display winner
	if (pingPong.playerAScore >= pingPong.maxScore || pingPong.playerBScore >= pingPong.maxScore) {
		clearInterval(pingPong.timer);

		scoreBoard.innerHTML =
			pingPong.playerAScore === pingPong.maxScore ? '<h1>Player A wins</h1>' : '<h1>Player B wins</h1>';

		scoreBoard.appendChild(button);
	}
};

//setup score for players
const scores = () => {
	//scores
	playerOne.textContent = 'Player One score: ' + pingPong.playerAScore;

	playerTwo.textContent = 'Player Two score: ' + pingPong.playerBScore;

	scoreBoard.appendChild(playerOne);
	scoreBoard.appendChild(playerTwo);
};

//keep rerendering while condition is met
const render = () => {
	//checks if either player has won to reset scoreboard
	if (pingPong.playerAScore < pingPong.maxScore && pingPong.playerBScore < pingPong.maxScore) {
		if (!pingPong.isPaused) {
			scores();
			renderBall();
			renderPaddles();
			requestAnimationFrame(render);
		} else {
			requestAnimationFrame(render);
		}
	}
};

//start game function
const init = () => {
	//view rendering
	render();

	//create a timer for ball movement that is slower then request animationframe
	pingPong.timer = setInterval(gameLoop, 25);

	//inputs
	handleMouseInputs();
};

init();

//to restart a new game
button.addEventListener('click', () => {
	pingPong.playerAScore = 0;
	pingPong.playerBScore = 0;

	//clear scoreboard and reset it
	scoreBoard.innerHTML = '';
	scores();

	//start game again
	init();
});
