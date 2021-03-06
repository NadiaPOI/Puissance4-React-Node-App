import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Signup({ history }) {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { setAuthToken } = useAuth();

  function handleChangeFirstname(e) {
    setFirstname(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstname,
        email,
        password
      })
    })
      .then(res => {
        if (res.status === 201) {
          res.json().then(data => {
            setMessage(data.text);
            setAuthToken(data.token);
            history.push("/");
          });
        } else {
          if (res.status === 400) {
            res.json().then(data => {
              setMessage(data.text);
            });
          }
          if (res.status === 405) {
            res.json().then(data => {
              setMessage(data.text);
            });
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <p>{message}</p>
      <input
        className="form-control"
        type="text"
        placeholder="Firstname"
        value={firstname}
        onChange={handleChangeFirstname}
        required
      />
      <input
        className="form-control"
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleChangeEmail}
        required
      />
      <input
        className="form-control"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handleChangePassword}
        required
      />
      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
      <Link className="m-3" to="/login">
        Already have an account?
      </Link>
    </form>
  );
}
