import CardComponent from "@/components/card/card";
import {CardContent} from "@/components/ui/card";
import {cookies} from "next/headers";
import React from "react";
import styles from "./style.module.css";
import ProfileForm from "@/app/profile/form";
import { redirect } from "next/navigation";
import Link from "next/link";
import Button from "@/components/button/button";

export default async function Profile() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token?.value) {
        redirect('/auth/login')
    }

    // TODO: if the URL has no params, default to the current user (display own profile)
    // TODO: when there is a url param after /profile/ fetch it to the backend

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

    console.log(data)

    return (
        <main className={`${styles.page}`}>
            <div className={styles.card}>
                <h1>Hello {data.FirstName}!</h1>
                <h2>Welcome back.</h2>
                <CardComponent title={"Account information"} description={""}>
                    <CardContent>
                        <ProfileForm data={data}/>
                    </CardContent>
                </CardComponent>

            </div>
        </main>
    );
}
