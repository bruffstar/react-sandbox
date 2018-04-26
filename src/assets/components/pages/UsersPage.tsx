import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Link} from 'react-router-dom';

class UsersPage extends React.Component<RouteComponentProps<any>, any> {
    render() {
        return (
            <div>
                <h1>All Users</h1>
                <ul>
                    <li><Link to="/users/1">User 1</Link></li>
                    <li><Link to="/users/2">User 2</Link></li>
                    <li><Link to="/users/3">User 3</Link></li>
                </ul>
            </div>
        );
    }
}

export default UsersPage;
