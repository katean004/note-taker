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

// Make get notes function...


// Create New Notes - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;

    //make id unique for each note here!! 
    //Could not figure out how to make unique id...Please Advise
    newNote.id;
    
    
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


//IN PROGRESS START

// function checkid(){
//     if(id === uniqueId){
//         readFromDb.splice(uniqueId, 1);
//         return readFromDb;
//     }
// }

// ***Please help look over where the app.delete went wrong i couldn't figure it out... 

// app.delete("/api/notes/:id", function(req, res){

//         fs.readFile("./db/db.json", "utf8",function(err, data){
//             readFromDb.filter(checkid);
//              readFromDb.deleteNotes(req.params.id)
//              .then(() => res.json({success: true}));
//         });

//         fs.writeFile("./db/db.json", JSON.stringify(readFromDb),function(error){
//             if (error) throw error
//             res.json(true)
//             });

// });

//IN PROGRESS END





app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"))
    });
//server listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


