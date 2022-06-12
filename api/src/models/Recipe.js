const {DataTypes} =require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Recipe', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: { // name of the recipe
            type: DataTypes.STRING,
            allowNull: false
        },
        summary: { // dish description
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        spoonacularScore: {
            type: DataTypes.FLOAT(1),
            validate: {
                min: 0,
                max: 100
            }
        },
        healthScore:{ // health score
            type: DataTypes.FLOAT(1),
            allowNull: false,
            validate: {
                min: 0,
                max: 100
            }
        },
        instructions: { // steps to make the dish
            type: DataTypes.STRING
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};