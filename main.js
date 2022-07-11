window.addEventListener('load', (event) => {
    init();
});

let canvas;
let lastTime;
let ctx;
let gameObjects = [];
const width = 800;
const height = 800;

const CELLWIDTH = 20;


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);

    gameObjects.push(new Borders(width, height));
    gameObjects.push(new Paddle(350, height - CELLWIDTH));

    lastTime = Date.now();



    window.requestAnimationFrame(tick);
}

function tick() {
    const now = Date.now();
    const delta = now - lastTime;
    readInput();
    calc();
    draw();
    window.requestAnimationFrame(tick);
    lastTime = now;
}

function calc() {
    for (let o of gameObjects) {
        o.calc(Date.now());
    }
}

function readInput() {

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let o of gameObjects) {
        o.draw();
    }
}

class Drawable {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lastTime = Date.now();
    }

    draw() {

    }

    calc(time) {

    }
}

class Square extends Drawable {
    constructor(x, y, side) {
        super(x, y);
        this.side = side;
    }

    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.side, this.side);
    }
}

class Rectangle extends Drawable {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
    }

    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Borders extends Drawable {
    constructor(width, height) {
        super(0, 0);
        this.width = width;
        this.height = height;
        this.walls = [];
        this.walls.push(new Rectangle(this.x, this.y, width, CELLWIDTH));
        this.walls.push(new Rectangle(this.x, this.y, CELLWIDTH, height));
        this.walls.push(new Rectangle(width - CELLWIDTH, this.y, CELLWIDTH, height))
    }

    draw() {
        for (let wall of this.walls) {
            wall.draw();
        }
    }
}

class Paddle extends Rectangle {
    constructor(x, y) {
        super(x, y);
        this.width = 100;
        this.height = CELLWIDTH;
        this.direction = "none";
        this.speed = 0.25;
        window.addEventListener("keydown", e => {
            if (e.code === "ArrowRight") {
                this.direction = "right";
            }
            else if (e.code === "ArrowLeft") {
                this.direction = "left";
            }
            console.log(this.direction)
        })
    }

    calc(time) {
        console.log(`Time since last: ${time - this.lastTime}`)
        const delta = time - lastTime;
        this.lastTime = time;
        if (this.direction === "right") {
            this.x += this.speed * delta;
        }
        else if (this.direction === "left") {
            this.x -= this.speed * delta;
        }
    }
}