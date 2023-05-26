import { Button, DatePicker, Form, Input, message } from 'antd';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, limit, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function LinkUser() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [userAccountExists, setUserAccountExists] = useState(false)

    const [userAuthData, setUserAuthData] = useState()
    const [userData, setUserData] = useState()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserAuthData(user);
        } else {
            navigate("/auth/register/")
        }
    });

    const onFinish = (values) => {

        // Checks if the user data has been created by the school (name, etc)
        const verifyIfUserShouldExist = async () => {
            const collUsers = collection(db, 'users')

            const dbQuery = query(
                collUsers,
                where('permanent_code', "==", values.permanent_code),
                where('code', '==', values.admission_number),
                limit(1));
            // TODO: where() condition that checks if the user has no account already linked

            const querySnapshot = await getDocs(dbQuery);

            try {
                if (querySnapshot.docs[0].data() != undefined) {
                    let info = querySnapshot.docs[0].data();

                    await updateDoc(doc(db, "users", querySnapshot.docs[0].id), {
                        associated_user_account: userAuthData.uid
                    });

                    message.success(`Welcome, ${info.first_name}`)
                    navigate("/account/")
                }
            } catch (e) {
                console.log(e)
                message.error("The user information you entered is incorrect or does not exist.")
            }
        }

        verifyIfUserShouldExist()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">


                <Form.Item label={t('register.form.permanent_code')} name="permanent_code" hasFeedback
                    rules={[
                        {
                            required: true,
                            message: t('form.empty_required_field'),
                        }
                    ]}>

                    <Input />

                </Form.Item>

                <Form.Item label={t('register.form.admission_number')} name="admission_number" hasFeedback
                    rules={[
                        {
                            required: true,
                            message: t('form.empty_required_field'),
                        }
                    ]}>

                    <Input />

                </Form.Item>

                <Form.Item>

                    <Button type="primary" htmlType="submit">
                        {t('form.submit')}
                    </Button>

                </Form.Item>
            </Form>
        </div>
    );
}

export default LinkUser;