import Card from "../components/Card";
import { appStyles, mkColors } from "../theme";
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
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={GMINY.map((gmina) => {
                const M2024: Record<string, number> = {
                  // Uzupełnij wartości na podstawie opracowania własnego
                  Biskupice: 0,
                  Czernichów: 0,
                  "Igołomia-Wawrzeńczyce": 0,
                  "Kocmyrzów-Luborzyca": 0,
                  Liszki: 0,
                  Michałowice: 0,
                  Mogilany: 0,
                  Niepołomice: 0,
                  Skawina: 0,
                  "Świątniki Górne": 0,
                  Wieliczka: 0,
                  "Wielka Wieś": 0,
                  Zabierzów: 0,
                  Zielonki: 0,
                  Kraków: 0,
                };
                return { gmina, liczba: M2024[gmina] ?? 0 };
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
                  "osoby",
                ]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="liczba"
                name="2024 [os.]"
                fill={mkColors.primaryNavy}
              />
            </BarChart>
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
                name="negatywne"
                stackId="a"
                fill={mkColors.primaryRed}
              />
              <Bar
                dataKey="neutralne"
                name="neutralne"
                stackId="a"
                fill="#9ca3af"
              />
              <Bar
                dataKey="pozytywne"
                name="pozytywne"
                stackId="a"
                fill="#27AE60"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba przychodni działających na terenie Metropolii Krakowskiej w latach 2019–2024"
        subtitle="Cała Metropolia — Źródło: BDL GUS"
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
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis />
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
                stroke={mkColors.primaryNavy}
                strokeWidth={2}
                dot={{ r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba złożonych przez imigrantów wniosków o pobyt stały w Metropolii Krakowskiej w latach 2019–2024"
        subtitle="Cała Metropolia — Źródło: Małopolski Urząd Wojewódzki"
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
                stroke={mkColors.primaryNavy}
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
                fill={mkColors.primaryNavy}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
