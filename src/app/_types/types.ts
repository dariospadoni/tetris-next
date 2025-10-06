// Common Types and interfaces
export interface Square {
  r: number;
  c: number;
}

export type Board = Cell[][];

export enum Rotation {
  Initial = 0,
  Left = 1,
  Flip = 2,
  Right = 3,
}

export enum RotationMatrix {
  Rotation1 = 0,
  Rotation2 = 1,
  Rotation3 = 2,
  Rotation4 = 3,
}

export const ShapeEnums = {
  I: 'i',
  J: 'j',
  L: 'l',
  O: 'o',
  S: 's',
  T: 't',
  Z: 'z',
}

export const shapeTypes = ['i', 'j', 'l', 'o', 's', 't', 'z'] as const;

export type ShapeType = typeof ShapeEnums[keyof typeof ShapeEnums];

export interface Cell {
  piece: ShapeType;
  rotation: Rotation;
  index: number;
  topCut: boolean;
  bottomCut: boolean;
}