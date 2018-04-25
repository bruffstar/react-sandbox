import * as React from 'react';


interface FooParamData {
    id:number;
}

class Foo extends React.Component<any, {}> {
    render() {
        let id = this.props.match.params.id;

        return (
            <div>
                <h1>Foo Page</h1>
                {id ? (<p>ID: {id}</p>) : ''}
            </div>
        );
    }
}

export default Foo;
