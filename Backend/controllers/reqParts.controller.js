const { sendProductDetailsEmailToCompany } = require("../config/email");

const sendProductInfoController = async (req, res) => {
  try {
    const { email, productCode, productName, modelCode, modelName } = req.body;

    if (!(email && productCode && productName && modelCode && modelName)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await sendProductDetailsEmailToCompany(
      email,
      productCode,
      productName,
      modelCode,
      modelName
    );

    res
      .status(200)
      .json({ message: "Product details sent to the company successfully" });
  } catch (error) {
    console.error("Error sending product info:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { sendProductInfoController };
