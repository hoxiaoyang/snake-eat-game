import sunImg from '/sun.png';
import triangleImg from '/triangle.png';

export function startGame() {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const scoreEl = document.getElementById('score')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    let score = {
        sun: 0,
        triangle: 0
    };

    class Snake {
        x: number;
        y: number;
        dx: number;
        dy: number;
        tail: { x: number, y: number }[];
        size: number;

        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.dx = 20;
            this.dy = 0;
            this.tail = [];
            this.size = 20;
        }

        draw() {
            ctx.fillStyle = 'lime';
            for (let i = 0; i < this.tail.length; i++) {
                ctx.fillRect(this.tail[i].x, this.tail[i].y, this.size, this.size);
            }
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }

        update() {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
            if (this.tail.length > 0) {
                this.tail[this.tail.length - 1] = { x: this.x, y: this.y };
            }

            this.x += this.dx;
            this.y += this.dy;

            if (this.x < 0) this.x = canvas.width - this.size;
            if (this.x >= canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height - this.size;
            if (this.y >= canvas.height) this.y = 0;
        }

        changeDirection(direction: string) {
            switch (direction) {
                case 'w':
                case 'ArrowUp':
                    if (this.dy === 0) {
                        this.dx = 0;
                        this.dy = -20;
                    }
                    break;
                case 's':
                case 'ArrowDown':
                    if (this.dy === 0) {
                        this.dx = 0;
                        this.dy = 20;
                    }
                    break;
                case 'a':
                case 'ArrowLeft':
                    if (this.dx === 0) {
                        this.dx = -20;
                        this.dy = 0;
                    }
                    break;
                case 'd':
                case 'ArrowRight':
                    if (this.dx === 0) {
                        this.dx = 20;
                        this.dy = 0;
                    }
                    break;
            }
        }
    }

    class Food {
        x: number = 0;
        y: number = 0;
        image: HTMLImageElement;
        size: number;
        type: 'sun' | 'triangle';

        constructor(type: 'sun' | 'triangle') {
            this.type = type;
            this.size = 30;
            this.image = new Image();
            this.image.src = type === 'sun' ? sunImg : triangleImg;
            this.spawn();
        }

        spawn() {
            this.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
            this.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
        }

        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        }
    }

    const snake = new Snake();
    const sun = new Food('sun');
    const triangle = new Food('triangle');

    function updateScore() {
        scoreEl.innerHTML = `Sun: ${score.sun} | Triangle: ${score.triangle}`;
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snake.update();
        snake.draw();
        sun.draw();
        triangle.draw();

        if (snake.x < sun.x + sun.size &&
            snake.x + snake.size > sun.x &&
            snake.y < sun.y + sun.size &&
            snake.y + snake.size > sun.y) {
            score.sun++;
            snake.tail.push({ x: snake.x, y: snake.y });
            sun.spawn();
            updateScore();
        }

        if (snake.x < triangle.x + triangle.size &&
            snake.x + snake.size > triangle.x &&
            snake.y < triangle.y + triangle.size &&
            snake.y + snake.size > triangle.y) {
            score.triangle++;
            snake.tail.push({ x: snake.x, y: snake.y });
            triangle.spawn();
            updateScore();
        }

        setTimeout(gameLoop, 100);
    }

    window.addEventListener('keydown', (e) => {
        snake.changeDirection(e.key);
    });
    updateScore();
    gameLoop();
}
