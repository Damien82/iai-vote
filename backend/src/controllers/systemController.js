// controllers/systemController.js
const SystemStateModel = require("../models/SystemState");

exports.getSystemState = async (req, res) => {
  try {
    const SystemState = SystemStateModel(req.status); // tu passes ta connexion
    let state = await SystemState.findOne();

    if (!state) {
      state = await SystemState.create({ isActive: false });
    }

    res.json(state);
  } catch (err) {
    console.error("Erreur getSystemState:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.toggleSystemState = async (req, res) => {
  try {
    const SystemState = SystemStateModel(req.db_status);
    let state = await SystemState.findOne();

    if (!state) {
      state = await SystemState.create({ isActive: false });
    }

    state.isActive = req.body.isActive;
    state.updatedAt = Date.now();
    await state.save();

    res.json({ success: true, state });
  } catch (err) {
    console.error("Erreur toggleSystemState:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
