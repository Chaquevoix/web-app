import { Button, Checkbox, Form, Input, Spin, message } from 'antd';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, where, query, limit } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function MyAccount() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userAuthData, setUserAuthData] = useState()
    const [userData, setUserData] = useState()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserAuthData(user);
            authUid = user.uid;
        } else {
            setUserAuthData(null)
        }
    });

    const logOutButton = () => {
        signOut(auth).then(() => {
            navigate("/auth/login/")
        }).catch((error) => {
            message.error("An error has occured." + error)
        });
    }

    useEffect(() => {
        const loadUserData = async () => {
            if (authUid != "") {
                setLoading(true);

                const collUsers = collection(db, 'users')
    
                const dbQuery = query(collUsers, where('associated_user_account', "==", userAuthData.uid), limit(1));
    
                const querySnapshot = await getDocs(dbQuery);
    
                if (querySnapshot.empty) {
                    return null;
                }
    
                const document = querySnapshot.docs[0];
                setUserData(document.data())
                setLoading(false);
            }
        }

        loadUserData()
    });

    if (userAuthData != null && userData != null) {
        return (
            <div>
                <h1>Logged in as {userAuthData.email}</h1>
                <Button type='primary' onClick={logOutButton}>Log Out</Button>
                <h2>Hello, {userData.first_name}!</h2>
            </div>
        );
    } else {
        return (
            <div>
                <h1>You must be logged in to see this.</h1>
            </div>
        );
    }
}

export default MyAccount;
