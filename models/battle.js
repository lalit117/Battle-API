
var mongoose = require('mongoose');

var battleSchema = new mongoose.Schema({
    name : {type : String, required: true},
    year: Number,
    battle_number:  {type: Number, required:true},
    attacker_king: String,
    defender_king: String,
    attacker_1: String,
    attacker_2: String,
    attacker_3: String,
    attacker_4: String,
    defender_1: String,
    defender_2: String,
    defender_3: String,
    defender_4: String,
    attacker_outcome: String,
    battle_type: String,
    major_death:  {type: Number, default:0},
    major_capture:  {type: Number, default:0},
    attacker_size: {type: Number, default:0},
    defender_size:  {type: Number, default:0},
    attacker_commander: String,
    defender_commander: String,
    summer: Number,
    location: String,
    region: String,
    note: String
});

var Battle = mongoose.model('battle', battleSchema);

module.exports = {
    Battle:Battle
}

