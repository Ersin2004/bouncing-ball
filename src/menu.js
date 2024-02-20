import React, { useState } from 'react';

const Menu = ({ onStartAnimation, onUpdateSettings }) => {
  const [speed, setSpeed] = useState(0.3);
  const [gravity, setGravity] = useState(0.5);
  const [color, setColor] = useState('black');
  const [songName, setSongName] = useState('Turkish March - Mozart');

  const handleStartAnimation = () => {
    onStartAnimation(speed, gravity, color);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    onUpdateSettings({ speed: newSpeed, gravity, color });
  };

  const handleGravityChange = (e) => {
    const newGravity = parseFloat(e.target.value);
    setGravity(newGravity);
    onUpdateSettings({ speed, gravity: newGravity, color });
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    onUpdateSettings({ speed, gravity, color: newColor });
  };

  return (
    <div className="absolute text-center">
      <div className="p-4">
        <div className="mb-4">
          Song: {songName}
        </div>
        <div className="flex justify-around">
          <div className="cursor-pointer p-4 border border-blue-500">
            Speed:
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={speed}
              onChange={handleSpeedChange}
            />
            {speed}
          </div>
          <div className="cursor-pointer p-4 border border-blue-500">
            Gravity:
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={gravity}
              onChange={handleGravityChange}
            />
            {gravity}
          </div>
          <div className="cursor-pointer p-4 border border-blue-500">
            Color:
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
            />
          </div>
        </div>
        <button id="playButton" onClick={handleStartAnimation} className="mt-4 px-4 py-2 bg-green-500 text-white">Start Animation</button>
      </div>
    </div>
  );
};

export default Menu;
