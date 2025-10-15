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

export default function Mobilnosc() {
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
        Mobilność
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
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "0 12px",
          }}
        >
          <div
            style={{
              columnCount: 3,
              columnGap: 12,
              transformOrigin: "top left",
              transform: `scale(${scale})`,
              width: "100%",
              maxWidth: "100%",
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
                title="Transport publiczny"
                subtitle="Źródło: ArcGIS Experience"
                height={380}
                onOpen={() => setOpenCard("transportPubliczny")}
              >
                <div style={{ height: 320 }}>
                  <iframe
                    title="Transport publiczny"
                    src="https://experience.arcgis.com/experience/6618110be2944b9e8bc73a977250abf2"
                    style={{ width: "100%", height: "100%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Transport samochodowy"
                subtitle="Źródło: ArcGIS Experience"
                height={380}
                onOpen={() => setOpenCard("transportSamochodowy")}
              >
                <div style={{ height: 320 }}>
                  <iframe
                    title="Transport samochodowy"
                    src="https://experience.arcgis.com/experience/13d1956b64454effa64ea0ce9e689ee3"
                    style={{ width: "100%", height: "100%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Transport rowerowy"
                subtitle="Źródło: ArcGIS Experience"
                height={380}
                onOpen={() => setOpenCard("transportRowerowy")}
              >
                <div style={{ height: 320 }}>
                  <iframe
                    title="Transport rowerowy"
                    src="https://experience.arcgis.com/experience/9b0d62ed06f84201bee87edcb41c86fb"
                    style={{ width: "100%", height: "100%", border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Czynniki wyboru środka transportu"
                subtitle="Źródło: Raport z badań społecznych 2024"
                height={340}
                onOpen={() => setOpenCard("czynniki")}
              >
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { czynnik: "Komfort podróży", odsetek: 59 },
                        {
                          czynnik: "Brak alternatywy",
                          odsetek: 15,
                        },
                        { czynnik: "Czas przejazdu", odsetek: 13 },
                        { czynnik: "Koszty", odsetek: 5 },
                        { czynnik: "Bezpieczeństwo", odsetek: 4 },
                        { czynnik: "Inne", odsetek: 3 },
                        { czynnik: "Środowisko", odsetek: 1 },
                      ]}
                      margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
                    >
                      <CartesianGrid vertical={false} stroke="#eee" />
                      <XAxis
                        dataKey="czynnik"
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                        height={60}
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis unit="%" tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [`${v}%`, "odsetek"]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="odsetek"
                        name="Udział odpowiedzi [%]"
                        fill="rgb(29, 113, 184)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Podział modalny podróży"
                subtitle="Źródło: Raport z badań społecznych 2024"
                height={340}
                onOpen={() => setOpenCard("podzial")}
              >
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { srodek: "Samochód", udzial: 63 },
                        { srodek: "Komunikacja", udzial: 22 },
                        { srodek: "Pieszo", udzial: 10 },
                        { srodek: "Rower", udzial: 3 },
                        { srodek: "Pociąg", udzial: 0.8 },
                        { srodek: "Hulajnoga", udzial: 0.4 },
                      ]}
                      margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
                    >
                      <CartesianGrid vertical={false} stroke="#eee" />
                      <XAxis
                        dataKey="srodek"
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                        height={60}
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis unit="%" tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [
                          `${Number(v).toFixed(v < 1 ? 1 : 0)}%`,
                          "udział",
                        ]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="udzial"
                        name="Udział podróży [%]"
                        fill="rgb(54, 169, 225)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Stacje kolejowe"
                subtitle="Źródło: Opracowanie własne"
                height={340}
                onOpen={() => setOpenCard("stacje")}
              >
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { kategoria: "Kocmyrzów-Luborzyca", liczba: 4.0 },
                        { kategoria: "Kraków (miejskie)", liczba: 31.0 },
                      ]}
                      margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
                    >
                      <CartesianGrid vertical={false} stroke="#eee" />
                      <XAxis dataKey="kategoria" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [String(v), "liczba"]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="liczba"
                        name="Liczba stacji/przystanków"
                        fill="rgb(29, 113, 184)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Miejsca P&R"
                subtitle="Źródło: Opracowanie własne"
                height={380}
                onOpen={() => setOpenCard("miejsca")}
              >
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { kategoria: "P+R Górka Narodowa", miejsca: 465.0 },
                        { kategoria: "P+R Swoszowice", miejsca: 154.0 },
                        { kategoria: "P+R Krowodrza", miejsca: 109.0 },
                        { kategoria: "Łuczyce", miejsca: 106.0 },
                        { kategoria: "P+R Pachońskiego", miejsca: 95.0 },
                        { kategoria: "P+R Prądnik Czerwony", miejsca: 83.0 },
                        { kategoria: "Kocmyrzów", miejsca: 72.0 },
                        { kategoria: "Baranówka", miejsca: 53.0 },
                        { kategoria: "Zastów", miejsca: 51.0 },
                        { kategoria: "Goszcza", miejsca: 47.0 },
                      ]
                        .slice()
                        .sort((a, b) => b.miejsca - a.miejsca)}
                      margin={{ top: 8, right: 8, bottom: 84, left: 8 }}
                    >
                      <CartesianGrid vertical={false} stroke="#eee" />
                      <XAxis
                        dataKey="kategoria"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        height={60}
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: number) => [String(v), "miejsca P&R"]}
                        labelStyle={{ fontSize: 11 }}
                        itemStyle={{ fontSize: 11 }}
                      />
                      <Bar
                        dataKey="miejsca"
                        name="Liczba miejsc P&R"
                        fill="rgb(54, 169, 225)"
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
        open={openCard === "transportPubliczny"}
        onClose={() => setOpenCard(null)}
        title="Transport publiczny"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Transport publiczny"
            src="https://experience.arcgis.com/experience/26dbf3298caf4f4ea6a0a3e0cfb7f1bf/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "transportSamochodowy"}
        onClose={() => setOpenCard(null)}
        title="Transport samochodowy"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Transport samochodowy"
            src="https://experience.arcgis.com/experience/d995260ef5bb475488dd2275d6587bf2/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "transportRowerowy"}
        onClose={() => setOpenCard(null)}
        title="Transport rowerowy"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Transport rowerowy"
            src="https://experience.arcgis.com/experience/673ecf1542034ebeab47c6e7fa6a781b/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Modal>

      <Modal
        open={openCard === "czynniki"}
        onClose={() => setOpenCard(null)}
        title="Czynniki wyboru środka transportu"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { czynnik: "Komfort podróży", odsetek: 59 },
                {
                  czynnik: "Brak alternatywy",
                  odsetek: 15,
                },
                { czynnik: "Czas przejazdu", odsetek: 13 },
                { czynnik: "Koszty", odsetek: 5 },
                { czynnik: "Bezpieczeństwo", odsetek: 4 },
                { czynnik: "Inne", odsetek: 3 },
                { czynnik: "Środowisko", odsetek: 1 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="czynnik"
                interval={0}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis unit="%" />
              <Tooltip formatter={(v: number) => [`${v}%`, "odsetek"]} />
              <Bar
                dataKey="odsetek"
                name="Udział odpowiedzi [%]"
                fill="rgb(29, 113, 184)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "podzial"}
        onClose={() => setOpenCard(null)}
        title="Podział modalny podróży"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { srodek: "Samochód", udzial: 63 },
                { srodek: "Komunikacja", udzial: 22 },
                { srodek: "Pieszo", udzial: 10 },
                { srodek: "Rower", udzial: 3 },
                { srodek: "Pociąg", udzial: 0.8 },
                { srodek: "Hulajnoga", udzial: 0.4 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="srodek"
                interval={0}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis unit="%" />
              <Tooltip
                formatter={(v: number) => [
                  `${Number(v).toFixed(v < 1 ? 1 : 0)}%`,
                  "udział",
                ]}
              />
              <Bar
                dataKey="udzial"
                name="Udział podróży [%]"
                fill="rgb(54, 169, 225)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "stacje"}
        onClose={() => setOpenCard(null)}
        title="Stacje kolejowe"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { kategoria: "Kocmyrzów-Luborzyca", liczba: 4.0 },
                { kategoria: "Kraków (miejskie)", liczba: 31.0 },
              ]}
              margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis dataKey="kategoria" />
              <YAxis />
              <Tooltip formatter={(v: number) => [String(v), "liczba"]} />
              <Bar
                dataKey="liczba"
                name="Liczba stacji/przystanków"
                fill="rgb(29, 113, 184)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "miejsca"}
        onClose={() => setOpenCard(null)}
        title="Miejsca P&R"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { kategoria: "P+R Górka Narodowa", miejsca: 465.0 },
                { kategoria: "P+R Swoszowice", miejsca: 154.0 },
                { kategoria: "P+R Krowodrza", miejsca: 109.0 },
                { kategoria: "Łuczyce", miejsca: 106.0 },
                { kategoria: "P+R Pachońskiego", miejsca: 95.0 },
                { kategoria: "P+R Prądnik Czerwony", miejsca: 83.0 },
                { kategoria: "Kocmyrzów", miejsca: 72.0 },
                { kategoria: "Baranówka", miejsca: 53.0 },
                { kategoria: "Zastów", miejsca: 51.0 },
                { kategoria: "Goszcza", miejsca: 47.0 },
              ]
                .slice()
                .sort((a, b) => b.miejsca - a.miejsca)}
              margin={{ top: 8, right: 8, bottom: 84, left: 8 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="kategoria"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis />
              <Tooltip formatter={(v: number) => [String(v), "miejsca P&R"]} />
              <Bar
                dataKey="miejsca"
                name="Liczba miejsc P&R"
                fill="rgb(54, 169, 225)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}
