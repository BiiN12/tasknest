import express from "express";
import pool from "./db.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());
// app.use(cors());
app.use("/api/auth", authRoutes);

app.get("/", async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  res.json(response.rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
