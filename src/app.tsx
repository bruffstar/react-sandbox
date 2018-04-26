import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import Nav from './assets/components/Nav';
import Home from './assets/components/pages/Home';
import About from './assets/components/pages/About';
import UsersPage from './assets/components/pages/UsersPage';
import User from './assets/components/pages/User';
import './assets/css/app.css';

const Switch = ReactRouter.Switch;
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;

class App extends React.Component<any, any> {
    render() {
        return (
            <Router basename={process.env.BASENAME || "/"}>
                <div className="app">
                    <Nav/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/users" component={UsersPage}/>
                        <Route exact path="/users/:id" component={User}/>

                        {/* The Route below will be used when the request does not match any route above */}
                        <Route render={function () {
                            return (
                                <div>
                                    <h1>Oops! 404 </h1>
                                    <p>Page Not Found</p>
                                </div>
                            );
                        }}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
