<script>
  import * as echarts from 'echarts';
  import 'echarts-gl';
  import { onMount, onDestroy } from 'svelte';
  import DataInsights from './DataInsights.svelte';
  import ChartExport from './ChartExport.svelte';

  export let kind = '';
  export let data = [];
  export let title = '';
  export let height = '400px';
  export let interactive = true;
  export let showInsights = false;
  export let enableExport = true;

  let chartElement;
  let chartInstance;
  let showExportModal = false;

  function getCategoryKey(row) {
    const keys = Object.keys(row);
    const preferred = ['gmina', 'Gmina', 'Wybory', 'rok', 'kategoria', 'typ'];
    for (const key of preferred) {
      if (keys.includes(key)) return key;
    }
    return keys[0];
  }

  function getNumericKeys(rows, excludeKey) {
    const keySet = new Set();
    rows.forEach((r) => Object.keys(r).forEach((k) => {
      if (k !== excludeKey && typeof r[k] === 'number') keySet.add(k);
    }));
    return Array.from(keySet);
  }

  function buildOption() {
    const type = kind.toLowerCase();
    
    // Enhanced chart type detection
    const isLine = type.includes('line');
    const isArea = type.includes('area');
    const isDonut = type.includes('donut') || type.includes('pie');
    const isBar = type.includes('bar');
    const isHorizontalBar = type.includes('horizontal bar');
    const isScatter = type.includes('scatter');
    const isRadar = type.includes('radar');
    const isGauge = type.includes('gauge');
    const isHeatmap = type.includes('heatmap');
    const isStacked = type.includes('stacked');
    const isPercent = type.includes('100%') || type.includes('percent');

    // Get current theme for chart colors
    const isDark = document.documentElement.dataset.theme === 'dark';
    const isHighContrast = document.documentElement.dataset.theme === 'high-contrast';
    
    // Define color schemes for different themes
    const lightColors = ['#005bbb', '#d21f3c', '#1a7ae4', '#ff9900', '#22c55e', '#8b5cf6', '#ef4444', '#06b6d4'];
    const darkColors = ['#3b82f6', '#ef4444', '#60a5fa', '#fbbf24', '#34d399', '#a78bfa', '#f87171', '#22d3ee'];
    const highContrastColors = ['#ffff00', '#ff6b6b', '#4dabf7', '#00ffff', '#69db7c', '#ffd43b', '#ff8cc8', '#74c0fc'];
    
    const colors = isHighContrast ? highContrastColors : isDark ? darkColors : lightColors;
    
    // Base options with enhanced styling
    const baseOptions = {
      aria: { enabled: true },
      backgroundColor: 'transparent',
      textStyle: {
        fontFamily: 'var(--font-family)',
        fontSize: 13,
        color: isDark ? '#f1f5f9' : isHighContrast ? '#ffffff' : '#111111'
      },
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicOut'
    };

    // Enhanced donut/pie chart
    if (isDonut) {
      const nameKey = getCategoryKey(data[0] || {});
      const valueKey = Object.keys(data[0] || {}).find((k) => k !== nameKey);
      return {
        ...baseOptions,
        tooltip: { 
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: { 
          orient: 'horizontal',
          bottom: 10,
          textStyle: { fontSize: 12 }
        },
        series: [{
          type: 'pie',
          radius: type.includes('donut') ? ['40%', '70%'] : ['0%', '70%'],
          center: ['50%', '45%'],
          label: { 
            show: true, 
            formatter: '{b}\n{d}%',
            fontSize: 10
          },
          labelLine: { show: true },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: data.map((row, index) => ({ 
            name: row[nameKey], 
            value: row[valueKey],
            itemStyle: {
              borderWidth: 2,
              borderColor: isDark ? '#1e293b' : isHighContrast ? '#000000' : '#fff',
              color: colors[index % colors.length]
            }
          }))
        }]
      };
    }

    // Gauge chart
    if (isGauge) {
      const valueKey = getNumericKeys(data, '')[0];
      const value = data[0] ? data[0][valueKey] : 0;
      return {
        ...baseOptions,
        series: [{
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: 0,
          max: 100,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#FF6E76'],
                [0.5, '#FDDD60'],
                [0.75, '#58D9F9'],
                [1, '#7CFFB2']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 12,
            distance: -60,
            rotate: 'tangential',
            formatter: function (value) {
              if (value === 87.5) {
                return 'Grade A';
              } else if (value === 62.5) {
                return 'Grade B';
              } else if (value === 37.5) {
                return 'Grade C';
              } else if (value === 12.5) {
                return 'Grade D';
              }
              return '';
            }
          },
          title: {
            offsetCenter: [0, '-10%'],
            fontSize: 14
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            formatter: function (value) {
              return Math.round(value) + '%';
            },
            color: 'inherit'
          },
          data: [{
            value: value,
            name: title || 'Wskaźnik'
          }]
        }]
      };
    }

    // Radar chart
    if (isRadar) {
      const categories = data.map(row => Object.keys(row).filter(k => typeof row[k] === 'number'));
      const indicators = [...new Set(categories.flat())].map(key => ({ name: key, max: 100 }));
      
      return {
        ...baseOptions,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          data: data.map((_, i) => `Seria ${i + 1}`),
          bottom: 10
        },
        radar: {
          indicator: indicators,
          center: ['50%', '50%'],
          radius: '70%'
        },
        series: [{
          type: 'radar',
          data: data.map((row, i) => ({
            value: indicators.map(ind => row[ind.name] || 0),
            name: `Seria ${i + 1}`,
            areaStyle: {
              opacity: 0.3
            }
          }))
        }]
      };
    }

    // Scatter plot
    if (isScatter) {
      const keys = getNumericKeys(data, '');
      const xKey = keys[0];
      const yKey = keys[1];
      
      return {
        ...baseOptions,
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return `${xKey}: ${params.value[0]}<br/>${yKey}: ${params.value[1]}`;
          }
        },
        xAxis: {
          type: 'value',
          name: xKey,
          nameLocation: 'middle',
          nameGap: 30
        },
        yAxis: {
          type: 'value',
          name: yKey,
          nameLocation: 'middle',
          nameGap: 30
        },
        series: [{
          type: 'scatter',
          symbolSize: 8,
          data: data.map(row => [row[xKey], row[yKey]]),
          itemStyle: {
            opacity: 0.8
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 5
            }
          }
        }]
      };
    }

    // Standard bar/line/area charts with enhancements
    const categoryKey = getCategoryKey(data[0] || {});
    const numericKeys = getNumericKeys(data, categoryKey);
    const categories = data.map((row) => row[categoryKey]);

    let series = numericKeys.map((key, index) => {
      const seriesConfig = {
        name: key,
        type: isLine ? 'line' : 'bar',
        smooth: isLine,
        emphasis: { focus: 'series' },
        data: data.map((row) => row[key]),
        itemStyle: {
          borderRadius: isBar ? [4, 4, 0, 0] : 0,
          color: colors[index % colors.length]
        }
      };

      if (isArea || isStacked) {
        seriesConfig.areaStyle = {
          opacity: isArea ? 0.7 : 0.8
        };
        if (isStacked) {
          seriesConfig.stack = 'total';
        }
      }

      if (isLine) {
        seriesConfig.symbol = 'circle';
        seriesConfig.symbolSize = 7;
        seriesConfig.lineStyle = {
          width: 3.5
        };
      }

      // Show value labels on bars for readability
      if (isBar) {
        seriesConfig.label = {
          show: true,
          position: 'top',
          fontSize: 11,
          color: isDark ? '#e5e7eb' : '#111827',
          formatter: function(p) {
            return typeof p.value === 'number' ? p.value.toFixed( (p.value < 10 ? 2 : 1) ) : p.value;
          }
        };
      }

      return seriesConfig;
    });

    const chartOptions = {
      ...baseOptions,
      tooltip: { 
        trigger: 'axis',
        axisPointer: {
          type: isLine ? 'cross' : 'shadow'
        },
        textStyle: { fontSize: 12 }
      },
              legend: { 
          top: 10,
          textStyle: { 
            fontSize: 12,
            color: isDark ? '#94a3b8' : isHighContrast ? '#e0e0e0' : '#444444'
          }
        },
      grid: { 
        left: 60, 
        right: 30, 
        top: 50, 
        bottom: isHorizontalBar ? 80 : 60,
        containLabel: true
      },
      dataZoom: interactive ? [{
        type: 'slider',
        start: 0,
        end: 100,
        height: 20,
        bottom: 10
      }] : undefined,
      series
    };

    if (isHorizontalBar) {
      chartOptions.xAxis = { type: 'value' };
      chartOptions.yAxis = { 
        type: 'category', 
        data: categories,
        axisLabel: { interval: 0, rotate: 0 }
      };
      series.forEach(s => s.type = 'bar');
    } else {
      chartOptions.xAxis = { 
        type: 'category', 
        data: categories,
        axisLabel: { 
          interval: 0, 
          rotate: categories.length > 8 ? 45 : 0,
          fontSize: 12,
          color: isDark ? '#94a3b8' : isHighContrast ? '#e0e0e0' : '#444444'
        },
        axisLine: {
          lineStyle: {
            color: isDark ? '#334155' : isHighContrast ? '#ffffff' : '#e0e0e0'
          }
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#334155' : isHighContrast ? '#333333' : '#f0f0f0'
          }
        },
        nameTextStyle: { fontSize: 12 }
      };
      chartOptions.yAxis = { 
        type: 'value',
        axisLabel: {
          color: isDark ? '#94a3b8' : isHighContrast ? '#e0e0e0' : '#444444',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: isDark ? '#334155' : isHighContrast ? '#ffffff' : '#e0e0e0'
          }
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#334155' : isHighContrast ? '#333333' : '#f0f0f0'
          }
        },
        nameTextStyle: { fontSize: 12 }
      };
    }

    if (isPercent && isStacked) {
      chartOptions.yAxis.max = 100;
      chartOptions.tooltip.formatter = function(params) {
        let result = params[0].axisValue + '<br/>';
        params.forEach(param => {
          result += param.marker + param.seriesName + ': ' + param.value + '%<br/>';
        });
        return result;
      };
    }

    return chartOptions;
  }

  function renderChart() {
    if (!chartInstance) {
      chartInstance = echarts.init(chartElement, undefined, { renderer: 'canvas' });
    }
    const option = buildOption();
    chartInstance.setOption(option);
    chartInstance.resize();
  }

  function handleResize() {
    chartInstance && chartInstance.resize();
  }

  onMount(() => {
    renderChart();
    window.addEventListener('resize', handleResize);
  });

  onDestroy(() => {
    window.removeEventListener('resize', handleResize);
    chartInstance && chartInstance.dispose();
  });

  $: if (data && data.length) {
    chartInstance && renderChart();
  }
