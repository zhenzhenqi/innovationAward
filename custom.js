function setup() {
  createCanvas(displayWidth, displayHeight);
}

function draw() {
   background(255, 255, 255, 20);
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}




function Vehicle(x, y) {  

    this.history = [];
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,-2);
    this.location = createVector(x,y);
    this.r = 6;
    this.maxspeed = 4;
    this.maxforce = 0.1;

  // Method to update location
 this.update= function() {
    // Update velocity
    velocity.add(acceleration);
    // Limit speed
    velocity.limit(maxspeed);
    location.add(velocity);
    // Reset accelerationelertion to 0 each cycle
    acceleration.mult(0);
    
        history.add(location.get());
    if (history.size() > 100) {
      history.remove(0);
    }
  }

  this.applyForce= function(force) {
    // We could add mass here if we want A = F / M
    acceleration.add(force);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {
    var desired = target.sub(location);  // A vector pointing from the location to the target
    
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(maxspeed);
    // Steering = Desired minus velocity
    var steer = desired.sub(velocity);
    steer.limit(maxforce);  // Limit to maximum steering force
    
    applyForce(steer);
  }
    
  this.display = function() {
    beginShape();
    stroke(0);
    strokeWeight(1);
    noFill();
    for(var i = 0; i < history.length; i++) {
      vertex(history[i].x, history[i].y);
    }
    endShape();
    
    // Draw a triangle rotated in the direction of velocity
    var theta = velocity.heading2D() + PI/2;
    fill(127);
    stroke(0);
    strokeWeight(1);
    pushMatrix();
    translate(location.x,location.y);
    rotate(theta);
    beginShape();
    vertex(0, -r*2);
    vertex(-r, r*2);
    vertex(r, r*2);
    endShape(CLOSE);
    popMatrix();
  }
}
