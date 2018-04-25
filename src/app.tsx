import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import Home from './assets/components/pages/Home';
import Foo from './assets/components/pages/Foo';
import Bar from './assets/components/pages/Bar';
import Nav from './assets/components/Nav';
import './assets/css/app.css';

const Switch = ReactRouter.Switch;
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;



class App extends React.Component<{}, {}> {
    render() {
        return (
            <Router>
                <div className="app">
                    <Nav/>
                    <Switch>
                        <Route exact path="/" component={Home}/>

                        <Route exact path="/foo" component={Foo}/>
                        <Route exact path="/foo/:id" component={Foo}/>

                        <Route exact path="/bar" component={Bar}/>
                        <Route path="/bar/:id" render={function (request) {
                            return (
                                <div>
                                    <h1>Bar Page</h1>
                                    <p>ID: {request.match.params.id}</p>
                                </div>
                            );
                        }}/>

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
