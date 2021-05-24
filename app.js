const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();
const port = 7000;

mongoose.connect('mongodb://localhost/prathamdb', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



mongoose.connection.once('open', function() {
    console.log('connection has been established to database');
}).on('error', function(error) {
    console.log('error is: ' + error);
});


var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

var user = mongoose.model('user', userSchema);

var admin = new user({
    name: "Medha",
    email: "medhasharma@gmail.com",
    phone: "+91 2234 72118",
    message: "hello world"
});

admin.save(function(err, admin) {
    if (err) return console.log(err);
    console.log(admin.username);
});



app.use(express.static("public"));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));

app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render("aboutus");
});
app.get('/gallery', (req, res) => {
    res.render("gallary");
});

app.get('/contactus', (req, res) => {
    res.render("contactus", { message: "Contact Us" });
});

app.post('/contactus', urlencodedParser, async(req, res) => {
    var registerUser = new user({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
    });

    registerUser.save();
    res.render("contactus", { message: "Successfully registered!" });
});


app.get('/form', (req, res) => {
    res.render("form");
});

app.get('/programs', (req, res) => {
    res.render("programs");
});

app.get('/vocationaltraining', (req, res) => {
    res.render("vocationaltraining");
});

app.get('/vulnerable', (req, res) => {
    res.render("vunrable");
});

app.get('/homepage', (req, res) => {
    res.render("homepage");
});
app.listen(port, () => { console.log(`listening on port ${port}`) });