//Dependencies
var express = require("express");
var path = require("path");
var fs= require("fs");
const { json } = require("body-parser");

//Sets up express app
var app = express();
var PORT = 3000;

//Sets up express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"))


//HTML Routes

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});


// Displays all notes
app.get("/api/notes", function(req, res) {
    console.log("inside api/notes");
    fs.readFile("./db/db.json", "utf8",function(err,data){
        if(err){
            return console.log(err);
        }
        var myData= JSON.parse(data)
        console.log(myData);
       return res.json(myData)
    });
  });


// Create New Notes - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;


    newNote.id=1

    console.log(newNote);

    fs.readFile("./db/db.json", "utf8",function(err,data){
        if(err){
            return console.log(err);
        }
        var readFromDb= JSON.parse(data)
        readFromDb.push(newNote)
        fs.writeFile("./db/db.json", JSON.stringify(readFromDb),function(error){
            if (error) throw error
            res.json(true)
        });
    });
  
  });


//in progress

app.delete("/api/notes/:id", function(req, res){

    fs.readFile("./db/db.json", "utf8",function(err, data){
        const id = req.params.id;
        const notes = req.body;
        notes.deleteNotes(id)
        .then(() => res.json({success: true}));

    });
});

//in progress end


app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"))
    });
//server listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
