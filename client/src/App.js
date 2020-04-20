import React, { useState, useRef } from 'react';
import './App.css';

const randomColor = () => {
  const r = 255*Math.random()|0;
  const g = 255*Math.random()|0;
  const b = 255*Math.random()|0;

  return `rgb(${r},${g},${b})`;
};

const drawSquare = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 20, 20);
};

const useCanvasEngine = ({ onUpdate, ...props }) => {
  const framerate = props.framerate || 60;
  const [_interval, _setInterval] = useState(0);
  const [running, setRunning] = useState(false);
  const canvasRef = useRef();

  const run = () => {
    const context = canvasRef.current.getContext('2d');

    _setInterval(setInterval(() => onUpdate(context), 1000/framerate));
    setRunning(true);
  };

  const stop = () => {
    if (_interval) {
      clearInterval(_interval);
      _setInterval(0);
      setRunning(false);
    }
  };

  return { run, stop, canvasRef, running };
};

const App = () => {
  const ce = useCanvasEngine({
    framerate: 1,
    onUpdate: (ctx) => {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;

      ctx.clearRect(0, 0, width, height);
      drawSquare(ctx, width * Math.random(), height * Math.random(), randomColor());
    }
  });

  return (
    <div className="app">
      <canvas id="game_canvas" className="game_canvas" ref={ce.canvasRef} />
      <button type="button" onClick={ce.running ? ce.stop : ce.run}>
        { ce.running ? 'Stop' : 'Run' }
      </button>
    </div>
  );
};

export default App;
