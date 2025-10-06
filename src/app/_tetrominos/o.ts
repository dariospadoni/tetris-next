import Tetromino, { TetrominoConfig } from './tetromino';
import { Board, Square } from '@/app/_types/types';

/**
 * O-shaped tetromino piece
 * 
 * Shape:
 *  ##
 *  ##
 */
export class O extends Tetromino {
    constructor(board: Board, newPiece: () => void, onUpdate: (board: Board) => void) {
        const initialSquares: Square[] = [
            { r: 0, c: 2 },
            { r: 0, c: 3 },
            { r: 1, c: 2 },
            { r: 1, c: 3 }
        ];

        const config: TetrominoConfig = {
            board,
            color: 'o',
            newPiece,
            onUpdate,
            initialSquares
        };

        super(config);
    }
    
    public rotateClockwise(): void {}
}

export default O;