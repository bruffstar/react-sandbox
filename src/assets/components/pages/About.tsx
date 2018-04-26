import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';

class About extends React.Component<RouteComponentProps<any>, any> {
    render() {
        return (
            <div>
                <h1>About</h1>
                <p>This is the about page.</p>
            </div>
        );
    }
}

export default About;
