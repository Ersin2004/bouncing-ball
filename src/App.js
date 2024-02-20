import React, { useRef, useEffect, useState } from "react";
import Menu from "./menu";
import Ball from "./ball";
import MusicPlayer from "./musicNotesPlayer";
import CanvasManager from "./canvasManager";
import "./index.css";
import * as Tone from "tone";
import settings from "./settings";

const App = () => {
  const canvasRef = useRef(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const animationRef = useRef();
  const musicPlayer = useRef();
  const ball = useRef();
  const canvasManager = useRef();
  const [settingsState, setSettingsState] = useState(settings.defaultSettings);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const circleCenterX = canvas.width / 2;
    const circleCenterY = canvas.height / 2;
    const circleRadius = 300;

    musicPlayer.current = new MusicPlayer("turkishMarch.mid");

    const { gravity, maxSpeed, speedIncrement } = settingsState;

    let randomDx, randomDy;
    do {
      randomDx = Math.random() * (1 - 0.1) + 0.1;
      randomDy = Math.random() * (1 - 0.1) + 0.1;
    } while (randomDx === randomDy);

    ball.current = new Ball(
      circleCenterX,
      circleCenterY - circleRadius,
      10,
      randomDx,
      randomDy,
      gravity,
      maxSpeed,
      speedIncrement
    );

    canvasManager.current = new CanvasManager(
      ctx,
      circleCenterX,
      circleCenterY,
      circleRadius
    );

    const update = () => {
      ball.current.animate(
        canvasManager.current,
        musicPlayer.current,
        settingsState.ballColor,
        settingsState.trailColor
      );
      animationRef.current = requestAnimationFrame(update);
    };

    if (startAnimation && settingsState) {
      Tone.start().then(() => {
        update();
      });
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [startAnimation, settingsState]);

  const handleStartAnimation = () => {
    setStartAnimation(true);
  };

  const handleUpdateBallSettings = (updatedSettings) => {
    const { gravity, maxSpeed, speedIncrement } = updatedSettings;

    ball.current.gravity =
      gravity !== undefined ? gravity : settings.defaultSettings.gravity;
    ball.current.maxSpeed =
      maxSpeed !== undefined ? maxSpeed : settings.defaultSettings.maxSpeed;
    ball.current.speedIncrement =
      speedIncrement !== undefined
        ? speedIncrement
        : settings.defaultSettings.speedIncrement;

    setSettingsState(updatedSettings);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <canvas ref={canvasRef} />
      {!startAnimation && (
        <Menu
          onStartAnimation={handleStartAnimation}
          onUpdateBallSettings={handleUpdateBallSettings}
        />
      )}
    </div>
  );
};

export default App;
