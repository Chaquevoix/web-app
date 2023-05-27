import React from 'react';
import { Button, DatePicker, Form, Input, message } from 'antd';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { redirect } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CenteredFormCard from '../../components/CenteredFormCard';

function Register() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const onFinish = (values: any) => {
        createUserWithEmailAndPassword(values.email, values.password);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (error) {
        switch (error.code) {
            case "auth/weak-password":
                message.error(t('pages.register.form.err_weak_password'))
                break;

            case "auth/email-already-in-use":
                message.error(t('pages.register.form.err_already_in_use'))
                break;

            default:
                message.error(t('global.generic_error') + error.message)
                break;
        }
    }

    if (user) {
        message.success(t('pages.register.register_success'))
        navigate("/link_user")
    }

    

    return (
        <div>
            <CenteredFormCard title={t('pages.register.form_title')}>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">

                    <Form.Item label={t('global.form.email')} name="email" hasFeedback
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

                    <Form.Item label={t('global.form.email')} name="confirm_email" hasFeedback
                        rules={[
                            {
                                required: true,
                                message: t('global.form.empty_required_field') + "",
                            },
                            {
                                type: "email",
                                message: t('global.form.bad_email') + "",
                            },
                            ({ getFieldValue }) => ({
                                // validator taken from: https://github.com/ant-design/ant-design/blob/master/components/form/demo/register.tsx
                                validator(_, value) {
                                    if (!value || getFieldValue('email') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(t('register.form.confirm_email_invalid') + ""));
                                },
                            }),
                        ]}>

                        <Input />

                    </Form.Item>

                    <Form.Item label={t('global.form.password')} name="password" hasFeedback
                        rules={[
                            {
                                required: true,
                                message: t('global.form.empty_required_field') + ""
                            },
                        ]}>

                        <Input.Password />

                    </Form.Item>

                    <Form.Item label={t('global.form.password')} name="confirm_password" hasFeedback
                        rules={[
                            {
                                required: true,
                                message: t('global.form.empty_required_field') + ""
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(t('pages.register.form.confirm_email_invalid') + ""));
                                },
                            }),
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

export default Register;
