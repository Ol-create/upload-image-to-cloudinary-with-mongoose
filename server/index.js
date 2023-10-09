const express = require("express");
const mongoose = require("mongoose")
const imageRouter = require("./routes/upload")

const app = express()
app.use("/api/images", imageRouter);
app.use(express.json());
const port = process.env.PORT || 9000

// Create connection to MongoDB Database
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("App is connected to MongoDB Server"))
    .catch((ex) => console.log("Unable to connect to MongoDB Server", ex))

//Create server
app.listen(port, () => console.log(`App running on Port: ${port}`))
