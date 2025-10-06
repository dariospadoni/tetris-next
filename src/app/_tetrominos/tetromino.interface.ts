export default interface ITetromino {
  tick(): void,
  isGameOver(): boolean,
  rotateClockwise(): void,
  moveLeft(): void,
  moveRight(): void,
  moveDown(): void,
  dropDown(): void,
  preview(): void,
}