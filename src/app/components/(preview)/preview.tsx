import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import TetrominoFactory from '../../_tetrominos/tetrominoFactory';
import { ShapeType, Board, } from '@/app/_types/types';

const SQUARE_SIZE = 25;
const initialBoard = Array(2).fill(null).map(_x => Array(4).fill(null));

const PreviewContainer = styled.div`
  box-sizing: content-box;
  font-size: 24px;
  text-align: right;
  color: red;
  height: 100px;
  border-bottom: 25px solid #976897;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

const PreviewBg = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 70px;
  width: 100px;
  height: 50px;
`;

const PreviewCell = styled.div`
  height: ${SQUARE_SIZE}px;
  width: ${SQUARE_SIZE}px;
  background: black; 
  color: white;
  font-size: 10px;  
`;

const Preview = ({ 
  shapeType 
}: { shapeType: ShapeType }) => {
  const [squares, setSquares] = useState(initialBoard);

  const onUpdate = (board: Board) => {
    setSquares(board);
  } 

  useEffect(() => {
    const nextShape = TetrominoFactory.createTetramino(shapeType, squares, () => null, onUpdate);
    nextShape.preview();
  }, [shapeType]);

  return (
    <PreviewContainer>
      <div>NEXT</div>
      <PreviewBg>
      {squares.map((row, rowIndex) => 
          row.map((col, colIndex) => {
            if (col === null) {
              return <PreviewCell key={`${col}-${rowIndex}-${colIndex}`} />
            }
            return <div key={`${col}-${rowIndex}-${colIndex}`} className={`tetromino tetromino-${col.piece} piece-index-${col.index} rotation-${col.rotation}`}></div>
          })
        )}     
      </PreviewBg>
    </PreviewContainer>);
}

export default Preview;