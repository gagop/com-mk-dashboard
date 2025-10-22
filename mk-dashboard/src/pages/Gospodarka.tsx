import { useState } from "react";
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
        Gospodarka
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
                title="Poziom zadowolenia przedsiębiorców z relacji z samorządem gminnym"
                subtitle="Źródło: ArcGIS Experience"
                height={380}
                onOpen={() => setOpenCard("zadowoleniePrzedsiebiorcow")}
              >
                <div style={{ height: 320 }}>
                  <iframe
                    title="Poziom zadowolenia przedsiębiorców z relacji z samorządem gminnym"
                    src="https://experience.arcgis.com/experience/dc389c17988543428b3190c8317a49fe"
                    style={{ width: "100%", height: "95%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Udział podatku CIT w budżecie"
                subtitle="Źródło: ArcGIS Experience"
                height={380}
                onOpen={() => setOpenCard("udzialCIT")}
              >
                <div style={{ height: 320 }}>
                  <iframe
                    title="Udział podatku CIT"
                    src="https://experience.arcgis.com/experience/0c6ce3cadf95473cb27c2cacfa3265cc"
                    style={{ width: "100%", height: "95%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Nowe podmioty gospodarcze (2019–2024)"
                subtitle="Źródło: BDL GUS"
                height={340}
                onOpen={() => setOpenCard("podmioty")}
              >
                <div style={{ height: 280 }}>
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
                      <XAxis dataKey="rok" tick={{ fontSize: 11 }} />
                      <YAxis
                        domain={["dataMin - 1000", "dataMax + 1000"]}
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
                          "podmioty",
                        ]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="podmioty"
                        name="Liczba podmiotów"
                        stroke="rgb(116, 27, 105)"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Udział bezrobotnych"
                subtitle="Źródło: BDL GUS"
                height={380}
                onOpen={() => setOpenCard("bezrobotni")}
              >
                <div style={{ height: 320 }}>
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
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis unit="%" tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [`${v}%`, "udział"]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
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

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Miejsca noclegowe"
                subtitle="Źródło: BDL GUS (bez Krakowa)"
                height={380}
                onOpen={() => setOpenCard("noclegowe")}
              >
                <div style={{ height: 320 }}>
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
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [
                          new Intl.NumberFormat("pl-PL").format(v as number),
                          "miejsca",
                        ]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
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
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        open={openCard === "zadowoleniePrzedsiebiorcow"}
        onClose={() => setOpenCard(null)}
        title="Poziom zadowolenia przedsiębiorców z relacji z samorządem gminnym"
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
                dot={{ r: 2 }}
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
