import React, { Component } from 'react';

import { getBalance } from '../api/apiCalls';

import 'bulma/css/bulma.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: 'calculating...'
        }
    }

    componentDidMount() {
        getBalance().then(elapse =>{ this.setState({balance: elapse}); });
       
    }

    render() {
        return (
            <div className="layout">
                <div className="box">{this.state.balance}</div>
            </div>
        );
    }
}
