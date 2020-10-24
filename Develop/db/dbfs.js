const fs = require("fs");
const util = require('util');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class store {
    read(){
        readFileAsync('db/db.json', 'UTF-8');

    };

    write(note){
        writeFileAsync('db/db.json', JSON.stringify(note));
    };


    getnotes(){
        this.read().then(function(data){
            var storednotes;

            storednotes = [].concat(JSON.parse(data));

        })

        return storednotes
    }

    addNotes(){

            const {title , text} = notes;

            notes = {title , text, id: }

           return this.write(...note, notes);
    }

}