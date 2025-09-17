import Card from "../components/Card";
import { appStyles } from "../theme";
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

export default function SrodowiskoPrzestrzen() {
  return (
    <div style={appStyles.page}>
      <h2 style={{ margin: "4px 0 8px" }}>Środowisko i przestrzeń</h2>

      <Card
        title="Ilość odebranych odpadów komunalnych przypadająca na 1 mieszkańca [kg]"
        subtitle="Źródło: ArcGIS Experience"
        height={540}
      >
        <div style={{ height: 460 }}>
          <iframe
            title="Ilość odebranych odpadów komunalnych przypadająca na 1 mieszkańca [kg]"
            src="https://experience.arcgis.com/experience/7d0ef674f28046cc96aeb83fa7a89b0c/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 12 }} />
      <Card
        title="Redukcja emisji pyłu PM2,5 [Mg] 2024"
        subtitle="Źródło: ArcGIS Experience"
        height={540}
      >
        <div style={{ height: 460 }}>
          <iframe
            title="Redukcja emisji pyłu PM2,5 [Mg] 2024"
            src="https://experience.arcgis.com/experience/2cd7bc91e15148b59c6f5342b24e7f00/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Poziom recyklingu i przygotowania do ponownego użycia odpadów w gminach w 2024 roku [%]"
        subtitle="Gminy — Źródło: BDL GUS"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Igołomia-Wawrzeńczyce", poziom: 67.52 },
                { gmina: "Liszki", poziom: 66.14 },
                { gmina: "Wielka Wieś", poziom: 56.9 },
                { gmina: "Czernichów", poziom: 52.96 },
                { gmina: "Zabierzów", poziom: 52.86 },
                { gmina: "Zielonki", poziom: 52.17 },
                { gmina: "Kraków", poziom: 52.33 },
                { gmina: "Skawina", poziom: 51.35 },
                { gmina: "Mogilany", poziom: 48.21 },
                { gmina: "Michałowice", poziom: 49.06 },
                { gmina: "Niepołomice", poziom: 46.27 },
                { gmina: "Kocmyrzów-Luborzyca", poziom: 46.31 },
                { gmina: "Biskupice", poziom: 45.77 },
                { gmina: "Świątniki Górne", poziom: 45.84 },
                { gmina: "Wieliczka", poziom: 25 },
              ]
                .slice()
                .sort((a, b) => b.poziom - a.poziom)}
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
              <Tooltip formatter={(v: number) => [`${v}%`, "poziom"]} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar dataKey="poziom" name="2024 [%]" fill="rgb(149, 193, 31)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Redukcja emisji pyłu PM10 w 2024 r. [Mg]"
        subtitle="Gminy — Źródło: Program ochrony powietrza (raport 2024)"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Czernichów", pm10: 11.07 },
                { gmina: "Igołomia-Wawrzeńczyce", pm10: 1.89 },
                { gmina: "Kocmyrzów-Luborzyca", pm10: 3.07 },
                { gmina: "Liszki", pm10: 2.94 },
                { gmina: "Michałowice", pm10: 4.57 },
                { gmina: "Mogilany", pm10: 1.34 },
                { gmina: "Skawina", pm10: 2.45 },
                { gmina: "Świątniki Górne", pm10: 3.45 },
                { gmina: "Wielka Wieś", pm10: 3.2 },
                { gmina: "Zabierzów", pm10: 5.49 },
                { gmina: "Zielonki", pm10: 3.23 },
                { gmina: "Biskupice", pm10: 4.14 },
                { gmina: "Niepołomice", pm10: 3.52 },
                { gmina: "Wieliczka", pm10: 12.87 },
                { gmina: "Kraków", pm10: 2.07 },
              ]
                .slice()
                .sort((a, b) => b.pm10 - a.pm10)}
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
              <YAxis unit=" Mg" />
              <Tooltip
                formatter={(v: number) => [v.toString(), "redukcja PM10"]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar dataKey="pm10" name="2024 [Mg]" fill="rgb(58, 142, 20)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba mieszkań oddanych do użytkowania na 10 tys. mieszkańców w 2024 r."
        subtitle="Gminy — Źródło: BDL GUS"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Wieliczka", wartosc: 118.4 },
                { gmina: "Kraków", wartosc: 107.1 },
                { gmina: "Biskupice", wartosc: 93.7 },
                { gmina: "Niepołomice", wartosc: 84 },
                { gmina: "Kocmyrzów-Luborzyca", wartosc: 75.6 },
                { gmina: "Wielka Wieś", wartosc: 54.7 },
                { gmina: "Zabierzów", wartosc: 57.2 },
                { gmina: "Czernichów", wartosc: 51.8 },
                { gmina: "Michałowice", wartosc: 48.9 },
                { gmina: "Świątniki Górne", wartosc: 47.4 },
                { gmina: "Niepołomice", wartosc: 84 },
                { gmina: "Zielonki", wartosc: 43.6 },
                { gmina: "Mogilany", wartosc: 41.4 },
                { gmina: "Liszki", wartosc: 37.5 },
                { gmina: "Skawina", wartosc: 26.4 },
                { gmina: "Igołomia-Wawrzeńczyce", wartosc: 20.4 },
              ]
                .filter(
                  (v, i, arr) => arr.findIndex((x) => x.gmina === v.gmina) === i
                )
                .slice()
                .sort((a, b) => b.wartosc - a.wartosc)}
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
                formatter={(v: number) => [v.toString(), "na 10 tys. ludności"]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar dataKey="wartosc" name="2024" fill="rgb(149, 193, 31)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="% udział energii wyprodukowanej z OZE w ogólnej ilości energii zużytej (2024)"
        subtitle="Gminy — Źródło: Opracowanie własne"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Czernichów", oze: 100.0 },
                { gmina: "Biskupice", oze: 26.4 },
                { gmina: "Mogilany", oze: 10.0 },
                { gmina: "Igołomia-Wawrzeńczyce", oze: 5.0 },
                { gmina: "Kraków", oze: 4.83 },
                { gmina: "Michałowice", oze: 0.0 },
                { gmina: "Świątniki Górne", oze: 0.0 },
                { gmina: "Wieliczka", oze: 0.0 },
                { gmina: "Wielka Wieś", oze: 0.0 },
                { gmina: "Zabierzów", oze: 0.0 },
                { gmina: "Zielonki", oze: 0.0 },
              ]
                .slice()
                .sort((a, b) => b.oze - a.oze)}
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
              <Tooltip
                formatter={(v: number) => [
                  `${(v as number).toFixed(2)}%`,
                  "udział OZE",
                ]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar dataKey="oze" name="2024 [%]" fill="rgb(58, 142, 20)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
