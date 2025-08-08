import React, { useEffect, useRef } from 'react';
import ScrambledText from './ScrambleText';
import { startGame } from './game';

const GameApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current && scoreRef.current) {
      startGame(canvasRef.current, scoreRef.current);
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Black background layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#000',
          zIndex: 0
        }}
      />
      {/* ScrambledText overlay */}
      <ScrambledText
        className="scrambled-text-demo"
        radius={100}
        duration={1.2}
        speed={0.5}
        scrambleChars=".:"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'auto',
        }}
      >
        {`drugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugs
        drugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugs
        drugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugsdrugs`}
      </ScrambledText>
      {/* Canvas and score on top */}
      <canvas
        ref={canvasRef}
        id="gameCanvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          background: 'transparent',
          pointerEvents: 'none',
        }}
      />
      <div
        ref={scoreRef}
        id="score"
        style={{
          color: 'white',
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default GameApp;
