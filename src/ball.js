export default class Ball {
    constructor(x, y, radius, dx, dy, gravity, maxSpeed, speedIncrement) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dx = dx;
      this.dy = dy;
      this.gravity = gravity;
      this.maxSpeed = maxSpeed;
      this.speedIncrement = speedIncrement;
      this.trail = [];
    }
  
    updatePosition(circleCenterX, circleCenterY, circleRadius) {
      this.dy += this.gravity;
      this.dx = Math.min(Math.abs(this.dx), this.maxSpeed) * Math.sign(this.dx);
      this.dy = Math.min(Math.abs(this.dy), this.maxSpeed) * Math.sign(this.dy);
  
      let nextX = this.x + this.dx;
      let nextY = this.y + this.dy;
  
      let distX = nextX - circleCenterX;
      let distY = nextY - circleCenterY;
      let distanceFromCenter = Math.sqrt(distX ** 2 + distY ** 2);
  
      if (distanceFromCenter + this.radius >= circleRadius) {
        let normalX = distX / distanceFromCenter;
        let normalY = distY / distanceFromCenter;
        let dot = this.dx * normalX + this.dy * normalY;
  
        this.dx -= 2 * dot * normalX;
        this.dy -= 2 * dot * normalY;
  
        this.dx *= (1 + this.speedIncrement);
        this.dy *= (1 + this.speedIncrement);
  
        this.x = circleCenterX + normalX * (circleRadius - this.radius);
        this.y = circleCenterY + normalY * (circleRadius - this.radius);
        return true;
      } else {
        this.x = nextX;
        this.y = nextY;
        return false;
      }
    }
  
    addToTrail() {
      this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 1000000) {
            this.trail.shift();
        }
    }
  
    animate(canvasManager, musicPlayer) {
      if (this.updatePosition(canvasManager.circleCenterX, canvasManager.circleCenterY, canvasManager.circleRadius)) {
        musicPlayer.playNote();
      }
      this.addToTrail();
      canvasManager.clear();
      canvasManager.drawCircle();
      canvasManager.drawTrail(this);
      canvasManager.drawBall(this);
    }
  }
  