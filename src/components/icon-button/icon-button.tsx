import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from "react";
import styles from './style.module.css';
import {Button} from "@/components/ui/button";
import {text} from "node:stream/consumers";


interface Props {
    text?: String,
    icon?: React.ReactNode,
    iconPlacement?: "left" | "right",
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

export default function IconButton(props: Props) {
    return (
        <Button variant={props.variant}>
            <div className={styles.button_icon}>
                {props.iconPlacement == "left" && <span className={styles.icon_left}>{props.icon}</span>}<span>{props.text}</span>{props.iconPlacement == "right" && <span className={styles.icon_right}>{props.icon}</span>}
            </div>
        </Button>
    );
}
