import { useState } from "react";
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
      <h2 style={{ margin: "2px 0 6px", flexShrink: 0, fontSize: "20px" }}>
        Usługi społeczne
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

                  el.style.transform = "scale(1)";
                  const contentHeight = el.scrollHeight;
                  const contentWidth = el.scrollWidth;
                  el.style.transform = `scale(${scale})`;

                  const heightScale = containerHeight / contentHeight;
                  const widthScale = containerWidth / contentWidth;

                  let newScale = Math.min(heightScale, widthScale, 1);
                  newScale = Math.max(0.5, Math.min(1, newScale));

                  setScale(newScale);
                };

                setTimeout(updateScale, 100);
                setTimeout(updateScale, 500);

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
                title="Lokalizacja żłobków"
                subtitle="Źródło: ArcGIS Experience"
                height={380}
              >
                <div style={{ height: 320 }}>
                  <iframe
                    title="Lokalizacja żłobków"
                    src="https://experience.arcgis.com/experience/6e225950c7b84b23a403dce49f5c4e5f/"
                    style={{ width: "100%", height: "100%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Osoby objęte programami zdrowotnymi"
                subtitle="Źródło: Opracowanie własne"
                height={340}
                onOpen={() => setOpenCard("programy")}
              >
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { rok: "2019", liczba: 1 },
                        { rok: "2020", liczba: 2 },
                        { rok: "2021", liczba: 2 },
                        { rok: "2022", liczba: 2 },
                        { rok: "2023", liczba: 4 },
                        { rok: "2024", liczba: 6 },
                      ]}
                      margin={{ top: 24, right: 8, bottom: 16, left: 8 }}
                    >
                      <CartesianGrid vertical={false} stroke="#eee" />
                      <XAxis dataKey="rok" tick={{ fontSize: 11 }} />
                      <YAxis
                        domain={["dataMin - 1", "dataMax + 1"]}
                        tick={{ fontSize: 11 }}
                      />
                      <Tooltip
                        formatter={(v: number) => [
                          new Intl.NumberFormat("pl-PL").format(v),
                          "osoby",
                        ]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="liczba"
                        name="Osoby objęte programami"
                        stroke="rgb(247, 183, 29)"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        label={{
                          position: "top",
                          fontSize: 10,
                          fill: "#333",
                          formatter: (v: React.ReactNode): React.ReactNode => {
                            if (typeof v === "number") {
                              return new Intl.NumberFormat("pl-PL").format(v);
                            }
                            return v;
                          },
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Ocena usług opiekuńczych"
                subtitle="Źródło: Badanie jakościowe 2024"
                height={340}
                onOpen={() => setOpenCard("ocena")}
              >
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
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
                      <XAxis dataKey="kategoria" tick={{ fontSize: 11 }} />
                      <YAxis unit=" %" tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number, n: string) => [`${v}%`, n]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
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

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Przychodnie (2019–2024)"
                subtitle="Źródło: BDL GUS"
                height={340}
                onOpen={() => setOpenCard("przychodnie")}
              >
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
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
                      <XAxis dataKey="rok" tick={{ fontSize: 11 }} />
                      <YAxis
                        domain={["dataMin - 50", "dataMax + 50"]}
                        tick={{ fontSize: 11 }}
                      />
                      <Tooltip
                        formatter={(v: number) => [
                          new Intl.NumberFormat("pl-PL").format(v),
                          "przychodnie",
                        ]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="przychodnie"
                        name="liczba przychodni"
                        stroke="rgb(216, 134, 30)"
                        strokeWidth={2}
                        dot={{ r: 2 }}
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

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Wnioski o pobyt stały (2019–2024)"
                subtitle="Źródło: MUW"
                height={300}
              >
                <div
                  style={{
                    height: 240,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 56,
                        fontWeight: "bold",
                        color: "rgb(216, 134, 30)",
                        marginBottom: 12,
                      }}
                    >
                      2207
                    </div>
                    <div style={{ fontSize: 14, color: "#666" }}>
                      Łączna liczba wniosków w latach 2019–2024
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Wnioski o pobyt stały"
                subtitle="Źródło: MUW (bez Krakowa)"
                height={380}
                onOpen={() => setOpenCard("wnioski")}
              >
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
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
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [
                          new Intl.NumberFormat("pl-PL").format(v),
                          "wnioski",
                        ]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
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
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={openCard === "programy"}
        onClose={() => setOpenCard(null)}
        title="Osoby objęte programami zdrowotnymi"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { rok: "2019", liczba: 1 },
                { rok: "2020", liczba: 2 },
                { rok: "2021", liczba: 2 },
                { rok: "2022", liczba: 2 },
                { rok: "2023", liczba: 4 },
                { rok: "2024", liczba: 6 },
              ]}
              margin={{ top: 24, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
              <Tooltip
                formatter={(v: number) => [
                  new Intl.NumberFormat("pl-PL").format(v),
                  "osoby",
                ]}
              />
              <Line
                type="monotone"
                dataKey="liczba"
                name="Osoby objęte programami"
                stroke="rgb(247, 183, 29)"
                strokeWidth={2}
                dot={{ r: 2 }}
                label={{
                  position: "top",
                  fontSize: 10,
                  fill: "#333",
                  formatter: (v: React.ReactNode): React.ReactNode => {
                    if (typeof v === "number") {
                      return new Intl.NumberFormat("pl-PL").format(v);
                    }
                    return v;
                  },
                }}
              />
            </LineChart>
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
          <ResponsiveContainer width="100%" height="100%">
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
          <ResponsiveContainer width="100%" height="100%">
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
                dot={{ r: 2 }}
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
        title="Wnioski o pobyt stały"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
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
    </div>
  );
}
