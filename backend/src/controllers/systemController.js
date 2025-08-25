const System = require("../models/SystemState");

// GET system state
exports.getSystemState = async (req, res) => {
  try {
    const SystemModel = System(req.db_status); // <--- Connexion injectée
    const state = await SystemModel.findOne();
    res.json(state || { isActive: false });
  } catch (error) {
    console.error("Erreur getSystemState:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// UPDATE system state
exports.updateSystemState = async (req, res) => {
  try {
    const { isActive } = req.body;
    const SystemModel = System(req.db_status);

    let state = await SystemModel.findOne();
    if (!state) {
      state = new SystemModel({ isActive });
    } else {
      state.isActive = isActive;
    }

    await state.save();
    res.json(state);
  } catch (error) {
    console.error("Erreur updateSystemState:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
