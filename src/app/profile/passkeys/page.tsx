import CardComponent from "@/components/card/card";
import {CardContent} from "@/components/ui/card";
import {cookies} from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import PasskeysManager from "./PasskeysManager";

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
        <main className="flex min-h-screen flex-col items-center p-8">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-2">Passkeys</h1>
                <p className="text-muted-foreground mb-6">
                    Manage your passkeys for secure, passwordless authentication.
                </p>
                <CardComponent 
                    title="Your Passkeys" 
                    description="Add and manage passkeys for this account"
                >
                    <CardContent>
                        <PasskeysManager token={token.value} />
                    </CardContent>
                </CardComponent>
            </div>
        </main>
    );
}