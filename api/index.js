const router = require('express').Router();
const fs = require('fs');
const {v4:uuidv4} = require('uuid');

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

module.exports = router;