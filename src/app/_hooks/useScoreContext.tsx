"use client"

import { createContext, useContext, useState } from "react";

interface ScoreContextType {
  score: number;
  numLinesCleared: number;
  level: number;
  onLinesCleared: (lines: number) => void;
}

const ScoreContext = createContext({} as ScoreContextType);

export const useScoreContext = () => {
  return useContext(ScoreContext);
}

export const ScoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState<number>(0);
  const [numLinesCleared, setNumLinesCleared] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  
  const calculateScore = (numLines: number) => {
    if (numLines === 1) return 40 * (level + 1);
    if (numLines === 2) return 100 * (level + 1);
    if (numLines === 3) return 300 * (level + 1);
    else return 1200 * (level + 1);
  }

  const onLinesCleared = (lines: number) => {
    setScore(score + calculateScore(lines));
    const totalLines = numLinesCleared + lines;
    setNumLinesCleared(totalLines);
    if (totalLines % 10 === 0) {
      setLevel(level + 1);
    }
   }

   const contextValue = {
    score,
    level,
    numLinesCleared,
    onLinesCleared,
  }

  return (
    <ScoreContext.Provider value={contextValue}>
      {children}
    </ScoreContext.Provider>
  );

}