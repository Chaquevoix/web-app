"use client";

import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import CardComponent from "@/components/card/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import styles from "./style.module.css";
import {Separator} from "@/components/ui/separator"
import React, {useState} from "react";
import {MdNavigateNext} from "react-icons/md";
import Link from "next/link";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import IconButton from "@/components/icon-button/icon-button";
import {Checkbox} from "@/components/ui/checkbox";

const emailPasswordFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "You need at least 8 characters in your password"),
    rememberMe: z.boolean().optional().default(false)
});

function setSessionCookie(token: string, expiration: Date) {
    document.cookie = `token=${token}; expires=${expiration.toUTCString()}; path=/`;
}

function EmailPasswordForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof emailPasswordFormSchema>>({
        resolver: zodResolver(emailPasswordFormSchema),
    })
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(values: z.infer<typeof emailPasswordFormSchema>) {
        setIsLoading(true);

        const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/account/login/email`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
                email: values.email,
                password: values.password,
                rememberMe: "" + values.rememberMe
            })
        })

        const result = response.then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })

        toast.promise(result, {
            loading: 'Loading...',
            success: (data) => {
                console.log(data)
                setSessionCookie(data.token, new Date(data.expires))

                setIsLoading(false);

                router.push("/profile");
                return `Welcome back!`;
            },
            error: (data) => {
                setIsLoading(false);

                switch (data.code) {
                    case "INCORRECT_CREDENTIALS":
                        return `Your credentials are incorrect. Make sure you did not make any mistakes.`;
                    default:
                        return `Unexpected authentication error: (${data.code})`;
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
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormMessage/>
                            <FormControl>
                                <Input id="email" placeholder="bob@courriel.com" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormMessage/>
                            <FormControl>
                                <Input id="password" type={"password"} placeholder="••••••••"  {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="rememberMe"
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Remember this device
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>Submit</Button>
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
    })

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
    return (
        <main className={`${styles.page} cool_background`}>
            <div className={styles.card}>
                <CardComponent title={"Email and password"} description={""}>
                    <CardContent>
                        <EmailPasswordForm/>
                    </CardContent>
                    <Separator/>
                    <CardHeader>
                        <CardTitle>Passkeys</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.form_row}>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type={"email"} placeholder="bob@courriel.com"/>
                        </div>
                        <div className={styles.form_row}>
                            <Link href={"/auth/check-email"}>
                                <IconButton text={"Next"} icon={<MdNavigateNext/>} iconPlacement={"right"}/>
                            </Link>
                        </div>
                    </CardContent>
                </CardComponent>
            </div>
        </main>
    );
}
