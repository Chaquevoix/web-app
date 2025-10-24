"use client"

import React, { useState, useEffect, useCallback } from "react";
import Button from "@/components/button/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { registerPasskey, listPasskeys, deletePasskey, type Passkey } from "@/lib/passkey";
import { FiTrash2, FiKey, FiClock } from "react-icons/fi";
import IconButton from "@/components/icon-button/icon-button";
import styles from "./style.module.css";

interface Props {
    data: ProfileData;
    token: string;
}

export default function PasskeysForm(props: Props) {
    const [passkeyName, setPasskeyName] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [passkeys, setPasskeys] = useState<Passkey[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const loadPasskeys = useCallback(async () => {
        setIsLoading(true);
        const keys = await listPasskeys(props.token);
        setPasskeys(keys);
        setIsLoading(false);
    }, [props.token]);

    useEffect(() => {
        loadPasskeys();
    }, [loadPasskeys]);

    const handleRegisterPasskey = async () => {
        setIsRegistering(true);

        const result = await registerPasskey({
            token: props.token,
            passkeyName: passkeyName || undefined
        });

        if (result.verified) {
            toast.success("Passkey registered successfully!");
            setPasskeyName("");
            await loadPasskeys();
        }

        setIsRegistering(false);
    };

    const handleDeletePasskey = async (passkeyId: string) => {
        setDeletingId(passkeyId);

        const success = await deletePasskey(props.token, passkeyId);

        if (success) {
            toast.success("Passkey deleted successfully!");
            await loadPasskeys();
        }

        setDeletingId(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.addSection}>
                <div className={styles.inputGroup}>
                    <Label htmlFor="passkey-name">Passkey Name (Optional)</Label>
                    <Input
                        id="passkey-name"
                        placeholder="e.g., My Laptop, Work Phone"
                        value={passkeyName}
                        onChange={(e) => setPasskeyName(e.target.value)}
                        disabled={isRegistering}
                    />
                    <p className={styles.hint}>
                        Give your passkey a memorable name to identify it later.
                    </p>
                </div>

                <Button
                    onClick={handleRegisterPasskey}
                    disabled={isRegistering}
                    text={isRegistering ? "Registering..." : "Add New Passkey"}
                />
            </div>

            <div className={styles.listSection}>
                <h3>Your Passkeys</h3>

                {isLoading ? (
                    <div className={styles.emptyState}>
                        Loading passkeys...
                    </div>
                ) : passkeys.length === 0 ? (
                    <div className={styles.emptyState}>
                        <FiKey className={styles.emptyIcon} />
                        <p>No passkeys registered yet.</p>
                        <p className={styles.emptyHint}>Add your first passkey to get started.</p>
                    </div>
                ) : (
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
                                            <span>Created {passkey.CreatedAt.toLocaleString(undefined, {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}</span>
                                            {passkey.LastUsedAt && (
                                                <span className={styles.lastUsed}>
                                                    <FiClock />
                                                    Last used {passkey.LastUsedAt.toLocaleString(undefined, {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric'
                                                    })}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <IconButton
                                    icon={<FiTrash2 />}
                                    onClick={() => handleDeletePasskey(passkey.ID)}
                                    disabled={deletingId === passkey.ID}
                                    text={"Delete"}
                                    variant={"destructive"}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.infoSection}>
                <h3>What are passkeys?</h3>
                <p>
                    Passkeys are a secure and convenient way to sign in without passwords.
                    They use your device&apos;s biometric authentication (like fingerprint or face recognition)
                    or screen lock to verify your identity.
                </p>
            </div>
        </div>
    );
}