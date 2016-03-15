import React from 'react';
import ReactDOM from 'react-dom';
import Fluxible from 'fluxible';
import BattleshipApp from './components/BattleshipApp.jsx';
import {createElementWithContext as createElement} from 'fluxible-addons-react';
import BattleshipStore from './stores/BattleshipStore.js';

const app = new Fluxible({
    component: BattleshipApp
});

app.registerStore(BattleshipStore);

app.rehydrate({}, function (err, context) {
    window.app = app; // for debugging
    window.context = context; // for debugging

    ReactDOM.render(
        createElement(context),
        document.getElementById('app')
    );
});
