require('dotenv').config()
const {Sequalize} = require('sequalize');
const fs = require('fs');
const path = require('path');

const {DB_USER, DB_PASS, DB_HOST} = process.env;

const sequalize = new Sequalize(`postgress://${DB_USER}:${DB_PASS}@${DB_HOST}/pi_food_db`, {
    logging: false,
    native: false,
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(_dirname, '/models'))
    .filter(file => {
        (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')})
    .forEach(file => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

    modelDefiners.forEach(model => model(sequalize));

    let entries = Object.entries(sequalize.models);
    let capEntries = entries.map(entry => {
        [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]
    });
    sequalize.models = Object.fromEntries(capEntries);

const {Recipe, Diet} = sequalize.models;

Recipe.belongsToMany(Diet, {through: 'RecipeDiet'});
Diet.belongsToMany(Recipe, {through: 'RecipeDiet'});

module.exports = {
    ...sequalize.models,
    conn: sequalize
};