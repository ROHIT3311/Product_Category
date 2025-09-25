require("dotenv").config();

const htmlContentForRegisterMail = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <style>
        .email-container {
            font-family: Arial, sans-serif;
        }
        .header h1 {
            color: #333;
        }
        .content {
            margin: 20px 0;
        }
        .footer {
            font-size: 12px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Product Listing Page</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your login credentials have been created:</p>
            <p>Email ID : <strong>{{email}}</strong></p>
            <p>Password: <strong>{{password}}</strong></p>
            <p>Thank you,<br>ITSM Portal Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

const nodemailer = require("nodemailer");

const sendMailForRegister = async (email, password) => {
  const htmlWithDetails = htmlContentForRegisterMail
    .replace("{{email}}", email)
    .replace("{{password}}", password);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Product Listing" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Product Listing Portal Login Credentials",
      html: htmlWithDetails,
    });

    console.log("Registration email sent to", email);
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw new Error("Email delivery failed");
  }
};

const htmlContentForProductMail = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Product Submission</title>
    <style>
        .email-container {
            font-family: Arial, sans-serif;
        }
        .header h1 {
            color: #333;
        }
        .content {
            margin: 20px 0;
        }
        .footer {
            font-size: 12px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>New Product Submission</h1>
        </div>
        <div class="content">
            <p><strong>Submitted by:</strong> {{email}}</p>
            <p><strong>Product Code:</strong> {{productCode}}</p>
            <p><strong>Product Name:</strong> {{productName}}</p>
            <p><strong>Model Code:</strong> {{modelCode}}</p>
            <p><strong>Model Name:</strong> {{modelName}}</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

const sendProductDetailsEmailToCompany = async (
  submitterEmail,
  productCode,
  productName,
  modelCode,
  modelName
) => {
  const htmlWithDetails = htmlContentForProductMail
    .replace("{{email}}", submitterEmail)
    .replace("{{productCode}}", productCode)
    .replace("{{productName}}", productName)
    .replace("{{modelCode}}", modelCode)
    .replace("{{modelName}}", modelName);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // sender
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: submitterEmail,
      to: process.env.COMPANY_EMAIL,
      subject: "New Product Submission from User",
      replyTo: submitterEmail, // reply will go directly to the submitter
      html: htmlWithDetails,
    });

    console.log("Product submission email sent to company");
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw new Error("Email delivery failed");
  }
};

module.exports = { sendMailForRegister, sendProductDetailsEmailToCompany };
