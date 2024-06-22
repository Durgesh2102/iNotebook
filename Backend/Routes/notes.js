const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const fetchuser = require('../midelware/Fetchuser')
const { body, validationResult } = require('express-validator');
const { findOne, findByIdAndUpdate } = require('../models/User');
//get all notes 
router.get('/featchAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })  //getting the notes from the corrsoponding user id 
        res.send(notes)
    } catch (error) {
        console.error(error);
        res.status(500).send("internal server error")
    }
})

//adding the notes 

router.post('/Addnote', [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })
], fetchuser, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, color,Archive } = req.body;
        const note = new Note({
            title, description, color, user: req.user.id, Archive
        })
        const saveNote = await note.save();
        res.json(saveNote)
    }
    catch (error) {
        console.error(error);
        res.status(500).send("internal server error")
    }
})
//update the notes 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {


        const { title, description,Archive } = req.body;
        //create new note object 
        const newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (Archive) { newNote.Archive = Archive };

        let notes = await Note.findById(req.params.id);         //make shoure when your use wait so use ler varable 
        if (!notes) { return res.status(404).send("not found") }

        if (notes.user.toString() !== req.user.id)   //this is for the user whos is trying to update the notes it is this user or anather user 
        {                                          // notes.user means in databse we store the notes with user key and compare with user id 
            return res.status(401).send("not allowed")// which coming from the http request for updating the notes 
        }

        notes = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }) // new true is object it is used for when new contact is commig then it wil create 
        res.json({ notes })
    } catch (error) {
        console.error(error);
        res.status(500).send("internal server error")
    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let notes = await Note.findById(req.params.id);         //make shoure when your use wait so use ler varable 
        if (!notes) { return res.status(404).send("not found") }

        if (notes.user.toString() !== req.user.id)   //this is for the user whos is trying to delete the notes it is this user or anather user 
        {                                            // notes.user means in databse we store the notes with user key and compare with user id 
            return res.status(401).send("not allowed")// which coming from the http request for deleting the notes 
        }

        notes = await Note.findByIdAndDelete(req.params.id) 
        res.json({ "status":"sucessfully delete " })
    } catch (error) {
        console.error(error);
        res.status(500).send("internal server error")
    }

})
module.exports = router
