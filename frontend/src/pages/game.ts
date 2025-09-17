import {
		PageComponent,
		HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';
import { local } from '../components/language';

export const Game: PageComponent = new PageComponent(() => {
    document.body.classList.remove('fade-out');
    document.body.classList.add('fade-in');
    document.body.classList.remove('bg-bg2');
    document.body.classList.add('bg-bg1');

    const root = document.createElement('div');

    // Back button
    const back = new Link('/');
    const buttonback = document.createElement('button');
    buttonback.className = 'underline ml-[5%] text-bg0';
    buttonback.textContent = local.back;
    back.appendChild(buttonback);
    root.appendChild(back.make());

    // Pause button
    const pauseBtn = document.createElement('button');
    pauseBtn.textContent = 'Pause';
    pauseBtn.className = 'absolute top-4 left-4 px-3 py-1 bg-gray-800 text-white rounded cursor-pointer z-10';
    root.appendChild(pauseBtn);

    const gametab: HTMLElement = document.createElement('div');
	gametab.className = 'flex justify-center';
	// Score display
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'absolute mt-10 left-1/2 transform -translate-x-1/2 text-bg0 text-4xl font-mono z-10 select-none';
    

    const canvas = document.createElement('canvas');
    canvas.className = 'block bg-bg2 border-4 border-bg0';
    
	gametab.appendChild(scoreDisplay);
	gametab.appendChild(canvas);
	root.appendChild(gametab);
    const ctx = canvas.getContext('2d')!;

    const GAME_WIDTH = window.innerWidth - 30;
    const GAME_HEIGHT = window.innerHeight - 40;

	function resizeCanvas() 
	{ 
		const dpr = window.devicePixelRatio || 1; 
		canvas.width = GAME_WIDTH * dpr; canvas.height = GAME_HEIGHT * dpr; 
		ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
	} 
	resizeCanvas(); 
	window.addEventListener('resize', resizeCanvas);

    // Paddle and ball setup
    const paddleWidth = 10;
    const paddleHeight = 100;
    const paddleSpeed = 6;

    let leftPaddleY = (GAME_HEIGHT - paddleHeight) / 2;
    let rightPaddleY = (GAME_HEIGHT - paddleHeight) / 2;

    let up = false, down = false, w = false, s = false;

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') up = true;
        if (e.key === 'ArrowDown') down = true;
        if (e.key === 'w' || e.key === 'W') w = true;
        if (e.key === 's' || e.key === 'S') s = true;
    });
    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowUp') up = false;
        if (e.key === 'ArrowDown') down = false;
        if (e.key === 'w' || e.key === 'W') w = false;
        if (e.key === 's' || e.key === 'S') s = false;
    });

    const ballSize = 10;
    let ballX = GAME_WIDTH / 2 - ballSize / 2;
    let ballY = GAME_HEIGHT / 2 - ballSize / 2;
    let ballSpeedX = 5;
    let ballSpeedY = 3;

    // Scores
    let leftScore = 0;
    let rightScore = 0;

    function resetBall(scoredLeft: boolean) {
        ballX = GAME_WIDTH / 2 - ballSize / 2;
        ballY = GAME_HEIGHT / 2 - ballSize / 2;
        // Ball moves toward the player who conceded the point
        ballSpeedX = scoredLeft ? 5 : -5;
        ballSpeedY = (Math.random() * 4 - 2);
    }

    function updateScoreDisplay() {
        scoreDisplay.textContent = `${leftScore}  —  ${rightScore}`;
    }
    updateScoreDisplay();

    function update() {
        if (w) leftPaddleY -= paddleSpeed;
        if (s) leftPaddleY += paddleSpeed;
        if (up) rightPaddleY -= paddleSpeed;
        if (down) rightPaddleY += paddleSpeed;

        leftPaddleY = Math.max(0, Math.min(GAME_HEIGHT - paddleHeight, leftPaddleY));
        rightPaddleY = Math.max(0, Math.min(GAME_HEIGHT - paddleHeight, rightPaddleY));

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY <= 0 || ballY + ballSize >= GAME_HEIGHT) {
            ballSpeedY *= -1;
        }

        const hitLeft = ballX <= 30 + paddleWidth &&
                        ballY + ballSize >= leftPaddleY &&
                        ballY <= leftPaddleY + paddleHeight;

        const hitRight = ballX + ballSize >= GAME_WIDTH - 30 - paddleWidth &&
                         ballY + ballSize >= rightPaddleY &&
                         ballY <= rightPaddleY + paddleHeight;

        if (hitLeft || hitRight) {
            ballSpeedX *= -1;
        }

        // Check scoring
        if (ballX < 0) {
            rightScore++;
            updateScoreDisplay();
            resetBall(true);
        } else if (ballX > GAME_WIDTH) {
            leftScore++;
            updateScoreDisplay();
            resetBall(false);
        }
    }

    function draw() {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        ctx.strokeStyle = 'gray';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(GAME_WIDTH / 2, 0);
        ctx.lineTo(GAME_WIDTH / 2, GAME_HEIGHT);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = 'white';
        ctx.fillRect(30, leftPaddleY, paddleWidth, paddleHeight);
        ctx.fillRect(GAME_WIDTH - 30 - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

        ctx.fillRect(ballX, ballY, ballSize, ballSize);
    }

    // Pause button and logic
    let paused = false;
    pauseBtn.onclick = () => {
        paused = !paused;
        pauseBtn.textContent = paused ? 'Resume' : 'Pause';
    };

    function loop() {
        if (!paused) {
            update();
            draw();
        } else {
            // Show paused overlay
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            ctx.fillStyle = 'white';
            ctx.font = '48px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Paused', GAME_WIDTH / 2, GAME_HEIGHT / 2);
        }
        requestAnimationFrame(loop);
    }

    loop();

    return root;
});