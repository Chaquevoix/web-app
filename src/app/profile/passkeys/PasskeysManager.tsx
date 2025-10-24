"use client"

import React, { useState, useEffect, useCallback } from "react";
import Button from "@/components/button/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { registerPasskey, listPasskeys, deletePasskey, type Passkey } from "@/lib/passkey";
import { FiTrash2, FiKey, FiClock } from "react-icons/fi";
import IconButton from "@/components/icon-button/icon-button";

interface Props {
    token: string;
}

export default function PasskeysManager({ token }: Props) {
    const [passkeyName, setPasskeyName] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [passkeys, setPasskeys] = useState<Passkey[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const loadPasskeys = useCallback(async () => {
        setIsLoading(true);
        const keys = await listPasskeys(token);
        setPasskeys(keys);
        setIsLoading(false);
    }, [token]);

    useEffect(() => {
        loadPasskeys();
    }, [loadPasskeys]);

    const handleRegisterPasskey = async () => {
        setIsRegistering(true);

        const result = await registerPasskey({
            token,
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

        const success = await deletePasskey(token, passkeyId);

        if (success) {
            toast.success("Passkey deleted successfully!");
            await loadPasskeys();
        }

        setDeletingId(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="passkey-name">Passkey Name (Optional)</Label>
                    <Input
                        id="passkey-name"
                        placeholder="e.g., My Laptop, Work Phone"
                        value={passkeyName}
                        onChange={(e) => setPasskeyName(e.target.value)}
                        disabled={isRegistering}
                    />
                    <p className="text-sm text-muted-foreground">
                        Give your passkey a memorable name to identify it later.
                    </p>
                </div>

                <Button
                    onClick={handleRegisterPasskey}
                    disabled={isRegistering}
                    text={isRegistering ? "Registering..." : "Add New Passkey"}
                    className="w-full"
                />
            </div>

            <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-3">Your Passkeys</h3>

                {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">
                        Loading passkeys...
                    </div>
                ) : passkeys.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <FiKey className="mx-auto mb-2 h-12 w-12 opacity-20" />
                        <p>No passkeys registered yet.</p>
                        <p className="text-sm">Add your first passkey to get started.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {passkeys.map((passkey) => (
                            <div
                                key={passkey.ID}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                            >

                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <FiKey className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{passkey.Nickname}</p>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>Created {passkey.CreatedAt.toLocaleString(undefined, {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}</span>
                                            {passkey.LastUsedAt && (
                                                <span className="flex items-center gap-1">
                                                    <FiClock className="h-3 w-3" />
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
                                    <IconButton
                                        icon={<FiTrash2 className="h-4 w-4" />}
                                        onClick={() => handleDeletePasskey(passkey.ID)}
                                        disabled={deletingId === passkey.ID}
                                        text={"Delete"}
                                        variant={"destructive"}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-3">What are passkeys?</h3>
                <p className="text-sm text-muted-foreground">
                    Passkeys are a secure and convenient way to sign in without passwords.
                    They use your device&apos;s biometric authentication (like fingerprint or face recognition)
                    or screen lock to verify your identity.
                </p>
            </div>
        </div>
    );
}
