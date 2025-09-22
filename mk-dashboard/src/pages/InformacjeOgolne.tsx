import { useMemo, useState } from "react";
import { appStyles, mkColors } from "../theme";
import Card from "../components/Card";
import Modal from "../components/Modal";
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
  size = "md",
}: {
  label: string;
  value?: number;
  hint?: string;
  size?: "sm" | "md";
}) {
  const formatted =
    typeof value === "number"
      ? new Intl.NumberFormat("pl-PL").format(value)
      : "—";
  const labelFontSize = size === "sm" ? 11 : 12;
  const valueFontSize = size === "sm" ? 20 : 24;
  const hintFontSize = size === "sm" ? 10 : 11;
  return (
    <div style={{ ...appStyles.kpiCard }}>
      <div style={{ fontSize: labelFontSize, color: "#6b7280" }}>{label}</div>
      <div
        style={{
          marginTop: 6,
          fontSize: valueFontSize,
          fontWeight: 700,
          color: mkColors.primaryNavy,
        }}
      >
        {formatted}
      </div>
      {hint && (
        <div style={{ marginTop: 6, fontSize: hintFontSize, color: "#9ca3af" }}>
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
  const [openCard, setOpenCard] = useState<string | null>(null);
  const gminaPopData = useMemo(
    () =>
      GMINY.map((g) => ({ gmina: g, pop: computeLudnosc(g, Y) })).sort(
        (a, b) => b.pop - a.pop
      ),
    []
  );

  return (
    <div style={appStyles.page}>
      <h2 style={{ margin: "4px 0 8px" }}>Informacje ogólne</h2>
      <div className="masonry">
        <div className="masonry-item">
          <Card
            title="Ludność Metropolii (2024)"
            onOpen={() => setOpenCard("popSummary")}
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
        </div>

        <div className="masonry-item">
          <Card
            title="Gęstość zaludnienia Metropolii Krakowskiej"
            subtitle="Źródło: ArcGIS Experience"
            height={420}
            onOpen={() => setOpenCard("densityMap")}
          >
            <div style={{ height: 340 }}>
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
        </div>

        <div className="masonry-item">
          <Card title="Ludność gmin" onOpen={() => setOpenCard("gminyPop")}>
            <div style={{ maxHeight: 360, overflowY: "auto" }}>
              <div className="masonry">
                {gminaPopData.map(({ gmina, pop }) => (
                  <div key={gmina} className="masonry-item">
                    <NumberKPI label={gmina} value={pop} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="masonry-item">
          <Card
            title="Wskaźnik obciążenia demograficznego"
            subtitle="Gminy Metropolii Krakowskiej"
            height={520}
            onOpen={() => setOpenCard("obciazenie")}
          >
            <p style={{ margin: "0 0 8px", color: "#6b7280", fontSize: 12 }}>
              Liczba osób w wieku nieprodukcyjnym (przed- i poprodukcyjnym) na
              100 osób w wieku produkcyjnym.
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
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis unit="" tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v: number) => [
                      v.toFixed(1),
                      "na 100 w wieku prod.",
                    ]}
                    labelStyle={{ fontSize: 11 }}
                    itemStyle={{ fontSize: 11 }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: 12, bottom: 50, fontSize: 11 }}
                  />
                  <Bar
                    dataKey="wsk"
                    name="Liczba osób w wieku nieprodukcyjnym na 100 osób w wieku produkcyjnym"
                    fill={IO_CHART_COLORS[1]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="masonry-item">
          <Card
            title="Zmiana liczby ludności w gminach Stowarzyszenia Metropolii Krakowskiej [%] w latach 2019–2024"
            height={520}
            onOpen={() => setOpenCard("zmianaGmin")}
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
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis unit="%" tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v: number) => [
                      `${v.toFixed(1)}%`,
                      "zmiana 2019–2024",
                    ]}
                    labelStyle={{ fontSize: 11 }}
                    itemStyle={{ fontSize: 11 }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: 0, bottom: 50, fontSize: 11 }}
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
        </div>

        <div className="masonry-item">
          <Card
            title="Zmiany liczby ludności Metropolii Krakowskiej w latach 2019–2024"
            height={420}
            onOpen={() => setOpenCard("mkTrend")}
          >
            <div style={{ height: 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={useMemo(
                    () =>
                      LATA.map((y) => ({
                        rok: String(y),
                        ludnosc: MK_ludnosc[y],
                      })),
                    []
                  )}
                  margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
                >
                  <CartesianGrid vertical={false} stroke="#eee" />
                  <XAxis dataKey="rok" tick={{ fontSize: 11 }} />
                  <YAxis
                    domain={["dataMin - 5000", "dataMax + 5000"]}
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("pl-PL", {
                        notation: "compact",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(value)
                    }
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    formatter={(v: number) => [
                      new Intl.NumberFormat("pl-PL").format(v),
                      "ludność",
                    ]}
                    labelStyle={{ fontSize: 11 }}
                    itemStyle={{ fontSize: 11 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
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
        </div>

        <div className="masonry-item">
          <Card
            title="Zmiany liczby ludności w gminach Metropolii Krakowskiej w 2024 roku"
            height={520}
            onOpen={() => setOpenCard("przyrost2024")}
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
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v: number) => [
                      `${v}`,
                      "osób (przyrost naturalny)",
                    ]}
                    labelStyle={{ fontSize: 11 }}
                    itemStyle={{ fontSize: 11 }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: 12, bottom: 30, fontSize: 11 }}
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
      </div>

      {/* Modals */}
      <Modal
        open={openCard === "densityMap"}
        onClose={() => setOpenCard(null)}
        title="Gęstość zaludnienia Metropolii Krakowskiej"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="ArcGIS Experience Map"
            src="https://experience.arcgis.com/experience/9972adb1957046eb98cfac412816e286?&legend=true&active_panel=legend&zoom=true&scale=true"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "gminyPop"}
        onClose={() => setOpenCard(null)}
        title="Ludność gmin"
        width={1100}
        maxWidth="95vw"
      >
        <div>
          <div className="masonry">
            {gminaPopData.map(({ gmina, pop }) => (
              <div key={gmina} className="masonry-item">
                <NumberKPI label={gmina} value={pop} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <Modal
        open={openCard === "obciazenie"}
        onClose={() => setOpenCard(null)}
        title="Wskaźnik obciążenia demograficznego"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
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
                tick={{ fontSize: 11 }}
              />
              <YAxis unit="" tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: number) => [
                  v.toFixed(1),
                  "na 100 w wieku prod.",
                ]}
                labelStyle={{ fontSize: 11 }}
                itemStyle={{ fontSize: 11 }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 50, fontSize: 11 }}
              />
              <Bar
                dataKey="wsk"
                name="Liczba osób w wieku nieprodukcyjnym na 100 osób w wieku produkcyjnym"
                fill={IO_CHART_COLORS[1]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "zmianaGmin"}
        onClose={() => setOpenCard(null)}
        title="Zmiana liczby ludności w gminach SMK [%] 2019–2024"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
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
                tick={{ fontSize: 11 }}
              />
              <YAxis unit="%" tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: number) => [
                  `${v.toFixed(1)}%`,
                  "zmiana 2019–2024",
                ]}
                labelStyle={{ fontSize: 11 }}
                itemStyle={{ fontSize: 11 }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 0, bottom: 50, fontSize: 11 }}
              />
              <Bar
                dataKey="wzrost"
                name="2019–2024 [%]"
                fill={IO_CHART_COLORS[2]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "mkTrend"}
        onClose={() => setOpenCard(null)}
        title="Zmiany liczby ludności Metropolii Krakowskiej 2019–2024"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 520 }}>
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
              <XAxis dataKey="rok" tick={{ fontSize: 11 }} />
              <YAxis
                domain={["dataMin - 5000", "dataMax + 5000"]}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("pl-PL", {
                    notation: "compact",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(value)
                }
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "ludność",
                ]}
                labelStyle={{ fontSize: 11 }}
                itemStyle={{ fontSize: 11 }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
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
      </Modal>

      <Modal
        open={openCard === "przyrost2024"}
        onClose={() => setOpenCard(null)}
        title="Zmiany liczby ludności w gminach MK w 2024"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
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
                tick={{ fontSize: 11 }}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: number) => [`${v}`, "osób (przyrost naturalny)"]}
                labelStyle={{ fontSize: 11 }}
                itemStyle={{ fontSize: 11 }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 12, bottom: 30, fontSize: 11 }}
              />
              <Bar
                dataKey="pn"
                name="przyrost naturalny (osoby)"
                fill={IO_CHART_COLORS[0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}
