const fs = require('fs');
const filePath = `D:\\VSCODE\\CODES\\Lab-FSWD\\Lab2\\output.json`; // Correctly using backticks


fs.readFile(filePath, 'utf8' , (err, data) => { 
    if(err){
        console.error("Error while reading the File" , err);
    }
    try {
        const jsonData = JSON.parse(data);
        console.log("File contents:", jsonData);
    } catch (error) {
        console.error("Error while writing the File", err);
    }
} )
