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
  const [scale, setScale] = useState(1);

  const gminaPopData = useMemo(
    () =>
      GMINY.map((g) => ({ gmina: g, pop: computeLudnosc(g, Y) })).sort(
        (a, b) => b.pop - a.pop
      ),
    []
  );

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <h2 style={{ margin: "2px 0 6px 12px", flexShrink: 0, fontSize: "20px" }}>
        Informacje ogólne
      </h2>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              columnCount: 3,
              columnGap: 12,
              transformOrigin: "top center",
              transform: `scale(${scale})`,
              width: "100%",
            }}
            ref={(el) => {
              if (el && el.parentElement?.parentElement) {
                const container = el.parentElement.parentElement;
                const updateScale = () => {
                  const containerHeight = container.clientHeight;
                  const containerWidth = container.clientWidth;

                  // Reset scale temporarily to get true dimensions
                  el.style.transform = "scale(1)";
                  const contentHeight = el.scrollHeight;
                  const contentWidth = el.scrollWidth;
                  el.style.transform = `scale(${scale})`;

                  // Calculate scale based on both height and width
                  const heightScale = containerHeight / contentHeight;
                  const widthScale = containerWidth / contentWidth;

                  // Use the smaller scale to ensure everything fits
                  let newScale = Math.min(heightScale, widthScale, 1);

                  // Apply minimum scale of 0.5 (50%) for readability
                  // and maximum of 1 (100%) to avoid upscaling
                  newScale = Math.max(0.5, Math.min(1, newScale));

                  setScale(newScale);
                };

                // Initial calculation with delay to ensure content is rendered
                setTimeout(updateScale, 100);
                setTimeout(updateScale, 500);

                // Update on resize
                const resizeObserver = new ResizeObserver(() => {
                  setTimeout(updateScale, 50);
                });
                resizeObserver.observe(container);

                return () => resizeObserver.disconnect();
              }
            }}
          >
            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Ludność Metropolii"
                onOpen={() => setOpenCard("popSummary")}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))",
                    gap: 8,
                  }}
                >
                  <NumberKPI
                    label="Liczba ludności ogółem"
                    value={MK_ludnosc[Y]}
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Gęstość zaludnienia Metropolii Krakowskiej"
                subtitle="Źródło: ArcGIS Experience"
                height={320}
                onOpen={() => setOpenCard("densityMap")}
              >
                <div style={{ height: 240 }}>
                  <iframe
                    title="ArcGIS Experience Map"
                    src="https://experience.arcgis.com/experience/1b4cd2dd47364324908a05fc2cf2f4a5"
                    style={{ width: "100%", height: "95%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Zmiany liczby ludności Metropolii Krakowskiej w latach 2019–2024"
                height={340}
                onOpen={() => setOpenCard("mkTrend")}
              >
                <div style={{ height: 280 }}>
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

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card title="Ludność gmin" onOpen={() => setOpenCard("gminyPop")}>
                <div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 12,
                    }}
                  >
                    {gminaPopData.map(({ gmina, pop }) => (
                      <div key={gmina}>
                        <div
                          style={{
                            background: mkColors.white,
                            border: `1px solid ${mkColors.gray300}`,
                            borderRadius: 8,
                            padding: "8px 10px",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                          }}
                        >
                          <div style={{ fontSize: 9, color: "#6b7280" }}>
                            {gmina}
                          </div>
                          <div
                            style={{
                              marginTop: 3,
                              fontSize: 16,
                              fontWeight: 700,
                              color: mkColors.primaryNavy,
                            }}
                          >
                            {new Intl.NumberFormat("pl-PL").format(pop)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Wskaźnik obciążenia demograficznego"
                subtitle="Gminy Metropolii Krakowskiej"
                height={380}
                onOpen={() => setOpenCard("obciazenie")}
              >
                <p
                  style={{ margin: "0 0 6px", color: "#6b7280", fontSize: 11 }}
                >
                  Liczba osób w wieku nieprodukcyjnym (przed- i poprodukcyjnym)
                  na 100 osób w wieku produkcyjnym.
                </p>
                <div style={{ height: 320 }}>
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

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Zmiana liczby ludności w gminach Stowarzyszenia Metropolii Krakowskiej [%] w latach 2019–2024"
                height={380}
                onOpen={() => setOpenCard("zmianaGmin")}
              >
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={useMemo(
                        () =>
                          GMINY.map((g) => {
                            const p19 = computeLudnosc(g, 2019);
                            const p24 = computeLudnosc(g, 2024);
                            const change = p19 ? (p24 / p19 - 1) * 100 : 0;
                            return {
                              gmina: g,
                              wzrost: Number(change.toFixed(2)),
                            };
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

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Zmiany liczby ludności w gminach Metropolii Krakowskiej w 2024 roku"
                height={380}
                onOpen={() => setOpenCard("przyrost2024")}
              >
                <div style={{ height: 320 }}>
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
            style={{ width: "100%", height: "780px", border: 0 }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 12,
            }}
          >
            {gminaPopData.map(({ gmina, pop }) => (
              <div key={gmina}>
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
