import React, { Component } from 'react';

import api from '../api/apiCalls';

import TimeRow from './TimeRow';

import 'bulma/css/bulma.css';
import './index.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: []
        }
    }

    componentDidMount() {
        api.METHODS_FOR_TIME_TEST.forEach( method => {
            method().then(result => { 
                this.setState({ rows: [ ...this.state.rows, result] }); 
            });
        });
    }

    render() {
        return (
            <section className="section container">
                <div className="columns">
                    <div className="column is-4">
                        <div className="box">
                            <p className="title">actions</p>
                        </div>
                    </div>
                    <div className="column is-3">
                        <div className="box">
                            <p className="title">local</p>
                        </div>
                    </div>
                    <div className="column is-3">
                        <div className="box">
                            <p className="title">remote</p>
                        </div>
                    </div>
                </div>
                {this.renderRows()}
            </section>
        );
    }

    renderRows = () => this.state.rows.map( row => (
        <TimeRow {...row} />
    ))
}
