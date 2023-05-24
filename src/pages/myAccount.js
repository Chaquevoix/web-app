import { Button, Checkbox, Form, Input, message } from 'antd';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function MyAccount() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserData(user);
            // ...
        } else {
            setUserData(null)
        }
    });


    const logOutButton = () => {
        signOut(auth).then(() => {
            navigate("/auth/login/")
        }).catch((error) => {
            message.error("An error has occured." + error)
        });
    }

    if (userData != null) {
        return (
            <div>
                <h1>Logged in as {userData.email}</h1>
                <Button type='primary' onClick={logOutButton}>Log Out</Button>
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
