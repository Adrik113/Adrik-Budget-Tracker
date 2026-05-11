const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

const expensesRouter = require("./routes/expenses");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expensesRouter);

app.get("/api/health", (req, res) => {
    res.json({
        status:  "Backend running"
    });
});

const PORT = 8000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});