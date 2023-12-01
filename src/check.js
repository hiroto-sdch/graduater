const fs = require('fs');

const json = fs.readFileSync('/data/coins_media21.json');
const data = JSON.parse(json);

console.log(data);