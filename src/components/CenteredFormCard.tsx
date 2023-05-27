import '../App.css';
import React, { FC } from 'react';
import { Card } from 'antd';
import styles from 'styles/CenteredFormCard.module.css'

interface props {
    title: string,
    children: any
}

const CenteredFormCard:React.FC<props> = ({ title, children, ...props }) => {
    return (
        <Card title={title} >
            {children}
        </Card>
    );
}

export default CenteredFormCard;
