import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';

interface BarParamData {
    id:number;
}

class Bar extends React.Component<RouteComponentProps<BarParamData>, {}> {
    render() {
        return (
            <div>
                <h1>Bar Page</h1>
            </div>
        );
    }
}

export default Bar;
