import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Card } from "antd";


function AgendaGroup() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    let { group_id } = useParams();

    return (
        <div>
            ID: {group_id}
        </div>
    );
}

export default AgendaGroup;
