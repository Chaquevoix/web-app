import React from "react";
import styles from './style.module.css';
import {ShadButton} from "@/components/ui/shadButton";


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: String,
    icon?: React.ReactNode,
    iconPlacement?: "left" | "right",
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

export default function Button({
  text,
  variant = "default",
  className,
  ...props
}: Props) {
    return (
      <ShadButton variant={variant} className={styles.icon_button} {...props}>
        <div className={styles.button_icon}>
          {text && <span>{text}</span>}
        </div>
      </ShadButton>
    );
}
