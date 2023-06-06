import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { supabase, supabaseAuth } from "../databaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function Account() {
  const navigate = useNavigate();
  // const [authUserData, authLoading, authError] = useAuthState(auth);
  const [dbValues, setDbValues] = useState<any>();

  // const [dbValues, dbLoading, dbError, dbSnapshot] = useCollectionDataOnce<any>(
  //   query(
  //     collection(db, 'users'),
  //     where(
  //       'associated_user_account',
  //       "==",
  //       authUserData ? authUserData.uid : "no_user_found"),
  //     limit(1)
  //   )
  // );

  console.log(supabaseAuth.getUser())

  useEffect(() => {
    getUserDataFromAssociatedUserAccount();
  }, []);

  async function getUserDataFromAssociatedUserAccount() {
    const { data } = await supabase.from("user-profile").select("*").eq("associated-user-account", supabaseAuth.getUser);
    setDbValues(data);
  }

  const { t } = useTranslation();

  const logOutButton = () => {
    // signOut(auth)
    //   .then(() => {
    //     navigate("/login");
    //   })
    //   .catch((error) => {
    //     message.error(t('global.generic_error') + error);
    //   });
    supabaseAuth.signOut()
  };

  const handleNavigateToLinkUser = () => {
    navigate("/link_user")
    return true;
  }

  // // validation
  // if (authLoading && dbLoading) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  // if (!authUserData) {
  //   return (
  //     <div>
  //       <h1>{t('global.user_not_logged_in')}</h1>
  //     </div>
  //   );
  // }

  // if (!dbValues || !dbSnapshot?.docs[0]) {
  //   return (
  //     <div>
  //       <h1>{t('pages.account.no_profile_linked')}</h1>
  //       <Button type="default" onClick={handleNavigateToLinkUser}>
  //         Link user
  //       </Button>
  //     </div>
  //   );
  // }

  // const document = dbSnapshot?.docs[0].data();

  // content
  return (
    <div>
      {/* <h1>{t('pages.account.logged_in_as')} {authUserData.email}</h1> */}
      <Button type="primary" onClick={logOutButton}>
        Log Out
      </Button>
      <div>
        {/* <h1>Welcome back, {document.first_name}!</h1> */}
      </div>
    </div>
  );
}

export default Account;
