import React, { useState } from "react";
import settings from "./settings";

const Menu = ({ onStartAnimation, onUpdateBallSettings }) => {
  const [settingsState, setSettingsState] = useState(settings.defaultSettings);

  const handleStartAnimation = () => {
    onStartAnimation(settingsState);
    console.log("Settings:", settingsState);
  };

  const handleChange = (e, key) => {
    const value = ["speedIncrement", "gravity"].includes(key)
      ? parseFloat(e.target.value)
      : e.target.value;

    setSettingsState((prevSettingsState) => ({
      ...prevSettingsState,
      [key]: value,
    }));

    if (key === "gravity") {
      settings.defaultSettings.gravity = value;
    } else {
      settings.defaultSettings[key] = value;
    }
  };

  return (
    <div className="absolute text-center">
      <div className="p-4">
        <div className="mb-4 text-white">Song: {settingsState.songName}</div>
        <div className="flex flex-wrap justify-around">
          {Object.keys(settingsState).map((key) => {
            if (key !== "songName") {
              return (
                <div
                  key={key}
                  className="p-4 border border-blue-500 rounded-md flex justify-center	flex-col"
                >
                  <label htmlFor={key} className="block mb-2 text-white">
                    {key === "trailColor" ? "Trail Color" : key}
                  </label>
                  {key === "ballColor" || key === "trailColor" ? (
                    <input
                      id={key}
                      type="color"
                      value={settingsState[key]}
                      onChange={(e) => handleChange(e, key)}
                    />
                  ) : (
                    <input
                      id={key}
                      type="range"
                      min={settings[key].min}
                      max={settings[key].max}
                      step={settings[key].step}
                      value={settingsState[key]}
                      onChange={(e) => handleChange(e, key)}
                    />
                  )}
                  <span className="text-white">{settingsState[key]}</span>
                </div>
              );
            }
            return null;
          })}
        </div>
        <button
          onClick={handleStartAnimation}
          className="mt-4 px-4 py-2 bg-green-500 text-white"
        >
          Start Animation
        </button>
      </div>
    </div>
  );
};

export default Menu;