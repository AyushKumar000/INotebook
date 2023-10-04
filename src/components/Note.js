import React, { useState, useContext, useEffect , useRef} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Note(props) {
  let navigator = useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if(localStorage.getItem('token')){
    fetchNotes();
    }
    else
    navigator('/login');
    //eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({id: "", etitle : "", edescription : "", etag : ""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle :currentNote.title , edescription: currentNote.description, etag : currentNote.tag});
  }

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.feedSetAlert("Notes Updated Successfully" , "success");
  }

const handelOnchange = (e) => {
    setNote({...note, [e.target.name] : e.target.value});
}

  return (
    <>
      <AddNote feedSetAlert={props.feedSetAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
        <div className="form-group mb-3">
          <label htmlFor="etitle">Title</label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            aria-describedby="emailHelp"
            placeholder=""
            onChange={handelOnchange}
            name="etitle"
            value={note.etitle}
            required
            minLength={5}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="edescription">Description</label>
          <input
            type="text"
            className="form-control "
            id="edescription"
            placeholder=""
            onChange={handelOnchange}
            name="edescription"
            value={note.edescription}
            required
            minLength={10}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="etag">Tag</label>
          <input
            type="text"
            className="form-control "
            id="etag"
            placeholder=""
            onChange={handelOnchange}
            name="etag"
            value={note.etag}
          />
        </div>
      </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled = {note.etitle.length <5 || note.edescription.length<10} onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Note</h2>
        <div className="container ">
        {notes.length === 0 && "Add your first note.😊"}
        </div>
        {notes.map((note) => {
          return <Noteitem Key={note._id} notes={note} updateNote={updateNote} feedSetAlert={props.feedSetAlert}/>;
        })}
      </div>
    </>
  );
}

export default Note;
