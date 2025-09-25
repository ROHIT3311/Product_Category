const mongoose = require("mongoose");

const partSchema = new mongoose.Schema(
  {
    spn: {
      required: true,
      type: String,
    },
    model_name: {
      required: true,
      type: String,
    },
    model_year: {
      required: true,
      type: String,
    },
    model_code: {
      required: true,
      type: String,
    },
    product_code: {
      required: true,
      type: String,
    },
    color: {
      required: true,
      type: String,
    },
    image_url: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Part = mongoose.model("part", partSchema);
module.exports = Part;
