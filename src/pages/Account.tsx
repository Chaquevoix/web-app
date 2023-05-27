import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Account() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const { t } = useTranslation();

  const logOutButton = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        message.error(t('global.generic_error') + error);
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
        <h1>{t('global.user_not_logged_in')}</h1>
      </div>
    );
  }

  // content
  return (
    <div>
      <h1>{t('pages.account.logged_in_as')} {user.email}</h1>
      <Button type="primary" onClick={logOutButton}>
        Log Out
      </Button>
    </div>
  );
}

export default Account;
