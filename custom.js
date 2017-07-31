var allParticles = [];
var hues = [];
var hueIndex = 0;
var currentHue = hues[hueIndex];


function setup() {
    createCanvas(displayWidth, displayHeight);
    //    colorMode(HSB, 360);
    background(360);

    hues.push(color(255, 0, 0, 30));
    hues.push(color(0, 0, 0, 30));
    hues.push(color(0, 0, 255, 30));

    currentHue = hues[hueIndex];
}


function draw() {
    background(360);
    strokeWeight(1);

    for (var i = 0; i < allParticles.length; i++) {
        var p = allParticles[i];
        p.move();

        stroke(p.h);
        var r = p.vel.mag() * 3 + 10;
        //        strokeWeight(p.vel.mag() * 1.25);

        ellipse(p.pos.x, p.pos.y, r, r);

//        if (p.vel.mag() < 0.1) {
//            allParticles.splice(0, 1);
//        }
    }

        if (allParticles.length > 30) {
            allParticles.splice(0, 10);
        }

    for (var i = 0; i < allParticles.length; i++) {
        var p1 = allParticles[i];
        for (var j = 0; j < allParticles.length; j++) {
            var p2 = allParticles[j];

            if (p1 == p2) {
                continue;
            }

            stroke(red(p1.h), green(p1.h), blue(p1.h), p1.vel.mag() + 20);
            var d = dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);

            if (d < 200) {
                line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
            }
        }
    }
}

function mousePressed() {
    if (hueIndex == 2) {
        hueIndex = 0;
    } else {
        hueIndex++;
    }
    currentHue = hues[hueIndex];
}

function mouseMoved() {
    if (frameCount % 5 == 0) {
        allParticles.push(new Particle(mouseX, mouseY, pmouseX, pmouseY));
    }

//    if (dist(mouseX, mouseY, pmouseX, pmouseY) < 5) {
    if(frameCount%300==0){
        if (hueIndex == 2) {
            hueIndex = 0;
        } else {
            hueIndex++;
        }
        currentHue = hues[hueIndex];

//    }
    }

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