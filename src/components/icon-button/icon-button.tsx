import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from "react";
import styles from './style.module.css';
import {ShadButton} from "@/components/ui/shadButton";
import {text} from "node:stream/consumers";


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: String,
    icon?: React.ReactNode,
    iconPlacement?: "left" | "right" | "center",
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

export default function IconButton({
  text,
  icon,
  iconPlacement = "left",
  variant = "default",
  className,
  ...props
}: Props) {
    return (
      <ShadButton variant={variant} className={`${styles.icon_button} ${className || ''}`} {...props}>
        <div className={styles.button_icon}>
          {iconPlacement === "left" && icon && (
            <span className={styles.icon_left}>{icon}</span>
          )}
          {text && <span>{text}</span>}
          {iconPlacement === "right" && icon && (
            <span className={styles.icon_right}>{icon}</span>
          )}
          {iconPlacement === "center" && icon && (
            <span className={styles.icon_center}>{icon}</span>
          )}
        </div>
      </ShadButton>
    );
}
