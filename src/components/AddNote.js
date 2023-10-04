import React, {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";


function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title : "", description : "", tag : "Default"});

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title : "", description : "", tag : note.tag})
        props.feedSetAlert("Note Added Successfully" , "success");

    }

    const handelOnchange = (e) => {
        setNote({...note, [e.target.name] : e.target.value});
    }
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            placeholder=""
            onChange={handelOnchange}
            name="title"
            required
            minLength={5}
            value={note.title}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control "
            id="description"
            placeholder=""
            onChange={handelOnchange}
            name="description"
            required
            minLength={10}
            value={note.description}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control "
            id="tag"
            placeholder=""
            onChange={handelOnchange}
            name="tag"
            value={note.tag === "Default" ? "" : note.tag}
          />
        </div>

        <button disabled={note.title.length <5 || note.description.length<10} type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNote;
