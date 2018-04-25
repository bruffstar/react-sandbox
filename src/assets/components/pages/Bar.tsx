import * as React from 'react';


interface BarParamData {
    id:number;
}

class Bar extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1>Bar Page</h1>
            </div>
        );
    }
}

export default Bar;
