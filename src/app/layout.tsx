import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import HeaderBar from "@/components/header-bar/header-bar";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chaquevoix",
    description: "",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();

    const cookieStore = cookies();
    return (
        <html lang={locale}>
            <NextIntlClientProvider messages={messages}>
                <Toaster position="top-center" richColors />
                <body
                    className={inter.className}
                    style={{ marginTop: "var(--header-bar-heigth)" }}
                >
                    <HeaderBar />
                    {children}
                </body>
            </NextIntlClientProvider>
        </html>
    );
}
