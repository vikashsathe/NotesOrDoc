const express = require("express")
const bodyParser = require("body-parser")
const connectDB = require("./config/db")   // ✅ correct path
const cors = require("cors")

const app = express()   // <-- first create app

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// connect database
connectDB()

// routes

const notesRoutes = require("./routes/notesRoutes"); // ✅ add notes route
app.use("/api/notes", notesRoutes); // ✅ mount here

// routes
const authRoutes = require("./routes/authRoutes")
app.use("/auth", authRoutes)

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000")
})




