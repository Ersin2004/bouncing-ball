import React, { useRef, useEffect, useState } from 'react';
import Menu from './menu';
import Ball from './ball';
import MusicPlayer from './musicNotePlayer';
import CanvasManager from './canvasManager';
import './app.css';
import './index.css';
import * as Tone from 'tone';

const App = () => {
  const canvasRef = useRef(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const animationRef = useRef();
  const musicPlayer = useRef();
  const ball = useRef();
  const canvasManager = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const circleCenterX = canvas.width / 2;
    const circleCenterY = canvas.height / 2;
    const circleRadius = 300;

    musicPlayer.current = new MusicPlayer('turkishMarch.mid');
    ball.current = new Ball(circleCenterX, circleCenterY - circleRadius, 10, 0.3, 0.5, 0.1, 30, 0.01);
    canvasManager.current = new CanvasManager(ctx, circleCenterX, circleCenterY, circleRadius);

    const update = () => {
      ball.current.animate(canvasManager.current, musicPlayer.current);
      animationRef.current = requestAnimationFrame(update);
    };

    if (startAnimation) {
      Tone.start().then(() => {
        update();
      });
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [startAnimation]);

  const handleStartAnimation = () => {
    setStartAnimation(true);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <canvas ref={canvasRef} />
      {!startAnimation && <Menu onStartAnimation={handleStartAnimation} />}
    </div>
  );
};

export default App;
