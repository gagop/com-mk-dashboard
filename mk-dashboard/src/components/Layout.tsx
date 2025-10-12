import { Link, NavLink, Outlet } from "react-router-dom";
import { mkColors } from "../theme";

const navItems = [
  { to: "/", label: "Informacje ogólne" },
  { to: "/inteligentne-zarzadzanie", label: "Inteligentne zarządzanie" },
  { to: "/srodowisko-przestrzen", label: "Środowisko i przestrzeń" },
  { to: "/mobilnosc", label: "Mobilność" },
  { to: "/kultura-czasu-wolnego", label: "Kultura czasu wolnego" },
  { to: "/gospodarka", label: "Gospodarka" },
  { to: "/edukacja", label: "Edukacja" },
  { to: "/uslugi-spoleczne", label: "Usługi społeczne" },
];

export default function Layout() {
  return (
    <div style={{ minHeight: "100dvh", background: "var(--mk-bg)" }}>
      <header
        style={{
          borderBottom: `1px solid #e6e8ef`,
          background: mkColors.white,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            padding: "12px 32px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: mkColors.text }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src="/src/assets/logo.png" alt="Metropolia Krakowska" />
              <strong style={{ fontWeight: 700 }}>dashboard 2024</strong>
            </div>
          </Link>
        </div>
        <nav
          style={{ borderTop: `1px solid #e6e8ef`, background: mkColors.white }}
        >
          <div
            style={{
              padding: "6px 32px",
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                style={({ isActive }) => ({
                  padding: "8px 12px",
                  borderRadius: 999,
                  color: isActive ? mkColors.white : mkColors.text,
                  textDecoration: "none",
                  background: isActive ? mkColors.primaryNavy : "#F1F3F8",
                })}
                end={n.to === "/"}
              >
                {n.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main style={{ padding: "16px 32px" }}>
        <Outlet />
      </main>
      <footer
        style={{
          borderTop: "1px solid #e6e8ef",
          marginTop: 24,
          background: mkColors.white,
        }}
      >
        <div
          style={{
            padding: "12px 32px",
            color: "#6b7280",
          }}
        >
          © 2024 Metropolia Krakowska
        </div>
      </footer>
    </div>
  );
}
