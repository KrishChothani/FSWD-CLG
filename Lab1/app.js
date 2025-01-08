const fs = require('fs');

const ob = [
  {
    id: 1,
    name: "Krish Chothani",
    roll_no: 101,
  },
  {
    id: 2,
    name: "Manav Patel",
    roll_no: 102,
  },
  {
    id: 3,
    name: "Akshit Bodar",
    roll_no: 103,
  },
];

const jsonString = JSON.stringify(ob, null, 2);

const filePath = './Lab1/output.json';

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