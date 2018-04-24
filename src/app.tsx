import * as React from 'react';
import Counter from './assets/components/Counter';
import './assets/css/app.css';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="app">
                <h1>React Sandbox</h1>
                The count has started: <Counter/>
            </div>
        );
    }
}

export default App;
