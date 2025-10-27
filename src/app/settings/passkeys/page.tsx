import CardComponent from "@/components/card/card";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {cookies} from "next/headers";
import React from "react";
import styles from "./style.module.css";
import PasskeysForm from "@/app/settings/passkeys/form";
import { redirect } from "next/navigation";
import { listPasskeys } from "@/lib/passkey";
import { Separator } from "@/components/ui/separator";
import PasskeyList from "./list";

export default async function PasskeysPage() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token?.value) {
        redirect('/auth/login')
    }

    const passkeys = await listPasskeys(token.value);

    return (
        <main className={`${styles.page}`}>
            <div className={styles.card}>
                <CardComponent
                    title={"Add New Passkey"}
                    description={"Register a new passkey for this account"}
                >
                    <CardContent>
                        <PasskeysForm token={token.value} />
                    </CardContent>
                    <Separator />
                    <CardHeader>
                        <CardTitle>Manage passkeys</CardTitle>
                        <CardDescription>
                          Update or delete existing passkeys.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PasskeyList passkeys={passkeys} />
                    </CardContent>
                </CardComponent>
            </div>
        </main>
    );
}
