import React from "react";
import { Button } from "antd";
import { supabase, auth } from "../../databaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AgendaGroupCard from "../../components/AgendaGroupCard";

function Agenda() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [userProfileDbValues, setUserProfileDbValues] = useState<any>();
    const [groupData, setGroupData] = useState<any>();
    const [authUserData, authLoading, authError] = useAuthState(auth);

    useEffect(() => {
        getUserDataFromAssociatedUserAccount();
    }, [authUserData]);

    async function getUserDataFromAssociatedUserAccount() {
        setUserProfileDbValues("loading")

        let { data, error } = await supabase.from('user_profile').select().eq('associated_user_account', authUserData ? authUserData.uid : "no_user_found")

        if (data?.length === 1) {
            setUserProfileDbValues(data[0]);
            await getGroupData(data[0].id);
        }

        if (data?.length === 0) {
            setUserProfileDbValues("no-data")
        }
    }

    async function getGroupData(user_id: string) {
        setGroupData("loading")
        const { data, error } = await supabase.rpc('get_group_data', { user_profile_id: user_id })
        if (data.length > 0) {
            setGroupData(data);
            console.log(data)
        } else {
            setGroupData("no-data")
        }
    }

    const handleNavigateToLinkUser = () => {
        navigate("/link_user")
        return true;
    }

    // validation
    if (authLoading || userProfileDbValues === "loading" || groupData === "loading") {
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

    if (userProfileDbValues === "no-data") {
        return (
            <div>
                <h1>{t('pages.account.no_profile_linked')}</h1>
                <Button type="default" onClick={handleNavigateToLinkUser}>
                    Link user
                </Button>
            </div>
        );
    }

    if (groupData === "no-data") {
        return (
            <div>
                <h1>No data found</h1>
            </div>
        );
    }

    // content
    return (
        <div>
            <div>
                {
                    groupData?.map(({ group_number, group_id, course_code, course_name }: any) => {
                        return (
                            <AgendaGroupCard
                                course_code={course_code}
                                group_id={group_id}
                                course_name={course_name}
                                group_number={group_number}
                            />
                        )
                    })}
            </div>
        </div>
    );
}

export default Agenda;
