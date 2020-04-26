import React, { useState, useRef } from 'react';
import './App.css';

const App = ({ game }) => {
  const gameEngine = useGameEngine(game);

  const runGame = () => {
    gameEngine.run();
  };

  const stopGame = () => {
    gameEngine.stop();
  };

  return (
    <div className="app">
      <canvas id="game_canvas" className="game_canvas" ref={gameEngine.canvasRef} />
      <button type="button" onClick={gameEngine.running ? stopGame : runGame}>
        { gameEngine.running ? 'Stop' : 'Run' }
      </button>
    </div>
  );
};

const useGameEngine = game => {
  const gameRef = useRef(game);
  const canvasEngine = useCanvasEngine({ onUpdate: game.update });

  const run = () => {
    gameRef.current.init();
    canvasEngine.run();
  };

  const stop = () => {
    canvasEngine.stop();
  };

  const canvasRef = () => {
    return canvasEngine.canvasRef;
  };

  return { run, stop, running: canvasEngine.running, canvasRef: canvasRef() }
};

const useCanvasEngine = ({ onUpdate, ...props }) => {
  const framerate = props.framerate || 60;
  const [running, setRunning] = useState(false);
  const animationFrame = useRef(0);
  const lastUpdatedAt = useRef(0);
  const canvasRef = useRef();

  const animate = time => {
    const deltaTime = time - lastUpdatedAt.current;

    if (deltaTime > 1000 / framerate) {
      onUpdate(canvasRef.current.getContext('2d'));
      lastUpdatedAt.current = time;
    }
    animationFrame.current = requestAnimationFrame(animate);
  };

  const run = () => {
    animationFrame.current = requestAnimationFrame(animate);
    setRunning(true);
  };

  const stop = () => {
    cancelAnimationFrame(animationFrame.current);
    setRunning(false);
  };

  return { run, stop, canvasRef, running };
};

export default App;
