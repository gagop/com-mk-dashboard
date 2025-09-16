import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import {
  InformacjeOgolne,
  InteligentneZarzadzanie,
  SrodowiskoPrzestrzen,
  Mobilnosc,
  KulturaCzasuWolnego,
  Gospodarka,
  Edukacja,
  UslugiSpoleczne,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<InformacjeOgolne />} />
          <Route
            path="/inteligentne-zarzadzanie"
            element={<InteligentneZarzadzanie />}
          />
          <Route
            path="/srodowisko-przestrzen"
            element={<SrodowiskoPrzestrzen />}
          />
          <Route path="/mobilnosc" element={<Mobilnosc />} />
          <Route
            path="/kultura-czasu-wolnego"
            element={<KulturaCzasuWolnego />}
          />
          <Route path="/gospodarka" element={<Gospodarka />} />
          <Route path="/edukacja" element={<Edukacja />} />
          <Route path="/uslugi-spoleczne" element={<UslugiSpoleczne />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
