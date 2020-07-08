import React from 'react';
import './App.css';
import { Stage, Sprite } from '@inlet/react-pixi';
import game from './game';



function App() {
  const gameRef = React.createRef();

  React.useEffect(() => {
    const container = gameRef.current;
    container.appendChild(game.view);
  }, [gameRef])

  return (
    <div className="App">
      <div ref={gameRef} className="Game">

      </div>
      {/* <Stage>
        <Sprite image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" x={100} y ={100} />
      </Stage> */}
      
    </div>
  );
}

export default App;
