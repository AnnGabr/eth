import React, { Component } from 'react';

import classnames from 'classnames';

export default class TimeRow extends Component {
    render() {
        return (
            <div className="columns">
                <div className="column is-4">
                    <div className="box">
                        <p className="title">{this.props.methodName}</p>
                    </div>
                </div>
                <div className="column is-3">
                    <div className="box">
                        <p className="title">{this.props.firstElapsedTime}</p>
                        <p className="subtitle">ms</p>
                    </div>
                </div>
                <div className="column is-3">
                    <div className="box">
                        <p className="title">{this.props.secondElapsedTime}</p>
                        <p className="subtitle">ms</p>
                    </div>
                </div>
                <div className="column is-2">
                    <div className="box">
                        {this.renderRatio()}
                    </div>
                </div>
            </div>
        );
    }

    renderRatio() {
        const { secondElapsedTime, firstElapsedTime } = this.props;
        const ratio = (Number(secondElapsedTime)/Number(firstElapsedTime)).toFixed(2);
        const isUp = ratio >= 1;
        const sign = isUp ? '↑' : '↓';
        const ratioClass = classnames('title', isUp ? 'up-color' : 'down-color' );

        return <p className={ratioClass}>{`${ratio} ${sign}`}</p>;
    }
}