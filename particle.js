class Particle {
  constructor() {
    this.d = 5;
    this.pos = createVector(random(lft, rgt), random(cel, btm));
    this.vel = p5.Vector.random2D();

    this.rg = random(50, 100);
  }

  show() {
    push();
    noStroke();
    fill(this.rg, this.rg, 255);
    ellipse(this.pos.x, this.pos.y, this.d, this.d);
    pop();
  }

  move() {
    this.pos.add(this.vel);
  }

  bounce() {
    if (this.pos.y <= cel) {
      this.vel.y = abs(this.vel.y);
    }
    if (this.pos.y >= btm) {
      this.vel.y = -abs(this.vel.y);
    }
    if (this.pos.x <= lft) {
      this.vel.x = abs(this.vel.x);
    }
    if (this.pos.x >= rgt) {
      this.vel.x = -abs(this.vel.x);
    }
  }
}