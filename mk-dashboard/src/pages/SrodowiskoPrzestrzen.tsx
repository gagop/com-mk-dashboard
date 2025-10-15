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

export default function SrodowiskoPrzestrzen() {
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
        Środowisko i przestrzeń
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
                title="Odpady komunalne na mieszkańca"
                subtitle="Źródło: ArcGIS Experience"
                height={380}
                onOpen={() => setOpenCard("odpady")}
              >
                <div style={{ height: 320 }}>
                  <iframe
                    title="Ilość odebranych odpadów komunalnych"
                    src="https://experience.arcgis.com/experience/7d0ef674f28046cc96aeb83fa7a89b0c/"
                    style={{ width: "100%", height: "100%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Redukcja emisji pyłu PM2,5"
                subtitle="Źródło: ArcGIS Experience"
                height={380}
                onOpen={() => setOpenCard("pm25")}
              >
                <div style={{ height: 320 }}>
                  <iframe
                    title="Redukcja emisji pyłu PM2,5"
                    src="https://experience.arcgis.com/experience/2cd7bc91e15148b59c6f5342b24e7f00/"
                    style={{ width: "100%", height: "100%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Poziom recyklingu odpadów"
                subtitle="Źródło: BDL GUS"
                height={380}
                onOpen={() => setOpenCard("recykling")}
              >
                <div style={{ height: 320 }}>
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
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis unit="%" tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [`${v}%`, "poziom"]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
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

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Redukcja emisji pyłu PM10"
                subtitle="Źródło: Program ochrony powietrza"
                height={380}
                onOpen={() => setOpenCard("pm10")}
              >
                <div style={{ height: 320 }}>
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
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis unit=" Mg" tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [
                          v.toString(),
                          "redukcja PM10",
                        ]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
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

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Mieszkania oddane do użytkowania"
                subtitle="Źródło: BDL GUS"
                height={380}
                onOpen={() => setOpenCard("mieszkania")}
              >
                <div style={{ height: 320 }}>
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
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [
                          v.toString(),
                          "na 10 tys. ludności",
                        ]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
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

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Udział energii z OZE"
                subtitle="Źródło: Opracowanie własne"
                height={380}
                onOpen={() => setOpenCard("oze")}
              >
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { gmina: "Czernichów", oze: 100.0 },
                        { gmina: "Biskupice", oze: 26.4 },
                        { gmina: "Mogilany", oze: 10.0 },
                        { gmina: "Igołomia-Wawrzeńczyce", oze: 5.0 },
                        { gmina: "Kraków", oze: 4.83 },
                      ]
                        .slice()
                        .sort((a, b) => b.oze - a.oze)}
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
                        formatter={(v: number) => [
                          `${(v as number).toFixed(2)}%`,
                          "udział OZE",
                        ]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="oze"
                        name="Udział energii z OZE [%]"
                        fill="rgb(58, 142, 20)"
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
        open={openCard === "oze"}
        onClose={() => setOpenCard(null)}
        title="Udział energii z OZE"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Czernichów", oze: 100.0 },
                { gmina: "Biskupice", oze: 26.4 },
                { gmina: "Mogilany", oze: 10.0 },
                { gmina: "Igołomia-Wawrzeńczyce", oze: 5.0 },
                { gmina: "Kraków", oze: 4.83 },
              ]
                .slice()
                .sort((a, b) => b.oze - a.oze)}
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
                formatter={(v: number) => [
                  `${(v as number).toFixed(2)}%`,
                  "udział OZE",
                ]}
              />
              <Bar
                dataKey="oze"
                name="Udział energii z OZE [%]"
                fill="rgb(58, 142, 20)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}
