const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // check if user exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send("Email already registered")
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // save new user
        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()

        res.status(201).send("User registered successfully")
    } catch (err) {
        res.status(500).send("Error: " + err.message)
    }
}


// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid password");

    // create JWT token
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      "your_jwt_secret",
      { expiresIn: "7d" }
    );

    // Send back token + user (without password)
    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};
