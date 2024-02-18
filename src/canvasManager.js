export default class CanvasManager {
    constructor(ctx, circleCenterX, circleCenterY, circleRadius) {
      this.ctx = ctx;
      this.circleCenterX = circleCenterX;
      this.circleCenterY = circleCenterY;
      this.circleRadius = circleRadius;
    }
  
    drawCircle() {
      this.ctx.beginPath();
      this.ctx.arc(this.circleCenterX, this.circleCenterY, this.circleRadius, 0, Math.PI * 2);
      this.ctx.strokeStyle = 'white';
      this.ctx.stroke();
      this.ctx.closePath();
    }
  
    drawBall(ball) {
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
      this.ctx.closePath();
    }
  
    drawTrail(ball) {
      this.ctx.beginPath();
      ball.trail.forEach((point, index) => {
        if (index === 0) {
          this.ctx.moveTo(point.x, point.y);
        } else {
          this.ctx.lineTo(point.x, point.y);
        }
      });
      this.ctx.strokeStyle = 'red';
      this.ctx.stroke();
    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }
  