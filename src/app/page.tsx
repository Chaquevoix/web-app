import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations("Home");
    return <main>{t("text")}</main>;
}
