import React from 'react';
import clearDay from './weatherIcons/day.svg';
import clearNight from './weatherIcons/night.svg';
import cloudyDay from './weatherIcons/cloudy-day.svg';
import cloudyNight from './weatherIcons/cloudy-night.svg';
import rainy from './weatherIcons/rainy.svg';
import snowy from './weatherIcons/snowy.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={clearDay} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
