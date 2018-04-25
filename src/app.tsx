import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import Counter from './assets/components/Counter';
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
                        <Route path="/foo" component={Counter}/>
                        <Route path="/bar" component={Counter}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
