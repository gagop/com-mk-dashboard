import type { Gmina, Rok } from './bdl'

// Budżet gminy przeznaczony na inwestycje, doposażenie i modernizację
// infrastruktury oświaty w przeliczeniu na 1 ucznia [zł] — rok 2024
// TODO: Zastąp wartości 0 danymi z załączonego pliku źródłowego
export const budzetInfrastrukturaOswiatyPerUczen2024: Record<Gmina, number> = {
  'Czernichów': 0,
  'Igołomia-Wawrzeńczyce': 0,
  'Kocmyrzów-Luborzyca': 0,
  'Liszki': 0,
  'Michałowice': 0,
  'Mogilany': 0,
  'Skawina': 0,
  'Świątniki Górne': 0,
  'Wielka Wieś': 0,
  'Zabierzów': 0,
  'Zielonki': 0,
  'Biskupice': 0,
  'Niepołomice': 0,
  'Wieliczka': 0,
  'Kraków': 0,
}

// Liczba dzieci w wieku przedszkolnym (3-5 lat) [osoba]
// Źródło: Bank Danych Lokalnych GUS — VI.1. Liczba dzieci w wieku przedszkolnym 3-5 lat (2019–2024)
export const dzieciPrzedszkolne3_5Lat: Record<Gmina, Record<Rok, number>> = {
  'Czernichów': { 2019: 465, 2020: 544, 2021: 533, 2022: 492, 2023: 486, 2024: 487 },
  'Igołomia-Wawrzeńczyce': { 2019: 232, 2020: 248, 2021: 262, 2022: 272, 2023: 271, 2024: 260 },
  'Kocmyrzów-Luborzyca': { 2019: 503, 2020: 670, 2021: 660, 2022: 641, 2023: 642, 2024: 656 },
  'Liszki': { 2019: 591, 2020: 670, 2021: 698, 2022: 730, 2023: 691, 2024: 671 },
  'Michałowice': { 2019: 378, 2020: 515, 2021: 529, 2022: 506, 2023: 507, 2024: 467 },
  'Mogilany': { 2019: 480, 2020: 589, 2021: 617, 2022: 623, 2023: 625, 2024: 569 },
  'Skawina': { 2019: 1405, 2020: 1492, 2021: 1521, 2022: 1486, 2023: 1471, 2024: 1353 },
  'Świątniki Górne': { 2019: 355, 2020: 445, 2021: 437, 2022: 428, 2023: 412, 2024: 364 },
  'Wielka Wieś': { 2019: 449, 2020: 699, 2021: 731, 2022: 782, 2023: 762, 2024: 766 },
  'Zabierzów': { 2019: 852, 2020: 1039, 2021: 1066, 2022: 1047, 2023: 1034, 2024: 979 },
  'Zielonki': { 2019: 839, 2020: 1100, 2021: 1177, 2022: 1152, 2023: 1133, 2024: 1059 },
  'Biskupice': { 2019: 365, 2020: 447, 2021: 482, 2022: 453, 2023: 451, 2024: 403 },
  'Niepołomice': { 2019: 1170, 2020: 1351, 2021: 1450, 2022: 1459, 2023: 1477, 2024: 1393 },
  'Wieliczka': { 2019: 2064, 2020: 2641, 2021: 2643, 2022: 2668, 2023: 2620, 2024: 2540 },
  'Kraków': { 2019: 24510, 2020: 24321, 2021: 24845, 2022: 24823, 2023: 24154, 2024: 24218 },
}

// Liczba szkół podstawowych (publiczne i niepubliczne) w 2024 r.
// Źródło: Rejestr Szkół i Placówek Oświatowych — Lokalizacja szkół podstawowych
// TODO: Uzupełnij wartości wg pliku źródłowego
export const liczbaSzkolPodstawowych2024: Record<Gmina, number> = {
  'Czernichów': 0,
  'Igołomia-Wawrzeńczyce': 0,
  'Kocmyrzów-Luborzyca': 0,
  'Liszki': 0,
  'Michałowice': 0,
  'Mogilany': 0,
  'Skawina': 0,
  'Świątniki Górne': 0,
  'Wielka Wieś': 0,
  'Zabierzów': 0,
  'Zielonki': 0,
  'Biskupice': 0,
  'Niepołomice': 0,
  'Wieliczka': 0,
  'Kraków': 0,
}

