import React, { useState } from 'react';

const Menu = ({ onStartAnimation }) => {
  const [selectedOption, setSelectedOption] = useState('useDefault');

  return (
    <div className="absolute text-center">
      <div className="flex justify-around p-4">
        <div
          className={`cursor-pointer p-4 border ${selectedOption === 'useDefault' ? 'border-blue-500' : 'border-transparent'}`}
          onClick={() => setSelectedOption('useDefault')}
        >
          Use Default
        </div>
      </div>
      <button id="playButton" onClick={onStartAnimation} className="mt-4 px-4 py-2 bg-green-500 text-white">Start Animation</button>
    </div>
  );
};

export default Menu;
