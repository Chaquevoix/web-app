import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Account() {
  const navigate = useNavigate();
  const [authUserData, authLoading, authError] = useAuthState(auth);

  const [dbValues, dbLoading, dbError, dbSnapshot] = useCollectionDataOnce<any>(
    query(
      collection(db, 'users'),
      where(
        'associated_user_account',
        "==",
        authUserData ? authUserData.uid : "no_user_found"),
      limit(1)
    )
  );

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
