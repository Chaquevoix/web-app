import '../App.css';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';

function ExampleComponent() {

    const [loading, setLoading] = useState(false);
    const [schools, setSchools] = useState();

    useEffect(() => {

        const loadSchool = async () => {
            setLoading(true);

            const schoolsDoc = doc(db, "/schools/CG0bz6uHYgPxm3T4EKm4")
            const document = await getDoc(schoolsDoc);
            console.log(document.data())

            setSchools(JSON.stringify(document.data()));
            setLoading(false);
        }

        loadSchool();
    }, []);

    return (
        <div>
            { loading ? <Spin/> : schools }
        </div>
    );
}

export default ExampleComponent;
