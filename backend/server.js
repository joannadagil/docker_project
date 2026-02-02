<<<<<<< HEAD
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

const {
  DB_HOST = "db",
  DB_USER = "appuser",
  DB_PASSWORD = "apppass",
  DB_NAME = "appdb",
} = process.env;

let pool;

async function initDb() {
  pool = await mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  // tabela na start (mega proste)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      content VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/messages", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM messages ORDER BY id DESC");
  res.json(rows);
});

app.post("/api/messages", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "content required" });
  await pool.query("INSERT INTO messages (content) VALUES (?)", [content]);
  res.json({ ok: true });
});

initDb()
  .then(() => {
    app.listen(3000, () => console.log("Backend listening on :3000"));
  })
  .catch((err) => {
    console.error("DB init error:", err);
    process.exit(1);
  });
=======
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

const {
  DB_HOST = "db",
  DB_USER = "appuser",
  DB_PASSWORD = "apppass",
  DB_NAME = "appdb",
} = process.env;

let pool;

async function initDb() {
  pool = await mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  // tabela na start (mega proste)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      content VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/messages", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM messages ORDER BY id DESC");
  res.json(rows);
});

app.post("/api/messages", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "content required" });
  await pool.query("INSERT INTO messages (content) VALUES (?)", [content]);
  res.json({ ok: true });
});

initDb()
  .then(() => {
    app.listen(3000, () => console.log("Backend listening on :3000"));
  })
  .catch((err) => {
    console.error("DB init error:", err);
    process.exit(1);
  });
>>>>>>> 647af2f57c172eeab85121d792712fa2c9a5adc5
