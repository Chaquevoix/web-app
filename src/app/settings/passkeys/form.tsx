"use client"

import React, { useState } from "react";
import Button from "@/components/button/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { registerPasskey } from "@/lib/passkey";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";

interface Props {
    token: string;
}

export default function PasskeysForm(props: Props) {
    const [passkeyName, setPasskeyName] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const router = useRouter();

    const handleRegisterPasskey = async () => {
        setIsRegistering(true);

        try {
            const result = await registerPasskey({
                token: props.token,
                passkeyName: passkeyName || undefined
            });

            if (result.verified) {
                toast.success("Passkey registered successfully!");
                setPasskeyName("");
                router.refresh();
            } else {
                toast.error("Failed to register passkey");
            }
        } catch (error) {
            toast.error("An error occurred during registration");
            console.error(error);
        } finally {
            setIsRegistering(false);
        }
    };

    return (
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
    );
}