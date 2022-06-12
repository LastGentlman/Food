const {Router} = require('express');
const router = Router();
const {getAllRecipes, searchById} = require('../controllers/recipes');
const {Recipe} = require('../db');

module.exports = router.get('/', async (req, res, next) => {
    const {name} = req.query;
    try {
        let allRecipes = await getAllRecipes();
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
});

module.exports = router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        if (id) {
            let recipe = await searchById(id);
            const recipeId = await Recipe.filter(r => r.id === id);
            recipeId.length ? res.status(200).send(recipe) : res.status(404).send('Recipe not found');
        } else {
            res.send('Please, enter id');
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router.post('/', async (req, res, next) => { // esta bien?
    const {title, description, ingredients, steps, image} = req.body;
    try {
        let newRecipe = await Recipe.create({
            title,
            description,
            ingredients,
            steps,
            image});
        res.status(201).send(newRecipe);
    } catch (e) {
        next(e);
    }
});