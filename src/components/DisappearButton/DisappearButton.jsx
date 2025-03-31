import React, { useState, useEffect } from 'react';

const DisappearButton = ({ info, show, onDisappear, onClick, loadButton }) => {
  const [isVisible, setIsVisible] = useState(show); // State to track visibility

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  const handleClick = () => {
    setIsVisible(false);
    onDisappear();
    onClick();
  };

  if (!isVisible) {
    return loadButton;
  }

  return (
    <div>
      <button className='btn1' onClick={handleClick}>
        {info}
      </button>
    </div>
  );
};

export default DisappearButton;