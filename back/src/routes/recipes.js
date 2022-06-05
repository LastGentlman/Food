const {Router} = require('express');
const router = Router();
const {getAllRecipes, searchById} = require('../Controllers/recipes');
const {Recipe} = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const name = req.query.name;
        const allRecipes = await getAllRecipes();
        if (name) {
            let recipe = allRecipes.filter(recipe => {
                recipe.title?.toLowerCase().includes(name.toString().toLowerCase());
        });
            if (recipe.length) {
                res.status(200).send(recipe);
            } else {
                res.status(404).send('Recipe doesn\'t exist');
            }
        } else {
            res.status(200).send(allRecipes);
        }

    } catch (error) {
        next(error);
    }
})