const fs = require("fs");

// Path to the JSON file
const filePath = "./data-modules.json";

// Asynchronous reading
function getData() {
  try {
      const jsonData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(jsonData);
  } catch (err) {
      console.error('Error reading data file:', err);
      return null;
  }
}

module.exports = {
    getData
};