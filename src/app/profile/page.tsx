import CardComponent from "@/components/card/card";
import { Card, CardContent } from "@/components/ui/card";
import { cookies } from "next/headers";
import React from "react";
import styles from "./style.module.css";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "postcss";
import { Button } from "@/components/ui/button";

interface ProfileData {
  // id: UUID,
  createdAt: Date,
  associatedAt: Date;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  admissionCode: string;
  permanentCode: string;
  // Address address;
  groups: Array<number>;
  email: string;
  recoveryEmail: string;
  // AccountStatus status;
  // Roles role;
}

export default async function Profile() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": token?.value,
      }
    });

    let data = await response.json();
    console.log(data)

    return (
    <main className={`${styles.page} cool_background`}>
        <div className={styles.card}>
            <h1>Hello {data.firstName}!</h1>
            <h2>Welcome back.</h2>

            <CardComponent title={"Account information"} description={""}>
                <CardContent>
                <form className="space-y-8">
                                <FormField
                                    name="email"
                                    // control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormMessage/>
                                            {/* <FormControl>
                                                <Input id="email" placeholder="bob@courriel.com" {...field} />
                                            </FormControl> */}
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit">Submit</Button>
                            </form>
                </CardContent>

            </CardComponent>
            </div>
        </main>
    );
}
