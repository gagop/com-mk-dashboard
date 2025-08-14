<script>
  import * as echarts from 'echarts';
  import { onMount, onDestroy } from 'svelte';

  export let kind = '';
  export let data = [];

  let chartElement;
  let chartInstance;

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
    const isLine = kind.toLowerCase().includes('line');
    const isDonut = kind.toLowerCase().includes('donut');
    const isBar = kind.toLowerCase().includes('bar');

    if (isDonut) {
      const nameKey = getCategoryKey(data[0] || {});
      const valueKey = Object.keys(data[0] || {}).find((k) => k !== nameKey);
      return {
        aria: { enabled: true },
        tooltip: { trigger: 'item' },
        legend: { top: 0 },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            label: { show: true, formatter: '{b}: {d}%' },
            data: data.map((row) => ({ name: row[nameKey], value: row[valueKey] }))
          }
        ]
      };
    }

    const categoryKey = getCategoryKey(data[0] || {});
    const numericKeys = getNumericKeys(data, categoryKey);
    const categories = data.map((row) => row[categoryKey]);
    const series = numericKeys.map((key) => ({
      name: key,
      type: isLine ? 'line' : 'bar',
      smooth: isLine,
      emphasis: { focus: 'series' },
      data: data.map((row) => row[key])
    }));

    return {
      aria: { enabled: true },
      tooltip: { trigger: 'axis' },
      legend: { top: 0 },
      grid: { left: 40, right: 16, top: 40, bottom: 40 },
      xAxis: { type: 'category', data: categories },
      yAxis: { type: 'value' },
      series
    };
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

<div class="chart-box" bind:this={chartElement} role="img" aria-label="Wykres: {kind}"></div>


