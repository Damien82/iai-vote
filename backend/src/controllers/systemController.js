const SystemModel = require("../models/SystemState");

// === GET: récupérer l'état du système ===
exports.getSystemState = async (req, res) => {
  try {
    const state = await SystemModel.findOne();
    res.json(state || { isActive: false });
  } catch (error) {
    console.error("Erreur getSystemState:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// === POST: mettre à jour l'état du système ===
exports.setSystemState = async (req, res) => {
  try {
    const { isActive } = req.body;
    let state = await SystemModel.findOne();

    if (!state) {
      state = new SystemModel({ isActive });
    } else {
      state.isActive = isActive;
    }

    await state.save();
    res.json(state);
  } catch (error) {
    console.error("Erreur setSystemState:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
