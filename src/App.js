import React, { useRef, useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const canvasRef = useRef(null);
  const ballRef = useRef({
    x: 0,
    y: 0,
    radius: 10,
    dx: 0.5, // horizontal velocity
    dy: 0.5, // vertical velocity
    speedIncrement: 0.01, // Speed after bounce
    gravity: 0.02,
    trail: []
  });
  const [startAnimation, setStartAnimation] = useState(false);
  const animationRef = useRef();

  useEffect(() => {
    if (!startAnimation) {
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const ball = ballRef.current;

    // Set up the canvas and circle dimensions
    const circleRadius = 300;
    canvas.width = 2 * circleRadius;
    canvas.height = 2 * circleRadius;
    const circleCenterX = canvas.width / 2;
    const circleCenterY = canvas.height / 2;

    // Start the ball at a position offset from the top center of the circle
    ball.x = circleCenterX;
    ball.y = circleCenterY - circleRadius + ball.radius;

    const drawCircle = () => {
      ctx.beginPath();
      ctx.arc(circleCenterX, circleCenterY, circleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = '#fff';
      ctx.stroke();
      ctx.closePath();
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.closePath();
    };

    const drawTrail = () => {
      ctx.beginPath();
      ball.trail.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.strokeStyle = 'red';
      ctx.stroke();
    };

    const update = () => {
      ball.dy += ball.gravity;

      let nextX = ball.x + ball.dx;
      let nextY = ball.y + ball.dy;

      let distX = nextX - circleCenterX;
      let distY = nextY - circleCenterY;
      let distanceFromCenter = Math.sqrt(distX * distX + distY * distY);

      if (distanceFromCenter >= circleRadius - ball.radius) {
        let normalX = distX / distanceFromCenter;
        let normalY = distY / distanceFromCenter;
        let dot = ball.dx * normalX + ball.dy * normalY;
        ball.dx -= 2 * dot * normalX;
        ball.dy -= 2 * dot * normalY;

        ball.dx *= (1 + ball.speedIncrement);
        ball.dy *= (1 + ball.speedIncrement);

        ball.x = circleCenterX + normalX * (circleRadius - ball.radius);
        ball.y = circleCenterY + normalY * (circleRadius - ball.radius);
      } else {
        ball.x = nextX;
        ball.y = nextY;
      }

      ball.trail.push({ x: ball.x, y: ball.y });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCircle();
      drawTrail();
      drawBall();

      animationRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [startAnimation]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <canvas ref={canvasRef} />
      {!startAnimation && (
        <button onClick={() => setStartAnimation(true)} style={{ position: 'absolute' }}>Start Animation</button>
      )}
    </div>
  );
};

export default App;
