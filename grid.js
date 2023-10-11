import { Cell } from "./cell.js";

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE * GRID_SIZE; //кол-во яч

export class Grid {
    constructor(gridElement) {
      this.cells = [];
      for (let i = 0; i < CELLS_COUNT; i++) {
        this.cells.push(
          new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE))
        );
      }

      this.cellsGroupedByColumn = this.groupCellsByColumn();
      this.cellsGroupedByReversedColumn = this.cellsGroupedByColumn.map(column => [...column].reverse());
      this.cellsGroupedByRow = this.groupCellsByRow();
      this.cellsGroupedByReversedRow = this.cellsGroupedByRow.map(row => [...row].reverse());
    }
    getRandomEmptyCell() { // поиск всех пустых ячеек
      const emptyCells = this.cells.filter(cell => cell.isEmpty());
      // фильтруем все ячейки и сохр в константу только пустые
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      //достаем рандомную пустую ячейку из всех пустых
      return emptyCells[randomIndex];
      //возвращаем случайную пустую ячейку в конце метода
    }
    // описываем методы

    groupCellsByColumn() { //группирум яч в новый массив
      return this.cells.reduce((groupedCells, cell) => {
        groupedCells[cell.x] = groupedCells[cell.x] || [];
        groupedCells[cell.x][cell.y] = cell;
        return groupedCells;
      }, [])
    }
    
    groupCellsByRow() { //группирум яч в новый массив
      return this.cells.reduce((groupedCells, cell) => {
        groupedCells[cell.y] = groupedCells[cell.y] || [];
        groupedCells[cell.y][cell.x] = cell;
        return groupedCells;
      }, [])
    }
}