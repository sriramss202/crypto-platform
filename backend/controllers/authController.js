const bcrypt = require("bcryptjs");
const pool = require("../config/db");

const registerUser = async (req, res) => {
  try {
    const {
      email,
      phone,
      password,
      confirmPassword,
    } = req.body;

    // 1. Check fields
    if (!email || !phone || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Check passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // 3. Check existing email
    const existingEmail = await pool.query(
      "SELECT * FROM crypto_users WHERE email = $1",
      [email]
    );

    if (existingEmail.rows.length > 0) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // 4. Check existing phone
    const existingPhone = await pool.query(
      "SELECT * FROM crypto_users WHERE phone = $1",
      [phone]
    );

    if (existingPhone.rows.length > 0) {
      return res.status(400).json({
        message: "Phone number already registered",
      });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Store in PostgreSQL
    const result = await pool.query(
      `INSERT INTO crypto_users
       (email, phone, password)
       VALUES ($1, $2, $3)
       RETURNING user_id, email, phone, created_at`,
      [email, phone, hashedPassword]
    );

    // 7. Send response
    res.status(201).json({
      message: "Registration successful",
      user: result.rows[0],
    });

  } catch (error) {
    console.error("Registration error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  registerUser,
};