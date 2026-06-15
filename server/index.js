const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL?.split(",") || ["http://localhost:5173"], credentials:true }));
app.use(express.json());

// ✅ Connect MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((er) => {
        console.log(`❌ DB Error: ${er}`);
    });

// ✅ Test root
app.get("/", (req, res) => {
    res.send("API running successfully 🚀");
});

// ✅ APIs
app.use("/uploads", express.static("uploads"));
app.use("/api/examinee", require("./routes/examineeRoute"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use('/api/session', require('./routes/sessionRoute'));
app.use('/api/subject', require('./routes/subjectRoute'));
app.use('/api/question', require('./routes/questionRoute'));
app.use('/api/exams', require('./routes/examinationRoute'));
app.use('/api/message', require('./routes/messageRoute'));
app.use('/api/dashboard', require('./routes/dashboardRoute'));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
