import {SHIPS,BOARD_WIDTH,BOARD_HEIGHT} from './constants';
import Ship from './ship';

class Grid {
    constructor () {
        this.grid = [];
        for(let x = 0; x < BOARD_WIDTH; x++) {
            let column = [];
            for(let y = 0; y < BOARD_HEIGHT; y++) {
                let square = {
                    x: x,
                    y: y,
                    hit: false,
                    ship: false,
                };
                column.push(square);
            }
            this.grid.push(column);
        }
        this.ships = [];
    }

    fire(x, y) {
        var square = this.grid[x][y];
        square.hit = true;
        if (square.ship) {
            var ship = this.ships.find(ship => ship.occupiesSquare(x, y));
            ship.hit(x, y);
            if(ship.isSunk()) {
                if(this.areAllShipsSunk()) {
                    alert('You Won');
                } else {
                    alert('You sunk the ' + ship.type);
                }
            }
        }
        return square.hit;
    }

    areAllShipsSunk() {
        return this.ships.filter(ship => ship.isSunk()).length === SHIPS.length;
    }

    getState() {
        return this.grid;
    }

    randomlyPlaceShips() {
        SHIPS.forEach(ship => this.placeShip(ship));
    }

    placeShip(ship) {
        // there is a non zero chance this random placement logic could run forever...
        var self = this;
        function verifySquaresAreEmpty(squares) {
            return squares.reduce((accum,s) => {
                if (accum === false) {
                    return false;
                }
                console.log(self.grid[s.x][s.y]);
                return self.grid[s.x][s.y].ship === false;
            }, true);
        }
        let size = ship.size;
        // console.log('trying to place ship', ship.type, ship.size);
        let x = Math.round(Math.random() * (9-size));
        let y = Math.round(Math.random() * (9-size));
        let orientation = Math.round(Math.random()); // 0 is horizontal and 1 is vertical
        let squares = [];
        if (orientation === 0) {
            // horizontal
            for(let i = 0; i < size; i++) {
                squares.push({x: x+i, y: y});
            }
        } else {
            // vertical
            for(let j = 0; j < size; j++) {
                squares.push({x: x, y: y+j});
            }
        }
        //console.log('checking squares', squares);
        if(verifySquaresAreEmpty(squares)) {
            //console.log('placed ship');
            squares.forEach(square => {
                this.grid[square.x][square.y].ship = true;
                this.grid[square.x][square.y].code = ship.code;
            });
            var shipInstance = new Ship(ship);
            shipInstance.place(squares);
            this.ships.push(shipInstance);
        } else {
            //console.log('trying again...');
            this.placeShip(ship);
        };
    }
}

export default Grid;
