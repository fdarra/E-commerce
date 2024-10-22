const express = require("express");
const cors = require("cors");
const app = express();

const productRouter = require("./routes/productRouter");

app.use(express.json());

require("dotenv").config();

const PORT = process.env.PORT || 7000;

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`⚡⚡⚡ Server is running on http://127.0.0.1:${PORT}`);
});

const connectDB = require("./config/connectDB");
connectDB();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});




// products routes
app.use("/api/product", productRouter );

// // Auth routes
 app.use('/api/auth', require('./routes/authRoutes'))

// // User routes
app.use('/api/users', require('./routes/userRoutes'))
