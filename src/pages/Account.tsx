import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { supabase, auth, db } from "../databaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function Account() {
  const navigate = useNavigate();
  const { t } = useTranslation()
  const [dbValues, setDbValues] = useState<any>();
  const [authUserData, authLoading, authError] = useAuthState(auth);

  useEffect(() => {
    getUserDataFromAssociatedUserAccount();
  }, [authUserData]);

  async function getUserDataFromAssociatedUserAccount() {
    setDbValues("loading")

    let { data, error } = await supabase.from('user-profile').select().eq('associated_user_account', authUserData ? authUserData.uid : "no_user_found")

    if (data?.length === 1) {
      setDbValues(data[0]);
    }

    if (data?.length === 0) {
      setDbValues("no-data")
    }
  }

  const logOutButton = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        message.error(t('global.generic_error') + error);
      });
  };

  const handleNavigateToLinkUser = () => {
    navigate("/link_user")
    return true;
  }

  // validation
  if (authLoading || dbValues === "loading") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!authLoading && !authUserData) {
    return (
      <div>
        <h1>{t('global.user_not_logged_in')}</h1>
      </div>
    );
  }

  if (dbValues === "no-data") {
    return (
      <div>
        <h1>{t('pages.account.no_profile_linked')}</h1>
        <Button type="default" onClick={handleNavigateToLinkUser}>
          Link user
        </Button>
      </div>
    );
  }

  // content
  return (
    <div>
      <h1>{t('pages.account.logged_in_as')} {authUserData?.email}</h1>
      <Button type="primary" onClick={logOutButton}>
        Log Out
      </Button>
      <div>
        <h1>Welcome back, {dbValues?.first_name}!</h1>
      </div>
    </div>
  );
}

export default Account;
