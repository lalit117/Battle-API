
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
    var stats = {
    'most_active':{
            'attacker_king': '',
            'defender_king': '', 
            'region': '',
            'name': 0
        },
        'attacker_outcome':{
            'win': 0,
            'loss': 0 
        },
        'battle_type':[],
        'defender_size':{
            'average':0,
            'min':0,
            'max':0
        }
    }

    Battle.aggregate( [ { $sortByCount: "$attacker_king" } ] ).limit(1)
    .then((obj) => {
        stats.most_active.attacker_king = obj[0]._id;
        return Battle.aggregate( [ { $sortByCount: "$defender_king" } ] ).limit(1);
    })  
    .then((obj) => {
        stats.most_active.defender_king = obj[0]._id;
        return Battle.aggregate( [ { $sortByCount: "$region" } ] ).limit(1);
    })
    .then((obj) => {
        stats.most_active.region = obj[0]._id;
        return Battle.aggregate( [ { $sortByCount: "$name" } ] ).limit(1);
    })
    .then((obj) => {
        stats.most_active.name = obj[0]._id;
        return Battle.aggregate( 
                    [ { $match: {"attacker_outcome" : {$ne : ""}} },
                      { $group: { _id : "$attacker_outcome", count : {$sum : 1} }}        
                    ]);
    })
    .then((obj) => { 
        obj.forEach((elem) => {
            if(elem._id === 'loss') {
                stats.attacker_outcome.loss = elem.count
            } else if (elem._id === 'win') {
                stats.attacker_outcome.win = elem.count
            }
        });
        return Battle.distinct("battle_type");
    })
    .then((arr) => {
        stats.battle_type = arr.filter(elem => elem !== "");
        return Battle.aggregate([{ $group : 
            { _id : null, 
              avg : {$avg : "$defender_size"},
              max : {$max : "$defender_size"},
              min : {$min : "$defender_size"}  
            }}])
    })
    .then((obj) => {
        stats.defender_size.average = Math.floor(obj[0].avg);
        stats.defender_size.max = obj[0].max;
        stats.defender_size.min = obj[0].min;
        console.log(stats);
        res.send(stats);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send();
    });
});

router.get('/search', (req, res) => {
    let location = req.query.location;
    let battle_type = req.query.type;
    let query;
    console.log(req.query);
    if (req.query.king !== undefined) {
        query = { $or : [{'attaker_king' : req.query.king}, {'defender_king' : req.query.king} ] }
    } 
    if (location !== undefined) {
        query.location = location;
    }
    if (battle_type !== undefined) {
        query.battle_type = battle_type;
    }

    Battle.find(query)
    .then((result) => {
        res.send({result});
    })
    .catch((err) => {
        console.log(err);
        res.send(400).send();
    });
});

module.exports = router;