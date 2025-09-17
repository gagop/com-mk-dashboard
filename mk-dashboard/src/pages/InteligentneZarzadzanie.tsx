import Card from "../components/Card";
import { appStyles } from "../theme";

export default function InteligentneZarzadzanie() {
  return (
    <div style={appStyles.page}>
      <h2 style={{ margin: "4px 0 8px" }}>Inteligentne zarzadzanie</h2>

      <Card
        title="Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z jakości funkcjonowania administracji w gminie [%]"
        subtitle="Źródło: ArcGIS Experience"
        height={540}
      >
        <div style={{ height: 460 }}>
          <iframe
            title="Poziom zadowolenia mieszkańców gmin Metropolii Krakowskiej z jakości funkcjonowania administracji w gminie [%]"
            src="https://experience.arcgis.com/experience/51fd6fd2e6514e5ea7b17d5a60163f14/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>

      <div style={{ marginTop: 12 }} />
      <Card
        title="Dochody ogółem na 1 mieszkańca"
        subtitle="Źródło: ArcGIS Experience"
        height={540}
      >
        <div style={{ height: 460 }}>
          <iframe
            title="Dochody ogółem na 1 mieszkańca"
            src="https://experience.arcgis.com/experience/24d07761e5e743b6a072e04bbbf8d4b4/"
            style={{ width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </Card>
    </div>
  );
}
