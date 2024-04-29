import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from "react";
import styles from './style.module.css';


interface Props {
    title?: String,
    description?: String,
    children?: React.ReactNode,
}

export default function CardComponent(props: Props) {
    return (
        <Card className={styles.card}>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <div>
                {props.children}
            </div>
        </Card>
    );
}
