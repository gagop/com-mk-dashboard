// MK brand palette inspired by the logo
export const mkColors = {
  primaryRed: '#E3223D', // vivid red
  primaryBurgundy: '#811330', // deep burgundy
  primaryNavy: '#192A56', // navy
  gray100: '#f7f7f9',
  gray300: '#e6e8ef',
  gray700: '#4a4f5a',
  text: '#1e1f24',
  white: '#ffffff',
};

export const chartColors = [
  mkColors.primaryRed,
  mkColors.primaryBurgundy,
  mkColors.primaryNavy,
  '#F2994A',
  '#27AE60',
  '#2D9CDB',
];

export const appStyles = {
  page: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '24px 16px',
    color: mkColors.text,
  } as React.CSSProperties,
  kpiCard: {
    background: mkColors.white,
    border: `1px solid ${mkColors.gray300}`,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
  } as React.CSSProperties,
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 12,
    marginBottom: 24,
  } as React.CSSProperties,
  section: {
    marginTop: 16,
    marginBottom: 24,
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    margin: '8px 0 12px',
  } as React.CSSProperties,
};


