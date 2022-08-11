const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const mysql = require("mysql2");
const body_parser = require("body-parser");

const urlEncodeParser = body_parser.urlencoded({ extended: false });

//Link de arquivos externos
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/images", express.static("images"));

//Conexao db
const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "vp-virtual",
});

// Definir o motor de visualização para usar, neste caso
app.engine(
  "hbs", engine({
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

//Routes Home
app.get("/", function (req, res) {
  sql.query("select * from produto order by id asc",
            function (err, results, filelds) {
              res.render("index", { data: results });
            }
      );
});

//resgistrar-se como usuário 
app.get("/register", function (req, res) {
  res.render("register");
});
app.post("/controllerRegister", urlEncodeParser, function (req, res) {
  sql.query("INSERT INTO usuario values (?,?,?,?,?,?,?,?,?)", 
              [
                req.body.id,
                req.body.nome,
                req.body.fone,
                req.body.email,
                req.body.nome_barraca,
                req.body.localizacao_barraca,
                req.body.password,
                req.body.user,
                req.body.dateCreate,
              ]);
  res.render("controllerRegister");
});


// Inserir Produtos
app.get("/inserir-produto", function (req, res) {
  res.render("inserir-produto");
});

app.post("/controllerForm", urlEncodeParser, function (req, res) {
  sql.query("INSERT INTO produto values (?,?,?,?,?)", 
              [
                req.body.id,
                req.body.fk_nome_barraca,
                req.body.category,
                req.body.name,
                req.body.preco,
              ]);
            res.render("controllerForm", {
              categoria: req.body.category,
              nome: req.body.name,
              preco: req.body.preco,
            });
});

//Rota Select Um produto
app.get("/select/:id?", function (req, res) {
  
  // Casso tenha o id passado
  if (req.params.id) 
  {
    sql.query("select * from produto where id=?",[req.params.id],
              function (err, results, filelds) {
                res.render("select", { data: results });
              }
            );
  } else {
    sql.query("select * from produto order by id asc",
              function (err, results, filelds) {
                res.render("select", { data: results });
              }
            );
  }
});

//Rota Select By Categoria
app.get("/categoria/:categoria?", function (req, res) {
  sql.query("select * from produto where categoria=?", [req.params.categoria],
            function (err, results, filelds) 
            {
                res.render("categoria", { data: results });
            }
          );
});

//Rota del Para Produtos
app.get("/del/:id", function (req, res) {
  sql.query("delete from produto where id=?", [req.params.id]);
  res.render("del");
});

//Rota Update Para Produtos
app.get("/edit/:id", urlEncodeParser, function (req, res) {
  sql.query("select * from produto where id=?",[req.params.id],
              function (err, results, filelds) {
                res.render("edit", {
                  id: req.params.id,
                  fk_nome_barraca: results[0].fk_nome_barraca,
                  categoria: results[0].categoria,
                  nome: results[0].nome_produto,
                  preco: results[0].preco,
                });
              }
            );
});


app.post("/controllerEdit", urlEncodeParser, function (req, res) {
  sql.query("update produto set fk_nome_barraca=?, categoria=?, nome_produto=?, preco=? where id=?", 
              [
                req.body.fk_nome_barraca,
                req.body.category,
                req.body.nome,
                req.body.preco,
                req.body.id,
              ]);
              res.render("controllerEdit");
});



module.exports = app;
