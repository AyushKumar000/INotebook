import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const url = "http://localhost:5000/api/notes";
  const notesInitial = [];


  const [notes, setNotes] = useState(notesInitial);

  const fetchNotes = async () => {
    const response = await fetch(`${url}/fetchallnotes`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${url}/addnotes`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };

  const editNote = async(id, title, description, tag) => {
    const response = await fetch(`${url}/updatenotes/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag})
    });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${url}/deletenotes/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    fetchNotes();
    // setNotes(newNote);
  };
  return (
    <noteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, fetchNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
