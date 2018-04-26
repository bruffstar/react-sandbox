import * as React from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';

interface UserParamInterface {
    id:number;
}

class User extends React.Component<RouteComponentProps<UserParamInterface>, any> {
    render() {
        return (
            <div>
                <h1>User Page</h1>
                <p>User ID:</p>
                <p className="big-text">{this.props.match.params.id}</p>
                <p><Link to="/users">Go Back</Link></p>
            </div>
        );
    }
}

export default User;
