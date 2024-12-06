const express = require("express");
const bodyParser = require("body-parser");
const loginRoutes = require("./routes/loginRouter");
const chartRoutes = require("./routes/chartRouter");
const authenticateToken = require("./middleware/authMiddleware");
const cors = require("cors");
const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: "http://167.172.130.236",
    credentials: true,
  })
);

app.use(bodyParser.json());

// Set up routes
app.use("/api/auth", loginRoutes);
app.use("/api", chartRoutes);

app.get("/api/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Access to protected route granted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
