import BaseStore from 'fluxible/addons/BaseStore';
import Grid from '../lib/grid';

class BattleshipStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.activePlayer = 1;
        this.inactivePlayer = 2;
        this.grids = {
            // keys are player numbers
            1: new Grid(),
            2: new Grid()
        };
        Object.keys(this.grids).forEach(grid => {this.grids[grid].randomlyPlaceShips();});
    }

    swapPlayers() {
        let temp = this.activePlayer;
        this.activePlayer = this.inactivePlayer;
        this.inactivePlayer = temp;
    }

    nextTurn(payload) {
        let grid = this.grids[this.inactivePlayer];
        grid.fire(payload.x, payload.y);
        this.swapPlayers();
        this.emitChange();
    }

    /**
     * returns the state of the game
     */
    getState () {
        return {
            activePlayer: this.activePlayer,
            inactivePlayer: this.inactivePlayer,
            grids: {
                1: this.grids['1'].getState(),
                2: this.grids['2'].getState()
            }
        }
    }
}

BattleshipStore.storeName = 'BattleshipStore';
BattleshipStore.handlers = {
    'FIRE': 'nextTurn'
};

export default BattleshipStore;
