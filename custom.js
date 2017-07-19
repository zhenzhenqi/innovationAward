var allParticles = [];
var currentHue = 0;

function setup() {
    createCanvas(displayWidth, displayHeight);
    colorMode(HSB, 360);
    background(360, P2D);
}


function draw() {
    background(360);

    for (var i = 0; i < allParticles.length - 1; i++) {
        var p = allParticles[i];
        p.move();

        stroke(p.h, 360, 360);
        var r = p.vel.mag() * 3 + 10;
//        strokeWeight(p.vel.mag() * 1.25);
        strokeWeight(1);
        ellipse(p.pos.x, p.pos.y, r, r);


        //        if (p.vel.mag() < 0.1) {
        //            allParticles.splice(i, 1);
        //        }
    }

    if (allParticles.length > 60) {
        allParticles.splice(0, 10);
    }

    for (var i = 0; i < allParticles.length; i++) {
        var p1 = allParticles[i];
        for (var j = 0; j < allParticles.length; j++) {
            var p2 = allParticles[j];

            if (p1 == p2) {
                continue;
            }

            stroke(p1.h, 360, 360, p1.vel.mag() + 100);


            var d = dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);

            if (d < 120) {
                strokeWeight(1);
                line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
            }
        }
    }
}

function mousePressed() {
    currentHue = random(360);
    console.log("pressed");
}


function mouseDragged() {
    allParticles.push(new Particle(mouseX, mouseY, pmouseX, pmouseY));
}


function Particle(x, y, px, py) {
    this.pos = createVector(x, y);

    this.acc = createVector(0, 0);
    this.h = currentHue;


    this.lastPos = createVector(x, y);
    this.vel = createVector(px, py);
    this.vel.sub(this.lastPos);
    this.vel.rotate(radians(random(-75, 75)));
    this.vel.limit(8);
    this.vel.mult(random(0.2, 0.75));


    this.move = function () {
        if (this.vel.mag() > 5) {
            this.vel.mult(0.98);
        } else {
            this.vel.mult(0.95);
        }

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
}