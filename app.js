var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/CrudDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
      console.log('MongoDB Connection Succeeded.');
    } else {
      console.log('Error in DB connection : ' + err);
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));
app.set('views', path.join(__dirname, '/views/crud'));
app.set('view engine', 'ejs');

// app.get("/", (req, res) => {
//   res.render("list");
// });

const crudRoute = require('./routes/crudRoute');

app.use('/', crudRoute);








app.listen(3000);