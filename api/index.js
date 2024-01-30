const router = require('express').Router();
const fs = require('fs');

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
})


module.exports = router;