const { Router } = require('express');
const { Recipe, Diet } = require('../db')
require('dotenv').config();
const { API_KEY } = process.env
const axios = require('axios');

const model = require('../controllers');

const router = Router();

router.get('/recipes', async (req, res, next) => {
    const { name } = req.query;
    const recipes = await model.allData()
    try {
        if (name) {
            let queryDiet = await Diet.findOne({
                where: { name: name.toLowerCase() }
            })
            if (queryDiet) {
                let byDietQuery = await recipes.filter(reseta => {
                    let names = reseta.diets.map(dieta => dieta.name)
                    if (names.includes(name)) return reseta
                })
                if (byDietQuery.length) {
                    res.status(200).send(byDietQuery)
                } else {
                    res.status(400).send('recipe not found')
                }
            } else {
                let recipeQuery = await recipes.filter(reseta => reseta.name.toLowerCase().includes(name.toString().toLowerCase()));
                if (recipeQuery.length) {
                    res.status(200).send(recipeQuery)
                } else {
                    res.status(400).send('there are no recipes with that name')
                }
            }
        }
        res.status(200).send(recipes)
    } catch (e) {
        next(e);
    }
})

router.get('/recipes/:id', async (req, res, next) => {
    const { id } = req.params;
    // traer todas las recetas, filtrar por id e incluir el tipo de dieta asociado
    const recipes = await model.allData();
    try {
        if (id) {
            const recipesID = await recipes.filter(r => r.id == id);
            recipesID.length ?
                res.send(recipesID) :
                res.send('recipe not found')
        } else {
            res.send('must provide an id')
        }     
    } catch (e) {
        next(e);
    }
});

router.get('/diets', async (req, res, next) => { //FIXME 
    try {
        const diets = await Diet.findAll({});
        if (diets.length) {
            res.status(200).json(diets);
        } else {
            res.status(404).send('Error when trying to get diets');
        }
    } catch (e) {
        next(e)
    }
});

router.post('/recipe', async (req, res) => {
    const { name, summary, score, healthScore, image, stepByStep, diets } = req.body;
    const newRecipe = await Recipe.create({
        name,
        summary,
        score,
        image,
        healthScore: healthScore,
        instructions: stepByStep
    });
    diets.map(async d => {
        const dbDiet = await Diet.findOrCreate({
            where: {
                name: d
            }
        })
        newRecipe.addDiet(dbDiet[0]);
    })
    res.send('Done!')
});

module.exports = router;
