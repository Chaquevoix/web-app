import React from "react";
import { Button, DatePicker, Form, Input, Spin, message } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    collection,
    query,
    where,
    limit,
    getDocs,
    updateDoc,
    doc,
} from "firebase/firestore";
import { auth, db, supabase } from "../../databaseConfig";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CenteredFormCard from "../../components/CenteredFormCard";

function LinkUser() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [userAuthData, loading, error] = useAuthState(auth);
    const [dbLoading, setDbLoading] = useState<boolean>(false)

    const onFinish = (values: any) => {

        // Checks if the user data has been created by the school (name, etc)
        const verifyIfUserShouldExist = async () => {

            if (userAuthData) {
                setDbLoading(true)

                const { data, error } = await supabase
                    .from('user-profile')
                    .update({ associated_user_account: userAuthData.uid })
                    .is('associated_user_account', null)
                    .eq('permanent_code', values.permanent_code)
                    .eq('admission_code', values.admission_number)
                    .select()

                if (error) {
                    setDbLoading(false)

                    if (error.code === "23505") {
                        message.error("An account has already been registered with this information.");
                    }

                } else {

                    if (data?.length === 1) {
                        message.success(`Welcome, ${data[0].first_name}`);
                        navigate("/account/");
                    }

                    if (data?.length === 0) {
                        setDbLoading(false)

                        message.error("The information you entered has not been found");
                    }

                }

            } else {
                navigate("/register/");
            }
        };

        verifyIfUserShouldExist();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    if (!userAuthData && !loading) {

        navigate("/register");
        return (
            <div>
                <h1>{t('global.user_not_enough_permission')}</h1>
            </div>
        );
    }

    return (
        <div>
            <CenteredFormCard title={t('pages.link_user.form_title')}>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label={t("pages.link_user.permanent_code")}
                        name="permanent_code"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: t("global.form.empty_required_field") + "",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={t("pages.link_user.admission_number")}
                        name="admission_number"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: t("global.form.empty_required_field") + "",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={dbLoading}>
                            {t("global.form.submit")} {dbLoading ? <Spin/> : ""}
                        </Button>
                    </Form.Item>
                </Form>
            </CenteredFormCard>
        </div>
    );
}

export default LinkUser;
