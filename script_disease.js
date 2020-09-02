var fs = require('fs');
const path = require('path');
const mysqlConnection = require('./mysql/connection');
const fastcsv = require('fast-csv');
const objToCSV = require('objects-to-csv');

//Hard coded directory has been used.
//Put your path here...
const currDir = path.join(__dirname + '/../Coding_Stuffs/csvfiles/modifiedData/');
console.log(currDir);

// Function to get the filenames present
// in the directory
const readdir = (dirname) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, (error, filenames) => {
            if (error) {
                reject(error);
            } else {
                resolve(filenames);
            }
        });
    });
};

//CSV filter to filter out the csv files
//in the directory
const filtercsvFiles = (filename) => {
    return filename.split('.')[1] == 'csv';
};

readdir(currDir).then((filenames) => {
    filenames = filenames.filter(filtercsvFiles);

    for (let i = 0; i < filenames.length; i++) {
        let currFilePath = currDir + filenames[i];

        //Use fast-csv to parse the files
        let csvData = [];
        fastcsv
            .parseFile(currFilePath)
            .on('data', (data) => {
                csvData.push(data);
            })
            .on('end', async () => {
                csvData.shift();


                // console.log(csvData);

                //Save the data in mysql
                query = 'insert into disease values ?';
                mysqlConnection.query(query, [csvData], (err, response) => {
                    console.log(err || response);
                });
            });
    }
});