import React from 'react';
import './App.css';
import Monster from './Monster';
import MonsterBuilder from './MonsterBuilder'

class MonCompClass extends React.Component {
  render () {
    return <img
      src="https://i.pinimg.com/originals/c4/4d/65/c44d6575f9f1aff94ddf0c4a6d62918d.jpg"
      alt="scary!"
      style={{width:"40%",height:"40%"}}
    />
  }
}

function App() {

 let x: Monster[] = [];

  return (

    <div className="App">
      <>
        <h1>Monster Playground</h1>
        <h3>Shai's testing app for learning React and Typescript</h3>
        <MonsterBuilder monsters={x}/>

        <p></p>

        <MonCompClass />
        <MonCompClass />
      </>
    </div>
  );
}

export default App;
