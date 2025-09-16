import { useMemo, useState } from "react";
import { appStyles, mkColors } from "../theme";
import Card from "../components/Card";
import type { Gmina, Rok } from "../data/bdl";
import { computeLudnosc, MK_ludnosc } from "../data/utils";
import { GMINY } from "../data/bdl";

function NumberKPI({
  label,
  value,
  hint,
}: {
  label: string;
  value?: number;
  hint?: string;
}) {
  const formatted =
    typeof value === "number"
      ? new Intl.NumberFormat("pl-PL").format(value)
      : "—";
  return (
    <div style={{ ...appStyles.kpiCard }}>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{label}</div>
      <div
        style={{
          marginTop: 6,
          fontSize: 24,
          fontWeight: 700,
          color: mkColors.primaryNavy,
        }}
      >
        {formatted}
      </div>
      {hint && (
        <div style={{ marginTop: 6, fontSize: 11, color: "#9ca3af" }}>
          {hint}
        </div>
      )}
    </div>
  );
}

const Y: Rok = 2024;
const METROPOLIA = "Metropolia Krakowska" as const;
type Selection = typeof METROPOLIA | Gmina;

export default function InformacjeOgolne() {
  const [selection, setSelection] = useState<Selection>(METROPOLIA);

  const options: Selection[] = useMemo(() => [METROPOLIA, ...GMINY], []);

  const total = useMemo(() => {
    if (selection === METROPOLIA) return MK_ludnosc[Y];
    return computeLudnosc(selection as Gmina, Y);
  }, [selection]);

  const subtitle = useMemo(() => {
    if (selection === METROPOLIA) return `Suma dla wszystkich gmin (rok ${Y})`;
    return `Gmina: ${selection} (rok ${Y})`;
  }, [selection]);

  return (
    <div style={appStyles.page}>
      <h2 style={{ margin: "4px 0 8px" }}>Informacje ogólne</h2>
      <p style={{ marginTop: 0, color: "#4b5563" }}>
        Wybierz zakres, aby zobaczyć liczbę ludności ogółem. Rozbicie na płeć w
        podanych źródłach nie jest dostępne – wartości zostaną uzupełnione po
        dodaniu odpowiednich danych.
      </p>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
          margin: "8px 0 16px",
        }}
      >
        <label htmlFor="zakres" style={{ fontWeight: 600 }}>
          Zakres:
        </label>
        <select
          id="zakres"
          value={selection}
          onChange={(e) => setSelection(e.target.value as Selection)}
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            border: `1px solid ${mkColors.gray300}`,
          }}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <Card title="Ludność" subtitle={subtitle}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
            gap: 12,
          }}
        >
          <NumberKPI label="Liczba ludności ogółem" value={total} />
        </div>
      </Card>
    </div>
  );
}
