const {Sequelize} = require('sequelize');
const modelRecipe = require('./models/Recipe');
const modelDiet = require('./models/Diet');
require('dotenv').config();

const {DB_USER, DB_PASS, DB_HOST} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:5432/pi_food_db`, {
    logging: false,
    native: false
});

modelDiet(sequelize);
modelRecipe(sequelize);

const {Recipe, Diet} = sequelize.models;

Recipe.belongsToMany(Diet, {through: 'Diet_Recipe'});
Diet.belongsToMany(Recipe, {through: 'Diet_Recipe'});

module.exports = {
    ...sequelize.models,
    conn: sequelize
};

/* henry way throw error with sequalize.models*/
// const {Sequelize} = require('sequelize');
// const fs = require('fs');
// require('dotenv').config()
// const path = require('path');

// const {DB_USER, DB_PASS, DB_HOST} = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/pi_food_db`, {
//     logging: false,
//     native: false,
// });

// const basename = path.basename(__filename);
// const modelDefiners = [];

// fs.readdirSync(path.join(__dirname,'/models'))
//     .filter(file => {
//         (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')})
//     .forEach(file => {
//         modelDefiners.push(require(path.join(__dirname, '/models', file)));
//     });

//     modelDefiners.forEach(model => model(sequelize));

//     let entries = Object.entries(sequelize.models);
//     let capEntries = entries.map(entry => {
//         [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]
//     });

// sequelize.models = Object.fromEntries(capEntries);

// const {Recipe, Diet} = sequelize.models;

// console.log('models: ',sequelize.models);

// Recipe.belongsToMany(Diet, {through: 'RecipeDiet'});
// Diet.belongsToMany(Recipe, {through: 'RecipeDiet'});

// module.exports = {
//     ...sequelize.models,
//     conn: sequelize
// };