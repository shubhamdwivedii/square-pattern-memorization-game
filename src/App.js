import React from 'react';
import './App.css';
import Game from './Game';

function App() {
  const gameRef = React.createRef();

  React.useEffect(() => {
    const container = gameRef.current;
    container.appendChild(Game.view);
  }, [gameRef])

  return (
    <div className="App">
      <div ref={gameRef} className="Game">

      </div>
    </div>
  );
}

export default App;