// Średni wynik egzaminu ósmoklasisty z języka polskiego w 2024 r. [%]
// Źródło: Okręgowa Komisja Egzaminacyjna w Krakowie — średnie wyniki (j. polski)
// Dla gmin miejsko-wiejskich obliczono średnią ważoną liczbą zdających (miasto/wieś)
export const wynikiOsmoklasPolski2024: Record<Gmina, number> = {
  'Biskupice': 67,
  'Czernichów': 71,
  'Igołomia-Wawrzeńczyce': 64,
  'Kocmyrzów-Luborzyca': 74,
  'Kraków': 74,
  'Liszki': 68,
  'Michałowice': 61,
  'Mogilany': 70,
  'Niepołomice': 60.9, // (88×57 + 110×64) / 198 ≈ 60.9
  'Skawina': 63,       // (112×63 + 120×63) / 232 = 63.0
  'Świątniki Górne': 70.3, // (46×71 + 26×69) / 72 ≈ 70.3
  'Wielka Wieś': 69,
  'Wieliczka': 67.5,   // (229×67 + 246×68) / 475 ≈ 67.5
  'Zabierzów': 66,
  'Zielonki': 73,
}

// Średni wynik egzaminu ósmoklasisty z matematyki w 2024 r. [%]
// Źródło: OKE Kraków — średnie wyniki (matematyka)
// Dla gmin miejsko-wiejskich zastosowano średnią ważoną liczbą zdających
export const wynikiOsmoklasMatematyka2024: Record<Gmina, number> = {
  'Biskupice': 67,
  'Czernichów': 64,
  'Igołomia-Wawrzeńczyce': 57,
  'Kocmyrzów-Luborzyca': 60,
  'Kraków': 71,
  'Liszki': 63,
  'Michałowice': 59,
  'Mogilany': 67,
  'Niepołomice': 55.4, // (88×51 + 110×59) / 198 ≈ 55.4
  'Skawina': 59.5,     // (112×59 + 120×60) / 232 ≈ 59.5
  'Świątniki Górne': 67.9, // (46×65 + 26×73) / 72 ≈ 67.9
  'Wielka Wieś': 68,
  'Wieliczka': 65.6,   // (230×63 + 245×68) / 475 ≈ 65.6
  'Zabierzów': 68,
  'Zielonki': 70,
}

// Średni wynik egzaminów maturalnych w stopniu podstawowym z matematyki [%]
// Cała Metropolia (MK) — 2019–2024. Obecnie uzupełnione dla 2024 (średnia ważona liczbą zdających).
export const MK_wynikMaturaMatematyka: Record<Rok, number> = {
  2019: 0,
  2020: 0,
  2021: 0,
  2022: 0,
  2023: 0,
  2024: 68.472425,
}

// Średni wynik egzaminów maturalnych w stopniu podstawowym z języka polskiego [%]
// Cała Metropolia (MK) — 2019–2024. Obecnie uzupełnione dla 2024 (średnia ważona liczbą zdających ≈ 71.94%).
export const MK_wynikMaturaPolski: Record<Rok, number> = {
  2019: 0,
  2020: 0,
  2021: 0,
  2022: 0,
  2023: 0,
  2024: 71.9418,
}

// Środki przeznaczone na inwestycje, doposażenie i modernizację infrastruktury oświaty — Cała MK [zł]
// Lata 2019–2024 — do uzupełnienia po agregacji danych z pliku źródłowego
export const MK_budzetInwestycjeOswiata: Record<Rok, number> = {
  2019: 0,
  2020: 0,
  2021: 0,
  2022: 0,
  2023: 0,
  2024: 0,
}


