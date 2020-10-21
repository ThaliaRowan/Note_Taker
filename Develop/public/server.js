var http = require('http');
var path = require('path');
var express = require('express');

var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname, "index.html"));
  });

  
app.get("/notes", function(req, res) {
  
  res.sendFile(path.join(__dirname, "notes.html"));
});

  

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  