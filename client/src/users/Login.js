import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Login({ history, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { setAuthToken } = useAuth();
  const { setAuthAdmin } = useAuth();
  const admin = process.env.REACT_APP_ADMIN || "nadiap@gmail.com"

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then((res, data) => {
        if (res.status === 200) {
          res.json().then(data => {
            setMessage(data.text);
            setAuthToken(data.token);
            setUser(data.username);
            
            if (email === admin) {
              setAuthAdmin(true);
            }

            history.push("/");
          });
        } else {
          if (res.status === 404) {
            res.json().then(data => {
              setMessage(data.text);
            });
          }
          if (res.status === 401) {
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
    <>
      <form onSubmit={handleSubmit} className="form-group">
        <p>{message}</p>
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
          Login
        </button>
        <Link className="m-2" to="/signup">
          Don't have an account ?
        </Link>
      </form>
    </>
  );
}
