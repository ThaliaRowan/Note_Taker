
var path = require("path");
const fs = require("fs");
const util = require("util");
const dbjson  = require("./db/db.json");

var express = require("express");
const { json } = require("express");
var app = express();

app.use(express.static("public"));

const PORT = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }));


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

app.get("/", function(req, res) {

res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function (req, res) {
 
  readFileAsync(__dirname + './db/db.json', function(err, data){
    if(err){
      throw err;
    } 
  })
  res.json(dbjson)
  });


app.post("/api/notes", function(req, res){
  var newNote = req.body;

  function addNotes(notes){
    dbjson.push(notes);
    for(let i=0; i < dbjson.length; i++){
      dbjson[i].id = i;
    }
    return JSON.stringify(dbjson);
  }
  writeFileAsync(__dirname + "/db/db.json", addNotes(newNote), function(err, res){
    if(err){
      throw err;
    }
  })
  res.json(dbjson);
  });
  

app.delete("/api/notes/:id", function(req, res){
 var noteId = req.params.id;

 dbjson.splice(noteId,1);

 for(let i =0; i<dbjson.length; i++){
   dbjson[i].id = i;
 }
 writeFileAsync(__dirname + "./db/db.json", JSON.stringify(dbjson), function(err){
   if(err){
     throw err;
   }
 })
 res.json(dbjson);
})


app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
