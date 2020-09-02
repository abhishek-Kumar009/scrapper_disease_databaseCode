const mysqlConnection = require('./mysql/connection');
const fastcsv = require('fast-csv');
//start putting data from here - run it(don't think)
csvData = [];
fastcsv
  .parseFile('D50_D53Syn.csv')
  .on('data', (data) => {
    csvData.push(data);
  })
  .on('end', () => {
    csvData.shift();
    // console.log(csvData);
    for (let i = 0; i < csvData.length; i++) {
      let currSynonyms = csvData[i][1];
      currSynonyms = currSynonyms
        .replace(/"/g, "'")
        .replace('[', '')
        .replace(']', '')
        .split(/',/);

      for (syn of currSynonyms) {
        query = 'insert into synonyms(id, synonym) values (?,?)';
        mysqlConnection.query(query, [i + 2763 + 1, syn], (err, response) => {
          console.log(`\n i: ${i}`);
          console.log(err || response);
        });
      }
    }
    console.log('All entires updated!');
  });
