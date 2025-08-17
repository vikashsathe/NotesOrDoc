const User = require("../models/User")
const bcrypt = require("bcrypt")

// Register
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // check if user exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send("❌ Email already registered")
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // save new user
        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()

        res.status(201).send("✅ User registered successfully")
    } catch (err) {
        res.status(500).send("❌ Error: " + err.message)
    }
}

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send("❌ User not found")
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send("❌ Invalid password")
        }

        res.send("✅ Login successful")
    } catch (err) {
        res.status(500).send("❌ Error: " + err.message)
    }
}
