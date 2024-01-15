const Nutritionist = require('../../models/nutritionist/nutritionist');

exports.createNutritionist = async (req, res) => {
  const newNutritionist = new Nutritionist(req.body);
  try {
    const savedNutritionist = await newNutritionist.save();
    res.status(201).json(savedNutritionist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllNutritionists = async (req, res) => {
  try {
    const nutritionists = await Nutritionist.findAll();
    res.json(nutritionists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNutritionistById = async (req, res) => {
  try {
    const nutritionist = await Nutritionist.findById(req.params.id);
    if (!nutritionist) {
      return res.status(404).json({ message: 'Nutritionist not found' });
    }
    res.json(nutritionist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNutritionist = async (req, res) => {
  const updatedNutritionist = new Nutritionist(req.body);
  updatedNutritionist.data._id = req.params.id;

  try {
    const success = await updatedNutritionist.update();
    if (!success) {
      return res.status(404).json({ message: 'Nutritionist not found' });
    }
    res.json(updatedNutritionist.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNutritionist = async (req, res) => {
  try {
    const success = await Nutritionist.deleteById(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Nutritionist not found' });
    }
    res.json({ message: 'Nutritionist deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
