import { useState, useEffect } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { GMINY } from "../data/bdl";
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
import { LineChart, Line } from "recharts";

export default function UslugiSpoleczne() {
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
        Usługi społeczne
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
            gridTemplateColumns: "1fr 1fr 0.7fr",
            gap: 12,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <Card
                title="Lokalizacja żłobków"
                subtitle="Źródło: BDL GUS"
                height={cardHeight}
                onOpen={() => setOpenCard("lokalizacjaZlobkow")}
              >
                <div style={{ height: "100%" }}>
                  <iframe
                    title="Lokalizacja żłobków"
                    src="https://experience.arcgis.com/experience/86668e37526d484cb7bf2393b77fb68b"
                    style={{ width: "100%", height: "95%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>
            <div>
              <Card
                title="Liczba złożonych wniosków o pobyt stały w 2024"
                subtitle="Źródło: MUW (bez Krakowa)"
                height={cardHeight}
                onOpen={() => setOpenCard("wnioski")}
              >
                <div style={{ height: "100%" }}>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                      data={GMINY.map((gmina) => {
                        const W2024: Record<string, number> = {
                          Czernichów: 8,
                          "Igołomia-Wawrzeńczyce": 1,
                          "Kocmyrzów-Luborzyca": 4,
                          Liszki: 16,
                          Michałowice: 3,
                          Mogilany: 12,
                          Skawina: 21,
                          "Świątniki Górne": 3,
                          "Wielka Wieś": 11,
                          Zabierzów: 23,
                          Zielonki: 33,
                          Biskupice: 4,
                          Niepołomice: 13,
                          Wieliczka: 46,
                          Kraków: 2009,
                        };
                        return { gmina, liczba: W2024[gmina] ?? 0 };
                      })
                        .filter(
                          (item) => item.liczba > 0 && item.gmina !== "Kraków"
                        )
                        .sort((a, b) => b.liczba - a.liczba)}
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
                          new Intl.NumberFormat("pl-PL").format(v),
                          "wnioski",
                        ]}
                        labelStyle={{ fontSize: chartFontSize }}
                        itemStyle={{ fontSize: chartFontSize }}
                      />
                      <Bar
                        dataKey="liczba"
                        name="2024 [wnioski]"
                        fill="rgb(247, 183, 29)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <Card
                title="Zadowolenie z jakości wsparcia dla potrzebujących"
                subtitle="Źródło: Opracowanie własne (Oceny pozytywne)"
                height={cardHeight}
                onOpen={() => setOpenCard("programy")}
              >
                <div style={{ height: "100%" }}>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                      data={[
                        { gmina: "Mogilany", procent: 50 },
                        { gmina: "Świątniki Górne", procent: 48 },
                        { gmina: "Igołomia-Wawrzeńczyce", procent: 37 },
                        { gmina: "Michałowice", procent: 33 },
                        { gmina: "Liszki", procent: 31 },
                        { gmina: "Zielonki", procent: 31 },
                        { gmina: "Kocmyrzów-Luborzyca", procent: 26 },
                        { gmina: "Skawina", procent: 26 },
                        { gmina: "Wielka Wieś", procent: 24 },
                        { gmina: "Czernichów", procent: 22 },
                        { gmina: "Niepołomice", procent: 17 },
                        { gmina: "Biskupice", procent: 10 },
                        { gmina: "Zabierzów", procent: 8 },
                        { gmina: "Wieliczka", procent: 4 },
                      ]
                        .slice()
                        .sort((a, b) => b.procent - a.procent)}
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
                        formatter={(v: number) => [`${v}%`, "zadowolenie"]}
                        labelStyle={{ fontSize: chartFontSize }}
                        itemStyle={{ fontSize: chartFontSize }}
                      />
                      <Bar
                        dataKey="procent"
                        name="Zadowolenie z jakości wsparcia dla potrzebujących [%]"
                        fill="rgb(247, 183, 29)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            <div>
              <Card
                title="Przychodnie (2019–2024)"
                subtitle="Źródło: BDL GUS"
                height={cardHeight}
                onOpen={() => setOpenCard("przychodnie")}
              >
                <div style={{ height: "100%" }}>
                  <ResponsiveContainer width="100%" height="90%">
                    <LineChart
                      data={[
                        { rok: "2019", przychodnie: 815 },
                        { rok: "2020", przychodnie: 851 },
                        { rok: "2021", przychodnie: 896 },
                        { rok: "2022", przychodnie: 918 },
                        { rok: "2023", przychodnie: 978 },
                        { rok: "2024", przychodnie: 1002 },
                      ]}
                      margin={{ top: 24, right: 8, bottom: 16, left: 8 }}
                    >
                      <CartesianGrid vertical={false} stroke="#eee" />
                      <XAxis dataKey="rok" tick={{ fontSize: chartFontSize }} />
                      <YAxis
                        domain={["dataMin - 50", "dataMax + 50"]}
                        tick={{ fontSize: chartFontSize }}
                      />
                      <Tooltip
                        formatter={(v: number) => [
                          new Intl.NumberFormat("pl-PL").format(v),
                          "przychodnie",
                        ]}
                        labelStyle={{ fontSize: chartFontSize }}
                        itemStyle={{ fontSize: chartFontSize }}
                      />
                      <Line
                        type="monotone"
                        dataKey="przychodnie"
                        name="liczba przychodni"
                        stroke="rgb(216, 134, 30)"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "rgb(216, 134, 30)" }}
                        label={{
                          position: "top",
                          fontSize: 10,
                          fill: "#333",
                          formatter: (v: React.ReactNode): React.ReactNode =>
                            typeof v === "number"
                              ? new Intl.NumberFormat("pl-PL").format(v)
                              : v,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <Card
                title="Ocena usług opiekuńczych"
                subtitle="Źródło: Badanie jakościowe 2024"
                height={280}
                onOpen={() => setOpenCard("ocena")}
              >
                <div style={{ height: "100%" }}>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                      data={[
                        {
                          kategoria: "Możliwość skorzystania",
                          negatywne: 9,
                          neutralne: 67,
                          pozytywne: 24,
                        },
                        {
                          kategoria: "Zakres usług",
                          negatywne: 22,
                          neutralne: 54,
                          pozytywne: 24,
                        },
                      ]}
                      margin={{ top: 8, right: 8, bottom: 24, left: 8 }}
                    >
                      <CartesianGrid vertical={false} stroke="#eee" />
                      <XAxis
                        dataKey="kategoria"
                        tick={{ fontSize: chartFontSize }}
                      />
                      <YAxis unit=" %" tick={{ fontSize: chartFontSize }} />
                      <Tooltip
                        formatter={(v: number, n: string) => [`${v}%`, n]}
                        labelStyle={{ fontSize: chartFontSize }}
                        itemStyle={{ fontSize: chartFontSize }}
                      />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar
                        dataKey="negatywne"
                        name="negatywna"
                        stackId="a"
                        fill="rgb(216, 134, 30)"
                      />
                      <Bar
                        dataKey="neutralne"
                        name="neutralna"
                        stackId="a"
                        fill="#9ca3af"
                      />
                      <Bar
                        dataKey="pozytywne"
                        name="pozytywna"
                        stackId="a"
                        fill="rgb(247, 183, 29)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            <div>
              <Card
                title="Zadowolenie z dostępu do specjalistycznej opieki zdrowotnej"
                subtitle="Źródło: Badanie jakościowe 2024 (Oceny pozytywne)"
                height={320}
                onOpen={() => setOpenCard("opiekaSpecjalistyczna")}
              >
                <div style={{ height: "100%" }}>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                      data={[
                        { gmina: "Igołomia-Wawrzeńczyce", procent: 52 },
                        { gmina: "Liszki", procent: 37 },
                        { gmina: "Michałowice", procent: 24 },
                        { gmina: "Czernichów", procent: 19 },
                        { gmina: "Świątniki Górne", procent: 17 },
                        { gmina: "Skawina", procent: 16 },
                        { gmina: "Mogilany", procent: 15 },
                        { gmina: "Zielonki", procent: 15 },
                        { gmina: "Wielka Wieś", procent: 11 },
                        { gmina: "Niepołomice", procent: 10 },
                        { gmina: "Biskupice", procent: 8 },
                        { gmina: "Wieliczka", procent: 8 },
                        { gmina: "Kocmyrzów-Luborzyca", procent: 6 },
                        { gmina: "Zabierzów", procent: 2 },
                      ].sort((a, b) => b.procent - a.procent)}
                      margin={{ top: 8, right: 8, bottom: 84, left: 8 }}
                    >
                      <CartesianGrid vertical={false} stroke="#eee" />
                      <XAxis
                        dataKey="gmina"
                        angle={-35}
                        textAnchor="end"
                        interval={0}
                        height={60}
                        tick={{ fontSize: 9 }}
                      />
                      <YAxis unit="%" tick={{ fontSize: chartFontSize }} />
                      <Tooltip
                        formatter={(v: number) => [`${v}%`, "zadowolenie"]}
                        labelStyle={{ fontSize: chartFontSize }}
                        itemStyle={{ fontSize: chartFontSize }}
                      />
                      <Bar
                        dataKey="procent"
                        name="Oceny pozytywne [%]"
                        fill="rgb(247, 183, 29)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            <div>
              <Card
                title="Wnioski o pobyt stały (2019–2024)"
                subtitle="Źródło: MUW"
                height={200}
              >
                <div
                  style={{
                    height: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <svg
                      width="48"
                      height="56"
                      viewBox="0 0 140 162"
                      style={{ marginBottom: 0 }}
                    >
                      <path
                        d="M 70.64 73.68 C66.32,78.26 62.41,82.00 61.95,82.00 C59.81,82.00 45.28,65.93 42.75,60.75 C39.64,54.38 39.34,51.17 41.49,47.01 C45.32,39.62 55.10,38.92 59.55,45.71 L 61.12 48.12 L 65.07 44.56 C70.41,39.73 74.86,39.66 79.54,44.34 C85.01,49.81 85.02,51.95 79.68,62.93 C79.03,64.27 74.96,69.11 70.64,73.68 ZM 54.48 71.30 C58.06,74.98 61.40,78.00 61.90,78.00 C63.42,78.00 76.06,63.81 78.09,59.82 C80.93,54.26 80.63,48.64 77.37,46.07 C75.92,44.93 73.48,44.00 71.94,44.00 C69.23,44.00 68.59,44.57 63.09,51.95 L 61.26 54.40 L 59.62 51.23 C57.24,46.62 54.03,44.00 50.77,44.00 C47.02,44.00 43.00,48.02 43.00,51.76 C43.00,56.42 47.55,64.15 54.48,71.30 ZM 54.51 121.00 C35.63,121.49 35.35,121.53 29.17,124.60 C25.50,126.42 22.68,127.29 22.32,126.71 C21.41,125.24 25.74,122.33 32.50,119.87 C37.60,118.01 41.19,117.62 56.50,117.25 L 74.50 116.82 L 79.98 112.66 C82.99,110.37 85.93,108.28 86.50,108.00 C87.08,107.72 92.85,103.50 99.32,98.61 C108.62,91.60 111.04,89.28 110.80,87.61 C110.25,83.76 106.45,84.57 95.13,90.93 C89.19,94.27 83.76,97.00 83.08,97.00 C80.02,97.00 83.42,94.20 93.56,88.38 C104.97,81.83 109.52,80.67 112.43,83.57 C116.35,87.49 113.07,92.80 102.18,100.17 C99.60,101.92 93.45,106.34 88.50,110.02 C81.24,115.40 78.07,118.02 74.42,119.35 C70.40,120.81 65.81,120.70 54.51,121.00 ZM 77.55 102.55 C75.20,104.89 74.53,105.00 62.55,105.00 C52.06,105.00 50.00,104.75 50.00,103.50 C50.00,102.25 52.05,102.00 62.46,102.00 C73.75,102.00 75.03,101.82 75.96,100.07 C76.53,99.01 76.72,97.44 76.39,96.57 C75.87,95.22 73.22,95.00 57.64,95.00 L 39.49 95.00 L 31.50 98.89 C24.00,102.54 22.00,103.00 22.00,101.09 C22.00,100.66 25.49,98.55 29.75,96.40 L 37.50 92.50 L 56.50 92.19 C74.63,91.90 75.60,91.98 77.75,93.98 C80.67,96.70 80.60,99.49 77.55,102.55 Z"
                        fill="rgb(216, 134, 30)"
                      />
                    </svg>
                    <div
                      style={{
                        fontSize: 36,
                        fontWeight: "bold",
                        color: "rgb(216, 134, 30)",
                        marginBottom: 0,
                        lineHeight: 1,
                      }}
                    >
                      2207
                    </div>
                    <div
                      style={{ fontSize: 11, color: "#666", lineHeight: 1.2 }}
                    >
                      Łączna liczba wniosków w latach 2019–2024
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={openCard === "lokalizacjaZlobkow"}
        onClose={() => setOpenCard(null)}
        title="Lokalizacja żłobków"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Lokalizacja żłobków"
            src="https://experience.arcgis.com/experience/6e225950c7b84b23a403dce49f5c4e5f/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "programy"}
        onClose={() => setOpenCard(null)}
        title="Zadowolenie z jakości wsparcia dla potrzebujących (Oceny pozytywne)"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={[
                { gmina: "Mogilany", procent: 50 },
                { gmina: "Świątniki Górne", procent: 48 },
                { gmina: "Igołomia-Wawrzeńczyce", procent: 37 },
                { gmina: "Michałowice", procent: 33 },
                { gmina: "Liszki", procent: 31 },
                { gmina: "Zielonki", procent: 31 },
                { gmina: "Kocmyrzów-Luborzyca", procent: 26 },
                { gmina: "Skawina", procent: 26 },
                { gmina: "Wielka Wieś", procent: 24 },
                { gmina: "Czernichów", procent: 22 },
                { gmina: "Niepołomice", procent: 17 },
                { gmina: "Biskupice", procent: 10 },
                { gmina: "Zabierzów", procent: 8 },
                { gmina: "Wieliczka", procent: 4 },
              ]
                .slice()
                .sort((a, b) => b.procent - a.procent)}
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
              <Tooltip formatter={(v: number) => [`${v}%`, "zadowolenie"]} />
              <Bar
                dataKey="procent"
                name="Zadowolenie z jakości wsparcia dla potrzebujących [%]"
                fill="rgb(247, 183, 29)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "ocena"}
        onClose={() => setOpenCard(null)}
        title="Ocena usług opiekuńczych"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={[
                {
                  kategoria: "Możliwość skorzystania",
                  negatywne: 9,
                  neutralne: 67,
                  pozytywne: 24,
                },
                {
                  kategoria: "Zakres usług",
                  negatywne: 22,
                  neutralne: 54,
                  pozytywne: 24,
                },
              ]}
              margin={{ top: 8, right: 8, bottom: 24, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="kategoria" />
              <YAxis unit=" %" />
              <Tooltip formatter={(v: number, n: string) => [`${v}%`, n]} />
              <Bar
                dataKey="negatywne"
                name="negatywna"
                stackId="a"
                fill="rgb(216, 134, 30)"
              />
              <Bar
                dataKey="neutralne"
                name="neutralna"
                stackId="a"
                fill="#9ca3af"
              />
              <Bar
                dataKey="pozytywne"
                name="pozytywna"
                stackId="a"
                fill="rgb(247, 183, 29)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "przychodnie"}
        onClose={() => setOpenCard(null)}
        title="Przychodnie (2019–2024)"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart
              data={[
                { rok: "2019", przychodnie: 815 },
                { rok: "2020", przychodnie: 851 },
                { rok: "2021", przychodnie: 896 },
                { rok: "2022", przychodnie: 918 },
                { rok: "2023", przychodnie: 978 },
                { rok: "2024", przychodnie: 1002 },
              ]}
              margin={{ top: 24, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis domain={["dataMin - 50", "dataMax + 50"]} />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "przychodnie",
                ]}
              />
              <Line
                type="monotone"
                dataKey="przychodnie"
                name="liczba przychodni"
                stroke="rgb(216, 134, 30)"
                strokeWidth={2}
                dot={{ r: 4, fill: "rgb(216, 134, 30)" }}
                label={{
                  position: "top",
                  fontSize: 10,
                  fill: "#333",
                  formatter: (v: React.ReactNode): React.ReactNode =>
                    typeof v === "number"
                      ? new Intl.NumberFormat("pl-PL").format(v)
                      : v,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "wnioski"}
        onClose={() => setOpenCard(null)}
        title="Liczba złożonych wniosków o pobyt stały w 2024"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={GMINY.map((gmina) => {
                const W2024: Record<string, number> = {
                  Czernichów: 8,
                  "Igołomia-Wawrzeńczyce": 1,
                  "Kocmyrzów-Luborzyca": 4,
                  Liszki: 16,
                  Michałowice: 3,
                  Mogilany: 12,
                  Skawina: 21,
                  "Świątniki Górne": 3,
                  "Wielka Wieś": 11,
                  Zabierzów: 23,
                  Zielonki: 33,
                  Biskupice: 4,
                  Niepołomice: 13,
                  Wieliczka: 46,
                  Kraków: 2009,
                };
                return { gmina, liczba: W2024[gmina] ?? 0 };
              })
                .filter((item) => item.liczba > 0 && item.gmina !== "Kraków")
                .sort((a, b) => b.liczba - a.liczba)}
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
                  new Intl.NumberFormat("pl-PL").format(v),
                  "wnioski",
                ]}
              />
              <Bar
                dataKey="liczba"
                name="2024 [wnioski]"
                fill="rgb(247, 183, 29)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "opiekaSpecjalistyczna"}
        onClose={() => setOpenCard(null)}
        title="Zadowolenie z dostępu do specjalistycznej opieki zdrowotnej (Oceny pozytywne)"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={[
                { gmina: "Igołomia-Wawrzeńczyce", procent: 52 },
                { gmina: "Liszki", procent: 37 },
                { gmina: "Michałowice", procent: 24 },
                { gmina: "Czernichów", procent: 19 },
                { gmina: "Świątniki Górne", procent: 17 },
                { gmina: "Skawina", procent: 16 },
                { gmina: "Mogilany", procent: 15 },
                { gmina: "Zielonki", procent: 15 },
                { gmina: "Wielka Wieś", procent: 11 },
                { gmina: "Niepołomice", procent: 10 },
                { gmina: "Biskupice", procent: 8 },
                { gmina: "Wieliczka", procent: 8 },
                { gmina: "Kocmyrzów-Luborzyca", procent: 6 },
                { gmina: "Zabierzów", procent: 2 },
              ].sort((a, b) => b.procent - a.procent)}
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
              <Tooltip formatter={(v: number) => [`${v}%`, "zadowolenie"]} />
              <Bar
                dataKey="procent"
                name="Oceny pozytywne [%]"
                fill="rgb(247, 183, 29)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}
