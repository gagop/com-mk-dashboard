import { useState, useEffect } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { GMINY } from "../data/bdl";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

export default function Gospodarka() {
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
        Gospodarka
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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Poziom zadowolenia mieszkańców z możliwości rozwoju zawodowego"
              subtitle="Źródło: Raport z badań społecznych - monitorowanie wskaźników Strategii Metropolia Krakowska 2030 oraz Barometru Krakowskiego 2024"
              height={cardHeight}
              onOpen={() => setOpenCard("zadowoleniePrzedsiebiorcow")}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <iframe
                  title="Poziom zadowolenia mieszkańców z możliwości rozwoju zawodowego w 2024 r."
                  src="https://experience.arcgis.com/experience/dc389c17988543428b3190c8317a49fe"
                  style={{ width: "100%", flex: 1, border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    padding: "12px 8px 4px",
                    fontSize: 10,
                    color: "#4b5563",
                  }}
                >
                  <div
                    style={{ fontWeight: 600, marginRight: 4, fontSize: 10 }}
                  >
                    [%]
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(116, 27, 105)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>&gt;67%</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(144, 65, 132)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>61%-67%</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(173, 103, 159)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>54%-60%</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(201, 141, 186)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>45%-53%</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(229, 179, 213)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>&lt;45%</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(200, 200, 200)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>brak danych</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Udział podatku CIT w budżecie"
              subtitle="Źródło: BDL GUS"
              height={cardHeight}
              onOpen={() => setOpenCard("udzialCIT")}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <iframe
                  title="Udział podatku CIT"
                  src="https://experience.arcgis.com/experience/0c6ce3cadf95473cb27c2cacfa3265cc"
                  style={{ width: "100%", flex: 1, border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    padding: "12px 8px 4px",
                    fontSize: 10,
                    color: "#4b5563",
                  }}
                >
                  <div
                    style={{ fontWeight: 600, marginRight: 4, fontSize: 10 }}
                  >
                    [%]
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(116, 27, 105)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>3,46%-6,47%</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(144, 65, 132)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>1,1%-3,45%</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(173, 103, 159)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>0,37%-1,09%</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(201, 141, 186)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>0,31%-0,36%</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(229, 179, 213)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>0,08%-0,3%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Nowe podmioty gospodarcze (2019–2024)"
              subtitle="Źródło: BDL GUS"
              height={340}
              onOpen={() => setOpenCard("podmioty")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
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
                    <XAxis dataKey="rok" tick={{ fontSize: chartFontSize }} />
                    <YAxis
                      domain={["dataMin - 1000", "dataMax + 1000"]}
                      tickFormatter={(value) =>
                        new Intl.NumberFormat("pl-PL", {
                          notation: "compact",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(value)
                      }
                      tick={{ fontSize: chartFontSize }}
                    />
                    <Tooltip
                      formatter={(v: number) => [
                        new Intl.NumberFormat("pl-PL").format(v),
                        "podmioty",
                      ]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Line
                      type="monotone"
                      dataKey="podmioty"
                      name="Liczba podmiotów"
                      stroke="rgb(116, 27, 105)"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "rgb(116, 27, 105)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Udział bezrobotnych w liczbie ludności w wieku produkcyjnym"
              subtitle="Źródło: BDL GUS"
              height={cardHeight}
              onOpen={() => setOpenCard("bezrobotni")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
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
                      tick={{ fontSize: chartFontSize }}
                    />
                    <YAxis unit="%" tick={{ fontSize: chartFontSize }} />
                    <Tooltip
                      formatter={(v: number) => [`${v}%`, "udział"]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Bar
                      dataKey="wartosc"
                      name="Udział bezrobotnych [%]"
                      fill="rgb(157, 28, 124)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Miejsca noclegowe"
              subtitle="Źródło: BDL GUS (bez Krakowa)"
              height={cardHeight}
              onOpen={() => setOpenCard("noclegowe")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
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
                      .filter(
                        (item) => item.miejsca > 0 && item.gmina !== "Kraków"
                      )
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
                      tick={{ fontSize: chartFontSize }}
                    />
                    <YAxis tick={{ fontSize: chartFontSize }} />
                    <Tooltip
                      formatter={(v: number) => [
                        new Intl.NumberFormat("pl-PL").format(v as number),
                        "miejsca",
                      ]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Bar
                      dataKey="miejsca"
                      name="Miejsca noclegowe"
                      fill="rgb(157, 28, 124)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Miejsca noclegowe - Kraków"
              subtitle="Źródło: BDL GUS"
              height={200}
            >
              <div
                style={{
                  height: 100,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 700,
                    color: "rgb(116, 27, 105)",
                    lineHeight: 1,
                  }}
                >
                  35 805
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    textAlign: "center",
                  }}
                >
                  Liczba miejsc noclegowych w Krakowie
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={openCard === "zadowoleniePrzedsiebiorcow"}
        onClose={() => setOpenCard(null)}
        title="Poziom zadowolenia mieszkańców z możliwości rozwoju zawodowego w 2024 r."
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Zadowolenie przedsiębiorców"
            src="https://experience.arcgis.com/experience/ccafc27dc27749b2a88317b0e7ff0907/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "udzialCIT"}
        onClose={() => setOpenCard(null)}
        title="Udział podatku CIT w budżecie"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Udział podatku CIT"
            src="https://experience.arcgis.com/experience/8979bbcd027542bdad25b09329ab5bbb/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "podmioty"}
        onClose={() => setOpenCard(null)}
        title="Nowe podmioty gospodarcze (2019–2024)"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
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
              <Line
                type="monotone"
                dataKey="podmioty"
                name="Liczba podmiotów"
                stroke="rgb(116, 27, 105)"
                strokeWidth={2}
                dot={{ r: 4, fill: "rgb(116, 27, 105)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "bezrobotni"}
        onClose={() => setOpenCard(null)}
        title="Udział bezrobotnych"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
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
              <Bar
                dataKey="wartosc"
                name="Udział bezrobotnych [%]"
                fill="rgb(157, 28, 124)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "noclegowe"}
        onClose={() => setOpenCard(null)}
        title="Miejsca noclegowe"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
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
              <Bar
                dataKey="miejsca"
                name="Miejsca noclegowe"
                fill="rgb(157, 28, 124)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}
