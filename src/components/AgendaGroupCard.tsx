import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Card } from "antd";
import styles from '../styles/AgendaGroupCard.module.css'

interface props_types {
    group_id: String,
    assessment_title: String,
    grade_value: String,
    course_code: String,
    course_name: String
}

function AgendaGroupCard(props: props_types) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={styles.body}>
            <Card
                title={`${props.course_code} - ${props.course_name} (groupe ${props.group_id})`}
                extra={<Button type="link" onClick={() => navigate("/")}> More </Button>}
            >
                <Card
                    type="inner"
                    title={props.assessment_title}
                >
                    note: {props.grade_value}
                </Card>
            </Card>
        </div>
    );
}

export default AgendaGroupCard;
