import React, { useState, useEffect } from "react";

export default function Admin({ history }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setUsers(data);
        return data;
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  function deleteUser(id) {
    fetch(`/users/${id}`)
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            setUsers(data);
            history.push("/admin");
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  const usersList = users.map((user, index) => {
    return (
      <li className="list-group-item m-2" key={index}>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => deleteUser(user._id)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <p className="card-title">{user.firstname}</p>
        <p>{user.email}</p>
        <p>{user.password}</p>
      </li>
    );
  });

  return (
    <div>
      <ul className="list-group">{usersList}</ul>
    </div>
  );
}
