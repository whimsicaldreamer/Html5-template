const fs = require("fs");
const path = require("path");
const pathToDir = path.join(__dirname, "dist");

const cleanDirectory = (path) => {
    if (fs.existsSync(path)) {
        const files = fs.readdirSync(path);

        if(files.length > 0){
            files.forEach(filename => {
                if(fs.statSync(`${path}/${filename}`).isDirectory()) {
                    cleanDirectory(`${path}/${filename}`);
                }
                else {
                    fs.unlinkSync(`${path}/${filename}`);
                }
            });
            fs.rmdirSync(path);
        }
        else {
            fs.rmdirSync(path)
        }

        if (path === pathToDir) {
            console.log("Successfully removed previous build and preparing new build...");
        }
    }
    else {
        console.log("No previous build to remove");
    }
};

console.log("Removing previous build...");
cleanDirectory(pathToDir);