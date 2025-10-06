import { Board, Square, Rotation } from "@/app/_types/types";
import ITetromino from "./tetromino.interface";

export type NewPieceCallback = () => void;
export type OnUpdateCallback = (board: Board) => void;

export interface TetrominoConfig {
  board: Board;
  color: string;
  newPiece: NewPieceCallback;
  onUpdate: OnUpdateCallback;
  initialSquares: Square[];
}

/**
 * Abstract base class for all Tetris tetromino pieces
 * Handles common functionality like movement, rotation, and collision detection
 */
export abstract class Tetromino implements ITetromino {
  protected board: Board;
  protected color: string;
  protected rotation: Rotation;
  protected newPiece: NewPieceCallback;
  protected squares: Square[];
  protected onUpdate: OnUpdateCallback;

  constructor(config: TetrominoConfig) {
    this.board = config.board;
    this.color = config.color;
    this.rotation = Rotation.Initial;
    this.newPiece = config.newPiece;
    this.squares = config.initialSquares;
    this.onUpdate = config.onUpdate;
    this.updateBoard(this.squares);
  }

  /**
   * Get the next position of the tetromino (one row down)
   */
  protected getNextPosition(squares: Square[] = this.squares): Square[] {
    return squares.map(square => ({
      r: square.r + 1,
      c: square.c,
    }));
  }

  protected calculateNextSquares(nextSquares: Array<Square>): Array<Square> {
    return this.squares.map((square, i) => ({
      r: square.r + nextSquares[i].r,
      c: square.c + nextSquares[i].c
    }))
  }

  /**
   * Check if the game is over (tetromino can't move down)
   */
  public isGameOver(): boolean {
    const next = this.getNextPosition();
    return !this.canTick(next);
  }

  /**
   * Move the tetromino down one row if possible
   */
  public tick(): void {
    const next = this.getNextPosition();
    const minRow = Math.max(...next.map(sq => sq.r));
    
    if (minRow >= this.board.length) {
      this.newPiece();
      return;
    }
    
    if (this.canTick(next)) {
      this.updateBoard(next);
    } else {
      this.newPiece();
    }
  }

  /**
   * Check if the tetromino can move to the given position
   */
  protected canTick(squares: Square[]): boolean {
    const minRow = Math.max(...squares.map(sq => sq.r));
    
    if (minRow >= this.board.length) {
      return false;
    }
    
    return squares.every(square => 
      this.board[square.r][square.c] === null || 
      this.squares.find(cur => cur.c === square.c && cur.r === square.r)
    );
  }

  /**
   * Drop the tetromino to the bottom of the well
   */
  public dropDown(): void {
    let nextPosition = this.getNextPosition();
    let currentPosition = this.squares;
    
    while (this.canTick(nextPosition)) {
      currentPosition = nextPosition;
      nextPosition = this.getNextPosition(currentPosition);
    }
    
    this.updateBoard(currentPosition);
    this.newPiece();
  }

 /**
   * Rotate the tetromino 90 degrees clockwise
   * Must be implemented by subclasses
   */
  public abstract rotateClockwise(): void;

  /**
   * Move the tetromino one column to the left
   */
  public moveLeft(): void {
    const nextPosition = this.squares.map(square => ({
      c: square.c - 1,
      r: square.r,
    }));
    
    if (this.isValid(nextPosition)) {
      this.updateBoard(nextPosition);
    }
  }

  /**
   * Move the tetromino one column to the right
   */
  public moveRight(): void {
    const nextPosition = this.squares.map(square => ({
      c: square.c + 1,
      r: square.r,
    }));
    
    if (this.isValid(nextPosition)) {
      this.updateBoard(nextPosition);
    }
  }

  public moveDown(): void {
    this.tick();
  }

  /**
   * Check if the given position is valid (within bounds and not colliding)
   */
  protected isValid(squares: Square[]): boolean {
    const minCol = Math.min(...squares.map(sq => sq.c));
    const maxCol = Math.max(...squares.map(sq => sq.c));
    const minRow = Math.max(...squares.map(sq => sq.r));
    const maxRow = Math.min(...squares.map(sq => sq.r));
    
    // Check if out of bounds
    if (minCol < 0 || maxCol >= this.board[0].length || minRow >= this.board.length || maxRow < 0) {
      return false;
    }
    
    // Check for collisions with existing pieces
    return squares.every(square => 
      this.board[square.r][square.c] === null || 
      this.squares.find(cur => cur.c === square.c && cur.r === square.r)
    );
  }

  /**
   * Update the board with the new tetromino position
   */
  protected updateBoard(next: Square[], callback: () => void = () => {}): void {
    if (this.isValid(next)) {
      // Clear current position
      this.squares.forEach(square => {
        this.board[square.r][square.c] = null;
      });
      
      // Set new position
      this.squares = next;
      this.squares.forEach((square, index) => {
        this.board[square.r][square.c] = { 
          piece: this.color,
          rotation: this.rotation,
          topCut: false,
          bottomCut: false,
          index,
        }
      });
      
      // Notify parent component
      if (this.onUpdate) {
        this.onUpdate([...this.board]);
      }
      
      callback();
    }
  }

  /**
   * Get a preview of the tetromino at the top of the board
   */
  public preview(): void {
    const board = Array(this.board.length).fill(null).map(() => Array(this.board[0].length).fill(null));
    const offsetLeft = Math.min(...this.squares.map(sq => sq.c));
    
    
    const nextPosition = this.squares.map(square => ({
      c: square.c - offsetLeft,
      r: square.r,
    }));
    
    nextPosition.forEach((square, index) => {
      board[square.r][square.c] = {
        piece: this.color,
        rotation: this.rotation,
        topCut: false,
        bottomCut: false,
        index,
      };
    });
    
    this.onUpdate([...board]);
  }
}

export default Tetromino;