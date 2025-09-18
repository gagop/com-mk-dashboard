import Card from "../components/Card";
import { appStyles } from "../theme";
import type { Rok, Gmina } from "../data/bdl";
import { GMINY } from "../data/bdl";
import { computeLudnosc, weightedAverage, LATA } from "../data/utils";
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

export default function KulturaCzasuWolnego() {
  const Y: Rok = 2024;
  const CZYTELNICY_2024: Record<Gmina, number> = {
    Czernichów: 1818,
    "Igołomia-Wawrzeńczyce": 718,
    "Kocmyrzów-Luborzyca": 1344,
    Liszki: 1419,
    Michałowice: 3422,
    Mogilany: 972,
    Skawina: 4829,
    "Świątniki Górne": 564,
    "Wielka Wieś": 2428,
    Zabierzów: 4390,
    Zielonki: 5349,
    Biskupice: 709,
    Niepołomice: 10684,
    Wieliczka: 10854,
    Kraków: 251483,
  };
  const BIBLIOTEKI_NA_10K: Record<Gmina, Record<Rok, number>> = {
    Czernichów: {
      2019: 3.4,
      2020: 3.3,
      2021: 3.3,
      2022: 3.3,
      2023: 3.2,
      2024: 3.2,
    },
    "Igołomia-Wawrzeńczyce": {
      2019: 3.9,
      2020: 3.8,
      2021: 3.8,
      2022: 3.8,
      2023: 3.8,
      2024: 2.5,
    },
    "Kocmyrzów-Luborzyca": {
      2019: 1.9,
      2020: 1.7,
      2021: 1.7,
      2022: 1.7,
      2023: 1.6,
      2024: 1.6,
    },
    Liszki: {
      2019: 1.7,
      2020: 1.7,
      2021: 1.6,
      2022: 1.6,
      2023: 1.6,
      2024: 1.6,
    },
    Michałowice: {
      2019: 2.8,
      2020: 2.4,
      2021: 2.3,
      2022: 2.3,
      2023: 2.2,
      2024: 2.2,
    },
    Mogilany: {
      2019: 1.4,
      2020: 1.3,
      2021: 1.3,
      2022: 1.2,
      2023: 1.2,
      2024: 1.2,
    },
    Skawina: {
      2019: 2.1,
      2020: 2.0,
      2021: 2.0,
      2022: 2.0,
      2023: 2.0,
      2024: 2.0,
    },
    "Świątniki Górne": {
      2019: 2.0,
      2020: 1.8,
      2021: 1.8,
      2022: 1.8,
      2023: 1.8,
      2024: 1.8,
    },
    "Wielka Wieś": {
      2019: 1.6,
      2020: 1.3,
      2021: 1.3,
      2022: 1.2,
      2023: 1.2,
      2024: 1.2,
    },
    Zabierzów: {
      2019: 1.5,
      2020: 1.4,
      2021: 1.4,
      2022: 1.4,
      2023: 1.4,
      2024: 1.3,
    },
    Zielonki: {
      2019: 1.7,
      2020: 1.5,
      2021: 1.5,
      2022: 1.5,
      2023: 1.4,
      2024: 1.4,
    },
    Biskupice: {
      2019: 1.0,
      2020: 0.9,
      2021: 0.9,
      2022: 0.9,
      2023: 0.9,
      2024: 0.8,
    },
    Niepołomice: {
      2019: 1.7,
      2020: 1.6,
      2021: 1.5,
      2022: 1.5,
      2023: 1.5,
      2024: 1.5,
    },
    Wieliczka: {
      2019: 1.5,
      2020: 1.4,
      2021: 1.3,
      2022: 1.3,
      2023: 1.3,
      2024: 1.3,
    },
    Kraków: {
      2019: 0.8,
      2020: 0.8,
      2021: 0.8,
      2022: 0.8,
      2023: 0.8,
      2024: 0.8,
    },
  };
  const MK_biblioteki_na10k = weightedAverage(BIBLIOTEKI_NA_10K);
  return (
    <div style={appStyles.page}>
      <h2 style={{ margin: "4px 0 8px" }}>Kultura czasu wolnego</h2>

      <Card
        title="Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z oferty czasu wolnego [%]"
        subtitle="Źródło: ArcGIS Experience"
        height={540}
      >
        <div style={{ height: 460 }}>
          <iframe
            title="Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z oferty czasu wolnego [%]"
            src="https://experience.arcgis.com/experience/35fe8984c18a4a0bb3237fbd13eeaf99/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 12 }} />
      <Card
        title="Wysokość wydatków bieżących z budżetu na kulturę i sport na 1 mieszkańca [zł]"
        subtitle="Źródło: ArcGIS Experience"
        height={540}
      >
        <div style={{ height: 460 }}>
          <iframe
            title="Wysokość wydatków bieżących z budżetu na kulturę i sport na 1 mieszkańca [zł]"
            src="https://experience.arcgis.com/experience/e3e555c99ff14d489a8336573bad3166/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 12 }} />
      <Card
        title="Łączna liczba czytelników w bibliotekach publicznych Metropolii Krakowskiej (2019–2024)"
        subtitle="Cała Metropolia — Źródło: BDL GUS"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { rok: "2019", czytelnicy: 273726 },
                { rok: "2020", czytelnicy: 227670 },
                { rok: "2021", czytelnicy: 225261 },
                { rok: "2022", czytelnicy: 248901 },
                { rok: "2023", czytelnicy: 280700 },
                { rok: "2024", czytelnicy: 300983 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "czytelnicy",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="czytelnicy"
                name="czytelnicy"
                stroke="rgb(144, 12, 0)"
                strokeWidth={2}
                dot={{ r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Liczba czytelników na 1 tys. mieszkańców w 2024 r."
        subtitle="Gminy — Źródło: BDL GUS"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={GMINY.map((g) => {
                const readers = CZYTELNICY_2024[g as Gmina] || 0;
                const pop = computeLudnosc(g as Gmina, Y);
                const perThousand = pop ? (readers / pop) * 1000 : 0;
                return { gmina: g, wartosc: Number(perThousand.toFixed(1)) };
              })
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
                formatter={(v: number) => [
                  `${(v as number).toFixed(1)}`,
                  "na 1 tys. mieszk.",
                ]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="wartosc"
                name="2024 (na 1 tys.)"
                fill="rgb(205, 25, 0)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Biblioteki publiczne na 10 tys. ludności (2019–2024)"
        subtitle="Cała Metropolia — Źródło: BDL GUS"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={LATA.map((y) => ({
                rok: String(y),
                wartosc: MK_biblioteki_na10k[y],
              }))}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis />
              <Tooltip
                formatter={(v: number) => [
                  (v as number).toFixed(2),
                  "na 10 tys. ludności",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="wartosc"
                name="na 10 tys. ludności"
                stroke="rgb(144, 12, 0)"
                strokeWidth={2}
                dot={{ r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
