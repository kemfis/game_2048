export class Cell {
    constructor(gridElement, x, y) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gridElement.append(cell);
      this.x = x;
      this.y = y;
    }
    linkTile(tile) {
      tile.setXY(this.x, this.y);
      this.linkedTile = tile;
    }
    //описываем метод linkTile, в арг-те принимает плиточку и сохр ее внутри ячейки this.linkTile
    // также останавливает координыты плиточки с помощью метода setXY
    isEmpty(){
      return !this.linkedTile;
    }
    //метод возвращает тру или фолс, в зависимости от того есть привязанная плиточка или нет
}
