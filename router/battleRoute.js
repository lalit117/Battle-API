
var db = require('../db/mongoose');
var {Battle} = require('../models/battle');

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {

    Battle.find({},{location:1, _id:0})
    .then((locations) => {
        if (!locations) {
            return res.status(404).send();
        }

        return res.send({locations});
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send();
    });
});

router.get('/count', (req, res) => {
    
    Battle.count({})
    .then((battlesCount) => {
        if (!battlesCount) {
            return res.status(404).send();
        }

        return res.send({battlesCount});
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send();
    });
});

router.get('/stats', (req, res) => {
    
});

module.exports = router;