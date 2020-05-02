import React, { useState, useRef } from 'react';
import './App.css';

const App = ({ game }) => {
  const canvasEngine = useCanvasEngine(game);

  const runGame = () => {
    canvasEngine.run();
  };

  const stopGame = () => {
    canvasEngine.stop();
  };

  return (
    <div className="app">
      <div className="game_canvas_container">
        <canvas id="game_canvas" ref={canvasEngine.canvasRef} />
      </div>
      <button type="button" onClick={canvasEngine.running ? stopGame : runGame}>
        { canvasEngine.running ? 'Stop' : 'Run' }
      </button>
    </div>
  );
};

const useCanvasEngine = game => {
  const framerate = 60;
  const [running, setRunning] = useState(false);
  const gameRef = useRef(game);
  const animationFrame = useRef(0);
  const lastUpdatedAt = useRef(0);
  const canvasRef = useRef();
  const squareSize = 20;

  const drawHelpers = ctx => {
    return {
      drawSquare: (x, y, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
      },
      randomColor: () => {
        const r = 255*Math.random()|0;
        const g = 255*Math.random()|0;
        const b = 255*Math.random()|0;

        return `rgb(${r},${g},${b})`;
      }
    };
  };

  const animate = time => {
    const deltaTime = time - lastUpdatedAt.current;

    if (deltaTime > 1000 / framerate) {
      const ctx = canvasRef.current.getContext('2d');

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      gameRef.current.update(drawHelpers(ctx));
      lastUpdatedAt.current = time;
    }
    animationFrame.current = requestAnimationFrame(animate);
  };

  const run = () => {
    gameRef.current.init();
    canvasRef.current.width = gameRef.current.maze.width * squareSize;
    canvasRef.current.height = gameRef.current.maze.height * squareSize;
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
