import React, { useState, useRef } from 'react';
import './App.css';

const useCanvasEngine = () => {
  const [_interval, _setInterval] = useState(0);
  const [running, setRunning] = useState(false);

  const updater = (ctx) => {
    return () => {
      console.log(ctx);
    }
  };

  const run = (canvasRef, framerate) => {
    const ctx = canvasRef.current.getContext('2d');

    _setInterval(setInterval(updater(ctx), framerate));
    setRunning(true);
  };

  const stop = () => {
    if (_interval) {
      clearInterval(_interval);
      _setInterval(null);
      setRunning(false);
    }
  };

  return { run, stop, running };
};

const App = () => {
  const canvasRef = useRef();
  const ce = useCanvasEngine();

  const engineButton = () => {
    let onClick = () => { ce.run(canvasRef, 12); };
    if (ce.running) onClick = () => { ce.stop(); };

    return (
      <button type="button" onClick={onClick}>
        { ce.running ? 'Stop' : 'Run' }
      </button>
    );
  };

  return (
    <div className="app">
      <canvas id="game_canvas" className="game_canvas" ref={canvasRef} />
      { engineButton() }
    </div>
  );
};

export default App;
