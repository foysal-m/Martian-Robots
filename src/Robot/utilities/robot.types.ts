export type LostScents = {
  [key: string]: boolean;
};

export type Board = {
  width: number;
  height: number;
};

export enum Orientation {
  N = "N",
  E = "E",
  S = "S",
  W = "W",
}
