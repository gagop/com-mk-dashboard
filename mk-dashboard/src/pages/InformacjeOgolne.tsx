import { useMemo, useState, useEffect } from "react";
import { appStyles, mkColors } from "../theme";
import Card from "../components/Card";
import Modal from "../components/Modal";
import type { Rok } from "../data/bdl";
import { computeLudnosc } from "../data/utils";
import { GMINY, obciazenieDemograficzne } from "../data/bdl";
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
  const [cardHeight, setCardHeight] = useState(380);
  const [chartFontSize, setChartFontSize] = useState(11);

  useEffect(() => {
    const calculateCardHeight = () => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const availableHeight = viewportHeight - 180;
      const calculatedHeight = (availableHeight - 12) / 2;
      const finalHeight = Math.max(280, calculatedHeight);
      setCardHeight(finalHeight);

      // Calculate responsive font size based on viewport dimensions
      const heightRatio = Math.min(1, finalHeight / 380);
      const widthRatio = Math.min(1, viewportWidth / 1400);
      const scaleFactor = Math.min(heightRatio, widthRatio);
      const fontSize = Math.max(7, Math.round(11 * scaleFactor));
      setChartFontSize(fontSize);
    };

    calculateCardHeight();
    window.addEventListener("resize", calculateCardHeight);
    return () => window.removeEventListener("resize", calculateCardHeight);
  }, []);

  // Hardcoded population data for 2024 from the ranking table (sorted from largest to smallest)
  const gminaPopData = useMemo(
    () => [
      { gmina: "Kraków", pop: 809168 },
      { gmina: "Wieliczka", pop: 69791 },
      { gmina: "Skawina", pop: 43999 },
      { gmina: "Niepołomice", pop: 33602 },
      { gmina: "Zabierzów", pop: 29837 },
      { gmina: "Zielonki", pop: 28079 },
      { gmina: "Liszki", pop: 18754 },
      { gmina: "Kocmyrzów-Luborzyca", pop: 18638 },
      { gmina: "Wielka Wieś", pop: 17342 },
      { gmina: "Mogilany", pop: 16533 },
      { gmina: "Czernichów", pop: 15442 },
      { gmina: "Michałowice", pop: 13549 },
      { gmina: "Biskupice", pop: 11929 },
      { gmina: "Świątniki Górne", pop: 11208 },
      { gmina: "Igołomia-Wawrzeńczyce", pop: 7852 },
    ],
    []
  );

  // Hardcoded przyrost naturalny data for 2024
  const przyrostNaturalnyData = useMemo(
    () => [
      { gmina: "Wielka Wieś", przyrost: 57 },
      { gmina: "Wieliczka", przyrost: 41 },
      { gmina: "Niepołomice", przyrost: 25 },
      { gmina: "Zielonki", przyrost: 34 },
      { gmina: "Kocmyrzów-Luborzyc", przyrost: 9 },
      { gmina: "Mogilany", przyrost: 7 },
      { gmina: "Michałowice", przyrost: 1 },
      { gmina: "Liszki", przyrost: -3 },
      { gmina: "Biskupice", przyrost: -3 },
      { gmina: "Igołomia-Wawrzeńcz", przyrost: -6 },
      { gmina: "Czernichów", przyrost: -40 },
      { gmina: "Świątniki Górne", przyrost: -42 },
      { gmina: "Skawina", przyrost: -83 },
      { gmina: "Zabierzów", przyrost: -91 },
      { gmina: "Kraków", przyrost: -502 },
    ],
    []
  );

  // Hardcoded Metropolia Krakowska population data 2019-2024
  const mkTrendData = useMemo(
    () => [
      { rok: "2019", ludnosc: 1076117 },
      { rok: "2020", ludnosc: 1121525 },
      { rok: "2021", ludnosc: 1127896 },
      { rok: "2022", ludnosc: 1132625 },
      { rok: "2023", ludnosc: 1139182 },
      { rok: "2024", ludnosc: 1145723 },
    ],
    []
  );

  // Age structure data for 2024 (percentage shares by economic age groups)
  const strukturaWiekuData = useMemo(
    () => [
      {
        gmina: "Wielka Wieś",
        przedprodukcyjny: 24.4,
        produkcyjny: 60.1,
        poprodukcyjny: 15.5,
      },
      {
        gmina: "Zielonki",
        przedprodukcyjny: 23.9,
        produkcyjny: 59.8,
        poprodukcyjny: 16.3,
      },
      {
        gmina: "Niepołomice",
        przedprodukcyjny: 23.5,
        produkcyjny: 59.2,
        poprodukcyjny: 17.3,
      },
      {
        gmina: "Michałowice",
        przedprodukcyjny: 23.1,
        produkcyjny: 60.5,
        poprodukcyjny: 16.5,
      },
      {
        gmina: "Liszki",
        przedprodukcyjny: 22.9,
        produkcyjny: 57.7,
        poprodukcyjny: 19.4,
      },
      {
        gmina: "Biskupice",
        przedprodukcyjny: 22.9,
        produkcyjny: 59.5,
        poprodukcyjny: 17.7,
      },
      {
        gmina: "Mogilany",
        przedprodukcyjny: 22.6,
        produkcyjny: 60.4,
        poprodukcyjny: 17.0,
      },
      {
        gmina: "Wieliczka",
        przedprodukcyjny: 21.8,
        produkcyjny: 60.0,
        poprodukcyjny: 18.2,
      },
      {
        gmina: "Świątniki Górne",
        przedprodukcyjny: 21.6,
        produkcyjny: 59.7,
        poprodukcyjny: 18.7,
      },
      {
        gmina: "Kocmyrzów-Luborzyca",
        przedprodukcyjny: 21.3,
        produkcyjny: 60.6,
        poprodukcyjny: 18.1,
      },
      {
        gmina: "Czernichów",
        przedprodukcyjny: 21.0,
        produkcyjny: 59.1,
        poprodukcyjny: 19.8,
      },
      {
        gmina: "Zabierzów",
        przedprodukcyjny: 20.6,
        produkcyjny: 58.2,
        poprodukcyjny: 21.2,
      },
      {
        gmina: "Igołomia-Wawrzeńczyce",
        przedprodukcyjny: 19.2,
        produkcyjny: 58.1,
        poprodukcyjny: 22.7,
      },
      {
        gmina: "Skawina",
        przedprodukcyjny: 19.2,
        produkcyjny: 58.4,
        poprodukcyjny: 22.4,
      },
      {
        gmina: "Kraków",
        przedprodukcyjny: 16.5,
        produkcyjny: 61.0,
        poprodukcyjny: 22.5,
      },
    ],
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
          overflow: "auto",
          padding: "0 12px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="hide-scrollbar"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            width: "100%",
          }}
        >
          <Card
            title="Przyrost naturalny w gminach Metropolii Krakowskiej w 2024 roku"
            subtitle="Źródło: BDL GUS"
            height={cardHeight}
            onOpen={() => setOpenCard("przyrost2024")}
          >
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={useMemo(
                    () =>
                      przyrostNaturalnyData.sort(
                        (a, b) => b.przyrost - a.przyrost
                      ),
                    [przyrostNaturalnyData]
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
                    tick={{ fontSize: chartFontSize }}
                  />
                  <YAxis tick={{ fontSize: chartFontSize }} />
                  <Tooltip
                    formatter={(v: number) => [
                      `${v}`,
                      "osób (przyrost naturalny)",
                    ]}
                    labelStyle={{ fontSize: chartFontSize }}
                    itemStyle={{ fontSize: chartFontSize }}
                  />
                  <Bar
                    dataKey="przyrost"
                    name="przyrost naturalny (osoby)"
                    fill={IO_CHART_COLORS[0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card
            title="Gęstość zaludnienia Metropolii Krakowskiej"
            subtitle="Źródło: BDL GUS"
            height={cardHeight}
            onOpen={() => setOpenCard("densityMap")}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <iframe
                title="ArcGIS Experience Map"
                src="https://experience.arcgis.com/experience/1b4cd2dd47364324908a05fc2cf2f4a5"
                style={{ width: "100%", flex: 1, border: 0 }}
                loading="lazy"
                allowFullScreen
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  padding: "12px 8px 4px",
                  fontSize: 10,
                  color: "#4b5563",
                }}
              >
                <div style={{ fontWeight: 600, marginRight: 4, fontSize: 10 }}>
                  [os./km²]
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div
                    style={{
                      width: 20,
                      height: 12,
                      background: "rgb(139, 0, 0)",
                      border: "1px solid #ddd",
                    }}
                  />
                  <span>&gt; 700</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div
                    style={{
                      width: 20,
                      height: 12,
                      background: "rgb(220, 20, 60)",
                      border: "1px solid #ddd",
                    }}
                  />
                  <span>450 - 700</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div
                    style={{
                      width: 20,
                      height: 12,
                      background: "rgb(255, 99, 71)",
                      border: "1px solid #ddd",
                    }}
                  />
                  <span>310 - 450</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div
                    style={{
                      width: 20,
                      height: 12,
                      background: "rgb(255, 160, 122)",
                      border: "1px solid #ddd",
                    }}
                  />
                  <span>200 - 310</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div
                    style={{
                      width: 20,
                      height: 12,
                      background: "rgb(255, 218, 185)",
                      border: "1px solid #ddd",
                    }}
                  />
                  <span>&lt; 200</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title="Zmiany liczby ludności Metropolii Krakowskiej w latach 2019–2024"
            subtitle="Źródło: BDL GUS"
            height={cardHeight}
            onOpen={() => setOpenCard("mkTrend")}
          >
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mkTrendData}
                  margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
                >
                  <CartesianGrid vertical={false} stroke="#eee" />
                  <XAxis dataKey="rok" tick={{ fontSize: chartFontSize }} />
                  <YAxis
                    domain={["dataMin - 5000", "dataMax + 5000"]}
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("pl-PL", {
                        notation: "compact",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(value)
                    }
                    tick={{ fontSize: chartFontSize }}
                  />
                  <Tooltip
                    formatter={(v: number) => [
                      new Intl.NumberFormat("pl-PL").format(v),
                      "ludność",
                    ]}
                    labelStyle={{ fontSize: chartFontSize }}
                    itemStyle={{ fontSize: chartFontSize }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ludnosc"
                    name="ludność"
                    stroke={IO_CHART_COLORS[2]}
                    strokeWidth={2}
                    dot={{ r: 4, fill: IO_CHART_COLORS[2] }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div style={{ gridRow: "span 2" }}>
            <Card
              title="Ludność gmin"
              subtitle="Źródło: BDL GUS"
              height={cardHeight * 2 + 12}
              onOpen={() => setOpenCard("gminyPop")}
            >
              <div
                style={{ height: cardHeight * 2 + 12 - 60, overflow: "auto" }}
              >
                {/* Total Population Section */}
                <div
                  style={{
                    marginBottom: 16,
                    padding: 12,
                    background: "rgb(146, 23, 45)",
                    borderRadius: 8,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 12, color: "#ffffff", opacity: 0.9 }}>
                    Ludność metropolii ogółem
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {new Intl.NumberFormat("pl-PL").format(1145723)}
                  </div>
                </div>

                {/* Individual Gminas */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
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

          <Card
            title="Wskaźnik obciążenia demograficznego"
            subtitle="Źródło: BDL GUS"
            height={cardHeight}
            onOpen={() => setOpenCard("obciazenie")}
          >
            <p style={{ margin: "0 0 6px", color: "#6b7280", fontSize: 11 }}>
              Liczba osób w wieku nieprodukcyjnym (przed- i poprodukcyjnym) na
              100 osób w wieku produkcyjnym.
            </p>
            <div style={{ flex: 1, minHeight: 0 }}>
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
                    tick={{ fontSize: chartFontSize }}
                  />
                  <YAxis unit="" tick={{ fontSize: chartFontSize }} />
                  <Tooltip
                    formatter={(v: number) => [
                      v.toFixed(1),
                      "na 100 w wieku prod.",
                    ]}
                    labelStyle={{ fontSize: chartFontSize }}
                    itemStyle={{ fontSize: chartFontSize }}
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

          <Card
            title="Zmiana liczby ludności w gminach Stowarzyszenia Metropolii Krakowskiej [%] w latach 2019–2024"
            subtitle="Źródło: BDL GUS"
            height={cardHeight}
            onOpen={() => setOpenCard("zmianaGmin")}
          >
            <div style={{ flex: 1, minHeight: 0 }}>
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
                    tick={{ fontSize: chartFontSize }}
                  />
                  <YAxis unit="%" tick={{ fontSize: chartFontSize }} />
                  <Tooltip
                    formatter={(v: number) => [
                      `${v.toFixed(1)}%`,
                      "zmiana 2019–2024",
                    ]}
                    labelStyle={{ fontSize: chartFontSize }}
                    itemStyle={{ fontSize: chartFontSize }}
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

          <Card
            title="Struktura wieku mieszkańców w gminach Metropolii Krakowskiej w 2024 roku"
            subtitle="Źródło: BDL GUS"
            height={cardHeight}
            onOpen={() => setOpenCard("strukturaWieku")}
          >
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={strukturaWiekuData}
                  layout="vertical"
                  margin={{ top: 8, right: 8, bottom: 8, left: 30 }}
                >
                  <CartesianGrid horizontal={false} stroke="#eee" />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                    tickFormatter={(v) => `${Math.round(v)}%`}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="gmina"
                    tick={{ fontSize: 10 }}
                    width={95}
                    interval={0}
                  />
                  <Tooltip
                    formatter={(v: number, name: string) => {
                      const labels: Record<string, string> = {
                        przedprodukcyjny: "przedprodukcyjny (0-17 lat)",
                        produkcyjny: "produkcyjny (18-59/64)",
                        poprodukcyjny: "poprodukcyjny (60+/65+)",
                      };
                      return [`${v.toFixed(1)}%`, labels[name] || name];
                    }}
                    labelStyle={{ fontSize: chartFontSize }}
                    itemStyle={{ fontSize: chartFontSize }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 10, paddingTop: 4 }}
                    formatter={(value: string) => {
                      const labels: Record<string, string> = {
                        przedprodukcyjny: "przedprodukcyjny",
                        produkcyjny: "produkcyjny",
                        poprodukcyjny: "poprodukcyjny",
                      };
                      return labels[value] || value;
                    }}
                  />
                  <Bar
                    dataKey="przedprodukcyjny"
                    stackId="a"
                    fill={IO_CHART_COLORS[0]}
                    name="przedprodukcyjny"
                  />
                  <Bar
                    dataKey="produkcyjny"
                    stackId="a"
                    fill={IO_CHART_COLORS[2]}
                    name="produkcyjny"
                  />
                  <Bar
                    dataKey="poprodukcyjny"
                    stackId="a"
                    fill={IO_CHART_COLORS[1]}
                    name="poprodukcyjny"
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
        fullscreen
      >
        <iframe
          title="ArcGIS Experience Map"
          src="https://experience.arcgis.com/experience/9972adb1957046eb98cfac412816e286?&legend=true&active_panel=legend&zoom=true&scale=true"
          style={{ width: "100%", height: "100%", border: 0 }}
          allowFullScreen
        />
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
          <ResponsiveContainer width="100%" height="95%">
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
                tick={{ fontSize: chartFontSize }}
              />
              <YAxis unit="" tick={{ fontSize: chartFontSize }} />
              <Tooltip
                formatter={(v: number) => [
                  v.toFixed(1),
                  "na 100 w wieku prod.",
                ]}
                labelStyle={{ fontSize: chartFontSize }}
                itemStyle={{ fontSize: chartFontSize }}
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
          <ResponsiveContainer width="100%" height="95%">
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
                tick={{ fontSize: chartFontSize }}
              />
              <YAxis unit="%" tick={{ fontSize: chartFontSize }} />
              <Tooltip
                formatter={(v: number) => [
                  `${v.toFixed(1)}%`,
                  "zmiana 2019–2024",
                ]}
                labelStyle={{ fontSize: chartFontSize }}
                itemStyle={{ fontSize: chartFontSize }}
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
          <ResponsiveContainer width="100%" height="95%">
            <LineChart
              data={mkTrendData}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" tick={{ fontSize: chartFontSize }} />
              <YAxis
                domain={["dataMin - 5000", "dataMax + 5000"]}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("pl-PL", {
                    notation: "compact",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(value)
                }
                tick={{ fontSize: chartFontSize }}
              />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "ludność",
                ]}
                labelStyle={{ fontSize: chartFontSize }}
                itemStyle={{ fontSize: chartFontSize }}
              />
              <Line
                type="monotone"
                dataKey="ludnosc"
                name="ludność"
                stroke={IO_CHART_COLORS[2]}
                strokeWidth={2}
                dot={{ r: 4, fill: IO_CHART_COLORS[2] }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "przyrost2024"}
        onClose={() => setOpenCard(null)}
        title="Przyrost naturalny w gminach Metropolii Krakowskiej w 2024"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              data={useMemo(
                () =>
                  przyrostNaturalnyData.sort((a, b) => b.przyrost - a.przyrost),
                [przyrostNaturalnyData]
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
                tick={{ fontSize: chartFontSize }}
              />
              <YAxis tick={{ fontSize: chartFontSize }} />
              <Tooltip
                formatter={(v: number) => [`${v}`, "osób (przyrost naturalny)"]}
                labelStyle={{ fontSize: chartFontSize }}
                itemStyle={{ fontSize: chartFontSize }}
              />
              <Bar
                dataKey="przyrost"
                name="przyrost naturalny (osoby)"
                fill={IO_CHART_COLORS[0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "strukturaWieku"}
        onClose={() => setOpenCard(null)}
        title="Struktura wieku mieszkańców w gminach Metropolii Krakowskiej w 2024 roku"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              data={strukturaWiekuData}
              layout="vertical"
              margin={{ top: 8, right: 30, bottom: 30, left: 130 }}
            >
              <CartesianGrid horizontal={false} stroke="#eee" />
              <XAxis
                type="number"
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tickFormatter={(v) => `${Math.round(v)}%`}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="gmina"
                tick={{ fontSize: 12 }}
                width={125}
                interval={0}
              />
              <Tooltip
                formatter={(v: number, name: string) => {
                  const labels: Record<string, string> = {
                    przedprodukcyjny: "przedprodukcyjny (0-17 lat)",
                    produkcyjny: "produkcyjny (18-59/64)",
                    poprodukcyjny: "poprodukcyjny (60+/65+)",
                  };
                  return [`${v.toFixed(1)}%`, labels[name] || name];
                }}
                labelStyle={{ fontSize: 12 }}
                itemStyle={{ fontSize: 12 }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                formatter={(value: string) => {
                  const labels: Record<string, string> = {
                    przedprodukcyjny: "wiek przedprodukcyjny (0-17 lat)",
                    produkcyjny: "wiek produkcyjny (18-59/64)",
                    poprodukcyjny: "wiek poprodukcyjny (60+/65+)",
                  };
                  return labels[value] || value;
                }}
              />
              <Bar
                dataKey="przedprodukcyjny"
                stackId="a"
                fill={IO_CHART_COLORS[0]}
                name="przedprodukcyjny"
              />
              <Bar
                dataKey="produkcyjny"
                stackId="a"
                fill={IO_CHART_COLORS[2]}
                name="produkcyjny"
              />
              <Bar
                dataKey="poprodukcyjny"
                stackId="a"
                fill={IO_CHART_COLORS[1]}
                name="poprodukcyjny"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}
