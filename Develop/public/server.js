var http = require('http');
var path = require('path');
const fs = require("fs");
const util = require('util');
const uuidv1 = require('uuidv1');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


var express = require('express');

var app = express();
var PORT = process.env.PORT || 3006;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


function readnotes() {
  return readFileAsync(__dirname + '/db/db.json');

};

function write(note){
  return writeFileAsync('/db/db.json', JSON.stringify(note));
} 


function getNotes(){
readnotes().then(function(notes){

  let parsedNotes;

  parsedNotes = [].concat(JSON.parse(notes));

  return parsedNotes;
})

}
function addnotes(){
  
  const {title , text} = notes;

  const newNotes = {title, text, id: uuidv1()}

 return getNotes().then((notes) => [...notes, newNotes ])
 .then((updatedNotes) => write(updatedNotes))
 .then(() => newNotes); 
};

function removeNotes(id){

  return getNotes().then((notes) => notes.filter((note) => note.id != id))
  .then((filterednotes) => this.write(filterednotes));
}

app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname, "index.html"));
  });

  
app.get("/notes", function(req, res) {
  
  res.sendFile(path.join(__dirname, "notes.html"));
});


app.get("/api/notes", function(req, res){
  getNotes().then(function(notes){
    res.json(notes);
  });
})
  
app.post("/api/notes", function(req, res){
  
  addnotes(req.body).then(function(note){
    res.json(note);
  });
  
})

app.delete("/notes/:id", function(req, res){
  removeNotes(req.params.id).then(function(){
    res.json({ok: true});
  })
})

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  