console.log('Starting json.js');
const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

var addNote = (title,body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    
    var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var removeNotes = (title) => {
    //fetch notes
    var notes = fetchNotes();
    //fiter notes
    var filteredNotes = notes.filter((note) => note.title !== title);
    //save new notes array
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length; 
}

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
}

var getAll = () => {
    return fetchNotes();
}

var logNote = (note) => {
    console.log('-----');
    console.log(`The title is : ${note.title}`);
    console.log(`The body is : ${note.body}`);
}

module.exports = {
    addNote,
    removeNotes,
    getNote,
    getAll,
    logNote
};