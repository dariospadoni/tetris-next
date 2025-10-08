import ITetromino from "./tetromino.interface";
import * as Tetraminos from '.';
import { Board, ShapeType } from "@/app/_types/types";


class TetrominoFactory {
  public static createTetramino(
    shapeType: ShapeType, 
    squares: Board, 
    onFallFinished: () => void, 
    onUpdate: (board: Board) => void
  ): ITetromino {
    switch (shapeType) {
      case 'j': 
        return new Tetraminos.J(squares, onFallFinished, onUpdate);
      case 'l': 
        return new Tetraminos.L(squares, onFallFinished, onUpdate);
      case 'i': 
        return new Tetraminos.I(squares, onFallFinished, onUpdate);
      case 's': 
        return new Tetraminos.S(squares, onFallFinished, onUpdate);
      case 'z': 
        return new Tetraminos.Z(squares, onFallFinished, onUpdate);
      case 't': 
        return new Tetraminos.T(squares, onFallFinished, onUpdate);
      case 'o': 
        return new Tetraminos.O(squares, onFallFinished, onUpdate);
      default:
        throw new Error(`Invalid shape type: ${shapeType}`);
    }
  }
}

export default TetrominoFactory;