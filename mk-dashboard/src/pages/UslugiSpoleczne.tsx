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

  useEffect(() => {
    const calculateCardHeight = () => {
      const viewportHeight = window.innerHeight;
      const availableHeight = viewportHeight - 180;
      const calculatedHeight = (availableHeight - 12) / 2;
      const finalHeight = Math.max(280, calculatedHeight);
      setCardHeight(finalHeight);
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
                subtitle="Źródło: ArcGIS Experience"
                height={cardHeight}
                onOpen={() => setOpenCard("lokalizacjaZlobkow")}
              >
                <div style={{ height: cardHeight - 60 }}>
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
                <div style={{ height: cardHeight - 60 }}>
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
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <Card
                title="Zadowolenie z jakości wsparcia"
                subtitle="Źródło: Opracowanie własne (Oceny pozytywne)"
                height={cardHeight}
                onOpen={() => setOpenCard("programy")}
              >
                <div style={{ height: cardHeight - 60 }}>
                  <ResponsiveContainer width="100%" height="100%">
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
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis unit="%" tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [`${v}%`, "zadowolenie"]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="procent"
                        name="Zadowolenie z jakości wsparcia [%]"
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
                <div style={{ height: cardHeight - 60 }}>
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
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <Card
                title="Ocena usług opiekuńczych"
                subtitle="Źródło: Badanie jakościowe 2024"
                height={280}
                onOpen={() => setOpenCard("ocena")}
              >
                <div style={{ height: 220 }}>
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
            <div>
              <Card
                title="Wnioski o pobyt stały (2019–2024)"
                subtitle="Źródło: MUW"
                height={240}
              >
                <div
                  style={{
                    height: 180,
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
        title="Zadowolenie z jakości wsparcia (Oceny pozytywne)"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
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
                name="Zadowolenie z jakości wsparcia [%]"
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
        title="Liczba złożonych wniosków o pobyt stały w 2024"
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
