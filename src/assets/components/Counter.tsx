import * as React from 'react';

interface CountState {
    count:number;
}

// React.Component<{}:Props, {}:State>
class Counter extends React.Component<{}, CountState> {
    constructor() {
        super();

        this.state = {
            count: 0
        };

        setInterval(() => {
            this.setState({count: this.state.count + 1});
        }, 1000);
    }

    render() {
        return (
            <span>{this.state.count}</span>
        );
    }
}

export default Counter;
