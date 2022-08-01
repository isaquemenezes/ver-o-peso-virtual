const express = require('express');
const app = express();
const { engine } = require ('express-handlebars');
const  mysql  = require('mysql2');
const body_parser = require ('body-parser');


const urlEncodeParser=body_parser.urlencoded({extended:false});

//Link de arquivos externos
app.use("/css", express.static('css'));
app.use("/js", express.static('js'));
app.use("/images", express.static('images'));

//Conexao db
const sql=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:3306
});
// sql.query("use vp-virtual");

// Definir o motor de visualização para usar, neste caso 
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');


//Routes Home 
app.get('/', function (req, res) {
    res.render('index');
});

//Login
app.get('/login', function (req, res) {
    res.render('login');
});

// Criar Um Novo Registro
app.get('/inserir', function (req, res) {
    res.render('inserir');
});
app.post("/controllerForm", urlEncodeParser, function (req, res){
    console.log(req.body.name);
})

module.exports = app;