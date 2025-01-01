import CardComponent from "@/components/card/card";
import {CardContent, CardDescription} from "@/components/ui/card";
import {cookies} from "next/headers";
import React, { Suspense } from "react";
import styles from "./style.module.css";
import ProfileForm from "@/app/profile/form";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { UUID } from "crypto";
import { Separator } from "@/components/ui/separator";
import IconButton from "@/components/icon-button/icon-button";
import { MdNavigateNext } from "react-icons/md";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/shadButton";
import GroupListItem from "./GroupsList";
import LoadingSpinner from "@/components/loading-spinner/loading-spinner";
import {Spinner} from "@nextui-org/spinner";

export default async function Profile() {
    // const t = useTranslations("Login");
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token?.value) {
        redirect('/auth/login')
    }

    // TODO: if the URL has no params, default to the current user (display own profile)
    // TODO: when there is a url param after /profile/ fetch it to the backend

    return (
        <main className={`${styles.page}`}>
            <h1>DASHBORD</h1>

            <div >
                <LoadingSpinner />
            </div>

            <div className={styles.cards_list}>
                <CardComponent title="Courses">
                    <Suspense fallback={<Spinner/>}>
                        <GroupListItem token={ token?.value } />
                    </Suspense>
                </CardComponent>
            </div>
        </main>
    );
}
