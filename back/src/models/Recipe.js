const {DataTypes} =require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Recipe', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        summary: {
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
        healthScore:{
            type: DataTypes.FLOAT(1),
            allowNull: false,
            validate: {
                min: 0,
                max: 100
            }
        },
        instructions: {
            type:DataTypes.STRING
        },
        image:{
            type: DataTypes.STRING
        }
    });
};