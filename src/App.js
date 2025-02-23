import React from 'react';
import './App.css';
import Weather from './Weather'; // Import the Weather component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
      </header>
      <Weather /> {/* Add the Weather component here */}
    </div>
  );
}

export default App;