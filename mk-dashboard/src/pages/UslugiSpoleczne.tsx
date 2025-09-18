import Card from "../components/Card";
import { appStyles } from "../theme";
import { GMINY } from "../data/bdl";
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
import { LineChart, Line } from "recharts";

export default function UslugiSpoleczne() {
  return (
    <div style={appStyles.page}>
      <h2 style={{ margin: "4px 0 8px" }}>Usługi społeczne</h2>

      <Card
        title="Lokalizacja żłobków"
        subtitle="Źródło: ArcGIS Experience"
        height={540}
      >
        <div style={{ height: 460 }}>
          <iframe
            title="Lokalizacja żłobków — Metropolia Krakowska"
            src="https://experience.arcgis.com/experience/6e225950c7b84b23a403dce49f5c4e5f/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba osób objętych świadczeniami w ramach programów polityki zdrowotnej [os.]"
        subtitle="Gminy — Źródło: Opracowanie własne (2024)"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { rok: "2019", liczba: 1 },
                { rok: "2020", liczba: 2 },
                { rok: "2021", liczba: 2 },
                { rok: "2022", liczba: 2 },
                { rok: "2023", liczba: 4 },
                { rok: "2024", liczba: 6 },
              ]}
              margin={{ top: 24, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "osoby",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="liczba"
                name="Liczba osób objętych świadczeniami w ramach programów polityki zdrowotnej"
                stroke="rgb(247, 183, 29)"
                strokeWidth={2}
                dot={{ r: 2 }}
                label={{
                  position: "top",
                  fontSize: 12,
                  fill: "#333",
                  formatter: (v: number) =>
                    new Intl.NumberFormat("pl-PL").format(v),
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Ocena usług opiekuńczych (cała Metropolia)"
        subtitle="Źródło: Opracowanie własne – badanie jakościowe 2024"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                {
                  kategoria: "Możliwość skorzystania",
                  negatywne: 9,
                  neutralne: 67,
                  pozytywne: 24,
                },
                {
                  kategoria: "Zakres usług",
                  negatywne: 22,
                  neutralne: 54,
                  pozytywne: 24,
                },
              ]}
              margin={{ top: 8, right: 8, bottom: 24, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="kategoria" />
              <YAxis unit=" %" />
              <Tooltip formatter={(v: number, n: string) => [`${v}%`, n]} />
              <Legend />
              <Bar
                dataKey="negatywne"
                name="negatywna"
                stackId="a"
                fill="rgb(216, 134, 30)"
              />
              <Bar
                dataKey="neutralne"
                name="neutralna"
                stackId="a"
                fill="#9ca3af"
              />
              <Bar
                dataKey="pozytywne"
                name="pozytywna"
                stackId="a"
                fill="rgb(247, 183, 29)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba przychodni działających na terenie Metropolii Krakowskiej w latach 2019–2024"
        subtitle="Źródło: BDL GUS"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { rok: "2019", przychodnie: 815 },
                { rok: "2020", przychodnie: 851 },
                { rok: "2021", przychodnie: 896 },
                { rok: "2022", przychodnie: 918 },
                { rok: "2023", przychodnie: 978 },
                { rok: "2024", przychodnie: 1002 },
              ]}
              margin={{ top: 24, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis domain={["dataMin - 50", "dataMax + 50"]} />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "przychodnie",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="przychodnie"
                name="liczba przychodni"
                stroke="rgb(216, 134, 30)"
                strokeWidth={2}
                dot={{ r: 2 }}
                label={{
                  position: "top",
                  fontSize: 12,
                  fill: "#333",
                  formatter: (v: number) =>
                    new Intl.NumberFormat("pl-PL").format(v),
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba złożonych przez imigrantów wniosków o pobyt stały w Metropolii Krakowskiej w latach 2019–2024"
        subtitle="Źródło: Małopolski Urząd Wojewódzki"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { rok: "2019", wnioski: 0 },
                { rok: "2020", wnioski: 0 },
                { rok: "2021", wnioski: 0 },
                { rok: "2022", wnioski: 0 },
                { rok: "2023", wnioski: 0 },
                { rok: "2024", wnioski: 0 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "wnioski",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="wnioski"
                name="liczba wniosków"
                stroke="rgb(216, 134, 30)"
                strokeWidth={2}
                dot={{ r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba złożonych przez imigrantów wniosków o pobyt stały w 2024 r."
        subtitle="Gminy — Źródło: Małopolski Urząd Wojewódzki (2024)"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={GMINY.map((gmina) => {
                const W2024: Record<string, number> = {
                  Czernichów: 8,
                  "Igołomia-Wawrzeńczyce": 1,
                  "Kocmyrzów-Luborzyca": 4,
                  Liszki: 16,
                  Michałowice: 3,
                  Mogilany: 12,
                  Skawina: 21,
                  "Świątniki Górne": 3,
                  "Wielka Wieś": 11,
                  Zabierzów: 23,
                  Zielonki: 33,
                  Biskupice: 4,
                  Niepołomice: 13,
                  Wieliczka: 46,
                  Kraków: 2009,
                };
                return { gmina, liczba: W2024[gmina] ?? 0 };
              })
                .slice()
                .sort((a, b) => b.liczba - a.liczba)}
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
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "wnioski",
                ]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="liczba"
                name="2024 [wnioski]"
                fill="rgb(247, 183, 29)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
