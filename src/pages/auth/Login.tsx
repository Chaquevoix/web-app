import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';
import { redirect } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import CenteredFormCard from '../../components/CenteredFormCard';

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
        signInWithEmailAndPassword(values.email, values.password);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (user) {
        message.success(t('pages.login.login_success'))
        navigate("/account")
    }

    if (error) {
        switch (error.code) {
            case "auth/user-not-found":
                message.error(t('pages.login.login_fail.no_user'));
                break;

            case "auth/wrong-password":
                message.error(t('pages.login.login_fail.wrong_password'));
                break;

            default:
                message.error(t('global.generic_error') + error.message)
                break;
        }
    }

    return (
        <div>
            <CenteredFormCard title='Login'>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">

                    <Form.Item label={t('global.form.email')} name="email"
                        rules={[
                            {
                                required: true,
                                message: t('global.form.empty_required_field') + "",
                            },
                            {
                                type: "email",
                                message: t('global.form.bad_email') + "",
                            },
                        ]}>

                        <Input />

                    </Form.Item>

                    <Form.Item label={t('global.form.password')} name="password"
                        rules={[
                            {
                                required: true,
                                message: t('global.form.empty_required_field') + ""
                            },
                        ]}>

                        <Input.Password />

                    </Form.Item>

                    <Form.Item>

                        <Button type="primary" htmlType="submit">
                            {t('global.form.submit')}
                        </Button>

                    </Form.Item>
                </Form>
            </CenteredFormCard>
        </div>
    );
}

export default Login;
