"use client"

import {
    CardContent,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import CardComponent from "@/components/card/card";
import { Input } from "@/components/ui/input";
import styles from "./style.module.css";
import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import IconButton from "@/components/icon-button/icon-button";

function setSessionCookie(token: string, expiration: Date) {
    document.cookie = `token=${token}; expires=${expiration.toUTCString()}; path=/`;
}

const passwordlessFormSchema = z.object({
    token: z.string().max(1024, "To prevent abuse, this field can not not contain more than 1024 characters."),
});

function PasswordlessForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof passwordlessFormSchema>>({
        resolver: zodResolver(passwordlessFormSchema),
    });
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(values: z.infer<typeof passwordlessFormSchema>) {
        setIsLoading(true);

        const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/email/validate`,             {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "code" : values.token }),
        })

        const result = response.then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })

        toast.promise(result, {
            loading: "Loading...",
            success: (data) => {
                setIsLoading(false);

                setSessionCookie(data.Token, new Date(data.expires))

                router.push("/auth/link-account");
                return `Email confirmed successfully!`;
            },
            error: (data) => {
                setIsLoading(false);
                return `There was an error while validating your email. Please try again.`;
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    name="token"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Validation code</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input
                                    id="token"
                                    placeholder="ABCD1234..."
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <IconButton
                    type="submit"
                    text={"Next"}
                    icon={<MdNavigateNext />}
                    iconPlacement={"right"}
                />
            </form>
        </Form>
    );
}

export default function ConfirmEmail() {
    return (
        <main className={`${styles.page} cool_background`}>
            <div className={styles.card}>
                <CardComponent title={"Check your email"} description={"We have sent you a verification code. Please insert it in the text field below."}>
                    <CardContent>
                        <PasswordlessForm />
                    </CardContent>
                </CardComponent>
            </div>
        </main>
    );
}
