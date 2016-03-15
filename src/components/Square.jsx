import React from 'react';
import {Component} from 'react';
import fire from '../actions/fire';

class Square extends Component {
    render() {
        let key = '~';
        let styles = {
            backgroundColor: '#fff'
        };

        if (this.props.fog) {
            if (this.props.hit) {
                key = 'x';
                styles.backgroundColor = this.props.ship ? '#FF2400' : '#2B65EC';
            }
        } else {
            if (this.props.ship) {
                styles.backgroundColor = this.props.hit ? '#FF2400' : '#dedede';
                key = this.props.code;
            } else if (this.props.hit) {
                styles.backgroundColor = '#2B65EC';
            }
        }
        return <li className='square' style={styles} onClick={this.onClick.bind(this)}>{key}</li>;
    }

    onClick() {
        console.log('clicked', this.props.x, this.props.y);
        if (!this.props.fog) {
            console.log('null');
            return;
        }
        if (this.props.hit) {
            // already hit this spot
            // maybe display a helpful message
            return;
        }
        if (this.props.ship) {
            alert('hit!');
        } else {
            alert('miss');
        }
        this.context.executeAction(fire, {x: this.props.x, y: this.props.y});
    }
}


Square.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};


export default Square;
