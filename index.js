import { Grid } from "./grid.js";
import { Tile } from "./tile.js";

const gameBoard = document.getElementById("game-board");

const grid = new Grid(gameBoard);
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
//получили случ-ю рандом яч у экземляра grid -- grid.getRandomEmptyCell()
// и привязываем плиточку к этой ячейке -- .linkTile
// создадим саму плиточку -- (new Tile(gameBoard))
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));

//---------------движения
setupInputOnce();

function setupInputOnce(){
    window.addEventListener("keydown", handleinput, {once: true});
    // подписались на нажатие клавиши на 1 раз
}

async function handleinput(event){
    switch (event.key) {
        case "ArrowUp":
            if (!canMoveUp()) {//отключаем появл новой плиточки, если двигаться некуда
                setupInputOnce();
                return;
            }
            await moveUp();
            break;

        case "ArrowDown":
            if (!canMoveDown()) {
                setupInputOnce();
                return;
            }
            await moveDown();
            break;
        
        case "ArrowLeft":
            if (!canMoveLeft()) {
                setupInputOnce();
                return;
            }
            await moveLeft();
            break;
            
        case "ArrowRight":
            if (!canMoveRight()) {
                setupInputOnce();
                return;
            }
            await moveRight();
            break;

        default:
            setupInputOnce(); //чтобы после нажатия на коавишу подписаться еще раз на нажатие др клавиши
            return; // не реагируем на нажатие других клавиш
    }

    const newTile = new Tile(gameBoard); //добавляем после хода плиточку
    grid.getRandomEmptyCell().linkTile(newTile);

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        await newTile.waitForAnimationEnd()
        alert("Try again!")
        return;
      }

    setupInputOnce(); 
}

async function moveUp() { // сдвигаем плиточки вверх
    await slideTiles(grid.cellsGroupedByColumn);
}

async function moveDown() { // сдвигаем плиточки вверх
    await slideTiles(grid.cellsGroupedByReversedColumn);
}

async function moveLeft() { // сдвигаем плиточки вверх
    await slideTiles(grid.cellsGroupedByRow);
}

async function moveRight() { // сдвигаем плиточки вверх
    await slideTiles(grid.cellsGroupedByReversedRow);
}

async function slideTiles(groupedCells){
    const promises = [] //ждем анимацию перемещения и потом объединяем
    groupedCells.forEach(group => slideTilesInGroup(group, promises));

    await Promise.all(promises);

    grid.cells.forEach(cell => {
        cell.hasTileForMerge() && cell.mergeTiles();
    })
}

function slideTilesInGroup(group, promises) {
    for (let i = 1; i < group.length; i++){
        if (group[i].isEmpty()) {
            continue;
        }

        const cellWithTile = group[i];

        let targetCell;
        let j = i - 1;
        while (j>= 0 && group[j].canAccept(cellWithTile.linkedTile)) {
            targetCell = group[j];
            j--;
        }

        if (!targetCell) {
            continue;
        }

        promises.push(cellWithTile.linkedTile.waitForTransitionEnd());

        if (targetCell.isEmpty()) {
            targetCell.linkTile(cellWithTile.linkedTile);
        } else {
            targetCell.linkTileForMerge(cellWithTile.linkedTile);
        }

        cellWithTile.unlinkTile();
    }
}

function canMoveUp() {
    return canMove(grid.cellsGroupedByColumn);
}

function canMoveDown() {
    return canMove(grid.cellsGroupedByReversedColumn);
}

function canMoveLeft() {
    return canMove(grid.cellsGroupedByRow);
}

function canMoveRight() {
    return canMove(grid.cellsGroupedByReversedRow);
}

function canMove(groupedCells) {//определяет что хоть какая-то яч может двигаться вверх
    return groupedCells.some(group => canMoveInGroup(group));
}

function canMoveInGroup(group) {
    return group.some((cell, index) => {//есть ли куда двигаться плиточку
        if (index === 0) {
            return false;
        }

        if (cell.isEmpty()) {
            return false;
        }

        const targetCell = group[index - 1];//проверяем все, если может вернуться в предыдущ, значит можем вернуть результат
        return targetCell.canAccept(cell.linkedTile);
    });    
}