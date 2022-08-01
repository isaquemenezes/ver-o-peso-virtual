
const express = require('express');
const app = express();
const { engine } = require ('express-handlebars');

//Link de arquivos externos
app.use("/css", express.static('css'));
app.use("/js", express.static('js'));
app.use("/images", express.static('images'));

app.engine('handlebars', engine());
// Definir o motor de visualização para usar, neste caso 
app.set('view engine', 'handlebars');
app.set("views", "./views/");


//Routes
app.get('/', function (req, res) {
    res.render('index');
});

// Criar Um Novo Registro
app.get('/register', function (req, res) {
    res.render('register');
});

module.exports = app;