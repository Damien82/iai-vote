// controllers/systemController.js

const getSystemState = async (req, res) => {
  try {
    const SystemState = require("../models/SystemState")(req.db_main); 
    // ⚠️ à adapter : req.db_main doit être ta connexion principale

    let systemState = await SystemState.findOne();
    if (!systemState) {
      systemState = await SystemState.create({ isActive: false });
    }

    res.json(systemState);
  } catch (error) {
    console.error("Erreur getSystemState:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const toggleSystemState = async (req, res) => {
  try {
    let system = await System.findOne();
    if (!system) {
      system = await System.create({ isActive: false });
    }

    system.isActive = !system.isActive;
    await system.save();

    res.json({ isActive: system.isActive });
  } catch (error) {
    console.error("Erreur toggleSystemState:", error.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = { getSystemState, toggleSystemState };
