import Card from "../components/Card";
import { appStyles, mkColors } from "../theme";
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
        height={540}
      >
        <div style={{ height: 460 }}>
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
        title="Średni wynik egzaminów maturalnych w stopniu podstawowym z matematyki [%] w latach 2019–2024"
        subtitle="Cała Metropolia — Źródło: CKE"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={LATA.map((rok) => ({
                rok: String(rok),
                wynik: MK_wynikMaturaMatematyka[rok],
              }))}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis unit=" %" />
              <Tooltip
                formatter={(v: number) => [`${v}%`, "średni wynik MK"]}
              />
              <Legend />
              <Bar
                dataKey="wynik"
                name="MK — matematyka [%]"
                fill={mkColors.primaryNavy}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Średni wynik egzaminów maturalnych w stopniu podstawowym z języka polskiego [%] w latach 2019–2024"
        subtitle="Cała Metropolia — Źródło: CKE"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={LATA.map((rok) => ({
                rok: String(rok),
                wynik: MK_wynikMaturaPolski[rok],
              }))}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis unit=" %" />
              <Tooltip
                formatter={(v: number) => [`${v}%`, "średni wynik MK"]}
              />
              <Legend />
              <Bar
                dataKey="wynik"
                name="MK — język polski [%]"
                fill={mkColors.primaryNavy}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Środki przeznaczone na inwestycję, doposażenie i modernizację infrastruktury oświaty w latach 2019–2024"
        subtitle="Cała Metropolia — Źródło: zestawienie budżetowe"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={LATA.map((rok) => ({
                rok: String(rok),
                kwota: MK_budzetInwestycjeOswiata[rok],
              }))}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis unit=" zł" />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "środki MK",
                ]}
              />
              <Legend />
              <Bar
                dataKey="kwota"
                name="MK — środki [zł]"
                fill={mkColors.primaryNavy}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Budżet gminy przeznaczony na inwestycje, doposażenie i modernizację infrastruktury oświaty w przeliczeniu na 1 ucznia [zł]"
        subtitle="Gminy — Źródło: Załączone dane (2024)"
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
                fill={mkColors.primaryNavy}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba dzieci w wieku przedszkolnym (3–5 lat) w Metropolii Krakowskiej w latach 2019–2024"
        subtitle="Suma gmin — Źródło: BDL GUS (VI.1)"
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
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "dzieci 3–5 lat",
                ]}
              />
              <Legend />
              <Bar
                dataKey="liczba"
                name="MK — dzieci 3–5 lat [osoba]"
                fill={mkColors.primaryNavy}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba szkół podstawowych w podziale na gminy w 2024 r."
        subtitle="Gminy — Źródło: RSiPO (2024)"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={GMINY.map((gmina) => ({
                gmina,
                liczba: liczbaSzkolPodstawowych2024[gmina],
              })).sort((a, b) => b.liczba - a.liczba)}
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
                name="2024 [liczba szkół]"
                fill={mkColors.primaryNavy}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Średni wynik egzaminu ósmoklasisty z języka polskiego w gminach Metropolii Krakowskiej w 2024 r."
        subtitle="Gminy — Źródło: OKE Kraków (2024)"
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
                name="2024 [%]"
                fill={mkColors.primaryNavy}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Średni wynik egzaminu ósmoklasisty z matematyki w gminach Metropolii Krakowskiej w 2024 r."
        subtitle="Gminy — Źródło: OKE Kraków (2024)"
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
                name="2024 [%]"
                fill={mkColors.primaryNavy}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
