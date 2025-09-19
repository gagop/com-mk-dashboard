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

export default function Mobilnosc() {
  return (
    <div style={appStyles.page}>
      <h2 style={{ margin: "4px 0 8px" }}>Mobilność</h2>

      <Card
        title="Udział mieszkańców deklarujących transport publiczny jako główny środek transportu w dniu roboczym [%]"
        subtitle="Źródło: ArcGIS Experience"
        height={840}
      >
        <div style={{ height: 760 }}>
          <iframe
            title="Udział mieszkańców deklarujących transport publiczny jako główny środek transportu w dniu roboczym [%]"
            src="https://experience.arcgis.com/experience/26dbf3298caf4f4ea6a0a3e0cfb7f1bf/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 12 }} />
      <Card
        title="Udział mieszkańców deklarujących samochód jako główny środek transportu w dniu roboczym [%]"
        subtitle="Źródło: ArcGIS Experience"
        height={840}
      >
        <div style={{ height: 760 }}>
          <iframe
            title="Udział mieszkańców deklarujących samochód jako główny środek transportu w dniu roboczym [%]"
            src="https://experience.arcgis.com/experience/d995260ef5bb475488dd2275d6587bf2/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 12 }} />
      <Card
        title="Udział mieszkańców deklarujących rower jako główny środek transportu w dniu roboczym [%]"
        subtitle="Źródło: ArcGIS Experience"
        height={840}
      >
        <div style={{ height: 760 }}>
          <iframe
            title="Udział mieszkańców deklarujących rower jako główny środek transportu w dniu roboczym [%]"
            src="https://experience.arcgis.com/experience/673ecf1542034ebeab47c6e7fa6a781b/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Najważniejszy czynnik decydujący o wyborze głównego środka codziennego transportu (2024)"
        subtitle="Źródło: Raport z badań społecznych 2024"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { czynnik: "Komfort podróży", odsetek: 59 },
                { czynnik: "Brak innej dostępnej alternatywy", odsetek: 15 },
                { czynnik: "Czas przejazdu", odsetek: 13 },
                { czynnik: "Koszty przejazdów", odsetek: 5 },
                { czynnik: "Bezpieczeństwo", odsetek: 4 },
                { czynnik: "Inne", odsetek: 3 },
                { czynnik: "Dbałość o środowisko naturalne", odsetek: 1 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="czynnik"
                interval={0}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis unit="%" />
              <Tooltip formatter={(v: number) => [`${v}%`, "odsetek"]} />
              <Legend />
              <Bar
                dataKey="odsetek"
                name="Udział odpowiedzi [%]"
                fill="rgb(29, 113, 184)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div style={{ marginTop: 24 }} />
      <Card
        title="Podział modalny podróży w dniu roboczym (2024)"
        subtitle="Źródło: Raport z badań społecznych 2024"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { srodek: "Samochód", udzial: 63 },
                { srodek: "Komunikacja zbiorowa", udzial: 22 },
                { srodek: "Pieszo", udzial: 10 },
                { srodek: "Rower", udzial: 3 },
                { srodek: "Pociąg", udzial: 0.8 },
                { srodek: "Hulajnoga/UTO", udzial: 0.4 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="srodek"
                interval={0}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis unit="%" />
              <Tooltip
                formatter={(v: number) => [
                  `${Number(v).toFixed(v < 1 ? 1 : 0)}%`,
                  "udział",
                ]}
              />
              <Legend />
              <Bar
                dataKey="udzial"
                name="Udział podróży [%]"
                fill="rgb(54, 169, 225)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Czynne stacje i przystanki kolejowe w 2024 roku"
        subtitle="Źródło: Opracowanie własne"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { kategoria: "Kocmyrzów-Luborzyca", liczba: 4.0 },
                { kategoria: "Kraków (miejskie)", liczba: 31.0 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="kategoria" />
              <YAxis />
              <Tooltip formatter={(v: number) => [String(v), "liczba"]} />
              <Legend />
              <Bar
                dataKey="liczba"
                name="Liczba czynnych stacji/przystanków"
                fill="rgb(29, 113, 184)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba miejsc postojowych w działających parkingach P&R (szt.) w 2024 r."
        subtitle="Źródło: Opracowanie własne"
        height={570}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { kategoria: "P+R Górka Narodowa", miejsca: 465.0 },
                { kategoria: "P+R Swoszowice", miejsca: 154.0 },
                { kategoria: "P+R Krowodrza Górka", miejsca: 109.0 },
                { kategoria: "w Łuczycach", miejsca: 106.0 },
                { kategoria: "P+R Pachońskiego", miejsca: 95.0 },
                { kategoria: "P+R Prądnik Czerwony", miejsca: 83.0 },
                { kategoria: "w centrum gminy (Kocmyrzów)", miejsca: 72.0 },
                { kategoria: "w Baranówce", miejsca: 53.0 },
                { kategoria: "w Zastowie", miejsca: 51.0 },
                { kategoria: "w Goszczy", miejsca: 47.0 },
              ]
                .slice()
                .sort((a, b) => b.miejsca - a.miejsca)}
              margin={{ top: 8, right: 8, bottom: 84, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="kategoria"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis />
              <Tooltip formatter={(v: number) => [String(v), "miejsca P&R"]} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: -30 }}
              />
              <Bar
                dataKey="miejsca"
                name="Liczba miejsc postojowych w działających parkingach P&R (szt.) w 2024 r."
                fill="rgb(54, 169, 225)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
