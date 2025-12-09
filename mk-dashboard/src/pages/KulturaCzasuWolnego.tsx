import { useState, useEffect } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import type { Rok, Gmina } from "../data/bdl";
import { GMINY } from "../data/bdl";
import { computeLudnosc } from "../data/utils";
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

export default function KulturaCzasuWolnego() {
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

  const Y: Rok = 2024;
  const CZYTELNICY_2024: Record<Gmina, number> = {
    Czernichów: 1818,
    "Igołomia-Wawrzeńczyce": 718,
    "Kocmyrzów-Luborzyca": 1344,
    Liszki: 1419,
    Michałowice: 3422,
    Mogilany: 972,
    Skawina: 4829,
    "Świątniki Górne": 564,
    "Wielka Wieś": 2428,
    Zabierzów: 4390,
    Zielonki: 5349,
    Biskupice: 709,
    Niepołomice: 10684,
    Wieliczka: 10854,
    Kraków: 251483,
  };

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
        Kultura czasu wolnego
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
              title="Zadowolenie z oferty czasu wolnego"
              subtitle="Źródło: BDL GUS"
              height={cardHeight}
              onOpen={() => setOpenCard("zadowolenie")}
            >
              <div
                style={{
                  height: cardHeight - 90,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <iframe
                  title="Zadowolenie z oferty czasu wolnego"
                  src="https://experience.arcgis.com/experience/944323efe1584f8e8063879ba745040f"
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
                      fontSize: 8,
                      maxWidth: 240,
                      lineHeight: 1.2,
                    }}
                  >
                    Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z
                    oferty czasu wolnego [%]
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(139, 0, 0)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>&gt; 71</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(205, 25, 0)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>68 - 71</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(220, 60, 60)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>55 - 67</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(240, 128, 128)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>50 - 54</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(255, 218, 218)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>&lt; 50</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Wydatki na kulturę i sport"
              subtitle="Źródło: BDL GUS"
              height={cardHeight}
              onOpen={() => setOpenCard("wydatki")}
            >
              <div
                style={{
                  height: cardHeight - 90,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <iframe
                  title="Wydatki na kulturę i sport"
                  src="https://experience.arcgis.com/experience/de98fbf8d7804898a20cf1d78ac0140a"
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
                      fontSize: 8,
                      maxWidth: 240,
                      lineHeight: 1.2,
                    }}
                  >
                    Wysokość wydatków bieżących z budżetu na kulturę i sport na
                    1 mieszkańca [zł]
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(139, 0, 0)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>&gt; 250</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(205, 25, 0)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>201 - 250</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(220, 60, 60)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>151 - 200</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(240, 128, 128)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>75 - 150</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 12,
                        background: "rgb(255, 218, 218)",
                        border: "1px solid #ddd",
                      }}
                    />
                    <span>&lt; 75</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Czytelnicy w bibliotekach (2019–2024)"
              subtitle="Źródło: BDL GUS"
              height={340}
              onOpen={() => setOpenCard("czytelnicy")}
            >
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart
                    data={[
                      { rok: "2019", czytelnicy: 273726 },
                      { rok: "2020", czytelnicy: 227670 },
                      { rok: "2021", czytelnicy: 225261 },
                      { rok: "2022", czytelnicy: 248901 },
                      { rok: "2023", czytelnicy: 280700 },
                      { rok: "2024", czytelnicy: 300983 },
                    ]}
                    margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
                  >
                    <CartesianGrid vertical={false} stroke="#eee" />
                    <XAxis dataKey="rok" tick={{ fontSize: 11 }} />
                    <YAxis
                      domain={["dataMin - 10000", "dataMax + 10000"]}
                      tickFormatter={(value) =>
                        new Intl.NumberFormat("pl-PL", {
                          notation: "compact",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(value)
                      }
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                      formatter={(v: number) => [
                        new Intl.NumberFormat("pl-PL").format(v),
                        "czytelnicy",
                      ]}
                      labelStyle={{ fontSize: 11 }}
                      itemStyle={{ fontSize: 11 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="czytelnicy"
                      name="Czytelnicy"
                      stroke="rgb(144, 12, 0)"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "rgb(144, 12, 0)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Czytelnicy na 1 tys. mieszkańców"
              subtitle="Źródło: BDL GUS"
              height={cardHeight}
              onOpen={() => setOpenCard("czytelnicyTys")}
            >
              <div style={{ height: cardHeight - 60 }}>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart
                    data={GMINY.map((g) => {
                      const readers = CZYTELNICY_2024[g as Gmina] || 0;
                      const pop = computeLudnosc(g as Gmina, Y);
                      const perThousand = pop ? (readers / pop) * 1000 : 0;
                      return {
                        gmina: g,
                        wartosc: Number(perThousand.toFixed(1)),
                      };
                    })
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
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(v: number) => [
                        `${(v as number).toFixed(1)}`,
                        "na 1 tys. mieszk.",
                      ]}
                      labelStyle={{ fontSize: 11 }}
                      itemStyle={{ fontSize: 11 }}
                    />
                    <Bar
                      dataKey="wartosc"
                      name="Czytelnicy na 1 tys. mieszkańców"
                      fill="rgb(205, 25, 0)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card
              title="Zestawienie placówek kulturalnych według typu"
              subtitle="Źródło: Raport z badań społecznych - monitorowanie wskaźników Strategii Metropolia Krakowska 2030"
              height={cardHeight}
              onOpen={() => setOpenCard("biblioteki")}
            >
              <div style={{ height: cardHeight - 60 }}>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart
                    data={[
                      { typ: "biblioteki publiczne i filie", liczba: 116 },
                      {
                        typ: "ośrodki kultury, kluby i świetlice",
                        liczba: 85,
                      },
                      { typ: "muzea z oddziałami", liczba: 53 },
                      { typ: "galerie i salony sztuki", liczba: 41 },
                      { typ: "kina stałe", liczba: 13 },
                      { typ: "teatry dramatyczne", liczba: 9 },
                    ]}
                    layout="vertical"
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis
                      type="category"
                      dataKey="typ"
                      tick={{ fontSize: 11 }}
                      width={170}
                    />
                    <Tooltip
                      formatter={(value: number) => [value, "Liczba placówek"]}
                      labelStyle={{ fontSize: 11 }}
                      itemStyle={{ fontSize: 11 }}
                    />
                    <Bar dataKey="liczba" fill="rgb(144, 12, 0)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={openCard === "zadowolenie"}
        onClose={() => setOpenCard(null)}
        title="Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z oferty czasu wolnego [%]"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Zadowolenie z oferty czasu wolnego"
            src="https://experience.arcgis.com/experience/35fe8984c18a4a0bb3237fbd13eeaf99/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "wydatki"}
        onClose={() => setOpenCard(null)}
        title="Wysokość wydatków bieżących z budżetu na kulturę i sport na 1 mieszkańca [zł]"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Wydatki na kulturę i sport"
            src="https://experience.arcgis.com/experience/e3e555c99ff14d489a8336573bad3166/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "czytelnicy"}
        onClose={() => setOpenCard(null)}
        title="Łączna liczba czytelników w bibliotekach publicznych Metropolii Krakowskiej (2019–2024)"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 520 }}>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart
              data={[
                { rok: "2019", czytelnicy: 273726 },
                { rok: "2020", czytelnicy: 227670 },
                { rok: "2021", czytelnicy: 225261 },
                { rok: "2022", czytelnicy: 248901 },
                { rok: "2023", czytelnicy: 280700 },
                { rok: "2024", czytelnicy: 300983 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="rok" />
              <YAxis
                domain={["dataMin - 10000", "dataMax + 10000"]}
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
                  "czytelnicy",
                ]}
              />
              <Line
                type="monotone"
                dataKey="czytelnicy"
                name="Czytelnicy"
                stroke="rgb(144, 12, 0)"
                strokeWidth={2}
                dot={{ r: 4, fill: "rgb(144, 12, 0)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "czytelnicyTys"}
        onClose={() => setOpenCard(null)}
        title="Liczba czytelników na 1 tys. mieszkańców w 2024 r."
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={GMINY.map((g) => {
                const readers = CZYTELNICY_2024[g as Gmina] || 0;
                const pop = computeLudnosc(g as Gmina, Y);
                const perThousand = pop ? (readers / pop) * 1000 : 0;
                return { gmina: g, wartosc: Number(perThousand.toFixed(1)) };
              })
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
                formatter={(v: number) => [
                  `${(v as number).toFixed(1)}`,
                  "na 1 tys. mieszk.",
                ]}
              />
              <Bar
                dataKey="wartosc"
                name="Liczba czytelników na 1 tys. mieszkańców"
                fill="rgb(205, 25, 0)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "biblioteki"}
        onClose={() => setOpenCard(null)}
        title="Zestawienie placówek kulturalnych według typu"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={[
                { typ: "biblioteki publiczne i filie", liczba: 116 },
                {
                  typ: "ośrodki kultury, kluby i świetlice",
                  liczba: 85,
                },
                { typ: "muzea z oddziałami", liczba: 53 },
                { typ: "galerie i salony sztuki", liczba: 41 },
                { typ: "kina stałe", liczba: 13 },
                { typ: "teatry dramatyczne", liczba: 9 },
              ]}
              layout="vertical"
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fontSize: 14 }} />
              <YAxis
                type="category"
                dataKey="typ"
                tick={{ fontSize: 14 }}
                width={240}
              />
              <Tooltip
                formatter={(value: number) => [value, "Liczba placówek"]}
                labelStyle={{ fontSize: 13 }}
                itemStyle={{ fontSize: 13 }}
              />
              <Bar dataKey="liczba" fill="rgb(144, 12, 0)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}
