import React, { useState, useEffect } from 'react';

interface SnakeProps {
  initialPosition: number;
}

const Snake: React.FC<SnakeProps> = ({ initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setPosition((prevPosition) => Math.max(0, prevPosition - 10));
      } else if (event.key === 'ArrowRight') {
        setPosition((prevPosition) => Math.min(window.innerWidth - 50, prevPosition + 10));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <div style={{
    position: 'absolute',
    bottom: '0',
    left: (position as number) + 'px',
    width: '50px',
    height: '20px',
    backgroundColor: 'green',
  }}></div>;
};

export default Snake;
