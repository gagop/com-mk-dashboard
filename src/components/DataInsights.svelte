<script>
  import { fade, fly } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';

  export let data = [];
  export let chartType = '';

  function generateInsights(data, chartType) {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    const insights = [];
    
    // Get numeric columns
    const numericKeys = Object.keys(data[0] || {}).filter(key => 
      data.some(row => typeof row[key] === 'number' && !isNaN(row[key]))
    );

    if (numericKeys.length === 0) return insights;

    // Trend analysis for time series data
    if (data.length > 1) {
      const yearKeys = ['rok', 'Rok', 'year'];
      const hasYearData = yearKeys.some(key => data[0][key] !== undefined);
      
      if (hasYearData) {
        numericKeys.forEach(key => {
          const values = data.map(row => row[key]).filter(val => typeof val === 'number');
          if (values.length > 1) {
            const firstVal = values[0];
            const lastVal = values[values.length - 1];
            const change = ((lastVal - firstVal) / firstVal) * 100;
            
            if (Math.abs(change) > 5) {
              insights.push({
                type: change > 0 ? 'trend-up' : 'trend-down',
                text: `${key}: ${change > 0 ? 'wzrost' : 'spadek'} o ${Math.abs(change).toFixed(1)}% w okresie badania`,
                icon: change > 0 ? '📈' : '📉',
                value: Math.abs(change).toFixed(1)
              });
            }
          }
        });
      }
    }

    // Statistical insights
    numericKeys.forEach(key => {
      const values = data.map(row => row[key]).filter(val => typeof val === 'number');
      if (values.length === 0) return;

      const min = Math.min(...values);
      const max = Math.max(...values);
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const range = max - min;

      // Find extremes
      const minRow = data.find(row => row[key] === min);
      const maxRow = data.find(row => row[key] === max);

      if (minRow && maxRow && min !== max) {
        const minLabel = minRow.gmina || minRow.Gmina || minRow.rok || minRow.Rok || 'minimum';
        const maxLabel = maxRow.gmina || maxRow.Gmina || maxRow.rok || maxRow.Rok || 'maksimum';
        
        insights.push({
          type: 'extremes',
          text: `${key}: najwyższa wartość w ${maxLabel} (${max.toLocaleString('pl-PL')}), najniższa w ${minLabel} (${min.toLocaleString('pl-PL')})`,
          icon: '🎯',
          value: `${((range / avg) * 100).toFixed(0)}% rozpiętość`
        });
      }

      // Variance insights
      if (values.length > 2) {
        const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
        const stdDev = Math.sqrt(variance);
        const cv = (stdDev / avg) * 100;

        if (cv > 20) {
          insights.push({
            type: 'variance-high',
            text: `${key}: wysokie zróżnicowanie danych (współczynnik zmienności: ${cv.toFixed(0)}%)`,
            icon: '📊',
            value: `${cv.toFixed(0)}% CV`
          });
        } else if (cv < 10) {
          insights.push({
            type: 'variance-low',
            text: `${key}: niskie zróżnicowanie danych (współczynnik zmienności: ${cv.toFixed(0)}%)`,
            icon: '🎯',
            value: `${cv.toFixed(0)}% CV`
          });
        }
      }
    });

    // Chart-specific insights
    if (chartType.includes('donut') || chartType.includes('pie')) {
      const totalValue = numericKeys.reduce((sum, key) => {
        return sum + data.reduce((keySum, row) => keySum + (row[key] || 0), 0);
      }, 0);
      
      const dominant = data.find(row => {
        const value = numericKeys.reduce((sum, key) => sum + (row[key] || 0), 0);
        return (value / totalValue) > 0.5;
      });

      if (dominant) {
        const dominantKey = Object.keys(dominant).find(key => 
          key !== 'kategoria' && key !== 'opinie' && typeof dominant[key] === 'string'
        );
        insights.push({
          type: 'dominance',
          text: `Dominująca kategoria: ${dominant[dominantKey]} stanowi ponad 50% całości`,
          icon: '👑',
          value: 'Dominacja'
        });
      }
    }

    // Municipality comparison insights
    if (data.some(row => row.gmina || row.Gmina)) {
      const municipalities = [...new Set(data.map(row => row.gmina || row.Gmina).filter(Boolean))];
      if (municipalities.length > 1 && numericKeys.length > 0) {
        const avgByMunicipality = municipalities.map(municipality => {
          const municipalityData = data.filter(row => (row.gmina || row.Gmina) === municipality);
          const avgValue = numericKeys.reduce((sum, key) => {
            const values = municipalityData.map(row => row[key]).filter(val => typeof val === 'number');
            return sum + (values.reduce((s, v) => s + v, 0) / (values.length || 1));
          }, 0) / numericKeys.length;
          return { municipality, avgValue };
        });

        const best = avgByMunicipality.reduce((prev, current) => 
          current.avgValue > prev.avgValue ? current : prev
        );
        
        insights.push({
          type: 'leader',
          text: `Lider w kategorii: ${best.municipality} z najwyższymi średnimi wskaźnikami`,
          icon: '🏆',
          value: 'Najlepszy wynik'
        });
      }
    }

    return insights.slice(0, 3); // Limit to 3 most important insights
  }

  $: insights = generateInsights(data, chartType);
</script>

{#if insights.length > 0}
  <div class="insights-container" in:fade={{ duration: 400, delay: 200 }}>
    <h5 class="insights-title">💡 Kluczowe spostrzeżenia</h5>
    <div class="insights-list">
      {#each insights as insight, index}
        <div 
          class="insight-item insight-item--{insight.type}" 
          in:fly={{ x: -20, duration: 300, delay: 300 + index * 100, easing: quartOut }}
        >
          <div class="insight-header">
            <span class="insight-icon">{insight.icon}</span>
            <span class="insight-value">{insight.value}</span>
          </div>
          <p class="insight-text">{insight.text}</p>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .insights-container {
    background: var(--insight-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1rem;
    margin-top: 1rem;
    backdrop-filter: blur(5px);
  }

  .insights-title {
    margin: 0 0 0.75rem 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .insights-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .insight-item {
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.75rem;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .insight-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    transition: background-color 0.2s ease;
  }

  .insight-item--trend-up::before {
    background: #22c55e;
  }

  .insight-item--trend-down::before {
    background: #ef4444;
  }

  .insight-item--extremes::before,
  .insight-item--leader::before {
    background: var(--accent);
  }

  .insight-item--dominance::before {
    background: #f59e0b;
  }

  .insight-item--variance-high::before {
    background: #8b5cf6;
  }

  .insight-item--variance-low::before {
    background: #06b6d4;
  }

  .insight-item:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .insight-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }

  .insight-icon {
    font-size: 1rem;
  }

  .insight-value {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted-text);
    background: var(--surface);
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
  }

  .insight-text {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.4;
    color: var(--text);
  }

  @media (max-width: 768px) {
    .insights-container {
      padding: 0.75rem;
    }
    
    .insight-item {
      padding: 0.5rem;
    }
    
    .insight-text {
      font-size: 0.75rem;
    }
  }
</style>
