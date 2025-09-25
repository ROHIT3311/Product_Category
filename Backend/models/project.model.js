const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  projectNo: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
});

const MainSchema = new mongoose.Schema({
  spn: {
    type: String,
    required: true,
    unique: true,
  },
  part_no: {
    type: String, // must be String because in DB it's stored as "12345"
    required: true,
  },
  img_link: {
    type: String,
    required: true,
  },
  projects: {
    type: [ProjectSchema],
    required: true,
  },
});

module.exports = mongoose.model("projects", MainSchema);
