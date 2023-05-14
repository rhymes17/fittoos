const express = require("express");
const colors = require("colors");
const handleError = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conect the DB
connectDB();

//Auth Routes
app.use("/api/users/", require("./routes/authRoutes"));

//Transaction ROutes
app.use("/api/transaction", require("./routes/transactionRoutes"));

app.use("/api/category", require("./routes/categoryRoutes"));

app.get("/", (req, res) => {
  res.send("Working fittoos");
});

app.use(handleError);

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
