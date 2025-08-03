// src/components/FallingObject.tsx
import React, { useEffect, useState } from "react";
import fallingImage from "../assets/cake.png";
import "/src/css/components/_FallingObject.css";

const FallingObject: React.FC = () => {
  const [xPosition, setXPosition] = useState<number>(0);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);

  useEffect(() => {
    // Set random position immediately
    const randomX = Math.random() * (window.innerWidth - 100); // Account for image width
    setXPosition(randomX);

    // Start animation after delay
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`falling-object ${shouldAnimate ? "animate" : ""}`}
      style={{ left: `${xPosition}px` }}
    >
      <img
        src={fallingImage}
        alt="cake"
        style={{ 
          width: '100%', 
          height: '100%',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default FallingObject;