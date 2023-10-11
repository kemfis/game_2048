export class Tile {
    constructor(gridElement) { // чтобы могли добавить плиточку в div.game-board
        this.tileElement = document.createElement("div"); // создали элемент
        this.tileElement.classList.add("tile"); //добавили класс
        this.setValue(Math.random() > 0.5 ? 2 : 4); //метод ниже
        gridElement.append(this.tileElement); // до созд div внутрь div.game-bord
    }
    
    setValue(value) { //метод по замене цвета и значения плиточек
        this.value = value;
        this.tileElement.textContent = value;
        const bgLightness = 100 - Math.log2(value) * 9;// прозрачность плитки разного значения
        this.tileElement.style.setProperty("--bg-lightness", `${bgLightness}%`);
        this.tileElement.style.setProperty("--text-lightness", `${bgLightness < 50 ? 90 : 10}%`);
        
    }

    setXY(x, y) { //метод будет менять значение х у на новые, а также будет менять --х и --у в css стилях
        this.x = x;
        this.y = y;
        this.tileElement.style.setProperty("--x", x);
        this.tileElement.style.setProperty("--y", y);
    }

    removeFromDOM() {
        this.tileElement.remove();
    }

    waitForTransitionEnd() {
        return new Promise(resolve => {
            this.tileElement.addEventListener(
                "transitionend", resolve, {once: true});//ловим конец анимации и запускаем функцию с промис
        });
    }
    waitForAnimationEnd() {
        return new Promise(resolve => {
          this.tileElement.addEventListener(
            "animationend", resolve, { once: true });
        });
    }
}
