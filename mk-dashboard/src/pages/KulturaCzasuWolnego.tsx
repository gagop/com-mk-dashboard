import { useState } from "react";
import Card from "../components/Card";
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
  Legend,
  BarChart,
  Bar,
} from "recharts";

export default function KulturaCzasuWolnego() {
  const [scale, setScale] = useState(1);
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
      <h2 style={{ margin: "2px 0 6px", flexShrink: 0, fontSize: "20px" }}>
        Kultura czasu wolnego
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
                title="Zadowolenie z oferty czasu wolnego"
                subtitle="Źródło: ArcGIS Experience"
                height={380}
              >
                <div style={{ height: 320 }}>
                  <iframe
                    title="Zadowolenie z oferty czasu wolnego"
                    src="https://experience.arcgis.com/experience/35fe8984c18a4a0bb3237fbd13eeaf99/"
                    style={{ width: "100%", height: "100%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Wydatki na kulturę i sport"
                subtitle="Źródło: ArcGIS Experience"
                height={380}
              >
                <div style={{ height: 320 }}>
                  <iframe
                    title="Wydatki na kulturę i sport"
                    src="https://experience.arcgis.com/experience/e3e555c99ff14d489a8336573bad3166/"
                    style={{ width: "100%", height: "100%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Czytelnicy w bibliotekach (2019–2024)"
                subtitle="Źródło: BDL GUS"
                height={340}
              >
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
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
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Line
                        type="monotone"
                        dataKey="czytelnicy"
                        name="Czytelnicy"
                        stroke="rgb(144, 12, 0)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Czytelnicy na 1 tys. mieszkańców (2024)"
                subtitle="Źródło: BDL GUS"
                height={380}
              >
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
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
                      <Legend
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{
                          paddingTop: 12,
                          bottom: 20,
                          fontSize: 11,
                        }}
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

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Biblioteki publiczne (2024)"
                subtitle="Źródło: BDL GUS"
                height={200}
              >
                <div
                  style={{
                    height: 140,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "rgb(144, 12, 0)",
                  }}
                >
                  0.95 bibliotek na 10 tys. mieszkańców
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
