import { FC, useEffect, useRef, useState } from "react";
import {
  checkLose,
  randomId,
  randomIntExcept,
  randomTwoOrFour,
  rotateCells180deg,
  rotateCellsLeft90deg,
  rotateCellsRight90deg,
  sortCells,
  uniqueRandomInts,
} from "./shared/utils";

import { CellType } from "./shared/types";
import { colors } from "./shared/constants";

const App: FC = () => {
  const [cells, setCells] = useState<CellType[]>(
    uniqueRandomInts(0, 15, 2).map((int) => ({
      id: randomId(),
      value: randomTwoOrFour(),
      x: int % 4,
      y: Math.floor(int / 4),
      z: 0,
      delayed: false,
    }))
  );

  const gameEnded = useRef(false);

  const moveCells = (cells: CellType[]) => {
    const clone = JSON.parse(JSON.stringify(cells)) as CellType[];

    const sorted = sortCells(clone);

    let changed = false;
    sorted.forEach((cell) => {
      cell.z = 0;
      if (cell.x > 0) {
        for (let i = cell.x - 1; i >= 0; i--) {
          const existing = clone.filter(
            (item) => item.x === i && item.y === cell.y
          );
          if (existing.length >= 1) {
            if (existing.length === 1) {
              if (existing[0].value === cell.value) {
                setTimeout(() => {
                  setCells((cells) =>
                    cells.filter((cell) => cell.id !== existing[0].id)
                  );
                }, 200);
                if (cell.value * 2 === 2048 && !gameEnded.current) {
                  gameEnded.current = true;
                  setTimeout(() => {
                    alert("You win!");
                    location.reload();
                  }, 300);
                }
                cell.value = cell.value * 2;
                cell.x = i;
                cell.z = 1;
                changed = true;
              } else {
                if (cell.x !== i + 1) {
                  cell.x = i + 1;
                  changed = true;
                }
              }
            } else {
              if (cell.x !== i + 1) {
                cell.x = i + 1;
                changed = true;
              }
            }

            break;
          } else {
            if (cell.x !== i) {
              cell.x = i;
              changed = true;
            }
          }
        }
      }
    });

    if (changed) {
      const randomCellPosition = randomIntExcept(
        sorted.map((item) => item.y * 4 + item.x),
        0,
        15
      );
      const randomCell: CellType = {
        id: randomId(),
        value: randomTwoOrFour(),
        x: randomCellPosition % 4,
        y: Math.floor(randomCellPosition / 4),
        z: 0,
        delayed: true,
      };
      sorted.push(randomCell);
    }

    if (checkLose(sorted)) {
      setTimeout(() => {
        alert("You lose!");
        location.reload();
      }, 500);
    }

    return sorted;
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        setCells((cells) =>
          rotateCellsRight90deg(moveCells(rotateCellsLeft90deg(cells)))
        );
      } else if (e.key === "ArrowDown") {
        setCells((cells) =>
          rotateCellsLeft90deg(moveCells(rotateCellsRight90deg(cells)))
        );
      } else if (e.key === "ArrowLeft") {
        setCells((cells) => moveCells(cells));
      } else if (e.key === "ArrowRight") {
        setCells((cells) =>
          rotateCells180deg(moveCells(rotateCells180deg(cells)))
        );
      }
    };

    window.addEventListener("keyup", handler);

    return () => window.removeEventListener("keyup", handler);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="h-board-size w-board-size bg-board grid grid-cols-4 grid-rows-4 gap-board-gap p-board-gap rounded-md relative">
        {new Array(16).fill("").map((_, index) => (
          <div
            key={index}
            className="bg-cell rounded-md h-cell-size w-cell-size"
          ></div>
        ))}
        {cells
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((cell) => (
            <div
              key={cell.id}
              className={`cell ${
                cell.delayed
                  ? "animate-expand-forward-delayed"
                  : "animate-expand-forward"
              }`}
              style={{
                ["--x" as any]: cell.x,
                ["--y" as any]: cell.y,
                background: colors[cell.value].background,
                color: colors[cell.value].color,
                zIndex: cell.z,
              }}
            >
              {cell.value}
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
