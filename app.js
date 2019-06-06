const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');
const notes = require('./json.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note' , {
        title : titleOptions,
        body : bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title : titleOptions,
    })
    .command('remove', 'Remove a note', {
        title : titleOptions
    })
    .help()
    .argv;

var command = process.argv[2];
console.log('Command: ',command);
console.log(yargs.argv);

if (command === 'add'){
    console.log("Adding Note");
    var note = notes.addNote(argv.title , argv.body);
    if(note){
        console.log("Note created");
        console.log('-----');
        console.log(`The title is : ${note.title}`);
        console.log(`The body is : ${note.body}`);
    }
    else{
        console.log("No title taken");
    }
}
else if (command === 'read'){
    var note = notes.getNote(argv.title);
    if (note) {
        console.log("Note found");
        console.log('-----');
        console.log(`The title is : ${note.title}`);
        console.log(`The body is : ${note.body}`);
    } else {
        console.log("Note not found");
    }
}
else if (command === 'remove'){
    var noteRemove = notes.removeNotes(argv.title);
    var message = noteRemove ? `Note : ${argv.title} is removed` : 'Note not found';
    console.log(message);
}
else if(command === "list"){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes`);
    allNotes.forEach((note) => notes.logNote(note));
}
else {
    console.log("Command not recognized");
}