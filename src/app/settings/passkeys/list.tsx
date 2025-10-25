import React from "react";
import { FiTrash2, FiKey, FiClock } from "react-icons/fi";
import IconButton from "@/components/icon-button/icon-button";
import { Passkey } from "@/lib/passkey";
import styles from "./style.module.css";

interface PasskeyListProps {
  passkeys: Passkey[];
}

export default function PasskeyList({ passkeys }: PasskeyListProps) {
  if (passkeys.length === 0) {
    return (
      <div className={styles.emptyState}>
        <FiKey className={styles.emptyIcon} />
        <p>No passkeys registered yet.</p>
        <p className={styles.emptyHint}>Add your first passkey to get started.</p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <div className={styles.passkeyList}>
      {passkeys.map((passkey) => (
        <div key={passkey.ID} className={styles.passkeyItem}>
          <div className={styles.passkeyInfo}>
            <div className={styles.passkeyIconWrapper}>
              <FiKey className={styles.passkeyIcon} />
            </div>
            <div className={styles.passkeyDetails}>
              <p className={styles.passkeyName}>{passkey.Nickname}</p>
              <div className={styles.passkeyMeta}>
                <span>Created {formatDate(passkey.CreatedAt)}</span>
                {passkey.LastUsedAt && (
                  <span className={styles.lastUsed}>
                    <FiClock />
                    Last used {formatDate(passkey.LastUsedAt)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <IconButton
            icon={<FiTrash2 />}
            variant={"destructive"}
          />
        </div>
      ))}
    </div>
  );
}