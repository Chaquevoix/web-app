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

export default async function Profile() {
    // const t = useTranslations("Login");
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token?.value) {
        redirect('/auth/login')
    }

    // TODO: if the URL has no params, default to the current user (display own profile)
    // TODO: when there is a url param after /profile/ fetch it to the backend

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
            <h1>DASHBORD</h1>

            <div className={styles.cards_list}>
                <CardComponent title="Courses">
                    {data.map(group => (
                        <div key={group.GroupID} >
                            <Separator/>

                            <div className={styles.course_entry}>
                                <div className={styles.course_entry_text}>
                                    <h2 className={styles.course_name}>{group.CourseName}</h2>
                                    <CardDescription>{group.CourseCode} - Group {group.GroupNumber}</CardDescription>
                                    <CardDescription>{group.TeacherFirstName} {group.TeacherLastName}</CardDescription>
                                </div>
                                <div className={styles.course_entry_button}>
                                    <Link href={`/dashboard/group/${group.GroupID}`} className={buttonVariants({ variant: "link" })}>
                                        <span>Go</span>
                                        <span className={styles.icon_right}><MdNavigateNext /></span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    ))}
                </CardComponent>


            </div>
        </main>
    );
}
