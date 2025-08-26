const System = require("../models/SystemState"); // ton modèle mongoose

// Récupérer l'état du système
exports.getSystemState = async (req, res) => {
  try {
    const state = await System.findOne();
    if (!state) {
      const newState = await System.create({ isActive: false });
      return res.json(newState);
    }
    res.json(state);
  } catch (error) {
    console.error("Erreur getSystemState:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Mettre à jour l'état du système
exports.updateSystemState = async (req, res) => {
  try {
    const { isActive } = req.body;
    let state = await System.findOne();
    if (!state) {
      state = await System.create({ isActive: isActive || false });
    } else {
      state.isActive = isActive;
      await state.save();
    }
    res.json(state);
  } catch (error) {
    console.error("Erreur updateSystemState:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
