import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import Counter from '../Counter';

interface HomeParamData {
    id:number;
}

class Home extends React.Component<RouteComponentProps<HomeParamData>, {}> {
    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <p>Counter: <Counter/></p>
        </div>
    );
    }
}

export default Home;
