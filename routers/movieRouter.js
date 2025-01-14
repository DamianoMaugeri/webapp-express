const express = require('express');

const router = express.Router();

const movieController = require('../controllers/movieController.js');

// index
router.get('/', movieController.index);

//show
router.get('/:id', movieController.show);

//post
router.post('/:id/reviews', movieController.storeReview)




module.exports = router


