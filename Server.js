const express = require("express");
const mysql = require("mysql2");
const app = express();
const favicon = require("serve-favicon");
const path = require("path");
const serveStatic = require("serve-static");
const { resourceLimits } = require("worker_threads");
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Alphaignite",
  database: "ViktorDB",
  port: 3306,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the Database");
});

app.use(favicon(path.join(__dirname, "public", "images", "favicon.png")));

app.use((req, res, next) => {
  const now = new Date();
  const formattedtime = now.toISOString();
  console.log(`[${formattedtime}] ${req.method} ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "Index.html"));
// });

app.get("/platos", (req, res) => {
  const query = "SELECT * FROM tb_catalogo_pedidos";

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json("Error en la base de datos");
      return;
    }
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Type", "application/json");
    res.json(results);
  });
});

// app.get('/clientes', (req, res) => {
//     connection.query('SELECT * FROM tb_plato_pedido', (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

process.on("uncaughtException", function (err) {
  console.log("Error cogido: " + err);
});

app.listen(port, () => {
  console.log("Servidor API escuchando en el puerto 3000");
});
