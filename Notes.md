## Notes

This file will contain some handy notes and things that I have had to figure out as I am learning. 

### React

#### React Router 404
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


#### Mounting & Unmounting

When a component is mounted, it may do some things during initialization that would be around even after it is unmounted. For example, a click event binding on the document, some DOM manipulation, a timer etc.

It is good practice to "clean up" after the component's lifecycle has come to an end. This can be done in the  ``componentWillUnmount()`` method.

More info: [React Component Mounting And Unmounting](https://learn.co/lessons/react-component-mounting-and-unmounting#unmounting)

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

There are a few ways to get around this, like changing .htaccess (see link below), but since we are using Webpack, it is just a matter of adding a few properties in the config, ``publicPath`` and ``historyApiFallback``.

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
