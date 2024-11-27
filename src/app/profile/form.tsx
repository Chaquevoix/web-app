"use client"

import React from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import Button from "@/components/button/button";

interface Props {
    data: ProfileData
}

const profileFormSchema = z.object({
    email: z.string().email().optional(),
});

export default function ProfileForm(props: Props) {
    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
    })

    function onSubmit(values: z.infer<typeof profileFormSchema>) {
        // fetch(`${process.env.API_URL}/auth/account/register/email`, {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        //     body: new URLSearchParams({email: values.email})
        // })
        //     .then(response => response.json())
        //     .then(response => console.log(response))
        //     .catch(err => console.error(err));
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
                                <Input id="email" placeholder="bob@courriel.com" {...field}
                                       defaultValue={props.data.Email}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                {/*<Button type="submit" disabled={isLoading}>Submit</Button>*/}
                <Button
                    type="submit"
                    text="Submit"
                />
            </form>
        </Form>
    );
}