</script>

<div class="chart-container">
  <div class="chart-header">
    {#if title}
      <h4 class="chart-title">{title}</h4>
    {/if}
    {#if enableExport && chartInstance}
      <button class="export-trigger" on:click={() => showExportModal = true} title="Eksportuj wykres">
        📤
      </button>
    {/if}
  </div>
  
  <div class="chart-box" bind:this={chartElement} role="img" aria-label="Wykres: {kind}" style="height: {height}; min-height: 300px;"></div>
  
  {#if showInsights && data && data.length > 0}
    <DataInsights {data} chartType={kind} />
  {/if}
</div>

<ChartExport 
  {chartInstance} 
  {title} 
  bind:show={showExportModal}
  on:export-complete={() => console.log('Export completed')}
  on:export-error={(e) => console.error('Export error:', e.detail.error)}
/>

<style>
  .chart-container {
    position: relative;
    width: 100%;
    background: var(--chart-bg);
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--chart-border);
    transition: all 0.3s ease;
  }
  
  .chart-container:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    min-height: 2rem;
  }
  
  .chart-title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--chart-text);
    line-height: 1.4;
    flex: 1;
    text-align: center;
  }
  
  .export-trigger {
    background: linear-gradient(135deg, var(--surface), var(--background));
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
  }
  
  .export-trigger:hover {
    background: linear-gradient(135deg, var(--accent), var(--accent-light));
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 91, 187, 0.3);
  }
  
  .chart-box {
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }
</style>


