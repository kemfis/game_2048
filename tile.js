export class Tile {
    constructor(gridElement) { // чтобы могли добавить плиточку в div.game-board
        this.tileElement = document.createElement("div"); // создали элемент
        this.tileElement.classList.add("tile"); //добавили класс
        this.value = (Math.random() > 0.5 ? 2 : 4); //рандомное значение для плиточки 2 или 4
        this.tileElement.textContent = this.value; // получ-е значение добавляем текстом
        gridElement.append(this.tileElement); // до созд div внутрь div.game-bord
    }
    setXY(x, y) { //метод будет менять значение х у на новые, а также будет менять --х и --у в css стилях
        this.x = x;
        this.y = y;
        this.tileElement.style.setProperty("--x", x);
        this.tileElement.style.setProperty("--y", y);
    }
}