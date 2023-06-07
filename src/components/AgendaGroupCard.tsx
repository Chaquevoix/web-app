import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Card } from "antd";
import styles from '../styles/AgendaGroupCard.module.css'

interface props_types {
    group_number: String,
    course_code: String,
    course_name: String
}

function AgendaGroupCard(props: props_types) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={styles.body}>
            <Card
                title={`${props.course_code} - ${props.course_name} (groupe ${props.group_number})`}
                extra={<Button type="link" onClick={() => navigate("/")}> More </Button>}
            >
            </Card>
        </div>
    );
}

export default AgendaGroupCard;
