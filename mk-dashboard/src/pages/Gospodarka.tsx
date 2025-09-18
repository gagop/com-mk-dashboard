import Card from "../components/Card";
import { appStyles } from "../theme";
import { GMINY } from "../data/bdl";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export default function Gospodarka() {
  return (
    <div style={appStyles.page}>
      <h2 style={{ margin: "4px 0 8px" }}>Gospodarka</h2>

      <Card
        title="Poziom zadowolenia przedsiębiorców z relacji z samorządem gminnym [%]"
        subtitle="Źródło: ArcGIS Experience"
        height={840}
      >
        <div style={{ height: 760 }}>
          <iframe
            title="Poziom zadowolenia przedsiębiorców z relacji z samorządem gminnym [%]"
            src="https://experience.arcgis.com/experience/ccafc27dc27749b2a88317b0e7ff0907/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 12 }} />
      <Card
        title="Udział wpływu z podatku CIT w budżecie gminy ogółem [%]"
        subtitle="Źródło: ArcGIS Experience"
        height={840}
      >
        <div style={{ height: 760 }}>
          <iframe
            title="Udział wpływu z podatku CIT w budżecie gminy ogółem [%]"
            src="https://experience.arcgis.com/experience/8979bbcd027542bdad25b09329ab5bbb/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba nowo zarejestrowanych podmiotów gospodarczych w Metropolii Krakowskiej (2019–2024)"
        subtitle="Źródło: BDL GUS"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { rok: "2019", podmioty: 15714 },
                { rok: "2020", podmioty: 13625 },
                { rok: "2021", podmioty: 16486 },
                { rok: "2022", podmioty: 18859 },
                { rok: "2023", podmioty: 18929 },
                { rok: "2024", podmioty: 18745 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis
                domain={["dataMin - 1000", "dataMax + 1000"]}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("pl-PL", {
                    notation: "compact",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(value)
                }
              />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "podmioty",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="podmioty"
                name="Liczba podmiotów"
                stroke="rgb(116, 27, 105)"
                strokeWidth={2}
                dot={{ r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Udział bezrobotnych zarejestrowanych w liczbie ludności w wieku produkcyjnym (2024)"
        subtitle="Źródło: BDL GUS"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Skawina", wartosc: 2.8 },
                { gmina: "Czernichów", wartosc: 2.5 },
                { gmina: "Świątniki Górne", wartosc: 2.5 },
                { gmina: "Zabierzów", wartosc: 2.5 },
                { gmina: "Wieliczka", wartosc: 2.5 },
                { gmina: "Mogilany", wartosc: 2.4 },
                { gmina: "Kocmyrzów-Luborzyca", wartosc: 2.3 },
                { gmina: "Liszki", wartosc: 2.2 },
                { gmina: "Kraków", wartosc: 2.2 },
                { gmina: "Biskupice", wartosc: 2.1 },
                { gmina: "Igołomia-Wawrzeńczyce", wartosc: 2.0 },
                { gmina: "Michałowice", wartosc: 1.9 },
                { gmina: "Wielka Wieś", wartosc: 1.7 },
                { gmina: "Zielonki", wartosc: 1.5 },
                { gmina: "Niepołomice", wartosc: 1.5 },
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
              <Tooltip formatter={(v: number) => [`${v}%`, "udział"]} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="wartosc"
                name="Udział bezrobotnych zarejestrowanych w liczbie ludności w wieku produkcyjnym (2024) [%]"
                fill="rgb(157, 28, 124)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba obiektów noclegowych w gminach Metropolii Krakowskiej (2019–2024)"
        subtitle="Źródło: BDL GUS (obiekty ogółem)"
      >
        <div style={{ overflowX: "auto" }}>
          {(() => {
            const DATA: Record<string, Partial<Record<string, number>>> = {
              "Kocmyrzów-Luborzyca": {
                2019: 1,
                2020: 1,
                2021: 1,
                2022: 1,
                2023: 1,
                2024: 1,
              },
              Liszki: { 2019: 0, 2020: 0, 2021: 1, 2022: 1, 2023: 3, 2024: 3 },
              Michałowice: {
                2019: 0,
                2020: 0,
                2021: 1,
                2022: 1,
                2023: 1,
                2024: 1,
              },
              Skawina: { 2019: 2, 2020: 2, 2021: 2, 2022: 1, 2023: 1, 2024: 1 },
              "Wielka Wieś": {
                2019: 6,
                2020: 5,
                2021: 7,
                2022: 8,
                2023: 8,
                2024: 6,
              },
              Zabierzów: {
                2019: 6,
                2020: 6,
                2021: 6,
                2022: 8,
                2023: 7,
                2024: 7,
              },
              Zielonki: {
                2019: 5,
                2020: 5,
                2021: 4,
                2022: 4,
                2023: 4,
                2024: 4,
              },
              Biskupice: {
                2019: 1,
                2020: 1,
                2021: 1,
                2022: 1,
                2023: 1,
                2024: 1,
              },
              Niepołomice: {
                2019: 5,
                2020: 3,
                2021: 2,
                2022: 3,
                2023: 3,
                2024: 3,
              },
              Wieliczka: {
                2019: 15,
                2020: 12,
                2021: 12,
                2022: 11,
                2023: 11,
                2024: 11,
              },
              Kraków: {
                2019: 275,
                2020: 238,
                2021: 243,
                2022: 251,
                2023: 253,
                2024: 309,
              },
              // Brak w podglądzie fragmentów dla poniższych — pozostawiamy do uzupełnienia
              Czernichów: {},
              "Igołomia-Wawrzeńczyce": {},
              Mogilany: {},
              "Świątniki Górne": {},
            };
            const YEARS = [
              "2019",
              "2020",
              "2021",
              "2022",
              "2023",
              "2024",
            ] as const;
            return (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: 8,
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      Gmina
                    </th>
                    {YEARS.map((y) => (
                      <th
                        key={y}
                        style={{
                          textAlign: "right",
                          padding: 8,
                          borderBottom: "1px solid #e5e7eb",
                        }}
                      >
                        {y}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GMINY.map((gmina) => (
                    <tr key={gmina}>
                      <td
                        style={{
                          padding: 8,
                          borderBottom: "1px solid #f3f4f6",
                        }}
                      >
                        {gmina}
                      </td>
                      {YEARS.map((y) => {
                        const v = DATA[gmina]?.[y];
                        return (
                          <td
                            key={y}
                            style={{
                              textAlign: "right",
                              padding: 8,
                              borderBottom: "1px solid #f3f4f6",
                            }}
                          >
                            {typeof v === "number"
                              ? new Intl.NumberFormat("pl-PL").format(v)
                              : "—"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })()}
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba miejsc noclegowych w gminach Metropolii Krakowskiej w 2024 r."
        subtitle="Źródło: BDL GUS (miejsca noclegowe ogółem, z pominięciem Krakowa)"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={GMINY.map((gmina) => {
                const M2024: Record<string, number> = {
                  "Kocmyrzów-Luborzyca": 50,
                  Liszki: 120,
                  Michałowice: 74,
                  Skawina: 93,
                  "Świątniki Górne": 0,
                  "Wielka Wieś": 470,
                  Zabierzów: 825,
                  Zielonki: 150,
                  Biskupice: 44,
                  Niepołomice: 213,
                  Wieliczka: 699,
                  Kraków: 35805,
                  Czernichów: 0,
                  "Igołomia-Wawrzeńczyce": 0,
                  Mogilany: 0,
                };
                return { gmina, miejsca: M2024[gmina] ?? 0 };
              })
                .filter((item) => item.miejsca > 0 && item.gmina !== "Kraków")
                .sort((a, b) => b.miejsca - a.miejsca)}
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
                  new Intl.NumberFormat("pl-PL").format(v as number),
                  "miejsca",
                ]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="miejsca"
                name="Liczba miejsc noclegowych w 2024 roku [liczba miejsc]"
                fill="rgb(157, 28, 124)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
