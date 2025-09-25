const { json } = require("express");
const Part = require("../models/parts.model");
const mongoose = require("mongoose");
const Project = require("../models/project.model");

module.exports.getAllParts = async (req, res) => {
  try {
    const data = await Part.find();

    if (data.length === 0) {
      return res.status(404).json({ message: "Data Not Found" });
    }

    return res.status(200).json({ Parts: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

module.exports.searchByVinNo = async (req, res) => {
  try {
    const { spn } = req.query;

    console.log(spn);
    const data = await Project.find({ spn });
    console.log(data);
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No parts found for the provided SPN" });
    }

    res.status(200).json({ Parts: data });
  } catch (error) {
    console.error("Error searching by VIN:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.searchParts = async (req, res) => {
  try {
    const { product_name, model_name, part_no } = req.query;

    // Case 1: Search by part_no → return only image
    console.log(part_no);
    if (part_no) {
      const part = await Project.findOne({ part_no: part_no });
      if (!part) {
        return res
          .status(404)
          .json({ message: "No part found for the given part_no." });
      }
      return res.status(200).json({ img_link: part.img_link, part_no });
    }

    // Case 2: Search by product_name (company) and/or model_name (projectName)
    const match = {};
    if (product_name) {
      match["projects.company"] = product_name.trim(); // trim removes extra spaces
    }
    if (model_name) {
      match["projects.projectName"] = model_name.trim();
    }

    const parts = await Project.aggregate([
      { $unwind: "$projects" },
      { $match: match },
      {
        $project: {
          _id: 0,
          projectNo: "$projects.projectNo",
          projectName: "$projects.projectName",
          company: "$projects.company",
        },
      },
    ]);

    console.log(parts);

    if (parts.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found for the given criteria." });
    }

    res.status(200).json({ projects: parts });
  } catch (error) {
    console.error("Error searching parts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
