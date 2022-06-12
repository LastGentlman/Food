const {Router} = require('express');
const router = Router();
const {Diet} = require('../db');

router.get('/', async (req, res, next) => {
    try {
        let dietDb = await Diet.findAll();
        if (dietDb.length) {
            res.status(200).send(dietDb);
        } else {
            res.status(404).send('Diet not found');
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;