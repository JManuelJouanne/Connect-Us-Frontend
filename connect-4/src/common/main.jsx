import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Routing from './routing';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <div className="size" id="mono1">
      <div className="player">
        <div className="legs"></div>
        <div className="back"></div>
        <div className="glass"></div>
      </div>
    </div>
    <div className="size" id="mono2">
      <div className="player">
        <div className="legs"></div>
        <div className="back"></div>
        <div className="glass"></div>
      </div>
    </div>
    <div className="size" id="mono3">
      <div className="player">
        <div className="legs"></div>
        <div className="back"></div>
        <div className="glass"></div>
      </div>
    </div>
    <audio id="audio" loop autoPlay>
      <source src="/spaceship.mp3" type="audio/mpeg" />
    </audio>
    <React.StrictMode>
      <Routing />
    </React.StrictMode>
  </>,
);
