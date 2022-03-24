import { CellType } from "./types";

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const uniqueRandomInts = (min: number, max: number, count: number) =>
  new Array(max - min + 1)
    .fill("")
    .map((_, index) => min + index)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

export const randomTwoOrFour = () => (Math.random() < 0.9 ? 2 : 4);

export const randomId = () => Math.random().toString(36).slice(2);

export const sortCells = (cells: CellType[]) =>
  cells.sort((a, b) => a.y * 4 + a.x + 1 - (b.y * 4 + b.x + 1));

export const rotateCells180deg = (cells: CellType[]) =>
  cells.map((cell) => ({
    ...cell,
    x: 3 - cell.x,
    y: 3 - cell.y,
  }));

export const rotateCellsRight90deg = (cells: CellType[]) =>
  cells.map((cell) => ({
    ...cell,
    x: 3 - cell.y,
    y: cell.x,
  }));

export const rotateCellsLeft90deg = (cells: CellType[]) =>
  cells.map((cell) => ({
    ...cell,
    x: cell.y,
    y: 3 - cell.x,
  }));

export const randomIntExcept = (
  exception: number[],
  min: number,
  max: number
) => {
  let result: number = exception[0] || 0;
  while (exception.includes(result)) {
    result = randomInt(min, max);
  }
  return result;
};

export const checkLose = (cells: CellType[]) => {
  if (cells.length === 16) {
    let isLost = true;
    cells.forEach((cell) => {
      if (
        cell.x > 0 &&
        cells.find((i) => i.x === cell.x - 1 && i.y === cell.y)?.value ===
          cell.value
      )
        isLost = false;
      if (
        cell.y > 0 &&
        cells.find((i) => i.y === cell.y - 1 && i.x === cell.x)?.value ===
          cell.value
      )
        isLost = false;
      if (
        cell.x < 3 &&
        cells.find((i) => i.x === cell.x + 1 && i.y === cell.y)?.value ===
          cell.value
      )
        isLost = false;
      if (
        cell.y < 3 &&
        cells.find((i) => i.y === cell.y + 1 && i.x === cell.x)?.value ===
          cell.value
      )
        isLost = false;
    });

    return isLost;
  }
  return false;
};
