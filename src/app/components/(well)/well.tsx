"use client"
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import useInterval from '@/app/_lib/useInterval';
import { Board } from '@/app/_types/types';
import TetrominoFactory from '../../_tetrominos/tetrominoFactory';
import ITetromino from '../../_tetrominos/tetromino.interface';
import { useGameContext } from '@/app/_hooks/useGameContext';
import { useScoreContext } from '@/app/_hooks/useScoreContext';
import { GameStatus } from './constants';

const WIDTH = 10;
const HEIGHT = 20;
const SQUARE_SIZE = 25;
const initialBoard: Board = Array(HEIGHT).fill(null).map(() => Array(WIDTH).fill(null));

const Layout = styled.section`
  background: black;
  width: ${12 * SQUARE_SIZE}px;
  height: ${21 * SQUARE_SIZE}px;
  box-sizing: content-box;
  position: relative;
  overflow: hidden;     
`;

const Cell = styled.div`
  height: ${SQUARE_SIZE}px;
  width: ${SQUARE_SIZE}px;
  background: black; 
  color: white;
  font-size: 10px;  
`;

export default function Well() {
  const [squares, setSquares] = useState<Board>(initialBoard);
  const [tetromino, setTetromino] = useState<ITetromino | null>();  
  const [tickSpeed, setTickSpeed] = useState<number>(600);
  const { currentShape, onShapeConsumed, gameOver, gameStatus } = useGameContext();
  const { onLinesCleared, level } = useScoreContext();

  useEffect(() => {
    setTickSpeed(tickSpeed * 0.9);
  }, [level]);

  const detectFullLines = (): number => {
    let numLines = 0;
    const current = [...squares];
    current.forEach((row, line) => {
      if (row.every(c => c !== null)) {
        removeFullLine(current, line);
        numLines++;
        if (line < 20) {
         current[line].filter(c => c !== null).forEach(c => { c.bottomCut = true });
        }
        if (line < 19) {
          current[line+1].filter(c => c !== null).forEach(c => { c.topCut = true; });
        }
      }
    });
    setSquares(current);
    return numLines;
  }

  const removeFullLine = (current: Board, line: number): void => {
    for (let i = line; i > 0; i--) {
      current[i] = current[i - 1];
    }
    current[0] = Array(WIDTH).fill(null);
  }

  const onUpdate = (board: Board): void => {
    setSquares(board);
  } 

  const onShapeDropped = (): void => {
    setTetromino(null);
    const numOfLinesCleared = detectFullLines();
    if (numOfLinesCleared > 0) {
      onLinesCleared(numOfLinesCleared);
    }
    onShapeConsumed();
  }

  useEffect(() => {
    if (currentShape) {
      const tetromino = TetrominoFactory.createTetramino(currentShape, squares, onShapeDropped, onUpdate);
      if (tetromino.isGameOver()) {
        gameOver();
        return;        
      }
      setTetromino(tetromino);
    }
  }, [currentShape]);
      
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (!tetromino) { return; }
      switch (event.key) {
        case ' ':
          tetromino.dropDown();
          break;
        case 'ArrowUp':
          tetromino.rotateClockwise();
          break;
        case 'ArrowDown':
          tetromino.moveDown();
          break;
        case 'ArrowLeft':
          tetromino.moveLeft();
          break;
        case 'ArrowRight':
          tetromino.moveRight();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tetromino]);

  useInterval(() => {
    if (tetromino && gameStatus === GameStatus.PLAY) {
      tetromino.tick();
    }       
  }, tickSpeed);
  return (
    <Layout>
      <div className="pitch">
        <div className="top-left-corner"></div>
        <div className="top-right-corner"></div>
        {squares.map((row, rowIndex) => 
          row.map((col, colIndex) => {
            if (col === null) {
              return <Cell key={`${col}-${rowIndex}-${colIndex}`} />
            }
            return <div key={`${col}-${rowIndex}-${colIndex}`} className={`tetromino tetromino-${col.piece} piece-index-${col.index} rotation-${col.rotation} ${col.topCut ? 'top-cut' : ''} ${col.bottomCut ? 'bottom-cut' : ''}`}></div>
          })
        )}     
      </div>    
    </Layout>
  )
}
  