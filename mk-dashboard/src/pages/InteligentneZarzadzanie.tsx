import Card from "../components/Card";
import { appStyles, mkColors } from "../theme";
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

export default function InteligentneZarzadzanie() {
  return (
    <div style={appStyles.page}>
      <h2 style={{ margin: "4px 0 8px" }}>Inteligentne zarzadzanie</h2>

      <Card
        title="Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z jakości funkcjonowania administracji w gminie [%]"
        subtitle="Źródło: ArcGIS Experience"
        height={540}
      >
        <div style={{ height: 460 }}>
          <iframe
            title="Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z jakości funkcjonowania administracji w gminie [%]"
            src="https://experience.arcgis.com/experience/51fd6fd2e6514e5ea7b17d5a60163f14/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 12 }} />
      <Card
        title="Dochody ogółem na 1 mieszkańca"
        subtitle="Źródło: ArcGIS Experience"
        height={540}
      >
        <div style={{ height: 460 }}>
          <iframe
            title="Dochody ogółem na 1 mieszkańca"
            src="https://experience.arcgis.com/experience/24d07761e5e743b6a072e04bbbf8d4b4/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z jakości funkcjonowania administracji w gminie [%]"
        subtitle="Cała Metropolia (2024) — Opracowanie własne"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { kategoria: "Pozytywne", odsetek: 66 },
                { kategoria: "Neutralne", odsetek: 31 },
                { kategoria: "Negatywne", odsetek: 3 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="kategoria" />
              <YAxis unit="%" />
              <Tooltip formatter={(v: number) => [`${v}%`, "odsetek"]} />
              <Legend />
              <Bar
                dataKey="odsetek"
                name="Udział odpowiedzi [%]"
                fill={mkColors.primaryNavy}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Zadłużenie Gminy [%] – relacja zobowiązań do dochodów ogółem"
        subtitle="Gminy (2024) — Źródło: Ministerstwo Finansów"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Kraków", wartosc: 75.9 },
                { gmina: "Wieliczka", wartosc: 63.2 },
                { gmina: "Niepołomice", wartosc: 57.9 },
                { gmina: "Zabierzów", wartosc: 49.7 },
                { gmina: "Świątniki Górne", wartosc: 46.0 },
                { gmina: "Czernichów", wartosc: 35.7 },
                { gmina: "Liszki", wartosc: 37.8 },
                { gmina: "Skawina", wartosc: 33.1 },
                { gmina: "Biskupice", wartosc: 31.0 },
                { gmina: "Mogilany", wartosc: 29.8 },
                { gmina: "Kocmyrzów-Luborzyca", wartosc: 26.3 },
                { gmina: "Michałowice", wartosc: 14.0 },
                { gmina: "Zielonki", wartosc: 13.8 },
                { gmina: "Wielka Wieś", wartosc: 8.3 },
                { gmina: "Igołomia-Wawrzeńczyce", wartosc: 7.5 },
              ]
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
              <YAxis unit="%" />
              <Tooltip formatter={(v: number) => [`${v}%`, "zadłużenie"]} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="wartosc"
                name="2024 [%]"
                fill={mkColors.primaryBurgundy}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Procentowy wzrost wpływów z PIT w gminach (2023–2024)"
        subtitle="Gminy — Źródło: BDL GUS"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Czernichów", v2023: 16717378, v2024: 26955832 },
                {
                  gmina: "Igołomia-Wawrzeńczyce",
                  v2023: 4833642,
                  v2024: 8404042,
                },
                {
                  gmina: "Kocmyrzów-Luborzyca",
                  v2023: 23726968,
                  v2024: 33275448,
                },
                { gmina: "Liszki", v2023: 19296648, v2024: 31817505 },
                { gmina: "Michałowice", v2023: 19421383, v2024: 32443084 },
                { gmina: "Mogilany", v2023: 27641595, v2024: 47957513 },
                { gmina: "Skawina", v2023: 46053181, v2024: 72403208 },
                { gmina: "Świątniki Górne", v2023: 18885311, v2024: 29586555 },
                { gmina: "Wielka Wieś", v2023: 24216556, v2024: 43581177 },
                { gmina: "Zabierzów", v2023: 44758719, v2024: 75616706 },
                { gmina: "Zielonki", v2023: 49584707, v2024: 85914146 },
                { gmina: "Biskupice", v2023: 10102509, v2024: 16340114 },
                { gmina: "Niepołomice", v2023: 35760781, v2024: 59543802 },
                { gmina: "Wieliczka", v2023: 82118011, v2024: 134722367 },
                { gmina: "Kraków", v2023: 1710047660, v2024: 2803318933 },
              ]
                .map((r) => ({
                  gmina: r.gmina,
                  wzrost: Number(((r.v2024 / r.v2023 - 1) * 100).toFixed(2)),
                }))
                .sort((a, b) => b.wzrost - a.wzrost)}
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
                formatter={(v: number) => [`${v}%`, "zmiana 2023–2024"]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="wzrost"
                name="2023–2024 [%]"
                fill={mkColors.primaryRed}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Procentowy wzrost wpływów z CIT w gminach (2019–2024)"
        subtitle="Gminy — Źródło: BDL GUS"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Czernichów", v2019: 99717.69, v2024: 329946 },
                {
                  gmina: "Igołomia-Wawrzeńczyce",
                  v2019: 116890.28,
                  v2024: 462192,
                },
                {
                  gmina: "Kocmyrzów-Luborzyca",
                  v2019: 21005.64,
                  v2024: 149426,
                },
                { gmina: "Liszki", v2019: 1188887.21, v2024: 2036590 },
                { gmina: "Michałowice", v2019: 53641.11, v2024: 264062 },
                { gmina: "Mogilany", v2019: 266539, v2024: 872502 },
                { gmina: "Skawina", v2019: 5665729.04, v2024: 11030280 },
                { gmina: "Świątniki Górne", v2019: 50197.44, v2024: 354198 },
                { gmina: "Wielka Wieś", v2019: 1225547.57, v2024: 5021336 },
                { gmina: "Zabierzów", v2019: 5110688.5, v2024: 12106975 },
                { gmina: "Zielonki", v2019: 136011.32, v2024: 752022 },
                { gmina: "Biskupice", v2019: 15072.7, v2024: 64442 },
                { gmina: "Niepołomice", v2019: 8095981.22, v2024: 19533854 },
                { gmina: "Wieliczka", v2019: 2518084.41, v2024: 5287878 },
                { gmina: "Kraków", v2019: 165184285.77, v2024: 434250295 },
              ]
                .map((r) => ({
                  gmina: r.gmina,
                  wzrost: Number(((r.v2024 / r.v2019 - 1) * 100).toFixed(2)),
                }))
                .sort((a, b) => b.wzrost - a.wzrost)}
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
                formatter={(v: number) => [`${v}%`, "zmiana 2019–2024"]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="wzrost"
                name="2019–2024 [%]"
                fill={mkColors.primaryNavy}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
