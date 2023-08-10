import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                navigation_home: 'Home',
                navigation_games: 'Games',
                navigation_account: 'Acccount',
                navigation_admin: 'Admin',
                navigation_login: 'Login',
                navigation_logout: 'Logout',

                home_hero_heading: 'Board game renting platform',
                home_hero_paragraph:
                    "Welcome to MEEPLEY, a delightful online platform dedicated to all things board games! If you're a passionate board game enthusiast like us, this is the perfect place for you to indulge in your hobby and connect with a vibrant community of like-minded gamers.",
                home_hero_button: 'See top games',
            },
        },
        lt: {
            translation: {
                navigation_home: 'Pagrindinis',
                navigation_games: 'Žaidimai',
                navigation_account: 'Paskyra',
                navigation_admin: 'Administratorius',
                navigation_login: 'Prisijungti',
                navigation_logout: 'Atsijungti',

                home_hero_heading: 'Stalo žaidimų nuomos platforma',
                home_hero_paragraph:
                    'Sveiki atvykę į MEEPLEY – nuostabią internetinę platformą, skirtą visiems mylintiems stalo žaidimus! Jei esate aistringas stalo žaidimų entuziastas, kaip ir mes, tai puiki vieta užsiimti savo pomėgiu ir užmegzti ryšį su gyvybinga panašiai mąstančių žaidėjų bendruomene.',
                home_hero_button: 'Populiariausi žaidimai',
            },
        },
    },
});

export default i18n;
