import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/auth";

function Home({ username }) {
  const [displayAlert, setDisplayAlert] = useState(true);
  const { authAdmin } = useAuth();

  function handleClick() {
    setDisplayAlert(false);
  }

  return (
    <>
      {displayAlert && (
        <div className="alert alert-primary" role="alert">
          Hello {username} ! Happy to see you again :-)
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => handleClick()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <Link to="/form" className="button">
        Start a Game
      </Link>
      {authAdmin && (
        <Link to="/admin" className="button">
          Go to Admin Page
        </Link>
      )}
    </>
  );
}

export default Home;
