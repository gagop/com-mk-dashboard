import { useState, useEffect } from "react";
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
        Mobilność
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
          <div>
            <Card
              title="Udział mieszkańców deklarujących transport publiczny jako główny środek transportu w dniu roboczym"
              subtitle="Źródło: Raport z badań społecznych - monitorowanie wskaźników Strategii Metropolia Krakowska 2030 oraz Barometru Krakowskiego 2024"
              height={cardHeight}
              onOpen={() => setOpenCard("transportPubliczny")}
            >
              <div
                style={{
                  height: cardHeight - 110,
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

          <div>
            <Card
              title="Udział mieszkańców deklarujących samochód jako główny środek transportu w dniu roboczym"
              subtitle="Źródło: Raport z badań społecznych - monitorowanie wskaźników Strategii Metropolia Krakowska 2030 oraz Barometru Krakowskiego 2024"
              height={cardHeight}
              onOpen={() => setOpenCard("transportSamochodowy")}
            >
              <div
                style={{
                  height: cardHeight - 110,
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
                    Udział mieszkańców deklarujących samochód jako główny środek
                    transportu w dniu roboczym [%]
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

          <div>
            <Card
              title="Przyrost infrastruktury rowerowej w gminach ościennych (bez Krakowa)"
              subtitle="Łączna długość infrastruktury (skumulowana) | Źródło: BDL GUS"
              height={cardHeight}
              onOpen={() => setOpenCard("transportRowerowy")}
            >
              <div style={{ height: cardHeight - 60 }}>
                <ResponsiveContainer width="100%" height="90%">
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

          <div>
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

          <div>
            <Card
              title="Liczba miejsc P+R w gminach ościennych (2024)"
              subtitle="Źródło: Gminy SMK (bez Krakowa)"
              height={340}
              onOpen={() => setOpenCard("parkingPR")}
            >
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { gmina: "Michałowice", miejsca: 104 },
                      { gmina: "Niepołomice", miejsca: 63 },
                      { gmina: "Zabierzów", miejsca: 55 },
                      { gmina: "Świątniki-Górne", miejsca: 50 },
                      { gmina: "Kocmyrzów-Luborzyca", miejsca: 47 },
                      { gmina: "Biskupice", miejsca: 32 },
                      { gmina: "Igołomia-Wawrzeńczyce", miejsca: 30 },
                      { gmina: "Czernichów", miejsca: 23 },
                    ]}
                    margin={{ top: 8, right: 8, bottom: 16, left: 8 }}
                  >
                    <CartesianGrid vertical={false} stroke="#eee" />
                    <XAxis
                      dataKey="gmina"
                      interval={0}
                      angle={-25}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 9 }}
                    />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(v: number) => [
                        `${v} miejsc`,
                        "Liczba miejsc",
                      ]}
                      labelStyle={{ fontSize: 11 }}
                      itemStyle={{ fontSize: 11 }}
                    />
                    <Bar
                      dataKey="miejsca"
                      name="Liczba miejsc"
                      fill="rgb(54, 169, 225)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div>
            <Card
              title='Liczba parkingów „Parkuj i jedź" w Metropolii Krakowskiej (2019–2024)'
              subtitle="Źródło: Gminy SMK"
              height={340}
              onOpen={() => setOpenCard("miejsca")}
            >
              <div style={{ height: cardHeight - 60 }}>
                <ResponsiveContainer width="100%" height="55%">
                  <LineChart
                    data={[
                      { rok: "2019", liczba: 14 },
                      { rok: "2020", liczba: 20 },
                      { rok: "2021", liczba: 23 },
                      { rok: "2022", liczba: 25 },
                      { rok: "2023", liczba: 34 },
                      { rok: "2024", liczba: 42 },
                    ]}
                    margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rok" />
                    <YAxis
                      label={{
                        value: "Liczba parkingów (suma z gmin)",
                        angle: -90,
                        position: "insideLeft",
                        style: { textAnchor: "middle", fontSize: 11 },
                      }}
                      domain={[10, 45]}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                      formatter={(value: number) => [value, "Liczba parkingów"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="liczba"
                      stroke="#1d4e89"
                      strokeWidth={2}
                      dot={{ r: 5, fill: "#1d4e89" }}
                      activeDot={{ r: 7 }}
                      label={{
                        position: "top",
                        offset: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                        fill: "#1d4e89",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
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
        title="Przyrost infrastruktury rowerowej w gminach ościennych (bez Krakowa)"
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
        open={openCard === "parkingPR"}
        onClose={() => setOpenCard(null)}
        title="Liczba miejsc P+R w gminach ościennych (2024)"
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { gmina: "Michałowice", miejsca: 104 },
                { gmina: "Niepołomice", miejsca: 63 },
                { gmina: "Zabierzów", miejsca: 55 },
                { gmina: "Świątniki-Górne", miejsca: 50 },
                { gmina: "Kocmyrzów-Luborzyca", miejsca: 47 },
                { gmina: "Biskupice", miejsca: 32 },
                { gmina: "Igołomia-Wawrzeńczyce", miejsca: 30 },
                { gmina: "Czernichów", miejsca: 23 },
              ]}
              margin={{ top: 8, right: 30, bottom: 80, left: 40 }}
            >
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="gmina"
                interval={0}
                angle={-25}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(v: number) => [`${v} miejsc`, "Liczba miejsc"]}
              />
              <Bar
                dataKey="miejsca"
                name="Liczba miejsc"
                fill="rgb(54, 169, 225)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>

      <Modal
        open={openCard === "miejsca"}
        onClose={() => setOpenCard(null)}
        title='Liczba parkingów „Parkuj i jedź" w Metropolii Krakowskiej (2019–2024)'
        width={1100}
        maxWidth="95vw"
      >
        <div style={{ height: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { rok: "2019", liczba: 14 },
                { rok: "2020", liczba: 20 },
                { rok: "2021", liczba: 23 },
                { rok: "2022", liczba: 25 },
                { rok: "2023", liczba: 34 },
                { rok: "2024", liczba: 42 },
              ]}
              margin={{ top: 30, right: 40, bottom: 40, left: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rok" tick={{ fontSize: 14 }} />
              <YAxis
                label={{
                  value: "Liczba parkingów (suma z gmin)",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fontSize: 14 },
                }}
                domain={[10, 45]}
                tick={{ fontSize: 14 }}
              />
              <Tooltip
                formatter={(value: number) => [value, "Liczba parkingów"]}
              />
              <Line
                type="monotone"
                dataKey="liczba"
                stroke="#1d4e89"
                strokeWidth={3}
                dot={{ r: 6, fill: "#1d4e89" }}
                activeDot={{ r: 8 }}
                label={{
                  position: "top",
                  offset: 10,
                  fontSize: 14,
                  fontWeight: "bold",
                  fill: "#1d4e89",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}
