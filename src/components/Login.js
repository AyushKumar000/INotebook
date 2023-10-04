import React from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const {feedSetAlert} = props;
    const navigator = useNavigate();
    const url = "http://localhost:5000/api/auth";

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const response = await fetch(`${url}/login`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({email, password})
        });
        const json = await response.json();
        if(json.success === true){
            localStorage.setItem("token" , json.authToken);
            navigator('/');
            feedSetAlert("Logged In Successfully" , "success");
        }
        else
        {
            feedSetAlert("Wrong Credentials" , "danger");
        }
    }

  return (
    <div className="container">
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
