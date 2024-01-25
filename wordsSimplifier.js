const fs = require('fs')
const filePath = './words.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }
  const words = [...new Set(data.split(/\s+/).filter((el) => el.length === 5).map((el) => el.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))]
  console.log(words)

  fs.writeFileSync('./utils/words.json',JSON.stringify(words))
});