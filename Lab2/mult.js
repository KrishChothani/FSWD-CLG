const ob = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    ["banana" , "Mango", "Pineapple"]
]

const fs = require('fs');
const jsonString = JSON.stringify(ob, null, 2);

const filePath = 'test.json';

fs.writeFile(filePath, jsonString, 'utf-8' ,(e) =>{
  if(e)
  {
    console.error("Error writing output :", e);
  }
  else 
  {
    console.log("JSON object has been created :", filePath);
  }
});