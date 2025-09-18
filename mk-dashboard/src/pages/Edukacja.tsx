import Card from "../components/Card";
import { appStyles } from "../theme";
import { GMINY } from "../data/bdl";
import {
  budzetInfrastrukturaOswiatyPerUczen2024,
  dzieciPrzedszkolne3_5Lat,
  liczbaSzkolPodstawowych2024,
} from "../data/edukacja";
import {
  wynikiOsmoklasPolski2024,
  wynikiOsmoklasMatematyka2024,
  MK_wynikMaturaMatematyka,
  MK_wynikMaturaPolski,
} from "../data/edukacja";
import { MK_budzetInwestycjeOswiata } from "../data/edukacja";
import { LATA } from "../data/utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Edukacja() {
  return (
    <div style={appStyles.page}>
      <h2 style={{ margin: "4px 0 8px" }}>Edukacja</h2>

      <Card
        title="Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z jakości edukacji [%]"
        subtitle="Źródło: ArcGIS Experience"
        height={840}
      >
        <div style={{ height: 760 }}>
          <iframe
            title="Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z jakości edukacji [%]"
            src="https://experience.arcgis.com/experience/d174d0e98bae40039c667978707468ac/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Średni wynik egzaminów maturalnych w stopniu podstawowym z matematyki w 2024 r. [%]"
        subtitle="Źródło: CKE"
        height={560}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Kraków", wynik: 70.71 },
                { gmina: "Zielonki", wynik: 69.85 },
                { gmina: "Wielka Wieś", wynik: 68.1 },
                { gmina: "Zabierzów", wynik: 67.77 },
                { gmina: "Świątniki Górne", wynik: 67.78 },
                { gmina: "Biskupice", wynik: 67.1 },
                { gmina: "Mogilany", wynik: 66.9 },
                { gmina: "Wieliczka", wynik: 65.44 },
                { gmina: "Czernichów", wynik: 63.7 },
                { gmina: "Liszki", wynik: 62.58 },
                { gmina: "Kocmyrzów-Luborzyca", wynik: 60.19 },
                { gmina: "Skawina", wynik: 59.14 },
                { gmina: "Michałowice", wynik: 58.7 },
                { gmina: "Igołomia-Wawrzeńczyce", wynik: 57.31 },
                { gmina: "Niepołomice", wynik: 55.35 },
              ]
                .slice()
                .sort((a, b) => b.wynik - a.wynik)}
              margin={{ top: 8, right: 8, bottom: 84, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="gmina"
                angle={-35}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis unit="%" />
              <Tooltip formatter={(v: number) => [`${v}%`, "średni wynik"]} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="wynik"
                name="Średni wynik egzaminów maturalnych z matematyki w 2024 r. [%]"
                fill="rgb(197, 59, 0)"
                label={{ position: "top", fontSize: 12, fill: "#333" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Średni wynik egzaminów maturalnych w stopniu podstawowym z języka polskiego w 2024 r. [%]"
        subtitle="Źródło: CKE"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Kraków", wynik: 74.21 },
                { gmina: "Kocmyrzów-Luborzyca", wynik: 73.5 },
                { gmina: "Zielonki", wynik: 72.85 },
                { gmina: "Czernichów", wynik: 70.92 },
                { gmina: "Świątniki Górne", wynik: 69.93 },
                { gmina: "Mogilany", wynik: 69.99 },
                { gmina: "Wielka Wieś", wynik: 69.04 },
                { gmina: "Liszki", wynik: 68.11 },
                { gmina: "Biskupice", wynik: 67.31 },
                { gmina: "Wieliczka", wynik: 67.31 },
                { gmina: "Zabierzów", wynik: 66.47 },
                { gmina: "Igołomia-Wawrzeńczyce", wynik: 63.83 },
                { gmina: "Skawina", wynik: 63.09 },
                { gmina: "Niepołomice", wynik: 61.15 },
                { gmina: "Michałowice", wynik: 60.82 },
              ]
                .slice()
                .sort((a, b) => b.wynik - a.wynik)}
              margin={{ top: 8, right: 8, bottom: 84, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="gmina"
                angle={-35}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis unit="%" />
              <Tooltip formatter={(v: number) => [`${v}%`, "średni wynik"]} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="wynik"
                name="Średni wynik egzaminów maturalnych z języka polskiego w 2024 r. [%]"
                fill="rgb(244, 76, 0)"
                label={{ position: "top", fontSize: 12, fill: "#333" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Środki przeznaczone na inwestycję, doposażenie i modernizację infrastruktury oświaty w 2024 roku"
        subtitle="Źródło: zestawienie budżetowe"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Kraków", kwota: 54216533.0 },
                { gmina: "Liszki", kwota: 29044584.46 },
                { gmina: "Wieliczka", kwota: 19968529.4 },
                { gmina: "Wielka Wieś", kwota: 8097479.43 },
                { gmina: "Kocmyrzów-Luborzyca", kwota: 6763383.69 },
                { gmina: "Biskupice", kwota: 4722501.98 },
                { gmina: "Świątniki Górne", kwota: 4199803.71 },
                { gmina: "Czernichów", kwota: 2609291.14 },
                { gmina: "Skawina", kwota: 2342207.06 },
                { gmina: "Zielonki", kwota: 1355049.66 },
                { gmina: "Mogilany", kwota: 959757.23 },
                { gmina: "Niepołomice", kwota: 683352.27 },
                { gmina: "Michałowice", kwota: 418611.82 },
                { gmina: "Igołomia-Wawrzeńczyce", kwota: 114309.33 },
                { gmina: "Zabierzów", kwota: 3070.54 },
              ]
                .slice()
                .sort((a, b) => b.kwota - a.kwota)}
              margin={{ top: 8, right: 8, bottom: 84, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="gmina"
                angle={-35}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat("pl-PL", {
                    notation: "compact",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  }).format(value)
                }
              />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "środki [zł]",
                ]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="kwota"
                name="Środki przeznaczone na inwestycję, doposażenie i modernizację infrastruktury oświaty w 2024 r. [zł]"
                fill="rgb(197, 59, 0)"
                label={{
                  position: "top",
                  fontSize: 12,
                  fill: "#333",
                  formatter: (value: number) =>
                    `${(value / 1000000).toFixed(1)}M`,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Budżet gminy przeznaczony na inwestycje, doposażenie i modernizację infrastruktury oświaty w przeliczeniu na 1 ucznia [zł]"
        subtitle="Źródło: Załączone dane (2024)"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={GMINY.map((gmina) => ({
                gmina,
                kwota: budzetInfrastrukturaOswiatyPerUczen2024[gmina],
              })).sort((a, b) => b.kwota - a.kwota)}
              margin={{ top: 8, right: 8, bottom: 84, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="gmina"
                angle={-35}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis unit=" zł" />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "zł / uczeń",
                ]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="kwota"
                name="2024 [zł / uczeń]"
                fill="rgb(244, 76, 0)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba dzieci w wieku przedszkolnym (3–5 lat) w Metropolii Krakowskiej w latach 2019–2024"
        subtitle="Źródło: BDL GUS (VI.1)"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={LATA.map((rok) => ({
                rok: String(rok),
                liczba: GMINY.reduce(
                  (sum, g) => sum + (dzieciPrzedszkolne3_5Lat[g][rok] || 0),
                  0
                ),
              }))}
              margin={{ top: 24, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis domain={["dataMin - 5000", "dataMax + 5000"]} />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "dzieci 3–5 lat",
                ]}
              />
              <Legend />
              <Bar
                dataKey="liczba"
                name="Liczba dzieci w wieku przedszkolnym (3–5 lat) w Metropolii Krakowskiej (liczba dzieci)"
                fill="rgb(197, 59, 0)"
                label={{
                  position: "top",
                  fontSize: 12,
                  fill: "#333",
                  formatter: (v: number) =>
                    new Intl.NumberFormat("pl-PL").format(v),
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba szkół podstawowych w podziale na gminy w 2024 r."
        subtitle="Źródło: RSiPO (2024)"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Kraków-Podgórze", liczba: 75 },
                { gmina: "Kraków-Krowodrza", liczba: 47 },
                { gmina: "Kraków-Śródmieście", liczba: 43 },
                { gmina: "Kraków-Nowa Huta", liczba: 41 },
                { gmina: "Wieliczka", liczba: 29 },
                { gmina: "Skawina", liczba: 21 },
                { gmina: "Zabierzów", liczba: 12 },
                { gmina: "Niepołomice", liczba: 12 },
                { gmina: "Liszki", liczba: 11 },
                { gmina: "Czernichów", liczba: 9 },
                { gmina: "Kocmyrzów-Luborzyca", liczba: 9 },
                { gmina: "Mogilany", liczba: 7 },
                { gmina: "Biskupice", liczba: 6 },
                { gmina: "Słomniki", liczba: 6 },
                { gmina: "Wielka Wieś", liczba: 6 },
                { gmina: "Zielonki", liczba: 6 },
                { gmina: "Świątniki Górne", liczba: 6 },
                { gmina: "Igołomia-Wawrzeńczyce", liczba: 4 },
                { gmina: "Michałowice", liczba: 3 },
              ].sort((a, b) => b.liczba - a.liczba)}
              margin={{ top: 8, right: 8, bottom: 84, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="gmina"
                angle={-35}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis />
              <Tooltip
                formatter={(v: number) => [String(v), "szkoły podstawowe"]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="liczba"
                name="Liczba szkół podstawowych w 2024 r. (liczba szkół)"
                fill="rgb(244, 76, 0)"
                label={{ position: "top", fontSize: 12, fill: "#333" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Średni wynik egzaminu ósmoklasisty z języka polskiego w gminach Metropolii Krakowskiej w 2024 r."
        subtitle="Źródło: OKE Kraków (2024)"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={GMINY.map((gmina) => ({
                gmina,
                wynik: wynikiOsmoklasPolski2024[gmina],
              })).sort((a, b) => b.wynik - a.wynik)}
              margin={{ top: 8, right: 8, bottom: 84, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="gmina"
                angle={-35}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis unit=" %" />
              <Tooltip formatter={(v: number) => [`${v}%`, "średni wynik"]} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="wynik"
                name="Średni wynik egzaminu ósmoklasisty z języka polskiego w 2024 r. [%]"
                fill="rgb(197, 59, 0)"
                label={{ position: "top", fontSize: 12, fill: "#333" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Średni wynik egzaminu ósmoklasisty z matematyki w gminach Metropolii Krakowskiej w 2024 r."
        subtitle="Źródło: OKE Kraków (2024)"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={GMINY.map((gmina) => ({
                gmina,
                wynik: wynikiOsmoklasMatematyka2024[gmina],
              })).sort((a, b) => b.wynik - a.wynik)}
              margin={{ top: 8, right: 8, bottom: 84, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="gmina"
                angle={-35}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis unit=" %" />
              <Tooltip formatter={(v: number) => [`${v}%`, "średni wynik"]} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="wynik"
                name="Średni wynik egzaminu ósmoklasisty z matematyki w 2024 r. [%]"
                fill="rgb(244, 76, 0)"
                label={{ position: "top", fontSize: 12, fill: "#333" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
