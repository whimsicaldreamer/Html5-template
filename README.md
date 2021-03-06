# HTML5-Template
###### A simple HTML5 template with the power of Webpack 4

[![GitHub stars](https://img.shields.io/github/stars/whimsicaldreamer/Html5-template.svg?style=popout-square)](https://github.com/whimsicaldreamer/Html5-template/stargazers)
[![David](https://img.shields.io/david/expressjs/express.svg?style=popout-square)](https://github.com/whimsicaldreamer/Html5-template)
[![David](https://img.shields.io/david/dev/expressjs/express.svg?style=popout-square)](https://github.com/whimsicaldreamer/Html5-template)
[![GitHub license](https://img.shields.io/github/license/whimsicaldreamer/Html5-template.svg?style=popout-square)](https://github.com/whimsicaldreamer/Html5-template/blob/master/LICENSE.md)

_This template is built to provide a head start for building the frontend of multipage websites. No-frills, just plain good old HTML5, CSS3, JS and jQuery with a dash of autoreloading. Some parts are taken from popular open source projects._

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

### Using a backend during development

To use a backend REST api, edit `proxy-config.json`. For advanced usages, visit [here](https://webpack.js.org/configuration/dev-server/#devserverproxy).

> **Remember to run you backend server first.**  
 
### Running your project  

**Development:** **`yarn start`**  
It will start the dev server at `localhost:8080`.  

**Production:** **`yarn build`**  
It will build the whole project into `dist` directory.  

**Build modernizr.js:** **`yarn build:modernizr`**  
It will build the custom modernizr.js into `src/js/` directory. 

## Contributing  

You can contribute to this project in the following ways:
- Bug reporting by creating an issue in this repo.
- Fixing bugs by opening a PR.
- Proposing some new additions/ improvements.
- **Star** this project if you found it helpful. :pray: :crossed_fingers: