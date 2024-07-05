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
import IconButton from "@/components/icon-button/icon-button";
import { toast } from "sonner";

const emailPasswordFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.string().date(),
    permanentCode: z.string(),
    admissionCode: z.string()
});

function getToken(): string {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("token="),
    );
    return tokenCookie ? tokenCookie.split("=")[1] + "==" : "";
}

function LinkAccountForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof emailPasswordFormSchema>>({
        resolver: zodResolver(emailPasswordFormSchema),
    });
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(values: z.infer<typeof emailPasswordFormSchema>) {
        setIsLoading(true);

        const token = getToken();

        const response = fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/account/link`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    first_name: values.firstName,
                    last_name: values.lastName,
                    date_of_birth: values.dateOfBirth,
                    permanent_code: values.permanentCode,
                    admission_code: values.admissionCode,
                    token: token
                }),
            },
        );

        const result = response.then(async (response) => {
            if (!response.ok) {
                return response.json().then((err) => Promise.reject(err));
            }
            return Promise.resolve();
        });

        toast.promise(result, {
            loading: "Loading...",
            success: () => {
                setIsLoading(false);

                router.replace("/profile");
                return `Email confirmed successfully!`;
            },
            error: (data) => {
                setIsLoading(false);
                return `There was an error while trying to associate your account to the provided information. Please try again.`;
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormMessage />
                        <FormControl>
                            <Input
                                id="firstName"
                                placeholder="Bob"
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormMessage />
                        <FormControl>
                            <Input
                                id="lastName"
                                placeholder="Gratton"
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                name="dateOfBirth"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date of birth</FormLabel>
                        <FormMessage />
                        <FormControl>
                            <Input
                                id="dateOfBirth"
                                placeholder="1970-01-01"
                                type="date"
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
                <FormField
                    name="permanentCode"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Permanent code</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input
                                    id="permanentCode"
                                    placeholder="GRAB11010100"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="admissionCode"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Admission code</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input
                                    id="admissionCode"
                                    placeholder="1234567"
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

// TODO: Only allow this page if the user has confirmed their account (has a session token)
// TODO: Send session token in headers when sending the request to link the account

export default function LinkAccount() {
    return (
        <main className={`${styles.page} cool_background`}>
            <div className={styles.card}>
                <CardComponent
                    title={"Link your account"}
                    description={
                        "To use Chaquevoix, you need to link your account to your existing profile information."
                    }
                >
                    <CardContent>
                        <LinkAccountForm />
                    </CardContent>
                </CardComponent>
            </div>
        </main>
    );
}
