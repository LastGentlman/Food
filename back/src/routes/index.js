const {Router} = require('express');

const router = Router();

const recipesRoute = require('./recipes');
const typesDietRoute = require('./typesDiets');

router.use('/recipes', recipesRoute);
router.use('/types', typesDietRoute);

module.exports = router;