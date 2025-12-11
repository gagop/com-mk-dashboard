import { useState, useEffect } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
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

export default function SrodowiskoPrzestrzen() {
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [cardHeight, setCardHeight] = useState(380);
  const [chartFontSize, setChartFontSize] = useState(11);

  useEffect(() => {
    const calculateCardHeight = () => {
      // Get available height
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      // Subtract header (~60px), page title (~30px), footer (~70px), and margins/gaps
      const availableHeight = viewportHeight - 180;
      // We have 2 rows of cards, divide by 2 and subtract gap
      const calculatedHeight = (availableHeight - 12) / 2;
      // Set minimum height to prevent cards from being too small, allow larger heights
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
        Środowisko i przestrzeń
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
              title="Odpady komunalne na mieszkańca"
              subtitle="Źródło: BDL GUS"
              height={cardHeight}
              onOpen={() => setOpenCard("odpady")}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <iframe
                  title="Ilość odebranych odpadów komunalnych"
                  src="https://experience.arcgis.com/experience/068180947b2d450e91789b37954b9594"
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
                  <div
                    style={{
                      fontWeight: 600,
                      marginRight: 4,
                      fontSize: 10,
                    }}
                  >
                    [kg/os./rok]
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(0, 100, 0)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>&gt; 550</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(34, 139, 34)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>501 - 550</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(124, 252, 0)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>451 - 500</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(173, 255, 47)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>401 - 450</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(240, 255, 240)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>&lt; 401</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Redukcja emisji pyłu PM2,5"
              subtitle="Źródło: BDL GUS"
              height={cardHeight}
              onOpen={() => setOpenCard("pm25")}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <iframe
                  title="Redukcja emisji pyłu PM2,5"
                  src="https://experience.arcgis.com/experience/586f6ce08ae8417193336ccd75ccfc61"
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
                  <div
                    style={{
                      fontWeight: 600,
                      marginRight: 4,
                      fontSize: 10,
                    }}
                  >
                    [Mg]
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(0, 100, 0)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>&gt; 10</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(34, 139, 34)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>5 - 10</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(124, 252, 0)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>3 - 5</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(173, 255, 47)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>2 - 3</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(240, 255, 240)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>&lt; 2</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Poziom recyklingu odpadów"
              subtitle="Źródło: BDL GUS"
              height={cardHeight}
              onOpen={() => setOpenCard("recykling")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { gmina: "Igołomia-Wawrzeńczyce", poziom: 67.52 },
                      { gmina: "Liszki", poziom: 66.14 },
                      { gmina: "Wielka Wieś", poziom: 56.9 },
                      { gmina: "Czernichów", poziom: 52.96 },
                      { gmina: "Zabierzów", poziom: 52.86 },
                      { gmina: "Zielonki", poziom: 52.17 },
                      { gmina: "Kraków", poziom: 52.33 },
                      { gmina: "Skawina", poziom: 51.35 },
                      { gmina: "Mogilany", poziom: 48.21 },
                      { gmina: "Michałowice", poziom: 49.06 },
                      { gmina: "Niepołomice", poziom: 46.27 },
                      { gmina: "Kocmyrzów-Luborzyca", poziom: 46.31 },
                      { gmina: "Biskupice", poziom: 45.77 },
                      { gmina: "Świątniki Górne", poziom: 45.84 },
                      { gmina: "Wieliczka", poziom: 25 },
                    ]
                      .slice()
                      .sort((a, b) => b.poziom - a.poziom)}
                    margin={{ top: 8, right: 8, bottom: 84, left: 8 }}
                  >
                    <CartesianGrid vertical={false} stroke="#eee" />
                    <XAxis
                      dataKey="gmina"
                      angle={-60}
                      textAnchor="end"
                      interval={0}
                      height={60}
                      tick={{ fontSize: chartFontSize }}
                    />
                    <YAxis unit="%" tick={{ fontSize: chartFontSize }} />
                    <Tooltip
                      formatter={(v: number) => [`${v}%`, "poziom"]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Bar
                      dataKey="poziom"
                      name="Poziom recyklingu [%]"
                      fill="rgb(149, 193, 31)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Redukcja emisji pyłu PM10"
              subtitle="Źródło: Program ochrony powietrza"
              height={cardHeight}
              onOpen={() => setOpenCard("pm10")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { gmina: "Czernichów", pm10: 11.07 },
                      { gmina: "Igołomia-Wawrzeńczyce", pm10: 1.89 },
                      { gmina: "Kocmyrzów-Luborzyca", pm10: 3.07 },
                      { gmina: "Liszki", pm10: 2.94 },
                      { gmina: "Michałowice", pm10: 4.57 },
                      { gmina: "Mogilany", pm10: 1.34 },
                      { gmina: "Skawina", pm10: 2.45 },
                      { gmina: "Świątniki Górne", pm10: 3.45 },
                      { gmina: "Wielka Wieś", pm10: 3.2 },
                      { gmina: "Zabierzów", pm10: 5.49 },
                      { gmina: "Zielonki", pm10: 3.23 },
                      { gmina: "Biskupice", pm10: 4.14 },
                      { gmina: "Niepołomice", pm10: 3.52 },
                      { gmina: "Wieliczka", pm10: 12.87 },
                      { gmina: "Kraków", pm10: 2.07 },
                    ]
                      .slice()
                      .sort((a, b) => b.pm10 - a.pm10)}
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
                    <YAxis unit=" Mg" tick={{ fontSize: chartFontSize }} />
                    <Tooltip
                      formatter={(v: number) => [v.toString(), "redukcja PM10"]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Bar
                      dataKey="pm10"
                      name="Redukcja PM10 [Mg]"
                      fill="rgb(58, 142, 20)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Mieszkania oddane do użytkowania"
              subtitle="Źródło: BDL GUS"
              height={cardHeight}
              onOpen={() => setOpenCard("mieszkania")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { gmina: "Wieliczka", wartosc: 118.4 },
                      { gmina: "Kraków", wartosc: 107.1 },
                      { gmina: "Biskupice", wartosc: 93.7 },
                      { gmina: "Niepołomice", wartosc: 84 },
                      { gmina: "Kocmyrzów-Luborzyca", wartosc: 75.6 },
                      { gmina: "Wielka Wieś", wartosc: 54.7 },
                      { gmina: "Zabierzów", wartosc: 57.2 },
                      { gmina: "Czernichów", wartosc: 51.8 },
                      { gmina: "Michałowice", wartosc: 48.9 },
                      { gmina: "Świątniki Górne", wartosc: 47.4 },
                      { gmina: "Niepołomice", wartosc: 84 },
                      { gmina: "Zielonki", wartosc: 43.6 },
                      { gmina: "Mogilany", wartosc: 41.4 },
                      { gmina: "Liszki", wartosc: 37.5 },
                      { gmina: "Skawina", wartosc: 26.4 },
                      { gmina: "Igołomia-Wawrzeńczyce", wartosc: 20.4 },
                    ]
                      .filter(
                        (v, i, arr) =>
                          arr.findIndex((x) => x.gmina === v.gmina) === i
                      )
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
                    <YAxis tick={{ fontSize: chartFontSize }} />
                    <Tooltip
                      formatter={(v: number) => [
                        v.toString(),
                        "na 10 tys. ludności",
                      ]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Bar
                      dataKey="wartosc"
                      name="Mieszkania na 10 tys. mieszkańców"
                      fill="rgb(149, 193, 31)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Długość eksploatowanej sieci wodociągowej w Metropolii Krakowskiej w latach 2020–2024 (km)"
              subtitle="Źródło: BDL GUS"
              height={cardHeight}
              onOpen={() => setOpenCard("wodociagi")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { rok: "2020", dlugosc: 4712.8 },
                      { rok: "2021", dlugosc: 4784.4 },
                      { rok: "2022", dlugosc: 4854.9 },
                      { rok: "2023", dlugosc: 4914.3 },
                      { rok: "2024", dlugosc: 4977.1 },
                    ]}
                    margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
                  >
                    <CartesianGrid vertical={false} stroke="#eee" />
                    <XAxis dataKey="rok" tick={{ fontSize: chartFontSize }} />
                    <YAxis
                      tick={{ fontSize: chartFontSize }}
                      domain={[4600, 5000]}
                      unit=" km"
                    />
                    <Tooltip
                      formatter={(v: number) => [
                        `${v.toFixed(1)} km`,
                        "Długość sieci",
                      ]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Line
                      type="monotone"
                      dataKey="dlugosc"
                      name="Długość sieci wodociągowej [km]"
                      stroke="rgb(58, 142, 20)"
                      strokeWidth={2}
                      dot={{ fill: "rgb(58, 142, 20)", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={openCard === "odpady"}
        onClose={() => setOpenCard(null)}
        title="Ilość odebranych odpadów komunalnych przypadająca na 1 mieszkańca [kg]"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Ilość odebranych odpadów komunalnych"
            src="https://experience.arcgis.com/experience/7d0ef674f28046cc96aeb83fa7a89b0c/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "pm25"}
        onClose={() => setOpenCard(null)}
        title="Redukcja emisji pyłu PM2,5"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Redukcja emisji pyłu PM2,5"
            src="https://experience.arcgis.com/experience/2cd7bc91e15148b59c6f5342b24e7f00/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "recykling"}
        onClose={() => setOpenCard(null)}
        title="Poziom recyklingu odpadów"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              data={[
                { gmina: "Igołomia-Wawrzeńczyce", poziom: 67.52 },
                { gmina: "Liszki", poziom: 66.14 },
                { gmina: "Wielka Wieś", poziom: 56.9 },
                { gmina: "Czernichów", poziom: 52.96 },
                { gmina: "Zabierzów", poziom: 52.86 },
                { gmina: "Zielonki", poziom: 52.17 },
                { gmina: "Kraków", poziom: 52.33 },
                { gmina: "Skawina", poziom: 51.35 },
                { gmina: "Mogilany", poziom: 48.21 },
                { gmina: "Michałowice", poziom: 49.06 },
                { gmina: "Niepołomice", poziom: 46.27 },
                { gmina: "Kocmyrzów-Luborzyca", poziom: 46.31 },
                { gmina: "Biskupice", poziom: 45.77 },
                { gmina: "Świątniki Górne", poziom: 45.84 },
                { gmina: "Wieliczka", poziom: 25 },
              ]
                .slice()
                .sort((a, b) => b.poziom - a.poziom)}
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
              <Tooltip formatter={(v: number) => [`${v}%`, "poziom"]} />
              <Bar
                dataKey="poziom"
                name="Poziom recyklingu odpadów [%]"
                fill="rgb(149, 193, 31)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "pm10"}
        onClose={() => setOpenCard(null)}
        title="Redukcja emisji pyłu PM10"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              data={[
                { gmina: "Czernichów", pm10: 11.07 },
                { gmina: "Igołomia-Wawrzeńczyce", pm10: 1.89 },
                { gmina: "Kocmyrzów-Luborzyca", pm10: 3.07 },
                { gmina: "Liszki", pm10: 2.94 },
                { gmina: "Michałowice", pm10: 4.57 },
                { gmina: "Mogilany", pm10: 1.34 },
                { gmina: "Skawina", pm10: 2.45 },
                { gmina: "Świątniki Górne", pm10: 3.45 },
                { gmina: "Wielka Wieś", pm10: 3.2 },
                { gmina: "Zabierzów", pm10: 5.49 },
                { gmina: "Zielonki", pm10: 3.23 },
                { gmina: "Biskupice", pm10: 4.14 },
                { gmina: "Niepołomice", pm10: 3.52 },
                { gmina: "Wieliczka", pm10: 12.87 },
                { gmina: "Kraków", pm10: 2.07 },
              ]
                .slice()
                .sort((a, b) => b.pm10 - a.pm10)}
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
              <YAxis unit=" Mg" />
              <Tooltip
                formatter={(v: number) => [v.toString(), "redukcja PM10"]}
              />
              <Bar
                dataKey="pm10"
                name="Redukcja emisji pyłu PM10 [Mg]"
                fill="rgb(58, 142, 20)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "mieszkania"}
        onClose={() => setOpenCard(null)}
        title="Mieszkania oddane do użytkowania na 10 tys. ludności"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              data={[
                { gmina: "Wieliczka", wartosc: 118.4 },
                { gmina: "Kraków", wartosc: 107.1 },
                { gmina: "Biskupice", wartosc: 93.7 },
                { gmina: "Niepołomice", wartosc: 84 },
                { gmina: "Kocmyrzów-Luborzyca", wartosc: 75.6 },
                { gmina: "Wielka Wieś", wartosc: 54.7 },
                { gmina: "Zabierzów", wartosc: 57.2 },
                { gmina: "Czernichów", wartosc: 51.8 },
                { gmina: "Michałowice", wartosc: 48.9 },
                { gmina: "Świątniki Górne", wartosc: 47.4 },
                { gmina: "Zielonki", wartosc: 43.6 },
                { gmina: "Mogilany", wartosc: 41.4 },
                { gmina: "Liszki", wartosc: 37.5 },
                { gmina: "Skawina", wartosc: 26.4 },
                { gmina: "Igołomia-Wawrzeńczyce", wartosc: 20.4 },
              ]
                .filter(
                  (v, i, arr) => arr.findIndex((x) => x.gmina === v.gmina) === i
                )
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
                formatter={(v: number) => [v.toString(), "na 10 tys. ludności"]}
              />
              <Bar
                dataKey="wartosc"
                name="Mieszkania na 10 tys. mieszkańców"
                fill="rgb(149, 193, 31)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "wodociagi"}
        onClose={() => setOpenCard(null)}
        title="Długość eksploatowanej sieci wodociągowej w Metropolii Krakowskiej w latach 2020–2024 (km)"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
            <LineChart
              data={[
                { rok: "2020", dlugosc: 4712.8 },
                { rok: "2021", dlugosc: 4784.4 },
                { rok: "2022", dlugosc: 4854.9 },
                { rok: "2023", dlugosc: 4914.3 },
                { rok: "2024", dlugosc: 4977.1 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis domain={[4600, 5000]} unit=" km" />
              <Tooltip
                formatter={(v: number) => [
                  `${v.toFixed(1)} km`,
                  "Długość sieci",
                ]}
              />
              <Line
                type="monotone"
                dataKey="dlugosc"
                name="Długość sieci wodociągowej [km]"
                stroke="rgb(58, 142, 20)"
                strokeWidth={2}
                dot={{ fill: "rgb(58, 142, 20)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}
