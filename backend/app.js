const express = require('express')
const mongoose = require('mongoose')

const app = express()

// connect mongodb
mongoose.connect("mongodb://127.0.0.1:27017/notes")
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err))

app.get("/", (req, res) => {
    res.send("Hello, Express + MongoDB!")
})


const port = 8000;
app.listen(8000, () => {
    console.log(`Server running on ${port}`)
})
 