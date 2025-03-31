import React, { useState, useEffect } from 'react';
import './ToggleButton.css';

const ToggleButton = ({design, info1, info2, onDisappear, onClick, isEditing, authenticated }) => {
  const [editing, setEditing] = useState(isEditing);

  useEffect(() => {
      setEditing(isEditing);
  }, [isEditing]);

  const handleClick = () => {
      if (authenticated) {
        setEditing(!editing);
      } else {
        setEditing(false);
      }

      if (editing) {
        onClick();
      } else {
        onDisappear();
      }
  };

  return (
      <button className={`${design} ${'btn1'}`} onClick={handleClick}>
          {editing ? info2 : info1}
      </button>
  );
};

export default ToggleButton;