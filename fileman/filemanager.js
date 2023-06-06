const fs = require('fs');

 function createFolder(folderName) {
    const directoryPath = './audiofiles'

            // Check if the directory already exists
            if (!fs.existsSync(directoryPath)) {
              fs.mkdirSync(directoryPath);
            }
          
            // Check if the folder already exists
            const folderPath = `${directoryPath}/${folderName}`
            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath);
              console.log(`Folder "${folderName}" created successfully.`)
            } else {
              console.log(`Folder "${folderName}" already exists.`)
            }
}
module.exports = createFolder;
// // Usage
// const folderName = 'myFolder';
// createFolder(folderName);
