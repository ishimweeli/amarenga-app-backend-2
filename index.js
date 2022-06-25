const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); 
// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err)); 
// Middleware
app.use(express.json());
// Route
app.use('/ifs', require('./routes/amarenga'))
app.use('/ifs/user', require('./routes/user'))
app.use("/ifs/user", require('./routes/user'));
app.listen(process.env.PORT || 5000, () => console.log("Server is running"));