import React, { Component } from 'react';

class HistorySample extends Component {
    // Back
    handleGoBack = () => {
        this.props.history.goBack();
    };

    // Home
    handleGoHome = () => {
        this.props.history.push('/');
    };

    componentDidMount() {
        this.unblock = this.props.history.block('Are you sure leave this page?');
    }

    componentWillUnmount() {
        if (this.unblock) {
            this.unblock();
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleGoBack}>Back</button>
                <button onClick={this.handleGoHome}>Home</button>
            </div>
        );
    };
};

export default HistorySample;