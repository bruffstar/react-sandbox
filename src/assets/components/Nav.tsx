import * as React from 'react';
import {NavLink} from 'react-router-dom';

class Nav extends React.Component<{}, {}> {
    render() {
        return (
            <ul>
                <li>
                    <NavLink exact activeClassName="active" to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to="/foo">Foo</NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to="/bar">Bar</NavLink>
                </li>
            </ul>
        );
    }
}

export default Nav;
