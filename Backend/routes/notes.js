const express = require("express");
require('dotenv').config()
const { body, validationResult } = require("express-validator");

const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");
const Notes = require("../models/Notes");

router.get("/fetchallnotes", AuthMiddleware, async (req, res) => {
  try {
    const notes = await Notes.find({user :req.user.id});
    res.status(200).json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/addnotes",
  AuthMiddleware,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast of 10 character").isLength(
      { min: 10 }
    ),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      const { title, description, tag } = req.body;
      const Note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await Note.save();
      res.json(savedNotes);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put('/updatenotes/:id' ,
  AuthMiddleware ,
   async(req, res) => {
    
    try {
      const notesId = req.params.id;
      const {title , description , tag} = req.body;
      const newNote ={};
      if(title) {newNote.title = title};
      if(description ) {newNote.description = description};
      if(tag) {newNote.tag = tag};

      let note = await Notes.findById(notesId);
      if(!note) {
        return res.status(404).send("Not Found");
      }

      if(req.user.id !== note.user.toString()){
        return res.status(401).send("Not Found");
      }

      note = await Notes.findByIdAndUpdate(notesId, {$set : newNote}, {new : true});

      res.json(note);

    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }

});

router.delete('/deletenotes/:id' , AuthMiddleware , async(req, res) => {
  try {
    const notesId = req.params.id;
    let note = await Notes.findById(notesId);
      if(!note) {
        return res.status(404).send("Not Found");
      }

      if(req.user.id !== note.user.toString()){
        return res.status(401).send("Not Found");
      }

      const deletedNotes = await Notes.findByIdAndDelete(notesId);
      res.json({"success" : "note has been deleted" , note: deletedNotes});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
