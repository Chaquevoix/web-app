"use client";

import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Form,
    FormControl,
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
import React from "react";
import {MdNavigateNext} from "react-icons/md";
import Link from "next/link";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {useRouter} from "next/navigation";

const emailPasswordFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "You need at least 8 characters in your password"),
    passwordConfirmation: z.string().min(8, "You need at least 8 characters in your password")
}).superRefine(({password, passwordConfirmation}, ctx) => {
    if (passwordConfirmation !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The password confirmation does not match the password.",
            path: ["passwordConfirmation"]
        });
    }
});

export function EmailPasswordForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof emailPasswordFormSchema>>({
        resolver: zodResolver(emailPasswordFormSchema),
    })

    async function onSubmit(values: z.infer<typeof emailPasswordFormSchema>) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/account/register/email`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({email: values.email, password: values.passwordConfirmation})
        })
            .then(response => {
                if (response.status == 200) {
                    router.push("/auth/check-email");
                }
            })
            .catch(err => console.error(err));
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
                    name="passwordConfirmation"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password confirmation</FormLabel>
                            <FormMessage/>
                            <FormControl>
                                <Input id="passwordConfirmation" type={"password"} placeholder="••••••••"  {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}


const passkeysFormSchema = z.object({
    email: z.string().email(),
});

export function PasskeyForm() {
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

export default function Register() {
    return (
        <main className={styles.page}>
            <div className={styles.card}>
                <CardComponent title={"Legacy"} description={"Register using an email and a password"}>
                    <CardContent>
                        <EmailPasswordForm/>
                    </CardContent>
                    <Separator/>
                    <CardHeader>
                        <CardTitle>Modern</CardTitle>
                        <CardDescription>Register using passkeys</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.form_row}>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type={"email"} placeholder="bob@courriel.com"/>
                        </div>
                        <div className={styles.form_row}>
                            <Link href={"/auth/check-email"}>
                                <Button>Next <MdNavigateNext className={"button_icon"}/></Button>
                            </Link>
                        </div>
                    </CardContent>
                </CardComponent>
            </div>
        </main>
    );
}
