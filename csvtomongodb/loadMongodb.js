
process.env.MONGODB_URI = 'mongodb://localhost:27017/GOT';

var csv = require('csvtojson');
var {mongoose} = require('../db/mongoose');
var {Battle} = require('../models/battle');

    csv()
    .fromFile('./csvtomongodb/battles.csv')
    .then((jsonObj) => {
        //require('fs').writeFileSync('./got.txt', JSON.stringify(jsonObj));    
        if (Battle.count() === 0) {    
            Battle.insertMany(jsonObj)
            .then(()=>{
                console.log('Databse Populated successfully');
                process.exit(0);
            });
        } else {
            console.log('database already populated');
            process.exit(0);
        }
    });