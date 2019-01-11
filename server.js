
var express = require("express");
var session = require('express-session')
var path = require("path");

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}))

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  if (req.session.timesViewed){
    req.session.timesViewed ++
  } else {
    req.session.timesViewed = 1;
  }

  let data = {
    timesViewed: req.session.timesViewed
  }
  res.render("index", { data: data });
})

app.get('/plusTwo', (req, res) =>{
  req.session.timesViewed += 1

  let data = {
    timesViewed: req.session.timesViewed
  }
  res.redirect("/");
})

app.get('/reset', (req, res) => {
  req.session.timesViewed = 1

  let data = {
    timesViewed: req.session.timesViewed
  }
  res.render("index", { data: data });
})

app.listen(8000, function () {
  console.log("listening on port 8000");
});