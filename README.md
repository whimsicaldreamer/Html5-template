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
- **Do** `yarn install`
- **Then you are good to go!!** :tada:

> **NOTE:** For every new build existing `dist` directory will be deleted.  

## Working with the template  

### Adding new pages  

To add new page (ex: **page2.html**) in your project, create **html**, **css**, **js** files inside `src` directory and under respective directories.  
Then,  
- add an entry point inside `app.js` file like following:
  ````js
  // page2 refers to the name of the html file
  page2: [
    "./src/js/<your-js-file>.js",
    "./src/css/<your-stylesheet>.css"
  ]
  ````
- :tada: **_And you are all done!!_** :tada:
  
### Using Modernizr  

Modernizr is _**turned off**_ by default but if you need to use it, you first need to generate the custom build.  
To do so:  
 - Modify the `modernizr-config.json` file to add whatever tests/ options you need. For full set of tests/ options refer **[here](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json)**.
 - Run **`yarn build:modernizr`** to generate the custom build into your `src/js/` directory.
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
 
### Using Font Awesome

I have used **fontawesome-svg-core** but anyone could use the **fontawesome-free** package but it might need some changes (I haven't checked).  
 > One of the most common use cases where you would reach for the core package instead of using fontawesome-free or fontawesome-pro is to create a subset of icons to reduce your final bundled file size.  
 
 #### How to use?  
 
 - Add the following in your js file. (Ex: We are going to use _shipping-fast_ icon)
   ```js
   import { library, dom } from "@fortawesome/fontawesome-svg-core";
   import { faShippingFast } from "@fortawesome/free-solid-svg-icons";
   library.add(faShippingFast);
   dom.watch();
   ```
   
 - And then use the imported icon in your HTML file as following:  
   ```html
   <i class="fas fa-shipping-fast"></i>
   ```
   
**_The rendered icon will be an svg_**. :tada::tada:

### Using backend files  

For using backend files like **PHP** (typically its my use case), Browser-sync is in place to pick up changes and reload the browser.
If any other backend files are being used, try changing the `match` option of Browser-Sync plugin in `webpack.config.js` and hopefully 
everything should go well.  

> **Remember to run you local backend server first and change proxies/ port/ host accordingly.**  

> _Its better to remove Browser-sync-plugin and dev-server proxy if you are working with a static site._ 
 
### Running your project  

**Development:** **`yarn start`**  
It will start the dev server at `localhost:8080`.  

**Production:** **`yarn build`**  
It will build the whole project into `dist` directory.  

**Build modernizr.js:** **`yarn build:modernizr`**  
It will build the custom modernizr.js into `src/js/` directory. 

## Contributing  
Please feel free to create an issue or if you are ready with a fix, I would be more than happy to receive a PR.