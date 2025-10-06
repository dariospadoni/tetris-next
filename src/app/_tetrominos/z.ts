import Tetromino, { TetrominoConfig } from './tetromino';
import { Board, Rotation, RotationMatrix, Square  } from '@/app/_types/types';

const zRotationMatrixes: Record<RotationMatrix, Array<Square>> = {
    [RotationMatrix.Rotation1]: [
        { r: 2 , c: 0 },
        { r: 1, c: -1 },
        { r: 0, c: 0 },
        { r: -1, c: -1 }
    ],
    [RotationMatrix.Rotation2]: [
        { r: 0, c: 2 },
        { r: 1, c: 1 },
        { r: 0, c: 0 },
        { r: 1, c: -1 }
    ],
    [RotationMatrix.Rotation3]: [
        { r: -2, c: 0 },
        { r: -1, c: 1 },
        { r: 0, c: 0 },
        { r: 1, c: 1 }
    ],
    [RotationMatrix.Rotation4]: [
        { r: 0, c: -2 },
        { r: -1, c: -1 },
        { r: 0, c: 0 },
        { r: -1, c: 1 }
    ]
};


/**
 * Z-shaped tetromino piece
 * 
 * Shape:
 *  #
 *  ###
 */
export class Z extends Tetromino {
    constructor(board: Board, newPiece: () => void, onUpdate: (board: Board) => void) {
        const initialSquares: Square[] = [
            { r: 0, c: 2 },
            { r: 0, c: 3 }, 
            { r: 1, c: 3 },
            { r: 1, c: 4 }
        ];

        const config: TetrominoConfig = {
            board,
            color: 'z',
            newPiece,
            onUpdate,
            initialSquares
        };

        super(config);
    }

    /**
     * Rotate the Z tetromino 90 degrees clockwise
     */
    public rotateClockwise(): void {
        let next: Square[] = [];
        let nextRotation: Rotation = this.rotation;
        switch (this.rotation) {
            case Rotation.Initial:
                next = this.calculateNextSquares(zRotationMatrixes[RotationMatrix.Rotation2])
                nextRotation = Rotation.Right;
                break;
            case Rotation.Right:
                next = this.calculateNextSquares(zRotationMatrixes[RotationMatrix.Rotation1])
                nextRotation = Rotation.Flip;
                break;
                
            case Rotation.Flip:
                next = this.calculateNextSquares(zRotationMatrixes[RotationMatrix.Rotation4])
                nextRotation = Rotation.Left;
                break;
                
            case Rotation.Left:
                next = this.calculateNextSquares(zRotationMatrixes[RotationMatrix.Rotation3])
                nextRotation = Rotation.Initial;
                break;
                
            default:
                return;
        }
        if (this.isValid(next)) {
          this.rotation = nextRotation;
          this.updateBoard(next);
        }
    }
}

export default Z;