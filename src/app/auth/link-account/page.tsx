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
    permanentCode: z.string().length(12, "The permanent code has a length of 12 characters."),
    admissionCode: z.string().length(7, "The admission code has a length of 7 characters."),
});

export function LinkAccountForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof emailPasswordFormSchema>>({
        resolver: zodResolver(emailPasswordFormSchema),
    })

    async function onSubmit(values: z.infer<typeof emailPasswordFormSchema>) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/account/login/email`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({permanentCode: values.permanentCode, admissionCode: values.admissionCode})
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
                    name="permanentCode"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Permanent code</FormLabel>
                            <FormMessage/>
                            <FormControl>
                                <Input id="permanentCode" placeholder="GRAB11010100" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="admissionCode"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Admission code</FormLabel>
                            <FormMessage/>
                            <FormControl>
                                <Input id="admissionCode" type={"password"} placeholder="1234567"  {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default function Register() {
    return (
        <main className={styles.page}>
            <div className={styles.card}>
                <CardComponent title={"Link your account"} description={"To use Chaquevoix, you need to link your account to your existing profile information."}>
                    <CardContent>
                        <LinkAccountForm/>
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
                                <Button>Next <MdNavigateNext className={"button_icon"}/></Button>
                            </Link>
                        </div>
                    </CardContent>
                </CardComponent>
            </div>
        </main>
    );
}
