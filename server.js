
// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email transporter config (Use your email and app password or SMTP service)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "@gmail.co",      // Replace with your sender email
    pass: "your-app-password"          // Use App Password (not your email password)
  }
});

// POST /place-order
app.post("/place-order", (req, res) => {
  const { buyer, product } = req.body;

  if (!buyer || !product) {
    return res.status(400).json({ error: "Missing buyer or product data" });
  }

  const toEmails = ["delhfast@gmail.com", product.seller]; // Admin + seller

  const htmlBody = `
    <h2>Order Confirmation - Delh Fast</h2>
    <p><strong>Buyer Name:</strong> ${buyer.name}</p>
    <p><strong>Email:</strong> ${buyer.email}</p>
    <p><strong>Phone:</strong> ${buyer.phone}</p>
    <p><strong>Address:</strong> ${buyer.address}</p>
    <hr>
    <p><strong>Product:</strong> ${product.name}</p>
    <p><strong>Price:</strong> ₹${product.price}</p>
    <p><strong>MRP:</strong> ₹${product.mrp}</p>
    <p><strong>Discount:</strong> ${product.discount}% OFF</p>
    <p><strong>Description:</strong> ${product.desc}</p>
  `;

  const mailOptions = {
    from: "your-email@gmail.com", // Replace with your sender email
    to: toEmails.join(","),
    subject: `Order Placed: ${product.name}`,
    html: htmlBody
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent:", info.response);
      return res.status(200).json({ message: "Order placed and email sent!" });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
