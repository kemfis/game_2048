import { Grid } from "./grid.js";
import { Tile } from "./tile.js";

const gameBoard = document.getElementById("game-board");

const grid = new Grid(gameBoard);
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
//получили случ-ю рандом яч у экземляра grid -- grid.getRandomEmptyCell()
// и привязываем плиточку к этой ячейке -- .linkTile
// создадим саму плиточку -- (new Tile(gameBoard))