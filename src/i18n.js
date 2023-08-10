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
                home_newgames_heading: 'New Games',
                home_newgames_button: 'Reserve',
                home_signup_heading: 'Board game renting platform',
                home_signup_paragraph:
                    "If you're unsure about investing in a board game, worry not! MEEPLEY offers a convenient rental service, allowing you to try out games before making a commitment. Additionally, if you have board games gathering dust on your shelves, you can also sell or trade them within our community.",
                home_signup_paragraph_bottom:
                    "To join our bustling community of board game enthusiasts, simply sign up for a free account on our website. Once you're in, you'll have access to all our fantastic features and be able to engage with fellow gamers who share the same love for tabletop gaming.",
                home_signup_button: 'Sign in',
                home_services_heading: 'Online Services',
                home_services_paragraph:
                    "Get in-depth insights and reviews from our team of expert gamers. We'll help you make informed decisions about which board games are worth your time and money. Additionally, we offer comprehensive guides for beginners, ensuring everyone can jump into the board game world with confidence.",
                home_services_paragraph_bottom:
                    "Come, embark on an exciting journey through the world of board games with us. Whether you're here to find your next favorite game, discuss tactics, or make new friends, MEEPLEY is the ultimate destination for all your board game needs. Let's roll the dice and have some fun!",
                home_services_button: 'Sign in',
                home_forum_heading: 'Friendly Community',
                home_forum_paragraph:
                    'Connect with fellow board game enthusiasts in our lively forums. Share your experiences, strategies, and thoughts on different games, or seek recommendations and advice from seasoned players. Our forums are the heart of our community, fostering engaging discussions and lasting friendships.',
                home_forum_button: 'Forums',
                home_explore_heading: 'Explore Our Collection',
                home_explore_paragraph:
                    "Dive into our extensive collection of board games from various genres, eras, and complexities. From classic strategy games to modern cooperative adventures, we've curated a diverse assortment to cater to all tastes. Discover new games or revisit old favorites – the choice is yours!",
                home_explore_button: 'Explore all games',
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
                home_newgames_heading: 'Naujausi Žaidimai',
                home_newgames_button: 'Rezervuoti',
                home_signup_heading: 'Stalo žaidimų nuomos platforma',
                home_signup_paragraph:
                    'Jei nesate tikri, ar norite investuoti į stalo žaidimą, nesijaudinkite! MEEPLEY siūlo patogią žaidimų nuomos platformą, leidžiančią išbandyti žaidimus prieš įsipareigojant. Be to, jei jūsų lentynose yra žaidimų renkančių dulkes, galite juos parduoti ar išmainyti mūsų patogioje svetainėje.',
                home_signup_paragraph_bottom:
                    'Norėdami prisijungti prie mūsų šurmuliuojančios stalo žaidimų entuziastų bendruomenės, tiesiog užsiregistruokite ir gaukite nemokamą paskyrą mūsų svetainėje. Prisijungę turėsite prieigą prie visų mūsų paslaugų ir galėsite bendrauti su kitais žaidėjais, kurie taip pat mėgsta žaidimus kaip ir jūs.',
                home_signup_button: 'Prisijungti',
                home_services_heading: 'Internetinės paslaugos',
                home_services_paragraph:
                    'Gaukite išsamių įžvalgų ir patarimų iš mūsų profesionalių žaidėjų komandos. Padėsime priimti pagrįstus sprendimus, kurie stalo žaidimai yra verti jūsų laiko ir pinigų. Be to, siūlome išsamius vadovus pradedantiesiems, užtikrinančius, kad kiekvienas galėtų drąsiai žengti į nepakartojamą hobį.',
                home_services_paragraph_bottom:
                    'Ateik ir leiskis į įdomią kelionę po stalo žaidimų pasaulį su mumis. Nesvarbu, ar esate čia norėdami rasti kitą mėgstamą žaidimą, aptarti taktiką ar susirasti naujų draugų, MEEPLEY yra puiki vieta visiems jūsų hobio poreikiams. Meskime kauliukus ir linksminkimės!',
                home_services_button: 'Prisijungti',
                home_forum_heading: 'Draugiška Bendruomenė',
                home_forum_paragraph:
                    'Susisiekite su bendraminčiais stalo žaidimų entuziastais mūsų gyvuose forumuose. Pasidalinkite savo patirtimi, strategijomis ir mintimis apie skirtingus žaidimus arba klauskite patyrusių žaidėjų rekomendacijų ir patarimų. Mūsų forumai yra mūsų bendruomenės širdis, skatinanti įdomias diskusijas ir ilgalaikes draugystes.',
                home_forum_button: 'Forumas',
                home_explore_heading: 'Atraskite mūsų kolekciją',
                home_explore_paragraph:
                    'Pasinerkite į mūsų didelę įvairių žanrų, epochų ir sudėtingumo kolekciją. Nuo klasikinių strateginių žaidimų iki šiuolaikinių kooperatyvinių nuotykių – mes sukūrėme įvairų asortimentą, kuris patenkins bet kokį skonį. Atraskite naujų žaidimų arba peržiūrėkite senus mėgstamiausius – jums rinktis.',
                home_explore_button: 'Peržiūrėti visus žaidimus',
            },
        },
    },
});

export default i18n;
