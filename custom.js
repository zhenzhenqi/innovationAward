var vehicles = [];
var l = 1000;

function setup() {
    createCanvas(displayWidth, displayHeight);

    for (var i = 0; i < l; i++) {
        vehicles.push(new Vehicle());
    }
}

function draw() {
    background(255, 255, 255, 5);
    for (var i = 0; i < vehicles.length; i++) {
        vehicles[i].update(mouseX, mouseY);
        vehicles[i].display();
    }
}


function Vehicle() {
    this.location = createVector(mouseX + random(300), mouseY + random(300));
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.speed = createVector(10, 10);
    this.maxspeed = 8;

    // Method to update location
    this.update = function (x, y) {
        var mouse = createVector(x, y);
        // Update velocity
        this.acceleration = mouse.sub(this.location);
        this.acceleration.normalize();
        this.acceleration.mult(0.2);
        this.speed.add(this.acceleration);
        this.speed.limit(this.maxspeed);
        this.location.add(this.speed);
    }


    this.display = function () {
        noStroke();
        fill(0);
        ellipse(this.location.x, this.location.y, 1, 1);
    }
}