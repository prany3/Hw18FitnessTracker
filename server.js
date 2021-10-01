const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://PranyMongoD:rootroot@cluster0.siqmt.mongodb.net/FitnessTracker?retryWrites=true&w=majority", { useNewUrlParser: true },
function(error) {
    if (error) {
        console.log(error)
    }
    console.log("connection successfull")
}
);
app.use(require("./routes/api-routes.js"))
// Route to exercises
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/exercise.html'));
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
