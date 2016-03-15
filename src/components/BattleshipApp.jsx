import React from 'react';
import {Component} from 'react';
import {connectToStores} from 'fluxible-addons-react';
import BattleshipStore from '../stores/BattleshipStore.js';
import Grid from './Grid.jsx';

class BattleshipApp extends Component {
    render() {
        return (
            <div>
                <p>Its your turn, Player #{this.props.activePlayer}</p>
                <p>Enemy Grid:</p>
                <Grid grid={this.props.grids[this.props.inactivePlayer]} fog={true} />
                <p>Your Grid:</p>
                <Grid grid={this.props.grids[this.props.activePlayer]} />
            </div>
        );
    }
};

BattleshipApp = connectToStores(BattleshipApp, [BattleshipStore], (context, props) => {
    return context.getStore(BattleshipStore).getState();
});

export default BattleshipApp;
