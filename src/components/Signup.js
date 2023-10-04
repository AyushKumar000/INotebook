import React from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const {feedSetAlert} = props
  const navigator = useNavigate();

  const url = "http://localhost:5000/api/auth";

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const cpassword = e.target.cpassword.value;
    if(password !== cpassword){
      alert("password and confirm password should match");
      return;
    }
    const response = await fetch(`${url}/signup`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if(json.success === true){
      navigator("/login");
      feedSetAlert("Account Created Successfully" , "success");
    }

    else{
      navigator('/signup');
      feedSetAlert("Wrong Credentials" , "danger");
    }

  };

  return (
    <div className="container">
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            required
            minLength={5}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            minLength={5}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            required
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
