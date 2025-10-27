"use client"

import React, { useState } from "react";
import Button from "@/components/button/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { registerPasskey } from "@/lib/passkey";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
    token: string;
}

export default function PasskeysForm(props: Props) {
    const [isRegistering, setIsRegistering] = useState(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            passkeyName: "",
        },
    });

    const handleRegisterPasskey = async (values: { passkeyName: string }) => {
        setIsRegistering(true);

        try {
            const result = await registerPasskey({
                token: props.token,
                passkeyName: values.passkeyName || undefined
            });

            if (result === 201) {
                toast.success("Passkey registered successfully!");
                form.reset();
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleRegisterPasskey)} className="space-y-8">
                    <FormField
                        name="passkeyName"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Passkey Name (Optional)</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input
                                        id="passkey-name"
                                        placeholder="e.g., My Laptop, Work Phone"
                                        disabled={isRegistering}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isRegistering}
                        text={isRegistering ? "Registering..." : "Add New Passkey"}
                    />
                </form>
            </Form>
        </div>
    );
}
