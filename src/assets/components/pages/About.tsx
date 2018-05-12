import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import * as logo from '../../images/icon.jpg';

class About extends React.Component<RouteComponentProps<any>, any> {
    render() {
        return (
            <div>
                <h1>About</h1>
                <img id="logo" src={logo} alt="React Sandbox"/>
                <p>This is the about page.</p>
            </div>
        );
    }
}

export default About;
