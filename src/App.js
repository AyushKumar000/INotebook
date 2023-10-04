import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const feedSetAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
          <Routes>
            <Route path="/" element={<Home  feedSetAlert={feedSetAlert}/>} />
            <Route path="/About" element={<About />} />
            <Route path="/login" element={<Login  feedSetAlert={feedSetAlert} />} />
            <Route path="/signup" element={<Signup  feedSetAlert={feedSetAlert} />} />
          </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
