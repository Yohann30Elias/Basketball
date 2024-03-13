import React, { useState } from 'react';
import './App.css';
import bild from './bilder/bild.png';

const maxPoints = 12;
const points = 3;

const BasketballGame = () => {
  const [guestScore, setGuestScore] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [gameLog, setGameLog] = useState([]);
  const [activeTeam, setActiveTeam] = useState('guest');
  const [gameEnded, setGameEnded] = useState(false);

  const shootBall = () => {
    if (gameEnded) return;

    const isScored = Math.random() < 0.5;
    let newScore;

    if (activeTeam === 'guest') {
      newScore = isScored ? guestScore + points : guestScore;
      setGuestScore(newScore);
    } else {
      newScore = isScored ? homeScore + points : homeScore;
      setHomeScore(newScore);
    }

    const action = isScored ? 'scores!' : 'misses!';
    const message = `the ${activeTeam} team ${action}`;
    setGameLog([...gameLog, message]);

    if (newScore === maxPoints) {
      setGameEnded(true);
      const finalmessage = `the ${activeTeam} has won!`;
      setGameLog([...gameLog, finalmessage]);
      console.log(`${activeTeam} team wins the game!`);
    } else {
      setActiveTeam(activeTeam === 'guest' ? 'home' : 'guest');
    }
  };

  const resetGame = () => {
    setGuestScore(0);
    setHomeScore(0);
    setGameLog([]);
    setActiveTeam('guest');
    setGameEnded(false);
  };

  const getProgress = (score) => (score / maxPoints) * 100;

  return (
    <div id="game">
      <div className="team1">
        <div className="team-name">Guest Team</div>
        <button className="shoot-button" onClick={activeTeam === 'guest' ? shootBall : null} disabled={gameEnded}>
          Shoot
        </button>
        <div className="score">Score: {guestScore}</div>
        <div className="progress-bar" style={{ width:`${getProgress(guestScore)}%` }}></div>
      </div>
      <div className="team2">
        <div className="team-name">Home Team</div>
        <button className="shoot-button" onClick={activeTeam === 'home' ? shootBall : null} disabled={gameEnded}>
          Shoot
        </button>
        <div className="score">Score: {homeScore}</div>
        <div className="progress-bar" style={{ width: `${getProgress(homeScore)}%` }}></div>
      </div>
      <div className="reset">
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div className="log">
        <h3 className="log-title">Game Log</h3>
        <ul className="log-list">
          {gameLog.map((entry, index) => (
            <li className="log-entry" key={index}>
              {entry}
            </li>
          ))}
        </ul>
      </div>
      <div className="image">
        <img src={bild} alt="Basketball Court" />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BasketballGame />
    </div>
  );
}

export default App;
