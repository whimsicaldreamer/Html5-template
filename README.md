# HTML5-Template
###### A simple HTML5 boilerplate with the power of Webpack 4

[![GitHub stars](https://img.shields.io/github/stars/whimsicaldreamer/Html5-template.svg?style=popout-square)](https://github.com/whimsicaldreamer/Html5-template/stargazers)
[![David](https://img.shields.io/david/expressjs/express.svg?style=popout-square)](https://github.com/whimsicaldreamer/Html5-template)
[![David](https://img.shields.io/david/dev/expressjs/express.svg?style=popout-square)](https://github.com/whimsicaldreamer/Html5-template)
[![GitHub license](https://img.shields.io/github/license/whimsicaldreamer/Html5-template.svg?style=popout-square)](https://github.com/whimsicaldreamer/Html5-template/blob/master/LICENSE.md)

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
  ````js
  page2: [
    "./src/js/page2.js",
    "./src/css/page2.css"
  ]
  ````
- Modify `webpack.config.js` and add the following just below the **index.html**:  
  ````js
  new HtmlWebpackPlugin({
     filename: "page2.html",
     template: "src/page2.html",
     chunks: [ "vendor", "page2"]
  })
  ````
- :tada: **_And you are all done!!_** :tada:
  
### Using Modernizr  

Modernizr is _**turned off**_ by default but if you need to use it, you first need to generate the custom build.  
To do so:  
 - Modify the `modernizr-config.json` file to add whatever tests/ options you need. For full set of tests/ options refer **[here](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json)**.
 - Run **`npm run build:modernizr`** to generate the custom build into your `src/js/` directory.
 - Add it to your `app.js` file. **Remember,** to put it on top of everything (_see below example_), or else you might have some errors.  
   ```js
    index: [
        "./src/js/modernizr.js",
        "./src/js/index.js",
        "./src/css/index.css"
    ]
   ```  
 - Now, you can use modernizr in both css and js files. For example if you want to use modernizr in a js file, you can do as below:  
   ```js
   if (Modernizr.someFeature) {
       console.log("Available");
   } else {
       console.log("Not Available");
   }
   ```
 
### Using backend files  
For using backend files like **PHP** (typically its my use case), Browser-sync is in place to pick up changes and reload the browser.
If any other backend files are being used, try changing the `match` option of Browser-Sync plugin in `webpack.config.js` and hopefully 
everything should go well.  

> **Remember to run you local backend server first and change proxies/ port/ host accordingly.**  

> _Its better to remove Browser-sync-plugin and dev-server proxy if you are working with a static site._ 
 
### Running your project  

**Development:** **`npm run start`**  
It will start the dev server at `localhost:8080`.  

**Production:** **`npm run build`**  
It will build the whole project into `dist` directory.  

**Build modernizr.js:** **`npm run build:modernizr`**  
It will build the custom modernizr.js into `src/js/` directory. 

## Contributing  
Please feel free to create an issue or if you are ready with a fix, I would be more than happy to receive a PR.