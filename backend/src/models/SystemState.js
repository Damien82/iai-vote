module.exports = (db_status) => {
  if (db_status.models.status) {
    return db_status.models.status;
  }

  const mongoose = require("mongoose");

  const SystemSchema = new mongoose.Schema({
    isActive: { type: Boolean, default: false },
  });

  return db_status.model("Admins", SystemSchema);
};

