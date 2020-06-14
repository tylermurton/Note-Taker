const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 8080;

app.post("/api/notes", function(req, res) {
    /////////////
});

app.delete("/api/notes/:id", function(req, res) {
    //receive query parameter containing id of note to delete......
});

// HTML GET REQUESTS
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../../notes.html"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"))
});

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "db/db.json"));
});


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});