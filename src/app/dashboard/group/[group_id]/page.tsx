import CardComponent from "@/components/card/card";
import {CardContent, CardDescription} from "@/components/ui/card";
import {cookies} from "next/headers";
import React from "react";
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


interface GroupsResponse {
    GroupID: UUID
    GroupNumber: number,
    TeacherFirstName: string,
    TeacherLastName: string,
    CourseCode: string,
    CourseName: string
}

export default async function Group({
  params,
}: {
  params: Promise<{ group_id: string }>
}) {
    const urlParams = await params

    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token?.value) {
        redirect('/auth/login')
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/groups`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": token?.value,
            }
        },
    );

    let data: GroupsResponse[] = await response.json();

    return (
        <main className={`${styles.page}`}>
            <h1>GROUPE { urlParams.group_id }</h1>
        </main>
    );
}
