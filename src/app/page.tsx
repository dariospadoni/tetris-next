"use client" 

import React, { useEffect } from 'react';
import Well from "./components/(well)/well";
import Preview from './components/(preview)/preview';
import Score from './components/(score)/score';
import GameOver from './components/(gameOver)/gameOver';
import GameStart from  './components/(gameStart)/gameStart';
import { GameStatus } from './components/(well)/constants';
import { useGameContext } from './_hooks/useGameContext';
import { useScoreContext } from './_hooks/useScoreContext';

export default function Home() {
  const { nextShape, gameStatus, pause, play } = useGameContext();
  const { score, numLinesCleared, level } = useScoreContext();
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      switch (event.key) {
        case 'p':
          pause();
          break;
        case '1':
          play();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="container">
      {gameStatus === GameStatus.PAUSE && <GameStart />}
      
      <div className="left">
        <Preview shapeType={nextShape} />

        <div className="block-indicator">{numLinesCleared % 10 === 5 && '5'}</div> 
        <div className="block-indicator">{numLinesCleared % 10 === 6 && '4'}</div> 
        <div className="block-indicator">{numLinesCleared % 10 === 7 && '3'}</div> 
        <div className="block-indicator">{numLinesCleared % 10 === 8 && '2'}</div> 
        <div className="block-indicator">{numLinesCleared % 10 === 9 && '1'}</div> 

      </div>
      
      <div className="center">
        {gameStatus === GameStatus.OVER && <GameOver />}

        <div className="well-container">
          <Well />
        </div>
          <Score score={score} numLines={numLinesCleared} />
      </div>

      <div className="right">
        <div className="imageWrapper">
          <img src={"tetris.png"} alt="Tetris" />
        </div>
        <div className="info-panel">
          Press 1 to play or
          p to pause
        </div>
        
        <div className="level-indicator">LEVEL {level}</div>
        
      </div>
    </div>
  );
}
