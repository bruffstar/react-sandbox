import * as React from 'react';
import Counter from '../Counter';

class Home extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <p>Current Environment = {process.env.NODE_ENV}</p>
                <p>Counter: <Counter/></p>
        </div>
    );
    }
}

export default Home;
