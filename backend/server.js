require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.url);
    next();
});

const assetRoutes = require("./routes/assetRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
const locationRoutes = require("./routes/locationRoutes");
const divisionRoutes = require("./routes/divisionRoutes");
const statusRoutes = require("./routes/statusRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/employees", employeeRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/divisions", divisionRoutes);
app.use("/api/statuses", statusRoutes);
app.use("/api/auth", authRoutes);

app.get("/", async(req, res) => {

    try{

        await db.query("SELECT 1");

        res.json({
            success: true,
            message: "IT Asset Management API Running",
            database: "Connected"
        });
    }catch(error){

        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post("/test", (req, res) => {
    console.log("TEST BERHASIL");
    console.log(req.body);

    res.json({
        success: true,
        message: "Test OK"
    });
});