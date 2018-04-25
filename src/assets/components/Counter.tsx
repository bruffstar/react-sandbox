import * as React from 'react';

interface CountState {
    count:number;
}

let counter = null;

// React.Component<{}:Props, {}:State>
class Counter extends React.Component<{}, CountState> {
    constructor() {
        super();

        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        counter = setInterval(() => {
            this.setState({count: this.state.count + 1});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(counter);
    }

    render() {
        return (
            <span>{this.state.count}</span>
        );
    }
}

export default Counter;
