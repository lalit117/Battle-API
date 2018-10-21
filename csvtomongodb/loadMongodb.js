
process.env.MONGODB_URI = 'mongodb://localhost:27017/GOT';

var csv = require('csvtojson');
var {mongoose} = require('../db/mongoose');
var {Battle} = require('../models/battle');

function populateDatabase() {
    csv()
    .fromFile('./csvtomongodb/battles.csv')
    .then((jsonObj) => {
        Battle.count()
        .then((count) => {
            if (count === 0) {   
                Battle.insertMany(jsonObj)
                .then(() => {
                    console.log('Databse Populated successfully');
                })
                .catch((err) => {
                    console.log('Failed to populate database : ' + err);
                });
            } else {
                console.log('database already populated');
            }
        });
    });
}

module.exports = populateDatabase;