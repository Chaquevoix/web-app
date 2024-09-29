"use client";

import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from "./style.module.css";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import IconButton from "@/components/icon-button/icon-button";
import {
    startRegistration,
    startAuthentication,
} from "@simplewebauthn/browser";

const emailPasswordFormSchema = z
    .object({
        email: z.string().email(),
        password: z
            .string()
            .min(8, "You need at least 8 characters in your password")
            .max(
                1024,
                "To prevent abuse, your password must not contain more than 1024 characters.",
            ),
        passwordConfirmation: z
            .string()
            .min(8, "You need at least 8 characters in your password"),
    })
    .superRefine(({ password, passwordConfirmation }, ctx) => {
        if (passwordConfirmation !== password) {
            ctx.addIssue({
                code: "custom",
                message:
                    "The password confirmation does not match the password.",
                path: ["passwordConfirmation"],
            });
        }
    });

function EmailPasswordForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof emailPasswordFormSchema>>({
        resolver: zodResolver(emailPasswordFormSchema),
    });
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(values: z.infer<typeof emailPasswordFormSchema>) {
        setIsLoading(true);
        const result = fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register/email_password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            },
        ).catch((err) => console.error(err));

        toast.promise(result, {
            loading: "Loading...",
            success: (data) => {
                setIsLoading(false);

                router.push("/auth/check-email");
                return `Account created successfully!`;
            },
            error: (data) => {
                setIsLoading(false);
                return `Account creation error. Make sure your email is not already registered.`;
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input
                                    id="email"
                                    placeholder="bob@courriel.com"
                                    autoComplete="email"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input
                                    id="password"
                                    type={"password"}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="passwordConfirmation"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password confirmation</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input
                                    id="passwordConfirmation"
                                    type={"password"}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    Submit
                </Button>
            </form>
        </Form>
    );
}

async function registerPasskey() {
    try {
        const response = await fetch("/api/auth/webauthn/challenge", {
            method: "GET",
        });
        const options = await response.json();

        const regResult = await startRegistration(options);

        const verificationResponse = await fetch(
            "/api/auth/webauthn/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(regResult),
            },
        );

        const verificationResult = await verificationResponse.json();

        if (verificationResult.verified) {
            console.log("Passkey registered successfully");
        } else {
            console.error("Passkey registration failed");
        }
    } catch (error) {
        console.error("Error during passkey registration:", error);
    }
}

const passwordlessFormSchema = z.object({
    email: z.string().email(),
});

function PasswordlessForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof passwordlessFormSchema>>({
        resolver: zodResolver(passwordlessFormSchema),
    });
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(values: z.infer<typeof passwordlessFormSchema>) {
        registerPasskey();
        // setIsLoading(true);
        // const result = fetch(
        //     `${process.env.NEXT_PUBLIC_API_URL}/auth/account/register/passwordless`,
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded",
        //         },
        //         body: new URLSearchParams({ email: values.email }),
        //     },
        // ).catch((err) => console.error(err));

        // toast.promise(result, {
        //     loading: "Loading...",
        //     success: (data) => {
        //         setIsLoading(false);

        //         router.push("/auth/check-email");
        //         return `Account created successfully!`;
        //     },
        //     error: (data) => {
        //         setIsLoading(false);
        //         return `Account creation error. Make sure your email is not already registered.`;
        //     },
        // });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input
                                    id="email"
                                    placeholder="bob@courriel.com"
                                    autoComplete="email"
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

export default function Register() {
    return (
        <main className={`${styles.page} cool_background`}>
            <div className={styles.card}>
                <CardComponent
                    title={"Legacy"}
                    description={"Register using an email and a password"}
                >
                    <CardContent>
                        <EmailPasswordForm />
                    </CardContent>
                    <Separator />
                    <CardHeader>
                        <CardTitle>Modern</CardTitle>
                        <CardDescription>
                            Register using passkeys
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PasswordlessForm />
                    </CardContent>
                </CardComponent>
            </div>
        </main>
    );
}
