"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { ShapeType, shapeTypes } from "../_types/types";
import { GameStatus } from "../components/(well)/constants";

const randomShape = (): ShapeType => {
  const random = Math.floor(Math.random() * Math.floor(7));
  return shapeTypes[random];
}

interface GameContextType {
  currentShape: ShapeType | null;
  nextShape: ShapeType;
  gameStatus: GameStatus;
  play: () => void;
  pause: () => void;
  gameOver: () => void;
  onShapeConsumed: () => void;
}

const GameContext = createContext({} as GameContextType);

export const useGameContext = () => {
  return useContext(GameContext);
}

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentShape, setCurrentShape] = useState<ShapeType | null>(randomShape());
  const [nextShape, setNextShape] = useState<ShapeType>(randomShape());
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PAUSE);
  
  const play = () => {
    setGameStatus(GameStatus.PLAY);
  }
  const pause = () => {
    setGameStatus(GameStatus.PAUSE);
  }
  const gameOver = () => {
    setGameStatus(GameStatus.OVER);
  }

  const onShapeConsumed = () => {
    setCurrentShape(null);
  }

  useEffect(() => {
    if (!currentShape) {
      setCurrentShape(nextShape);
      setNextShape(randomShape());
    }
  }, [currentShape]);

  const contextValue = {
    currentShape,
    nextShape,
    gameStatus,
    play,
    pause,
    gameOver,
    onShapeConsumed,
  }
  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}