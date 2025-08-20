const mainConnection = require("../config/db_status"); // ton fichier de connexion
const System = require("../models/SystemState")(mainConnection.mainConnection);

const getSystemState = async (req, res) => {
  try {
    let system = await System.findOne();
    if (!system) {
      system = await System.create({ isActive: false });
    }
    res.json(system);
  } catch (error) {
    console.error("Erreur getSystemState:", error.message);
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
