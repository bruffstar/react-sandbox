## Notes

This file will contain some handy notes and things that I have had to figure out as I am learning. 

### React

#### Mounting & Unmounting

When a component is mounted, it may do some things during initialization that would be around even after it is unmounted. For example, a click event binding on the document, some DOM manipulation, a timer etc.

It is good practice to "clean up" after the component's lifecycle has come to an end. This can be done in the  ``componentWillUnmount()`` method.

More info: [React Component Mounting And Unmounting](https://learn.co/lessons/react-component-mounting-and-unmounting#unmounting)

### React Router

#### Route Parameters
See below for an example of how to use route parameters. Note the use of ``exact`` in the /bar route to avoid conflicts with the nested route, which is simply rendering some DOM and printing the ``:id`` parameter. 

```jsx
<Switch>   
    <Route exact path="/foo" component={Foo}/>
    <Route path="/foo/:id" render={function (request) {
        return (
            <div>
                <h1>FOO</h1>
                <p>ID: {request.match.params.id}</p>
            </div>
        );
    }}/>
</Switch>
``` 
More commonly, we would of course want to render a component instead of just DOM. The request data will be sent to the component and added in it's props automatically.
Here is a look at how to render request parameters in a component. Since we have set up this project with TypeScript, the example also includes type hinting.

**NOTE**: The ``RouteComponentProps`` data which is added to the component's props will only be accessible after the component has loaded. It will not exist if you try to access them in the constructor.  
```jsx
import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';

interface FooParamData {
    id:number;
}

class Foo extends React.Component<RouteComponentProps<FooParamData>, {}> {
   constructor() {
        super();
        
        // This will not work here:
        // console.log(this.props.match.params.id)
    }
    
    render() {
        return (
            <span>Here is the Foo ID: {this.props.match.params.id}</span>
        );
    }
}

export default Foo;

``` 



#### Handle 404
Since React Router will be in full control of the app's routes, we need to handle the case when an unknown route is entered into the address bar. Using the ``<Switch/>`` component from React Router, we can specify a ``<Route/>`` at the end with no path property. This is what will be rendered when there are no matches. We could pass a component or we could just render out some DOM directly like in the example below:

```jsx
<Switch>
    <Route path="/" component={Home}/>
    <Route path="/foo" component={Foo}/>
    <Route path="/bar" component={Bar}/>
    
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
```  

### Webpack

#### Create a separate vendor file
Instead of including common modules into the main build file, this plugin will create a separate vendor.js file that can then be cached by the browser.

The example below is set up to make sure anything from the "node_modules" folder is included in the vendor file.
```javascript
module.exports = {
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          filename: 'vendor.[chunkhash].js',
          minChunks(module) {
                return module.context && module.context.indexOf('node_modules') >= 0;
          }
      })
  ]
};
```  

More info: [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin)

#### React Router - "cannot GET /URL" error

By default, the browser will try to hit the server for the route before JS (react) has had a chance to load and tell it that React Router will be in control of routes.

We must add a few properties in the webpack config, ``publicPath`` must be set to "/" (dev & production) and for development, if webpack-dev-server is used then we must set ``historyApiFallback`` to true.

```javascript
module.exports = {
  output: {
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  }
};
```

More info: [Fixing the "cannot GET /URL" error](https://tylermcginnis.com/react-router-cannot-get-url-refresh)

#### Apache Setup

To get things working on Apache, we must add a ``.htaccess`` file to always redirect to index.html
```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```
The file lives in the ``/src`` directory and is then "copied" into the ``/dist`` folder on build with webpack using ``copy-webpack-plugin``.
