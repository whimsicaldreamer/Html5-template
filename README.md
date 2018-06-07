# HTML5-Template
###### A simple HTML5 boilerplate with the power of Webpack-4

_This boilerplate is customized to contain the parts which I generally use to develop my websites. Some parts are taken from popular open source projects._

### Installing

- **Clone this repository.**
- **Browse into the project directory**
- **Do** `npm install`
- **Then you are good to go!!** :tada:

> **NOTE:** For every new build existing `dist` directory will be deleted.  

## Working with the template  

### Adding new pages  

To add new page (ex: **page2**) in your project, create **html**, **css**, **js** files inside `src` directory and under respective directories.  
Then,  
- add an entry point inside `app.js` file like following:
  ````
  page2: [
    "./src/js/page2.js",
    "./src/css/page2.css"
  ]
  ````
- Modify `webpack.config.js` and add the following just below the **index.html**:  
  ````
  new HtmlWebpackPlugin({
     filename: "page2.html",
     template: "src/page2.html",
     chunks: [ "vendor", "page2"]
  }),
  ````
- :tada: **_And you are all done!!_** :tada:
  
### Running your project  

**Development:** **`npm run start`**  
It will start the dev server at `localhost:8080`.  

**Production:** **`npm run build`**  
It will build the whole project into `dist` directory. 

## Contributing  
Please feel free to create an issue or if you are ready with a fix, I would be more than happy to receive a PR.