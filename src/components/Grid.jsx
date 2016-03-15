import React from 'react';
import {Component} from 'react';
import Square from './Square.jsx';

class Grid extends Component {
    render() {
        return (
            <ul className='grid'>
                {this.renderColumns()}
            </ul>
        );
    }

    renderColumns() {
        return this.props.grid.map((column, idx) => {
            return (
                <li className='columnContainer' key={idx}>
                    <ul className='column'>
                        {this.renderColumn(column)}
                    </ul>
                </li>
            );
        });
    }

    renderColumn(col) {
        return col.map(square => {
            var key = square.x + 'x' + square.y;
            return (
                <Square key={key} {...square} fog={this.props.fog} />
            );
        });
    }
};

export default Grid;
