class Ship {
    constructor(data) {
        this.type = data.type;
        this.size = data.size;
    }

    place(squares) {
        this.squares = squares;
    }

    isSunk() {
        return this.squares.filter(sq => !sq.hit).length === 0 ? true : false;
    }

    occupiesSquare(x, y) {
        return this.squares.reduce((found,sq) => {
            if (found) {
                return found;
            }
            return sq.x === x && sq.y === y;
        }, false);
    }

    hit(x, y) {
        this.squares.forEach(sq => {
            if (sq.x === x && sq.y === y) {
                sq.hit = true;
            }
        });
    }
}
export default Ship;
