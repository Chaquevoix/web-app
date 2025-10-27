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
    <div>
      {passkeys.map((passkey) => (
          <div key={passkey.ID} className={styles.passkey_list_item}>
            <div className={styles.titre_passkey_grid}>
                <b className={styles.titre_passkey}>{passkey.Nickname}</b>
                <IconButton
                  iconPlacement="center"
                  className={styles.bouton_supprimer}
                  icon={<FiTrash2 />}
                  variant={"destructive"}
                />
            </div>
            <div className={styles.details_passkey_grid}>
              {passkey.LastUsedAt && (
                <p>Last used: {formatDate(passkey.LastUsedAt)}</p>
              )}
              <p>Created at: {formatDate(passkey.CreatedAt)}</p>
            </div>
          </div>
      ))}
    </div>
  );
}
