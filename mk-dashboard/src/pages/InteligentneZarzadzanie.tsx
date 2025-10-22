import { useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function InteligentneZarzadzanie() {
  const [scale, setScale] = useState(1);
  const [openCard, setOpenCard] = useState<string | null>(null);

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
        Inteligentne zarządzanie
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
                  newScale = Math.max(0.5, Math.min(1, newScale));

                  setScale(newScale);
                };

                // Initial calculation with delay
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
                title="Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z jakości funkcjonowania administracji w gminie"
                subtitle="Źródło: ArcGIS Experience"
                height={410}
                onOpen={() => setOpenCard("zadowolenie")}
              >
                <div
                  style={{
                    height: 320,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <iframe
                    title="Poziom zadowolenia mieszkańców"
                    src="https://experience.arcgis.com/experience/cccd4cb137164897b676c97eee0c393d/"
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
                      style={{ fontWeight: 600, marginRight: 4, fontSize: 8 }}
                    >
                      Poziom zadowolenia z jakości funkcjonowania administracji
                      w gminie [%]
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(60, 60, 60)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>&gt; 84</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(100, 100, 100)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>77 - 84</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(140, 140, 140)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>72 - 77</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(180, 180, 180)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>64 - 72</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(220, 220, 220)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>&lt; 64</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Dochody ogółem na 1 mieszkańca"
                subtitle="Źródło: ArcGIS Experience"
                height={380}
                onOpen={() => setOpenCard("dochody")}
              >
                <div style={{ height: 320 }}>
                  <iframe
                    title="Dochody ogółem na 1 mieszkańca"
                    src="https://experience.arcgis.com/experience/5fb1d244d10b444b8d5bdbb12d5799fd"
                    style={{ width: "100%", height: "95%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Poziom zadowolenia z poinformowania o działaniach władz gminnych"
                subtitle="Opracowanie własne"
                height={340}
                onOpen={() => setOpenCard("poziom")}
              >
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { kategoria: "Pozytywne", odsetek: 66 },
                        { kategoria: "Neutralne", odsetek: 31 },
                        { kategoria: "Negatywne", odsetek: 3 },
                      ]}
                      margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
                    >
                      <CartesianGrid vertical={false} stroke="#eee" />
                      <XAxis dataKey="kategoria" tick={{ fontSize: 11 }} />
                      <YAxis unit="%" tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [`${v}%`, "odsetek"]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="odsetek"
                        name="Poziom zadowolenia [%]"
                        fill="rgb(135, 135, 135)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Zadłużenie Gminy [%]"
                subtitle="Źródło: Ministerstwo Finansów"
                height={380}
                onOpen={() => setOpenCard("zadluzenie")}
              >
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { gmina: "Kraków", wartosc: 75.9 },
                        { gmina: "Wieliczka", wartosc: 63.2 },
                        { gmina: "Niepołomice", wartosc: 57.9 },
                        { gmina: "Zabierzów", wartosc: 49.7 },
                        { gmina: "Świątniki Górne", wartosc: 46.0 },
                        { gmina: "Czernichów", wartosc: 35.7 },
                        { gmina: "Liszki", wartosc: 37.8 },
                        { gmina: "Skawina", wartosc: 33.1 },
                        { gmina: "Biskupice", wartosc: 31.0 },
                        { gmina: "Mogilany", wartosc: 29.8 },
                        { gmina: "Kocmyrzów-Luborzyca", wartosc: 26.3 },
                        { gmina: "Michałowice", wartosc: 14.0 },
                        { gmina: "Zielonki", wartosc: 13.8 },
                        { gmina: "Wielka Wieś", wartosc: 8.3 },
                        { gmina: "Igołomia-Wawrzeńczyce", wartosc: 7.5 },
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
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis unit="%" tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [`${v}%`, "zadłużenie"]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="wartosc"
                        name="Zadłużenie gminy [%]"
                        fill="rgb(178, 178, 178)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Wzrost wpływów z PIT (2023–2024)"
                subtitle="Źródło: BDL GUS"
                height={380}
                onOpen={() => setOpenCard("pit")}
              >
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          gmina: "Czernichów",
                          v2023: 16717378,
                          v2024: 26955832,
                        },
                        {
                          gmina: "Igołomia-Wawrzeńczyce",
                          v2023: 4833642,
                          v2024: 8404042,
                        },
                        {
                          gmina: "Kocmyrzów-Luborzyca",
                          v2023: 23726968,
                          v2024: 33275448,
                        },
                        { gmina: "Liszki", v2023: 19296648, v2024: 31817505 },
                        {
                          gmina: "Michałowice",
                          v2023: 19421383,
                          v2024: 32443084,
                        },
                        { gmina: "Mogilany", v2023: 27641595, v2024: 47957513 },
                        { gmina: "Skawina", v2023: 46053181, v2024: 72403208 },
                        {
                          gmina: "Świątniki Górne",
                          v2023: 18885311,
                          v2024: 29586555,
                        },
                        {
                          gmina: "Wielka Wieś",
                          v2023: 24216556,
                          v2024: 43581177,
                        },
                        {
                          gmina: "Zabierzów",
                          v2023: 44758719,
                          v2024: 75616706,
                        },
                        { gmina: "Zielonki", v2023: 49584707, v2024: 85914146 },
                        {
                          gmina: "Biskupice",
                          v2023: 10102509,
                          v2024: 16340114,
                        },
                        {
                          gmina: "Niepołomice",
                          v2023: 35760781,
                          v2024: 59543802,
                        },
                        {
                          gmina: "Wieliczka",
                          v2023: 82118011,
                          v2024: 134722367,
                        },
                        {
                          gmina: "Kraków",
                          v2023: 1710047660,
                          v2024: 2803318933,
                        },
                      ]
                        .map((r) => ({
                          gmina: r.gmina,
                          wzrost: Number(
                            ((r.v2024 / r.v2023 - 1) * 100).toFixed(2)
                          ),
                        }))
                        .sort((a, b) => b.wzrost - a.wzrost)}
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
                        formatter={(v: number) => [`${v}%`, "zmiana 2023–2024"]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="wzrost"
                        name="2023–2024 [%]"
                        fill="rgb(135, 135, 135)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Wzrost wpływów z CIT (2019–2024)"
                subtitle="Źródło: BDL GUS"
                height={380}
                onOpen={() => setOpenCard("cit")}
              >
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { gmina: "Czernichów", v2019: 99717.69, v2024: 329946 },
                        {
                          gmina: "Igołomia-Wawrzeńczyce",
                          v2019: 116890.28,
                          v2024: 462192,
                        },
                        {
                          gmina: "Kocmyrzów-Luborzyca",
                          v2019: 21005.64,
                          v2024: 149426,
                        },
                        { gmina: "Liszki", v2019: 1188887.21, v2024: 2036590 },
                        {
                          gmina: "Michałowice",
                          v2019: 53641.11,
                          v2024: 264062,
                        },
                        { gmina: "Mogilany", v2019: 266539, v2024: 872502 },
                        {
                          gmina: "Skawina",
                          v2019: 5665729.04,
                          v2024: 11030280,
                        },
                        {
                          gmina: "Świątniki Górne",
                          v2019: 50197.44,
                          v2024: 354198,
                        },
                        {
                          gmina: "Wielka Wieś",
                          v2019: 1225547.57,
                          v2024: 5021336,
                        },
                        {
                          gmina: "Zabierzów",
                          v2019: 5110688.5,
                          v2024: 12106975,
                        },
                        { gmina: "Zielonki", v2019: 136011.32, v2024: 752022 },
                        { gmina: "Biskupice", v2019: 15072.7, v2024: 64442 },
                        {
                          gmina: "Niepołomice",
                          v2019: 8095981.22,
                          v2024: 19533854,
                        },
                        {
                          gmina: "Wieliczka",
                          v2019: 2518084.41,
                          v2024: 5287878,
                        },
                        {
                          gmina: "Kraków",
                          v2019: 165184285.77,
                          v2024: 434250295,
                        },
                      ]
                        .map((r) => ({
                          gmina: r.gmina,
                          wzrost: Number(
                            ((r.v2024 / r.v2019 - 1) * 100).toFixed(2)
                          ),
                        }))
                        .sort((a, b) => b.wzrost - a.wzrost)}
                      margin={{ top: 8, right: 8, bottom: 84, left: 16 }}
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
                        formatter={(v: number) => [`${v}%`, "zmiana 2019–2024"]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="wzrost"
                        name="2019–2024 [%]"
                        fill="rgb(178, 178, 178)"
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
        open={openCard === "zadowolenie"}
        onClose={() => setOpenCard(null)}
        title="Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z jakości funkcjonowania administracji w gminie"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Poziom zadowolenia mieszkańców"
            src="https://experience.arcgis.com/experience/51fd6fd2e6514e5ea7b17d5a60163f14/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "dochody"}
        onClose={() => setOpenCard(null)}
        title="Dochody ogółem na 1 mieszkańca"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Dochody ogółem na 1 mieszkańca"
            src="https://experience.arcgis.com/experience/24d07761e5e743b6a072e04bbbf8d4b4/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "poziom"}
        onClose={() => setOpenCard(null)}
        title="Poziom zadowolenia z poinformowania o działaniach władz gminnych"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { kategoria: "Pozytywne", odsetek: 66 },
                { kategoria: "Neutralne", odsetek: 31 },
                { kategoria: "Negatywne", odsetek: 3 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="kategoria" />
              <YAxis unit="%" />
              <Tooltip formatter={(v: number) => [`${v}%`, "odsetek"]} />
              <Bar
                dataKey="odsetek"
                name="Poziom zadowolenia [%]"
                fill="rgb(135, 135, 135)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "zadluzenie"}
        onClose={() => setOpenCard(null)}
        title="Zadłużenie Gminy [%]"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Kraków", wartosc: 75.9 },
                { gmina: "Wieliczka", wartosc: 63.2 },
                { gmina: "Niepołomice", wartosc: 57.9 },
                { gmina: "Zabierzów", wartosc: 49.7 },
                { gmina: "Świątniki Górne", wartosc: 46.0 },
                { gmina: "Czernichów", wartosc: 35.7 },
                { gmina: "Liszki", wartosc: 37.8 },
                { gmina: "Skawina", wartosc: 33.1 },
                { gmina: "Biskupice", wartosc: 31.0 },
                { gmina: "Mogilany", wartosc: 29.8 },
                { gmina: "Kocmyrzów-Luborzyca", wartosc: 26.3 },
                { gmina: "Michałowice", wartosc: 14.0 },
                { gmina: "Zielonki", wartosc: 13.8 },
                { gmina: "Wielka Wieś", wartosc: 8.3 },
                { gmina: "Igołomia-Wawrzeńczyce", wartosc: 7.5 },
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
              <Tooltip formatter={(v: number) => [`${v}%`, "zadłużenie"]} />
              <Bar
                dataKey="wartosc"
                name="Zadłużenie gminy [%]"
                fill="rgb(178, 178, 178)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "pit"}
        onClose={() => setOpenCard(null)}
        title="Wzrost wpływów z PIT (2023–2024)"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                {
                  gmina: "Czernichów",
                  v2023: 16717378,
                  v2024: 26955832,
                },
                {
                  gmina: "Igołomia-Wawrzeńczyce",
                  v2023: 4833642,
                  v2024: 8404042,
                },
                {
                  gmina: "Kocmyrzów-Luborzyca",
                  v2023: 23726968,
                  v2024: 33275448,
                },
                { gmina: "Liszki", v2023: 19296648, v2024: 31817505 },
                {
                  gmina: "Michałowice",
                  v2023: 19421383,
                  v2024: 32443084,
                },
                { gmina: "Mogilany", v2023: 27641595, v2024: 47957513 },
                { gmina: "Skawina", v2023: 46053181, v2024: 72403208 },
                {
                  gmina: "Świątniki Górne",
                  v2023: 18885311,
                  v2024: 29586555,
                },
                {
                  gmina: "Wielka Wieś",
                  v2023: 24216556,
                  v2024: 43581177,
                },
                {
                  gmina: "Zabierzów",
                  v2023: 44758719,
                  v2024: 75616706,
                },
                { gmina: "Zielonki", v2023: 49584707, v2024: 85914146 },
                {
                  gmina: "Biskupice",
                  v2023: 10102509,
                  v2024: 16340114,
                },
                {
                  gmina: "Niepołomice",
                  v2023: 35760781,
                  v2024: 59543802,
                },
                {
                  gmina: "Wieliczka",
                  v2023: 82118011,
                  v2024: 134722367,
                },
                {
                  gmina: "Kraków",
                  v2023: 1710047660,
                  v2024: 2803318933,
                },
              ]
                .map((r) => ({
                  gmina: r.gmina,
                  wzrost: Number(((r.v2024 / r.v2023 - 1) * 100).toFixed(2)),
                }))
                .sort((a, b) => b.wzrost - a.wzrost)}
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
                formatter={(v: number) => [`${v}%`, "zmiana 2023–2024"]}
              />
              <Bar
                dataKey="wzrost"
                name="Wzrost wpływów z PIT 2023–2024 [%]"
                fill="rgb(135, 135, 135)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "cit"}
        onClose={() => setOpenCard(null)}
        title="Wzrost wpływów z CIT (2019–2024)"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Czernichów", v2019: 99717.69, v2024: 329946 },
                {
                  gmina: "Igołomia-Wawrzeńczyce",
                  v2019: 116890.28,
                  v2024: 462192,
                },
                {
                  gmina: "Kocmyrzów-Luborzyca",
                  v2019: 21005.64,
                  v2024: 149426,
                },
                { gmina: "Liszki", v2019: 1188887.21, v2024: 2036590 },
                {
                  gmina: "Michałowice",
                  v2019: 53641.11,
                  v2024: 264062,
                },
                { gmina: "Mogilany", v2019: 266539, v2024: 872502 },
                {
                  gmina: "Skawina",
                  v2019: 5665729.04,
                  v2024: 11030280,
                },
                {
                  gmina: "Świątniki Górne",
                  v2019: 50197.44,
                  v2024: 354198,
                },
                {
                  gmina: "Wielka Wieś",
                  v2019: 1225547.57,
                  v2024: 5021336,
                },
                {
                  gmina: "Zabierzów",
                  v2019: 5110688.5,
                  v2024: 12106975,
                },
                { gmina: "Zielonki", v2019: 136011.32, v2024: 752022 },
                { gmina: "Biskupice", v2019: 15072.7, v2024: 64442 },
                {
                  gmina: "Niepołomice",
                  v2019: 8095981.22,
                  v2024: 19533854,
                },
                {
                  gmina: "Wieliczka",
                  v2019: 2518084.41,
                  v2024: 5287878,
                },
                {
                  gmina: "Kraków",
                  v2019: 165184285.77,
                  v2024: 434250295,
                },
              ]
                .map((r) => ({
                  gmina: r.gmina,
                  wzrost: Number(((r.v2024 / r.v2019 - 1) * 100).toFixed(2)),
                }))
                .sort((a, b) => b.wzrost - a.wzrost)}
              margin={{ top: 8, right: 8, bottom: 84, left: 16 }}
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
                formatter={(v: number) => [`${v}%`, "zmiana 2019–2024"]}
              />
              <Bar
                dataKey="wzrost"
                name="Wzrost wpływów z CIT 2019–2024 [%]"
                fill="rgb(178, 178, 178)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}
