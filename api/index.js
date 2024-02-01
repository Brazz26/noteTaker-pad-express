const router = require('express').Router();
const fs = require('fs');
const {v4:uuidv4} = require('uuid');

//retrieves saved notes from local storage and if there are none then returns the error
router.get('/notes', (req, res)=> {
    console.log('here')
    fs.readFile('./db/db.json', ( err, notes ) => {
        if(err) {
            throw err
        } else {
            let notesData = JSON.parse(notes)
            res.json(notesData)
        }
    })
});
//handles the save to local storage
router.post('/notes', (req, res) => {
    const notesData = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    notesData.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(notesData))
    res.json(notesData)
})
//handles the delete function
router.delete('/notes/:id', (req, res) => {
    let notes = fs.readFileSync('./db/db.json', 'utf-8')
    let notesData = JSON.parse(notes)
    let filteredNotes = notesData.filter((note) => {
        return note.id !== req.params.id
    })
    fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes))
    res.json({message: 'Note Deleted'})
})
module.exports = router;