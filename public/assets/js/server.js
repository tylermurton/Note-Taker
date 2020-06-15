const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 8080;

let notesData = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../../public")));

app.get("/api/notes", function(err, res) {
    try {
        notesData = fs.readFileSync("../../../db/db.json", "utf8");
        notesData = JSON.parse(notesData);
    } catch (err) {
        console.log("\n error (in app.get.catch):");
        console.log(err);
    }
    // send objects to the browswer
    res.json(notesData);
});

//write the new note to the json file
app.post("/api/notes", function(req, res) {
    try {
        notesData = fs.readFileSync("../../../db/db.json", "utf8");
        console.log(notesData);

        //parse data to get array of objects
        notesData = JSON.parse(notesData);
        //set new note's id
        req.body.id = notesData.length;
        //add new note to array of note objects
        notesData.push(req.body);
        //stringify so you can write it to file
        notesData = JSON.stringify(notesData);
        //writes new note to file
        fs.writeFile("../../../db/db.json", notesData, "utf8", function(err) {
            if (err) throw err;
        });
        // revert back to array of objects & send back to browser
        res.send(JSON.parse(notesData));
    } catch (err) {
        throw err;
        console.log(err);
    }
});

app.delete("/api/notes/:id", function(req, res) {
    try {
        notesData = fs.readFileSync("../../../db/db.json", "utf8");

        //parse data to get array of objects
        notesData = JSON.parse(notesData);
        //delete old note from array
        notesData = notesData.filter(function(note) {
            return note.id != req.params.id;
        });
        //stringify so you can write it to file
        notesData = JSON.stringify(notesData);
        //writes new note to file
        fs.writeFile("../../../db/db.json", notesData, "utf8", function(err) {
            if (err) throw err;
        });
        // revert back to array of objects & send back to browser
        res.send(JSON.parse(notesData));
    } catch (err) {
        throw err;
        console.log(err);
    }
});

// HTML GET REQUESTS
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../../notes.html"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"))
});

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "../../../db/db.json"));
});


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});