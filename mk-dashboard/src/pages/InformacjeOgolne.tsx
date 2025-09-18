import { useMemo } from "react";
import { appStyles, mkColors } from "../theme";
import Card from "../components/Card";
import type { Rok, Gmina } from "../data/bdl";
import { computeLudnosc, MK_ludnosc, LATA } from "../data/utils";
import { GMINY, obciazenieDemograficzne, przyrostNaturalny } from "../data/bdl";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function NumberKPI({
  label,
  value,
  hint,
}: {
  label: string;
  value?: number;
  hint?: string;
}) {
  const formatted =
    typeof value === "number"
      ? new Intl.NumberFormat("pl-PL").format(value)
      : "—";
  return (
    <div style={{ ...appStyles.kpiCard }}>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{label}</div>
      <div
        style={{
          marginTop: 6,
          fontSize: 24,
          fontWeight: 700,
          color: mkColors.primaryNavy,
        }}
      >
        {formatted}
      </div>
      {hint && (
        <div style={{ marginTop: 6, fontSize: 11, color: "#9ca3af" }}>
          {hint}
        </div>
      )}
    </div>
  );
}

const Y: Rok = 2024;
const IO_CHART_COLORS = [
  "rgb(146, 23, 45)",
  "rgb(222, 8, 50)",
  "rgb(34, 44, 86)",
];
export default function InformacjeOgolne() {
  const gminaPopData = useMemo(
    () => GMINY.map((g) => ({ gmina: g, pop: computeLudnosc(g, Y) })),
    []
  );

  return (
    <div style={appStyles.page}>
      <h2 style={{ margin: "4px 0 8px" }}>Informacje ogólne</h2>
      <Card
        title="Ludność Metropolii (2024)"
        subtitle="Suma dla wszystkich gmin"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
            gap: 12,
          }}
        >
          <NumberKPI label="Liczba ludności ogółem" value={MK_ludnosc[Y]} />
        </div>
      </Card>

      <div style={{ marginTop: 12 }} />
      <Card
        title="Gęstość zaludnienia Metropolii Krakowskiej"
        subtitle="Źródło: ArcGIS Experience"
        height={840}
      >
        <div style={{ height: 760 }}>
          <iframe
            title="ArcGIS Experience Map"
            src="https://experience.arcgis.com/experience/9972adb1957046eb98cfac412816e286?&legend=true
       &active_panel=legend
       &zoom=true
       &scale=true"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 12 }} />
      <Card title="Ludność gmin" subtitle="Każda gmina – liczba ludności">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
            gap: 12,
          }}
        >
          {gminaPopData.map(({ gmina, pop }) => (
            <NumberKPI key={gmina} label={gmina} value={pop} />
          ))}
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Wskaźnik obciążenia demograficznego"
        subtitle="Gminy Metropolii Krakowskiej"
        height={520}
      >
        <p style={{ margin: "0 0 8px", color: "#6b7280", fontSize: 12 }}>
          Liczba osób w wieku nieprodukcyjnym (przed- i poprodukcyjnym) na 100
          osób w wieku produkcyjnym. Wyższa wartość oznacza większe obciążenie.
        </p>
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={useMemo(
                () =>
                  GMINY.map((g) => ({
                    gmina: g,
                    wsk: obciazenieDemograficzne[g][Y],
                  })).sort((a, b) => b.wsk - a.wsk),
                []
              )}
              margin={{ top: 8, right: 8, bottom: 100, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="gmina"
                angle={-35}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis unit="" />
              <Tooltip
                formatter={(v: number) => [
                  v.toFixed(1),
                  "na 100 w wieku prod.",
                ]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 50 }}
              />
              <Bar
                dataKey="wsk"
                name="nieprod. na 100 w prod."
                fill={IO_CHART_COLORS[1]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Wzrost liczby ludności w gminach SMK [%] w latach 2019–2024"
        subtitle="Gminy Metropolii Krakowskiej"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={useMemo(
                () =>
                  GMINY.map((g) => {
                    const p19 = computeLudnosc(g, 2019);
                    const p24 = computeLudnosc(g, 2024);
                    const change = p19 ? (p24 / p19 - 1) * 100 : 0;
                    return { gmina: g, wzrost: Number(change.toFixed(2)) };
                  }).sort((a, b) => b.wzrost - a.wzrost),
                []
              )}
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
                  `${v.toFixed(1)}%`,
                  "zmiana 2019–2024",
                ]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="wzrost"
                name="2019–2024 [%]"
                fill={IO_CHART_COLORS[2]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Zmiany liczby ludności Metropolii Krakowskiej w latach 2019–2024"
        subtitle="Cała Metropolia"
        height={420}
      >
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={useMemo(
                () =>
                  LATA.map((y) => ({ rok: String(y), ludnosc: MK_ludnosc[y] })),
                []
              )}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "ludność",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="ludnosc"
                name="ludność"
                stroke={IO_CHART_COLORS[2]}
                strokeWidth={2}
                dot={{ r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ marginTop: 24 }} />
      <Card
        title="Przyrost naturalny ludności w gminach Metropolii Krakowskiej w 2024 roku"
        subtitle="Gminy Metropolii Krakowskiej"
        height={520}
      >
        <div style={{ height: 460 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={useMemo(
                () =>
                  GMINY.map((g: Gmina) => ({
                    gmina: g,
                    pn: przyrostNaturalny[g][Y],
                  })).sort((a, b) => b.pn - a.pn),
                []
              )}
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
                formatter={(v: number) => [`${v}`, "osób (przyrost naturalny)"]}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 20 }}
              />
              <Bar
                dataKey="pn"
                name="przyrost naturalny (osoby)"
                fill={IO_CHART_COLORS[0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
