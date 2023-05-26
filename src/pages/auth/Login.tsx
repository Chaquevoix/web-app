import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';
import { redirect } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

function Login() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const onFinish = (values: any) => {
        signInWithEmailAndPassword(values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                message.success(t('login_success'))
                navigate("/account")
            })
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    message.error(t('login_fail.no_user'))
                }

                if (error.code === "auth/wrong-password") {
                    message.error(t('login_fail.wrong_password'))
                }
            });
    };



    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">

                <Form.Item label={t('form.email')} name="email"
                    rules={[
                        {
                            required: true,
                            message: t('form.empty_required_field') + "",
                        },
                        {
                            type: "email",
                            message: t('form.bad_email') + "",
                        },
                    ]}>

                    <Input />

                </Form.Item>

                <Form.Item label={t('form.password')} name="password"
                    rules={[
                        {
                            required: true,
                            message: t('form.empty_required_field') + ""
                        },
                    ]}>

                    <Input.Password />

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

export default Login;
