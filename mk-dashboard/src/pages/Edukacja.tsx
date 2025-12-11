import { useState, useEffect } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { GMINY } from "../data/bdl";
import { dzieciPrzedszkolne3_5Lat } from "../data/edukacja";
import {
  wynikiOsmoklasPolski2024,
  wynikiOsmoklasMatematyka2024,
} from "../data/edukacja";
import { LATA } from "../data/utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

export default function Edukacja() {
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
        Edukacja
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
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Zadowolenie z jakości edukacji"
              subtitle="Źródło: Badania społeczne 2024"
              height={cardHeight}
              onOpen={() => setOpenCard("zadowolenieEdukacja")}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <iframe
                  title="Zadowolenie z jakości edukacji"
                  src="https://experience.arcgis.com/experience/904d0a31db174c5aa48391b939ee7c63"
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
                        background: "rgb(178, 34, 34)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>&gt; 88</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(205, 92, 92)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>85 - 88</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(233, 150, 122)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>78 - 84</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(250, 200, 180)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>66 - 77</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(255, 228, 220)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>&lt; 66</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              title="Środki na infrastrukturę oświaty"
              subtitle="Źródło: zestawienie budżetowe"
              height={cardHeight}
              onOpen={() => setOpenCard("srodki")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { gmina: "Kraków", kwota: 54216533.0 },
                      { gmina: "Liszki", kwota: 29044584.46 },
                      { gmina: "Wieliczka", kwota: 19968529.4 },
                      { gmina: "Wielka Wieś", kwota: 8097479.43 },
                      { gmina: "Kocmyrzów-Luborzyca", kwota: 6763383.69 },
                      { gmina: "Biskupice", kwota: 4722501.98 },
                      { gmina: "Świątniki Górne", kwota: 4199803.71 },
                      { gmina: "Czernichów", kwota: 2609291.14 },
                      { gmina: "Skawina", kwota: 2342207.06 },
                      { gmina: "Zielonki", kwota: 1355049.66 },
                      { gmina: "Mogilany", kwota: 959757.23 },
                      { gmina: "Niepołomice", kwota: 683352.27 },
                      { gmina: "Michałowice", kwota: 418611.82 },
                      { gmina: "Igołomia-Wawrzeńczyce", kwota: 114309.33 },
                      { gmina: "Zabierzów", kwota: 3070.54 },
                    ]
                      .slice()
                      .sort((a, b) => b.kwota - a.kwota)}
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
                    <YAxis
                      tickFormatter={(value) =>
                        new Intl.NumberFormat("pl-PL", {
                          notation: "compact",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 1,
                        }).format(value)
                      }
                      tick={{ fontSize: chartFontSize }}
                    />
                    <Tooltip
                      formatter={(v: number) => [
                        new Intl.NumberFormat("pl-PL").format(v),
                        "środki [zł]",
                      ]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Bar
                      dataKey="kwota"
                      name="Środki [zł]"
                      fill="rgb(197, 59, 0)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Liczba dzieci w wieku przedszkolnym 3–5 lat (2019–2024)"
              subtitle="Źródło: BDL GUS"
              height={cardHeight}
              onOpen={() => setOpenCard("dzieci")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={LATA.map((rok) => ({
                      rok: String(rok),
                      liczba: GMINY.reduce(
                        (sum, g) =>
                          sum + (dzieciPrzedszkolne3_5Lat[g][rok] || 0),
                        0
                      ),
                    }))}
                    margin={{ top: 24, right: 8, bottom: 16, left: 8 }}
                  >
                    <CartesianGrid vertical={false} stroke="#eee" />
                    <XAxis dataKey="rok" tick={{ fontSize: chartFontSize }} />
                    <YAxis
                      domain={[0, 38000]}
                      tick={{ fontSize: chartFontSize }}
                    />
                    <Tooltip
                      formatter={(v: number) => [
                        new Intl.NumberFormat("pl-PL").format(v),
                        "dzieci 3–5 lat",
                      ]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Bar
                      dataKey="liczba"
                      name="Dzieci 3–5 lat"
                      fill="rgb(197, 59, 0)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card
              title="Miejsca w przedszkolach"
              subtitle="Źródło: BDL GUS"
              height={cardHeight}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <svg
                  width="96"
                  height="96"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Backpack body */}
                  <rect
                    x="12"
                    y="20"
                    width="40"
                    height="38"
                    rx="6"
                    stroke="rgb(197, 59, 0)"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  {/* Top flap/pocket */}
                  <path
                    d="M20 20V14C20 10.6863 22.6863 8 26 8H38C41.3137 8 44 10.6863 44 14V20"
                    stroke="rgb(197, 59, 0)"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  {/* Top pocket */}
                  <rect
                    x="22"
                    y="12"
                    width="20"
                    height="12"
                    rx="3"
                    stroke="rgb(197, 59, 0)"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  {/* Bottom pocket */}
                  <rect
                    x="18"
                    y="38"
                    width="28"
                    height="14"
                    rx="3"
                    stroke="rgb(197, 59, 0)"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  {/* Pocket line */}
                  <line
                    x1="18"
                    y1="44"
                    x2="46"
                    y2="44"
                    stroke="rgb(197, 59, 0)"
                    strokeWidth="2.5"
                  />
                </svg>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 700,
                    color: "rgb(197, 59, 0)",
                    lineHeight: 1,
                  }}
                >
                  1,34
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    textAlign: "center",
                    maxWidth: 280,
                  }}
                >
                  Na każde dziecko 3–5 lat przypada 1,34 miejsca w przedszkolu
                </div>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Szkoły podstawowe"
              subtitle="Źródło: RSiPO"
              height={cardHeight}
              onOpen={() => setOpenCard("szkoly")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="120%">
                  <BarChart
                    data={[
                      { gmina: "Kraków-Podgórze", liczba: 75 },
                      { gmina: "Kraków-Krowodrza", liczba: 47 },
                      { gmina: "Kraków-Śródmieście", liczba: 43 },
                      { gmina: "Kraków-Nowa Huta", liczba: 41 },
                      { gmina: "Wieliczka", liczba: 29 },
                      { gmina: "Skawina", liczba: 21 },
                      { gmina: "Zabierzów", liczba: 12 },
                      { gmina: "Niepołomice", liczba: 12 },
                      { gmina: "Liszki", liczba: 11 },
                      { gmina: "Czernichów", liczba: 9 },
                      { gmina: "Kocmyrzów-Luborzyca", liczba: 9 },
                      { gmina: "Mogilany", liczba: 7 },
                      { gmina: "Biskupice", liczba: 6 },
                      { gmina: "Słomniki", liczba: 6 },
                      { gmina: "Wielka Wieś", liczba: 6 },
                      { gmina: "Zielonki", liczba: 6 },
                      { gmina: "Świątniki Górne", liczba: 6 },
                      { gmina: "Igołomia-Wawrzeńczyce", liczba: 4 },
                      { gmina: "Michałowice", liczba: 3 },
                    ].sort((a, b) => b.liczba - a.liczba)}
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
                        String(v),
                        "szkoły podstawowe",
                      ]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Bar
                      dataKey="liczba"
                      name="Szkoły podstawowe"
                      fill="rgb(244, 76, 0)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card
              title="Egzamin 8-klasisty - polski"
              subtitle="Źródło: OKE Kraków"
              height={cardHeight}
              onOpen={() => setOpenCard("egzaminPolski")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={GMINY.map((gmina) => ({
                      gmina,
                      wynik: wynikiOsmoklasPolski2024[gmina],
                    })).sort((a, b) => b.wynik - a.wynik)}
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
                    <YAxis unit=" %" tick={{ fontSize: chartFontSize }} />
                    <Tooltip
                      formatter={(v: number) => [`${v}%`, "średni wynik"]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Bar
                      dataKey="wynik"
                      name="Wynik polski [%]"
                      fill="rgb(197, 59, 0)"
                    />
                    <ReferenceLine
                      y={61}
                      stroke="#000000"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      label={{
                        value: "Średnia dla Polski: 61%",
                        position: "top",
                        fill: "#000000",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Egzamin 8-klasisty - matematyka"
              subtitle="Źródło: OKE Kraków"
              height={cardHeight}
              onOpen={() => setOpenCard("egzaminMatematyka")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="120%">
                  <BarChart
                    data={GMINY.map((gmina) => ({
                      gmina,
                      wynik: wynikiOsmoklasMatematyka2024[gmina],
                    })).sort((a, b) => b.wynik - a.wynik)}
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
                    <YAxis unit=" %" tick={{ fontSize: chartFontSize }} />
                    <Tooltip
                      formatter={(v: number) => [`${v}%`, "średni wynik"]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Bar
                      dataKey="wynik"
                      name="Wynik matematyka [%]"
                      fill="rgb(244, 76, 0)"
                    />
                    <ReferenceLine
                      y={52}
                      stroke="#000000"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      label={{
                        value: "Średnia dla Polski: 52%",
                        position: "top",
                        fill: "#000000",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card
              title="Nauczyciele z najwyższymi kwalifikacjami"
              subtitle="Źródło: SIO 2024"
              height={cardHeight}
              onOpen={() => setOpenCard("nauczycieleKwalifikacje")}
            >
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { gmina: "Mogilany", odsetek: 89.6 },
                      { gmina: "Liszki", odsetek: 88.9 },
                      { gmina: "Kocmyrzów-Luborzyca", odsetek: 87.3 },
                      { gmina: "Niepołomice", odsetek: 86.1 },
                      { gmina: "Wielka Wieś", odsetek: 85.8 },
                      { gmina: "Czernichów", odsetek: 85.2 },
                      { gmina: "Skawina", odsetek: 84.7 },
                      { gmina: "Zielonki", odsetek: 84.0 },
                      { gmina: "Świątniki Górne", odsetek: 83.5 },
                      { gmina: "Biskupice", odsetek: 83.4 },
                      { gmina: "Michałowice", odsetek: 81.5 },
                      { gmina: "Zabierzów", odsetek: 81.2 },
                      { gmina: "Wieliczka", odsetek: 80.3 },
                      { gmina: "Igołomia-Wawrzeńczyce", odsetek: 79.1 },
                    ].sort((a, b) => b.odsetek - a.odsetek)}
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
                    <YAxis
                      domain={[70, 92]}
                      unit=" %"
                      tick={{ fontSize: chartFontSize }}
                    />
                    <Tooltip
                      formatter={(v: number) => [
                        `${v.toFixed(1).replace(".", ",")}%`,
                        "odsetek nauczycieli",
                      ]}
                      labelStyle={{ fontSize: chartFontSize }}
                      itemStyle={{ fontSize: chartFontSize }}
                    />
                    <Bar
                      dataKey="odsetek"
                      name="Odsetek [%]"
                      fill="rgb(197, 59, 0)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={openCard === "zadowolenieEdukacja"}
        onClose={() => setOpenCard(null)}
        title="Zadowolenie z jakości edukacji"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Zadowolenie z jakości edukacji"
            src="https://experience.arcgis.com/experience/d174d0e98bae40039c667978707468ac/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "srodki"}
        onClose={() => setOpenCard(null)}
        title="Środki na infrastrukturę oświaty"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              data={[
                { gmina: "Kraków", kwota: 54216533.0 },
                { gmina: "Liszki", kwota: 29044584.46 },
                { gmina: "Wieliczka", kwota: 19968529.4 },
                { gmina: "Wielka Wieś", kwota: 8097479.43 },
                { gmina: "Kocmyrzów-Luborzyca", kwota: 6763383.69 },
                { gmina: "Biskupice", kwota: 4722501.98 },
                { gmina: "Świątniki Górne", kwota: 4199803.71 },
                { gmina: "Czernichów", kwota: 2609291.14 },
                { gmina: "Skawina", kwota: 2342207.06 },
                { gmina: "Zielonki", kwota: 1355049.66 },
                { gmina: "Mogilany", kwota: 959757.23 },
                { gmina: "Niepołomice", kwota: 683352.27 },
                { gmina: "Michałowice", kwota: 418611.82 },
                { gmina: "Igołomia-Wawrzeńczyce", kwota: 114309.33 },
                { gmina: "Zabierzów", kwota: 3070.54 },
              ]
                .slice()
                .sort((a, b) => b.kwota - a.kwota)}
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
              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat("pl-PL", {
                    notation: "compact",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  }).format(value)
                }
              />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "środki [zł]",
                ]}
              />
              <Bar dataKey="kwota" name="Środki [zł]" fill="rgb(197, 59, 0)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "dzieci"}
        onClose={() => setOpenCard(null)}
        title="Dzieci przedszkolne 3–5 lat (2019–2024)"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              data={LATA.map((rok) => ({
                rok: String(rok),
                liczba: GMINY.reduce(
                  (sum, g) => sum + (dzieciPrzedszkolne3_5Lat[g][rok] || 0),
                  0
                ),
              }))}
              margin={{ top: 24, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis domain={[0, 38000]} />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "dzieci 3–5 lat",
                ]}
              />
              <Bar
                dataKey="liczba"
                name="Dzieci 3–5 lat"
                fill="rgb(197, 59, 0)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "szkoly"}
        onClose={() => setOpenCard(null)}
        title="Szkoły podstawowe"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              data={[
                { gmina: "Kraków-Podgórze", liczba: 75 },
                { gmina: "Kraków-Krowodrza", liczba: 47 },
                { gmina: "Kraków-Śródmieście", liczba: 43 },
                { gmina: "Kraków-Nowa Huta", liczba: 41 },
                { gmina: "Wieliczka", liczba: 29 },
                { gmina: "Skawina", liczba: 21 },
                { gmina: "Zabierzów", liczba: 12 },
                { gmina: "Niepołomice", liczba: 12 },
                { gmina: "Liszki", liczba: 11 },
                { gmina: "Czernichów", liczba: 9 },
                { gmina: "Kocmyrzów-Luborzyca", liczba: 9 },
                { gmina: "Mogilany", liczba: 7 },
                { gmina: "Biskupice", liczba: 6 },
                { gmina: "Słomniki", liczba: 6 },
                { gmina: "Wielka Wieś", liczba: 6 },
                { gmina: "Zielonki", liczba: 6 },
                { gmina: "Świątniki Górne", liczba: 6 },
                { gmina: "Igołomia-Wawrzeńczyce", liczba: 4 },
                { gmina: "Michałowice", liczba: 3 },
              ].sort((a, b) => b.liczba - a.liczba)}
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
                formatter={(v: number) => [String(v), "szkoły podstawowe"]}
              />
              <Bar
                dataKey="liczba"
                name="Szkoły podstawowe"
                fill="rgb(244, 76, 0)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "egzaminPolski"}
        onClose={() => setOpenCard(null)}
        title="Egzamin 8-klasisty - polski"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              data={GMINY.map((gmina) => ({
                gmina,
                wynik: wynikiOsmoklasPolski2024[gmina],
              })).sort((a, b) => b.wynik - a.wynik)}
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
              <YAxis unit=" %" />
              <Tooltip formatter={(v: number) => [`${v}%`, "średni wynik"]} />
              <Bar
                dataKey="wynik"
                name="Wynik polski [%]"
                fill="rgb(197, 59, 0)"
              />
              <ReferenceLine
                y={61}
                stroke="#000000"
                strokeWidth={3}
                strokeDasharray="5 5"
                label={{
                  value: "Średnia dla Polski: 61%",
                  position: "top",
                  fill: "#000000",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "egzaminMatematyka"}
        onClose={() => setOpenCard(null)}
        title="Egzamin 8-klasisty - matematyka"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              data={GMINY.map((gmina) => ({
                gmina,
                wynik: wynikiOsmoklasMatematyka2024[gmina],
              })).sort((a, b) => b.wynik - a.wynik)}
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
              <YAxis unit=" %" />
              <Tooltip formatter={(v: number) => [`${v}%`, "średni wynik"]} />
              <Bar
                dataKey="wynik"
                name="Wynik matematyka [%]"
                fill="rgb(244, 76, 0)"
              />
              <ReferenceLine
                y={52}
                stroke="#000000"
                strokeWidth={3}
                strokeDasharray="5 5"
                label={{
                  value: "Średnia dla Polski: 52%",
                  position: "top",
                  fill: "#000000",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "nauczycieleKwalifikacje"}
        onClose={() => setOpenCard(null)}
        title="Odsetek nauczycieli o najwyższych kwalifikacjach w samorządowych szkołach podstawowych w gminach Metropolii Krakowskiej w 2024 roku"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              data={[
                { gmina: "Mogilany", odsetek: 89.6 },
                { gmina: "Liszki", odsetek: 88.9 },
                { gmina: "Kocmyrzów-Luborzyca", odsetek: 87.3 },
                { gmina: "Niepołomice", odsetek: 86.1 },
                { gmina: "Wielka Wieś", odsetek: 85.8 },
                { gmina: "Czernichów", odsetek: 85.2 },
                { gmina: "Skawina", odsetek: 84.7 },
                { gmina: "Zielonki", odsetek: 84.0 },
                { gmina: "Świątniki Górne", odsetek: 83.5 },
                { gmina: "Biskupice", odsetek: 83.4 },
                { gmina: "Michałowice", odsetek: 81.5 },
                { gmina: "Zabierzów", odsetek: 81.2 },
                { gmina: "Wieliczka", odsetek: 80.3 },
                { gmina: "Igołomia-Wawrzeńczyce", odsetek: 79.1 },
              ].sort((a, b) => b.odsetek - a.odsetek)}
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
              <YAxis domain={[70, 92]} unit=" %" />
              <Tooltip
                formatter={(v: number) => [
                  `${v.toFixed(1).replace(".", ",")}%`,
                  "odsetek nauczycieli",
                ]}
              />
              <Bar
                dataKey="odsetek"
                name="Odsetek [%]"
                fill="rgb(197, 59, 0)"
              />
            </BarChart>
          </ResponsiveContainer>
          <div
            style={{
              fontSize: 14,
              color: "#666",
              textAlign: "center",
              marginTop: 16,
              padding: "0 16px",
            }}
          >
            Odsetek nauczycieli o najwyższych kwalifikacjach (mianowani i
            dyplomowani) w samorządowych szkołach podstawowych w gminach
            Metropolii Krakowskiej w 2024 roku. Średnia dla MK: 84,0%.
          </div>
        </div>
      </Modal>
    </div>
  );
}
