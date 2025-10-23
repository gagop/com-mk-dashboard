import { useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
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
      <h2 style={{ margin: "2px 0 6px 12px", flexShrink: 0, fontSize: "20px" }}>
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
                title="Udział mieszkańców deklarujących transport publiczny jako główny środek transportu w dniu roboczym"
                subtitle="Źródło: ArcGIS Experience"
                height={510}
                onOpen={() => setOpenCard("transportPubliczny")}
              >
                <div
                  style={{
                    height: 420,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <iframe
                    title="Udział mieszkańców deklarujących transport publiczny jako główny środek transportu w dniu roboczym"
                    src="https://experience.arcgis.com/experience/6618110be2944b9e8bc73a977250abf2"
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
                      Udział mieszkańców deklarujących transport publiczny jako
                      główny środek transportu w dniu roboczym [%]
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(0, 51, 153)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>&gt; 40</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(51, 102, 204)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>31 - 40</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(102, 153, 255)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>27 - 30</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(153, 204, 255)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>21 - 26</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(230, 242, 255)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>&lt; 21</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Udział mieszkańców deklarujących samochód jako główny środek transportu w dniu roboczym"
                subtitle="Źródło: ArcGIS Experience"
                height={510}
                onOpen={() => setOpenCard("transportSamochodowy")}
              >
                <div
                  style={{
                    height: 420,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <iframe
                    title="Udział mieszkańców deklarujących samochód jako główny środek transportu w dniu roboczym"
                    src="https://experience.arcgis.com/experience/13d1956b64454effa64ea0ce9e689ee3"
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
                      Udział mieszkańców deklarujących samochód jako główny
                      środek transportu w dniu roboczym [%]
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(0, 51, 153)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>&gt; 70</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(51, 102, 204)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>67 - 70</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(102, 153, 255)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>60 - 66</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(153, 204, 255)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>32 - 59</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 12,
                          background: "rgb(230, 242, 255)",
                          border: "1px solid #ddd",
                        }}
                      />
                      <span>&lt; 32</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div style={{ breakInside: "avoid", marginBottom: 12 }}>
              <Card
                title="Przyrost infrastruktury rowerowej w Metropolii Krakowskiej"
                subtitle="Łączna długość infrastruktury (skumulowana)"
                height={380}
                onOpen={() => setOpenCard("transportRowerowy")}
              >
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { rok: "2019", dlugosc: 6.1 },
                        { rok: "2020", dlugosc: 6.1 },
                        { rok: "2021", dlugosc: 7.6 },
                        { rok: "2022", dlugosc: 10.58 },
                        { rok: "2023", dlugosc: 11.73 },
                        { rok: "2024", dlugosc: 20.53 },
                      ]}
                      margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="rok"
                        label={{
                          value: "Rok",
                          position: "insideBottom",
                          offset: -10,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Długość [km]",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip
                        formatter={(value: number) => [
                          `${value.toFixed(2)} km`,
                          "Długość infrastruktury",
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="dlugosc"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
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
        title="Udział mieszkańców deklarujących transport publiczny jako główny środek transportu w dniu roboczym"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Udział mieszkańców deklarujących transport publiczny jako główny środek transportu w dniu roboczym"
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
        title="Udział mieszkańców deklarujących samochód jako główny środek transportu w dniu roboczym"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 780 }}>
          <iframe
            title="Udział mieszkańców deklarujących samochód jako główny środek transportu w dniu roboczym"
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
        title="Przyrost infrastruktury rowerowej w Metropolii Krakowskiej"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { rok: "2019", dlugosc: 6.1 },
                { rok: "2020", dlugosc: 6.1 },
                { rok: "2021", dlugosc: 7.6 },
                { rok: "2022", dlugosc: 10.58 },
                { rok: "2023", dlugosc: 11.73 },
                { rok: "2024", dlugosc: 20.53 },
              ]}
              margin={{ top: 20, right: 30, bottom: 40, left: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="rok"
                label={{
                  value: "Rok",
                  position: "insideBottom",
                  offset: -20,
                  fontSize: 14,
                }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: "Długość infrastruktury [km]",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 14,
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [
                  `${value.toFixed(2)} km`,
                  "Długość infrastruktury",
                ]}
                labelStyle={{ fontSize: 12 }}
                itemStyle={{ fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="dlugosc"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
                name="Infrastruktura rowerowa"
              />
            </LineChart>
          </ResponsiveContainer>
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
