import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Card } from "antd";
import { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { supabase, auth } from "../../databaseConfig";


function AgendaGroup() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    let { group_id } = useParams();

    const [userProfileDbValues, setUserProfileDbValues] = useState<any>();
    const [groupData, setGroupData] = useState<any>();
    const [authUserData, authLoading, authError] = useAuthState(auth);

    useEffect(() => {
        getUserDataInThisGroup();
    }, [authUserData]);

    async function getUserDataInThisGroup() {
        setUserProfileDbValues("loading")

        let { data, error } = await supabase.from('user_profile').select().eq('associated_user_account', authUserData ? authUserData.uid : "no_user_found")

        if (data?.length === 1) {
            setUserProfileDbValues(data[0]);
            await getAssessmentsData(data[0].id, group_id ? group_id : '');
        }

        if (data?.length === 0) {
            setUserProfileDbValues("no-data")
        }
    }

    async function getAssessmentsData(user_profile_id: string, group_id: string) {
        setGroupData("loading")
        const { data, error } = await supabase.rpc('get_user_group_assessments', { user_profile_id: user_profile_id, group_id: group_id })
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


    return (
        <div>
            Group ID: {group_id}
            {JSON.stringify(groupData)}
        </div>
    );
}

export default AgendaGroup;
