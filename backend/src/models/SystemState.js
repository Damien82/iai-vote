// models/SystemState.js
module.exports = (db_status) => {
  if (db_status.models.status) {
    return db_status.models.status;
  }

  const mongoose = require("mongoose");

  const SystemStateSchema = new mongoose.Schema({
    isActive: { type: Boolean, default: false }, // false = OFF, true = ON
    updatedAt: { type: Date, default: Date.now }
  });

  return db_status.model("status", SystemStateSchema);
};
