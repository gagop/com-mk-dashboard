import { Link, NavLink, Outlet } from "react-router-dom";
import { mkColors } from "../theme";
import logoImage from "../assets/logo.png";
import bttrLogo from "../assets/BTTR logo claim - Black.svg";
import irmirLogo from "../assets/IRMIR.png";

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
    <div
      style={{
        height: "100dvh",
        background: "var(--mk-bg)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          borderBottom: `1px solid #e6e8ef`,
          background: mkColors.white,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "12px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: mkColors.text }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={logoImage} alt="Metropolia Krakowska" />
              <strong style={{ fontWeight: 700 }}>dashboard 2024</strong>
            </div>
          </Link>
          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignItems: "center",
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
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                })}
                end={n.to === "/"}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main
        style={{
          padding: "16px 32px",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <Outlet />
      </main>
      <footer
        style={{
          borderTop: "1px solid #e6e8ef",
          background: mkColors.white,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "12px 32px",
            color: "#6b7280",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div>
            <div>© 2024 Metropolia Krakowska</div>
            <div style={{ fontSize: "14px", marginTop: 4 }}>
              Raport został wygenerowany z pomocą AI
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={irmirLogo} alt="IRMIR" style={{ height: 48 }} />
            <img src={bttrLogo} alt="BTTR" style={{ height: 40 }} />
          </div>
        </div>
      </footer>
    </div>
  );
}
