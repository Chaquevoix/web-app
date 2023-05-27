import '../App.css';
import React, { FC } from 'react';
import { Card } from 'antd';
import styles from '../styles/CenteredFormCard.module.css'

interface props {
    title: string,
    children: any
}

const CenteredFormCard:React.FC<props> = ({ title, children, ...props }) => {
    return (
        <Card title={title} className={styles.card_body}>
            {children}
        </Card>
    );
}

export default CenteredFormCard;
