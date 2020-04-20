import React, { useState, useRef } from 'react';
import './App.css';

const randomColor = () => {
  const r = 255*Math.random()|0;
  const g = 255*Math.random()|0;
  const b = 255*Math.random()|0;

  return `rgb(${r},${g},${b})`;
};
const drawSquare = (ctx, x, y, color) => {
  ctx.fillStyle = randomColor();
  ctx.fillRect(x, y, 20, 20);
};

const useCanvasEngine = () => {
  const [_interval, _setInterval] = useState(0);
  const [running, setRunning] = useState(false);
  const canvasRef = useRef();

  const updater = (ctx) => {
    return () => {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;

      ctx.clearRect(0, 0, width, height);
      drawSquare(ctx, width * Math.random(), height * Math.random(), randomColor());
    }
  };

  const run = (framerate) => {
    const ctx = canvasRef.current.getContext('2d');
    const update = updater(ctx);

    _setInterval(setInterval(update, framerate));
    setRunning(true);
  };

  const stop = () => {
    if (_interval) {
      clearInterval(_interval);
      _setInterval(null);
      setRunning(false);
    }
  };

  return { run, stop, canvasRef, running };
};

const App = () => {
  const ce = useCanvasEngine();

  const engineButton = () => {
    let onClick = () => { ce.run(1000/12); };
    if (ce.running) onClick = () => { ce.stop(); };

    return (
      <button type="button" onClick={onClick}>
        { ce.running ? 'Stop' : 'Run' }
      </button>
    );
  };

  return (
    <div className="app">
      <canvas id="game_canvas" className="game_canvas" ref={ce.canvasRef} />
      { engineButton() }
    </div>
  );
};

export default App;
