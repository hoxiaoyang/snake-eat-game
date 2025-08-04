import React, { useState, useEffect } from "react";

interface SnakeProps {
  initialPosition: number;
  onCakeEaten?: (position: { x: number; y: number }) => void;
}

const Snake: React.FC<SnakeProps> = ({ initialPosition, onCakeEaten }) => {
  const [position, setPosition] = useState(initialPosition);
  const [showNomText, setShowNomText] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setPosition((prevPosition) => Math.max(0, prevPosition - 10));
      } else if (event.key === "ArrowRight") {
        setPosition((prevPosition) =>
          Math.min(window.innerWidth - 50, prevPosition + 10)
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Check for collision with falling objects (cakes)
  useEffect(() => {
    const checkCollision = () => {
      // Get all falling objects (assuming they have a specific class or data attribute)
      const fallingObjects = document.querySelectorAll(".falling-object");
      const snakeElement = document.querySelector('[data-snake="true"]');

      if (!snakeElement) return;

      const snakeRect = snakeElement.getBoundingClientRect();

      fallingObjects.forEach((obj) => {
        const objRect = obj.getBoundingClientRect();

        // Check if snake and falling object overlap
        if (
          snakeRect.left < objRect.right &&
          snakeRect.right > objRect.left &&
          snakeRect.top < objRect.bottom &&
          snakeRect.bottom > objRect.top
        ) {
          // Collision detected!
          if (onCakeEaten) {
            setShowNomText(true);
            onCakeEaten({
              x: snakeRect.left + snakeRect.width / 2, // Exact center of snake
              y: snakeRect.top, // Exact top of snake
            });
          }

          // Remove the eaten cake
          obj.remove();
        }
      });
    };

    // Check for collisions every frame
    const animationFrame = requestAnimationFrame(function checkFrame() {
      checkCollision();
      requestAnimationFrame(checkFrame);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [position, onCakeEaten]);

  useEffect(() => {
    if (showNomText) {
      const timer = setTimeout(() => {
        setShowNomText(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showNomText]);
  
  return (
    <div>
      {/* The snake */}
      <div
        data-snake="true"
        style={{
          position: "absolute",
          bottom: "0",
          left: (position as number) + "px",
          width: "50px",
          height: "20px",
          backgroundColor: "green",
          zIndex: 10,
        }}
      ></div>

      {/* NOM text that appears above the snake */}
      {showNomText && (
        <div
          style={{
            position: "absolute",
            bottom: "25px", // 20px snake height + 5px gap
            left: position + 25 + "px", // Center of snake
            transform: "translateX(-50%)",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            zIndex: 15,
            pointerEvents: "none",
            animation: "bounce 0.5s ease-in-out infinite alternate",
          }}
        >
          NOM
        </div>
      )}
    </div>
  );
};

export default Snake;
