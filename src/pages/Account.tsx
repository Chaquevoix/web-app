import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const logOutButton = () => {
    signOut(auth)
      .then(() => {
        navigate("/auth/login/");
      })
      .catch((error) => {
        message.error("An error has occured." + error);
      });
  };

  // validation
  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h1>You must be logged in to see this.</h1>
      </div>
    );
  }

  // content
  return (
    <div>
      <h1>Logged in as {user.email}</h1>
      <Button type="primary" onClick={logOutButton}>
        Log Out
      </Button>
    </div>
  );
}

export default Account;
