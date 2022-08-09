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
    port:3306,
    database: "vp-virtual"
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

//resgistrar-se
app.get('/register', function (req, res) {
    res.render('register');
});
app.post("/controllerRegister", urlEncodeParser, function (req, res){
    sql.query( "INSERT INTO usuario values (?,?,?,?,?,?,?)",
                [
                    req.body.id,
                    req.body.nome,
                    req.body.fone,            
                    req.body.email,
                    req.body.password,
                    req.body.user,
                    req.body.dateCreate
                ]
            );
    res.render('controllerRegister');

});

// Criar Um Novo Registro
app.get('/inserir', function (req, res) {
    res.render('inserir');
});

app.post("/controllerForm", urlEncodeParser, function (req, res){
    sql.query( "INSERT INTO produtos values (?,?,?,?)",
                [
                    req.body.id,
                    req.body.category,
                    req.body.name,            
                    req.body.preco
                ]
            );
    res.render('controllerForm',{
        categoria:req.body.category,
        nome:req.body.name,
        preco:req.body.preco
    });

});

//Rota Select
app.get('/select/:id?', function(req, res) {
    
    // Casso tenha o id passado
    if (req.params.id) 
    {
        sql.query("select * from produtos where id=?",
                    [req.params.id] ,
                    function(err,results,filelds)
                    {
                        res.render('select', { data:results });
                    }
            );
       
    } else {
        sql.query("select * from produtos order by id asc", 
                    function(err,results,filelds)
                    {
                        res.render('select', { data:results });
                    }
            );
    }

});

//Rota del
app.get('/del/:id', function(req,res){
    sql.query("delete from produtos where id=?",
                [req.params.id]
            );
    res.render('del');
});

//Rota Update
app.get('/edit/:id', urlEncodeParser, function(req,res){
    sql.query("select * from produtos where id=?",
            [req.params.id], function(err,results,filelds){
                res.render('edit',{
                    id:req.params.id,
                    categoria:results[0].categoria,
                    nome:results[0].nome,
                    preco:results[0].preco

                });
            }

    );
});
app.post('/controllerEdit', urlEncodeParser, function (req,res) {
    sql.query("update produtos set categoria=?, nome=?, preco=? where id=?", [
        req.body.category,
        req.body.nome,
        req.body.preco,
        req.body.id
    ]);
    res.render('controllerEdit');
});

module.exports = app;