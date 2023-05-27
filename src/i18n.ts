import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            login_success: "Login successful.",
            login_fail: {
                no_user: "This account does not exist.",
                wrong_password: "Wrong password."
            },
            form: {
                email: "Email",
                password: "Password",
                empty_required_field: "This field cannot be empty.",
                bad_email: "This is not a valid email.",
                submit: "Submit",
            },
            register : {
                form: {
                    confirm_email_invalid: "The two emails you entered do not match.",
                    confirm_password_invalid: "The two passwords you entered do not match.",
                    err_weak_password: "The password you entered is too weak.",
                    err_already_in_use: "The email you entered is already registered.",
                    permanent_code: "Permanent code",
                    admission_number: "Admission number"
                },
            },
            user_not_logged_in: "You must be logged in to see this.",
            user_not_enough_permission: "You do not have the permission to view this.",
        }
    },
    fr: {
        translation: {
            login_success: "Connecté.",
            login_fail: {
                no_user: "Le compte n'existe pas",
                wrong_password: "Mot de passe incorrect."
            },
            form: {
                email: "Courriel",
                password: "Mot de passe",
                empty_required_field: "Ce champ ne peut pas être vide.",
                bad_email: "Ce courriel n'est pas valide.",
                submit: "Envoyer",
            },
            user_not_logged_in: "Vous devez être connecté pour faire ceci.",
            user_not_enough_permission: "Vous n'avez pas la permission de faire ceci.",
        }
    }
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: "en", 
        // you can use the i18n.changeLanguage function to change the 
        // language manually: https://www.i18next.com/overview/api#changelanguage
    });

export default i18n;