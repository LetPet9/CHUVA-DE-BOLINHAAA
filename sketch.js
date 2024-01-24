let bolinhas = [];
let gravidade, atrito

function preload() {}

function setup() {
    createCanvas(windowWidth, windowHeight -10);
    ellipseMode(RADIUS);
    colorMode(HSL, 100);
    bolinhas.push(new Bolinha(width / 2, height / 2));
    bolinhas.push(new Bolinha(random(width), random(height)));

    gravidade = 1;
    atrito = 0.95;

    textAlign(LEFT, TOP);
    textSize(20);
}

function draw() {
    background(255);
    
    for (let i = 0; i < bolinhas.length; i++) {
        let bola = bolinhas[i];
        bola.show();
        bola.move();
    }

    push();
    fill(0);
    noStroke();
    text("Bolinhas na tela: " + bolinhas.length, 10, 10);
    pop()

    if (frameCount % 50 == 0) {
        criaBolinha();
    }
}

function mousePressed() {
    criaBolinha();
}


function criaBolinha() {

    const bolota = new Bolinha(mouseX, mouseY);
    bolinhas.push(bolota);
}

class Bolinha {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = random(10, 50);
        this.c = color(random(100), 100, 75);
        this.dx = random(0.1, 3) * random([-1, 1]);
        this.dy = 0;
    }
    show() {
        push();
        fill(this.c);
        circle(this.x, this.y, this.r);
        pop();
    }
    move() {
        this.dy += gravidade;
        this.x += this.dx;
        this.y += this.dy;

        if (this.y + this.r >= height) {
            this.y = height - this.r;
            this.dy *= -atrito;
            this.dx *= atrito;
        }

        if (this.x - this.r < 0) {
            this.x = this.r;
            this.dx *= -1
        }

        if (this.x + this.r >= width) {
            this.x = width - this.r
            this.dx *= -1
        }
    }
}