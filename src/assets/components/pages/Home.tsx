import * as React from 'react';

class Home extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <p>Current Environment = {process.env.NODE_ENV}</p>
            </div>
        );
    }
}

export default Home;
