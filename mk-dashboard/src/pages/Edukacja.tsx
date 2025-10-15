import { useState } from "react";
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
} from "recharts";

export default function Edukacja() {
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
        Edukacja
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
                title="Zadowolenie z jakości edukacji"
                subtitle="Źródło: ArcGIS Experience"
                height={380}
                onOpen={() => setOpenCard("zadowolenieEdukacja")}
              >
                <div style={{ height: 320 }}>
                  <iframe
                    title="Zadowolenie z jakości edukacji"
                    src="https://experience.arcgis.com/experience/904d0a31db174c5aa48391b939ee7c63"
                    style={{ width: "100%", height: "95%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Środki na infrastrukturę oświaty"
                subtitle="Źródło: zestawienie budżetowe"
                height={380}
                onOpen={() => setOpenCard("srodki")}
              >
                <div style={{ height: 320 }}>
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
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis
                        tickFormatter={(value) =>
                          new Intl.NumberFormat("pl-PL", {
                            notation: "compact",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 1,
                          }).format(value)
                        }
                        tick={{ fontSize: 11 }}
                      />
                      <Tooltip
                        formatter={(v: number) => [
                          new Intl.NumberFormat("pl-PL").format(v),
                          "środki [zł]",
                        ]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="kwota"
                        name="Środki [zł]"
                        fill="rgb(197, 59, 0)"
                        label={{
                          position: "top",
                          fontSize: 10,
                          fill: "#333",
                          formatter: (
                            label: React.ReactNode
                          ): React.ReactNode => {
                            const value = Number(label);
                            return `${(value / 1_000_000).toFixed(1)}M`;
                          },
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Dzieci przedszkolne 3–5 lat (2019–2024)"
                subtitle="Źródło: BDL GUS"
                height={340}
                onOpen={() => setOpenCard("dzieci")}
              >
                <div style={{ height: 280 }}>
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
                      <XAxis dataKey="rok" tick={{ fontSize: 11 }} />
                      <YAxis
                        domain={["dataMin - 5000", "dataMax + 5000"]}
                        tick={{ fontSize: 11 }}
                      />
                      <Tooltip
                        formatter={(v: number) => [
                          new Intl.NumberFormat("pl-PL").format(v),
                          "dzieci 3–5 lat",
                        ]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="liczba"
                        name="Dzieci 3–5 lat"
                        fill="rgb(197, 59, 0)"
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
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Szkoły podstawowe"
                subtitle="Źródło: RSiPO"
                height={380}
                onOpen={() => setOpenCard("szkoly")}
              >
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
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
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [
                          String(v),
                          "szkoły podstawowe",
                        ]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="liczba"
                        name="Szkoły podstawowe"
                        fill="rgb(244, 76, 0)"
                        label={{ position: "top", fontSize: 10, fill: "#333" }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Egzamin 8-klasisty - polski"
                subtitle="Źródło: OKE Kraków"
                height={380}
                onOpen={() => setOpenCard("egzaminPolski")}
              >
                <div style={{ height: 320 }}>
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
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis unit=" %" tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [`${v}%`, "średni wynik"]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="wynik"
                        name="Wynik polski [%]"
                        fill="rgb(197, 59, 0)"
                        label={{ position: "top", fontSize: 10, fill: "#333" }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Egzamin 8-klasisty - matematyka"
                subtitle="Źródło: OKE Kraków"
                height={380}
                onOpen={() => setOpenCard("egzaminMatematyka")}
              >
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
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
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis unit=" %" tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [`${v}%`, "średni wynik"]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="wynik"
                        name="Wynik matematyka [%]"
                        fill="rgb(244, 76, 0)"
                        label={{ position: "top", fontSize: 10, fill: "#333" }}
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
              <Bar
                dataKey="kwota"
                name="Środki [zł]"
                fill="rgb(197, 59, 0)"
                label={{
                  position: "top",
                  fontSize: 10,
                  fill: "#333",
                  formatter: (label: React.ReactNode): React.ReactNode => {
                    const value = Number(label);
                    return `${(value / 1_000_000).toFixed(1)}M`;
                  },
                }}
              />
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
          <ResponsiveContainer width="100%" height="100%">
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
              <YAxis domain={["dataMin - 5000", "dataMax + 5000"]} />
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
          <ResponsiveContainer width="100%" height="100%">
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
                label={{ position: "top", fontSize: 10, fill: "#333" }}
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
              />
              <YAxis unit=" %" />
              <Tooltip formatter={(v: number) => [`${v}%`, "średni wynik"]} />
              <Bar
                dataKey="wynik"
                name="Wynik polski [%]"
                fill="rgb(197, 59, 0)"
                label={{ position: "top", fontSize: 10, fill: "#333" }}
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
          <ResponsiveContainer width="100%" height="100%">
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
                label={{ position: "top", fontSize: 10, fill: "#333" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}
