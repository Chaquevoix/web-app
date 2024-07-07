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
    FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";
import { GoPasskeyFill } from "react-icons/go";

function setSessionCookie(token: string, expiration: Date) {
    document.cookie = `token=${token}; expires=${expiration.toUTCString()}; path=/`;
}

function EmailPasswordForm() {
    const t = useTranslations("Login");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const emailPasswordFormSchema = z.object({
        email: z.string().email(),
        password: z
            .string()
            .min(8, t('errors.password_min_characters'))
            .max(1024, t('errors.password_max_length')),
        rememberMe: z.boolean().optional().default(false),
    });

    const form = useForm<z.infer<typeof emailPasswordFormSchema>>({
        resolver: zodResolver(emailPasswordFormSchema),
    });

    async function onSubmit(values: z.infer<typeof emailPasswordFormSchema>) {
        setIsLoading(true);

        const response = fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/account/login/email`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    email: values.email,
                    password: values.password,
                    rememberMe: "" + values.rememberMe,
                }),
            },
        );

        const result = response.then(async (response) => {
            if (!response.ok) {
                const err = await response.json();
                return await Promise.reject(err);
            }
            return response.json();
        });

        toast.promise(result, {
            loading: t(''),
            success: (data) => {
                console.log(data);
                setSessionCookie(data.token, new Date(data.expires));

                setIsLoading(false);

                router.push("/profile");
                return t("login_success");
            },
            error: (data) => {
                setIsLoading(false);

                switch (data.code) {
                    case "INCORRECT_CREDENTIALS":
                        return t("errors.INCORRECT_CREDENTIALS");
                    default:
                        return t("errors.UNEXPECTED_ERROR", {
                            error: data.code,
                        });
                }
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
                            <FormLabel>{t("label_email")}</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input
                                    id="email"
                                    placeholder={t("email_hint")}
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
                            <FormLabel>{t("label_password")}</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input
                                    id="password"
                                    type={"password"}
                                    placeholder={t("email_hint")}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="rememberMe"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    {t("label_remember_device")}
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {t("label_login_button")}
                </Button>
            </form>
        </Form>
    );
}

const passkeysFormSchema = z.object({
    email: z.string().email(),
});

function PasskeyForm() {
    const form = useForm<z.infer<typeof passkeysFormSchema>>({
        resolver: zodResolver(passkeysFormSchema),
    });

    function onSubmit(values: z.infer<typeof passkeysFormSchema>) {
        // fetch(`${process.env.API_URL}/auth/account/register/email`, {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        //     body: new URLSearchParams({email: values.email})
        // })
        //     .then(response => response.json())
        //     .then(response => console.log(response))
        //     .catch(err => console.error(err));
    }
}

export default function Login() {
    const t = useTranslations("Login");

    return (
        <main className={`${styles.page} cool_background`}>
            <div className={styles.card}>
                <CardComponent title={t("title_card_login_password")}>
                    <CardContent>
                        <EmailPasswordForm />
                    </CardContent>
                    <Separator />
                    <br/>
                    <CardContent>
                        <Button variant="outline">
                            <GoPasskeyFill style={{ marginLeft: '0px', marginRight: '6px', fontSize: '120%' }} />{t('label_passkey_button')}
                        </Button>
                    </CardContent>

                </CardComponent>
            </div>
        </main>
    );
}
