const express = require('express');
const router = express.Router();
const nutritionistController = require('../../controllers/nutritionist/nutritionist');

router.post('/nutritionists', nutritionistController.createNutritionist);

router.get('/nutritionists', nutritionistController.getAllNutritionists);

router.get('/nutritionists/:id', nutritionistController.getNutritionistById);

router.put('/nutritionists/:id', nutritionistController.updateNutritionist);

router.delete('/nutritionists/:id', nutritionistController.deleteNutritionist);

module.exports = router;
