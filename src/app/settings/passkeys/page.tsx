import CardComponent from "@/components/card/card";
import {CardContent} from "@/components/ui/card";
import {cookies} from "next/headers";
import React from "react";
import styles from "./style.module.css";
import PasskeysForm from "@/app/settings/passkeys/form";
import { redirect } from "next/navigation";

export default async function PasskeysPage() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token?.value) {
        redirect('/auth/login')
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": token?.value,
            }
        },
    );

    let data: ProfileData = await response.json();

    return (
        <main className={`${styles.page}`}>
            <div className={styles.card}>
                <h1>Passkeys</h1>
                <h2>Manage your passkeys for secure, passwordless authentication.</h2>
                <CardComponent 
                    title={"Your Passkeys"} 
                    description={"Add and manage passkeys for this account"}
                >
                    <CardContent>
                        <PasskeysForm data={data} token={token.value} />
                    </CardContent>
                </CardComponent>
            </div>
        </main>
    );
}