const mongoose = require("mongoose");

const userIdSchema = new mongoose.Schema(
  {
    pid: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserId = mongoose.model("UserId", userIdSchema, "userIds");

module.exports = UserId;
