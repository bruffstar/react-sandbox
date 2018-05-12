## Notes

This file contains some handy notes and things that were figured out while learning react/webpack. 

**Note:** Some react code examples shown below are using typescript (.tsx).

### React

#### Mounting & Unmounting

When a component is mounted, it may do some things during initialization that would be around even after it is unmounted. For example, a click event binding on the document, some DOM manipulation, a timer etc.

It is good practice to "clean up" after the component's lifecycle has come to an end. This can be done in the  ``componentWillUnmount()`` method.

More info: [React Component Mounting And Unmounting](https://learn.co/lessons/react-component-mounting-and-unmounting#unmounting)

#### Using Images in Components

To use images in components, simply import the image and then use that as the "src" of the image. Any images will be lazy-loaded, meaning that the browser will only request the image when it's component is mounted.

For example: 
```jsx
import * as React from 'react';
import * as logo from '../../images/icon.jpg';

class ImageExample extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <p>Here is the logo:</p>
                <img src={logo} alt="React Sandbox"/>
            </div>
        );
    }
}

export default ImageExample;
``` 

Importing images into javascript is of course a strange concept but it does work well when using webpack. To make all of this work with webpack we need to use the ``file-loader`` module. This will look at any imported files with extensions defined in the "test" and handle them correctly. In this case, put them in a folder called "images".

```javascript
module.exports = {
    module: {
        loaders: [
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 1000, // Convert images < 1kb to base64 strings
                        name: 'images/[name].[hash:8].[ext]'
                    }
                }]
            }
        ]
    }
};
``` 
**NOTE**: All images will be put in the same "images" folder. In other words, the folder structure will not be maintained. Need to look into this and see if there are any other approaches. 

The ``limit`` option will tell webpack to just inline really small images, in this case less than 1kb, and convert them to base64 strings. 

TypeScript will throw errors when you try to import images as it does not recognize them as modules. To fix this we must declare all image/media types as modules. This can be stored in a seperate ``.d.ts`` file.

###### Media.d.ts
```typescript
declare module "*.jpg" {
    const value: any;
    export = value;
}

declare module "*.jpeg" {
    const value: any;
    export = value;
}

declare module "*.png" {
    const value: any;
    export = value;
}

// etc...
``` 

### React Router

#### Route Parameters
See below for an example of how to use route parameters. Note the use of ``exact`` in the /foo route to avoid conflicts with the nested route, which is simply rendering some DOM and printing the ``:id`` parameter. 

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
The first route shown above is a more common use case, rendering a component instead of just DOM. The request data will be sent to the component and added in it's props automatically.
See below for a look at how to render request parameters in a component. Since we have set up this project with TypeScript, the example also includes type hinting.

**NOTE**: The route data which is added to the component's props will only be accessible after the component has loaded. It will not exist if you try to access them in the constructor.

Also note that the type hinting for a react component accepts two arguments. the first is the type def for props and the second is the type def for state.

In the example below, we just set the state as type ``{}``, however, the props have this type: ``<RouteComponentProps<FooParamData>`` this will tell typescript that the props are of type RouteComponentProps which then requires an interface, in this case FooParamData. It is this interface where we can set up our type def for the parameter in question. i.e number, string etc... 
 
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
Since React Router will be in full control of the app's routes, we need to handle the case when an unknown route is entered into the address bar. Using the ``<Switch/>`` component from React Router, we can specify a ``<Route/>`` at the end with no path property. This is what will be rendered when there are no matches. We could pass a component or we could just render out some DOM directly, like in the example below:

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

We must add a few properties in the webpack config. ``publicPath`` must be always set and for development, if webpack-dev-server is used then we must set ``historyApiFallback`` to true.

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

#### Running on Apache

For the user to be able to refresh the page and to just get things working well on Apache, we must add a ``.htaccess`` file to make sure it always redirects to index.html no matter what happens. 

Here is the working code for the htaccess:
```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ index.html?q=$1 [L,QSA]
```

However, since we are using webpack to build the ``/dist`` folder, this will somehow need to be generated by webpack. We could add a ``.htaccess`` file somewhere in the ``/src`` folder and use a plugin to "copy" it into the dist, but having a random unused htaccess file in that folder is messy. The better setup is to let webpack handle everything.

There is a webpack plugin called ``generate-asset-webpack-plugin`` - this will allow you to generate a file, specify some content, and webpack will put it in the output folder.

Here is an example webpack config:
```javascript
const GenerateAssetWebpackPlugin = require('generate-asset-webpack-plugin');

function getHtaccessContent() {
    return 'RewriteEngine on\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteRule ^(.*)$ index.html?q=$1 [L,QSA]';
}

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new GenerateAssetWebpackPlugin({
            filename: '.htaccess',
                fn: (compilation, cb) => {
                cb(null, getHtaccessContent());
            }
        }) 
    ]
};
```

As you can see above, the ``GenerateAssetWebpackPlugin`` is creating a ``.htaccess`` file using the return value of ``getHtaccessContent()`` as it's content. 

Trying to use an anonymous function directly in the plugin does not work for some reason. The plugin will output the file into the ``/dist`` folder. The cool thing about doing it this way is that the content of the ``.htaccess`` file can now be dynamic and change depending on certain situations. 

#### Passing variables into the code from webpack

There may be a use case where inside the app, we need to dynamically set things based on certain situations. By using webpack's ``DefinePlugin``, we can set values in the ``process.env`` object. Webpack will automatically switch any reference to this object within the app with the value set in the webpack config file.      

For example, let's say we only wanted to show a button in development mode and hide it on production.

###### webpack.config.js
```javascript
const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};
```

###### Foo.tsx
```jsx
import * as React from 'react';

function doDevStuff() {
    console.log('Dev Stuff!');
}

class Foo extends React.Component {
    render() {
        let is_dev = process.env.NODE_ENV !== 'production';

        return (
            <div>
                <p>You should only see the button below in dev mode:</p>
                {is_dev ? (<button onClick={doDevStuff}>Do dev stuff</button>) : ''}
            </div>
        );
    }
}

export default Foo;

```
