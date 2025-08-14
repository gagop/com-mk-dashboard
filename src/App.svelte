<script>
  import Toolbar from './components/Toolbar.svelte';
  import Chart from './components/Chart.svelte';
  import Table from './components/Table.svelte';
  import FilterPanel from './components/FilterPanel.svelte';
  import InteractiveMap from './components/InteractiveMap.svelte';
  import { fade, slide, fly } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';
  import heroLogo from './assets/mk-logo.svg?url';

  const modules = import.meta.glob('../data/*.json', { eager: true, import: 'default' });

  function slugify(text) {
    return String(text)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase();
  }

  const sections = Object.entries(modules)
    .map(([path, doc]) => {
      const fileName = path.split('/').pop();
      const label = fileName.replace(/\.json$/i, '');
      const key = slugify(label);
      return { key, label, href: `#ch-${key}`, doc };
    })
    .filter((s) => /^(4\.3|4\.4|4\.6)/.test(s.label))
    .sort((a, b) => a.label.localeCompare(b.label, 'pl'));

  let selectedKey = sections[0]?.key || '';
  let showFilters = false;
  let activeFilters = {
    municipalities: [],
    years: [],
    categories: []
  };

  // Extract available filter options from all data
  function getFilterOptions() {
    const municipalities = new Set();
    const years = new Set();
    const categories = new Set();

    sections.forEach(section => {
      section.doc.paragraphs.forEach(paragraph => {
        if (paragraph.charts) {
          paragraph.charts.forEach(chart => {
            const data = parseMaybeJson(chart.data);
            data.forEach(row => {
              // Extract municipalities
              ['gmina', 'Gmina'].forEach(key => {
                if (row[key]) municipalities.add(row[key]);
              });
              // Extract years
              ['rok', 'Rok', 'year'].forEach(key => {
                if (row[key]) years.add(row[key]);
              });
              // Extract categories from chart titles
              categories.add(paragraph.title);
            });
          });
        }
      });
    });

    return {
      municipalities: Array.from(municipalities).sort(),
      years: Array.from(years).sort((a, b) => b - a),
      categories: Array.from(categories).sort()
    };
  }

  $: filterOptions = getFilterOptions();

  function handleFilterChange(event) {
    activeFilters = event.detail;
  }

  function filterData(data, paragraph) {
    if (!data || !Array.isArray(data)) return data;
    
    let filtered = [...data];

    // Filter by municipalities
    if (activeFilters.municipalities.length > 0) {
      filtered = filtered.filter(row => {
        const municipality = row.gmina || row.Gmina;
        return !municipality || activeFilters.municipalities.includes(municipality);
      });
    }

    // Filter by years  
    if (activeFilters.years.length > 0) {
      filtered = filtered.filter(row => {
        const year = row.rok || row.Rok || row.year;
        return !year || activeFilters.years.includes(year);
      });
    }

    // Filter by categories
    if (activeFilters.categories.length > 0) {
      return activeFilters.categories.includes(paragraph.title) ? filtered : [];
    }

    return filtered;
  }

  function selectByHash() {
    const hash = (location.hash || '').replace(/^#/, '');
    if (hash.startsWith('ch-')) {
      const key = hash.slice(3);
      if (sections.some((s) => s.key === key)) {
        selectedKey = key;
      }
    }
  }

  if (typeof window !== 'undefined') {
    selectByHash();
    window.addEventListener('hashchange', selectByHash);
  }

  function parseMaybeJson(value) {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try { return JSON.parse(value); } catch { return []; }
    }
    return [];
  }

  function splitParagraphs(text) {
    if (!text) return [];
    return text.split('\n\n').map((s) => s.trim()).filter(Boolean);
  }

  // Extract KPI metrics from data with explicit units and titles
  function extractKPIs(doc) {
    const kpis = [];
    
    doc.paragraphs.forEach(paragraph => {
      if (paragraph.charts) {
        paragraph.charts.forEach(chart => {
          const data = parseMaybeJson(chart.data);
          if (data.length > 0) {
            // Extract meaningful metrics based on chart type and data
            const numericKeys = Object.keys(data[0]).filter(k => typeof data[0][k] === 'number');
            
            if (numericKeys.length > 0) {
              const latestData = data[data.length - 1] || data[0];
              numericKeys.forEach(key => {
                if (latestData[key] != null) {
                  const { unit, formatted } = detectUnitAndFormat(latestData[key], key, chart.title);
                  kpis.push({
                    title: `${chart.title} — ${key}`,
                    value: latestData[key],
                    unit,
                    display: formatted,
                    category: paragraph.title,
                    trend: data.length > 1 ? calculateTrend(data, key) : null
                  });
                }
              });
            }
          }
        });
      }
    });
    
    return kpis.slice(0, 6); // Limit
  }

  function calculateTrend(data, key) {
    if (data.length < 2) return null;
    
    const recent = data[data.length - 1][key];
    const previous = data[data.length - 2][key];
    
    if (recent > previous) return 'up';
    if (recent < previous) return 'down';
    return 'stable';
  }

  function detectUnitAndFormat(value, key, title) {
    let unit = '';
    const lower = `${key} ${title}`.toLowerCase();
    if (/%|\bfrekwencja\b|odsetek|udział/.test(lower)) unit = '%';
    else if (/zł|pln|kwota|wydatki|koszt/.test(lower)) unit = 'zł';
    else if (/(kg)\b/.test(lower)) unit = 'kg';
    else if (/(t\)?|tony|t\.)\b/.test(lower)) unit = 't';
    else if (/szt\.|liczba|podmioty/.test(lower)) unit = ''; // count

    const formatted = formatKPIValue(value, unit);
    return { unit, formatted };
  }

  function formatKPIValue(value, unit) {
    if (typeof value !== 'number') return String(value);
    if (unit === '%') return value.toFixed(1) + '%';
    if (unit === 'zł') {
      if (value > 1_000_000) return (value / 1_000_000).toFixed(1) + ' mln zł';
      return new Intl.NumberFormat('pl-PL').format(value) + ' zł';
    }
    if (unit === 't') return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(value) + ' t';
    if (unit === 'kg') return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(value) + ' kg';
    return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: value < 10 ? 2 : 0 }).format(value);
  }

  // Generate chapter summary bullets based on data
  function generateChapterSummary(doc) {
    const bullets = [];
    const add = (t) => { if (bullets.length < 6 && t) bullets.push(t); };

    doc.paragraphs.forEach(p => {
      (p.charts || []).forEach(chart => {
        const rows = parseMaybeJson(chart.data);
        if (!rows.length) return;
        // Time trend where possible
        const numericKeys = Object.keys(rows[0]).filter(k => typeof rows[0][k] === 'number');
        const categoryKey = Object.keys(rows[0]).find(k => typeof rows[0][k] !== 'number') || '';
        numericKeys.forEach(k => {
          if (rows.length >= 2) {
            const first = rows[0][k];
            const last = rows[rows.length - 1][k];
            if (typeof first === 'number' && typeof last === 'number' && isFinite(first) && isFinite(last) && first !== 0) {
              const change = ((last - first) / Math.abs(first)) * 100;
              const dir = change > 0 ? 'wzrost' : change < 0 ? 'spadek' : 'stabilizacja';
              add(`${chart.title} — ${k}: ${dir} o ${Math.abs(change).toFixed(1)}% w badanym okresie`);
            }
          }
        });

        // Extremes by category if present
        if (categoryKey) {
          numericKeys.forEach(k => {
            const maxRow = rows.reduce((a, b) => (b[k] > (a?.[k] ?? -Infinity) ? b : a), null);
            const minRow = rows.reduce((a, b) => (b[k] < (a?.[k] ?? Infinity) ? b : a), null);
            if (maxRow && minRow) {
              add(`${chart.title} — najwyższa wartość (${k}) w ${maxRow[categoryKey]} (${formatKPIValue(maxRow[k], '')}), najniższa w ${minRow[categoryKey]} (${formatKPIValue(minRow[k], '')})`);
            }
          });
        }
      });
    });

    return bullets.slice(0, 6);
  }
</script>

<Toolbar {sections} {selectedKey} on:select={(e) => { selectedKey = e.detail; history.replaceState(null, '', `#ch-${selectedKey}`); }} />

<main class="container">
  <header class="section hero">
    <div class="hero-inner">
      <img class="hero-logo" src={heroLogo} alt="Metropolia Krakowska" />
      <div class="hero-content">
        <h1>Dashboard: Metropolia Krakowska</h1>
        <p class="hero-sub" style="color: var(--muted-text)">Interaktywne wizualizacje danych - {sections.length} modułów analitycznych</p>
        <div class="hero-actions">
          <button class="hero-btn" on:click={() => showFilters = !showFilters}>
            <span class="hero-btn-icon">{showFilters ? '🔍' : '⚙️'}</span>
            {showFilters ? 'Ukryj filtry' : 'Pokaż filtry'}
          </button>
        </div>
      </div>
    </div>
  </header>

  {#key selectedKey}
    {#if sections.length}
      {#await Promise.resolve(sections.find(s => s.key === selectedKey)) then current}
        {#if current}
          <section id={`ch-${current.key}`} class="dashboard-section" aria-labelledby={`h-${current.key}`} in:fade={{ duration: 300, delay: 100 }} out:fade={{ duration: 200 }}>
            
            <!-- Interactive Filters -->
            <FilterPanel 
              municipalities={filterOptions.municipalities}
              years={filterOptions.years}
              categories={filterOptions.categories}
              bind:selectedMunicipalities={activeFilters.municipalities}
              bind:selectedYears={activeFilters.years}
              bind:selectedCategories={activeFilters.categories}
              bind:showFilters={showFilters}
              on:filter-change={handleFilterChange}
            />

            <div class="section-header" in:slide={{ duration: 400, delay: 200 }}>
              <h2 id={`h-${current.key}`}>{current.label}</h2>
              <div class="section-stats">
                <span class="stat-item">
                  <span class="stat-value">{current.doc.paragraphs.reduce((acc, p) => acc + (p.charts?.length || 0), 0)}</span>
                  <span class="stat-label">wykresów</span>
                </span>
                <span class="stat-item">
                  <span class="stat-value">{current.doc.paragraphs.reduce((acc, p) => acc + (p.maps?.length || 0), 0)}</span>
                  <span class="stat-label">map</span>
                </span>
                <span class="stat-item">
                  <span class="stat-value">{current.doc.paragraphs.reduce((acc, p) => acc + (p.tables?.length || 0), 0)}</span>
                  <span class="stat-label">tabel</span>
                </span>
                {#if activeFilters.municipalities.length + activeFilters.years.length + activeFilters.categories.length > 0}
                  <span class="stat-item stat-item--filter">
                    <span class="stat-value">{activeFilters.municipalities.length + activeFilters.years.length + activeFilters.categories.length}</span>
                    <span class="stat-label">aktywnych filtrów</span>
                  </span>
                {/if}
              </div>
            </div>

            <!-- KPI Overview -->
            {#if extractKPIs(current.doc).length > 0}
              {@const kpis = extractKPIs(current.doc)}
              <div class="kpi-grid" in:fly={{ y: 30, duration: 500, delay: 300, easing: quartOut }}>
                {#each kpis.slice(0, 4) as kpi, kpiIdx}
                  <div class="kpi-card" in:fly={{ y: 20, duration: 400, delay: 400 + kpiIdx * 100, easing: quartOut }}>
                    <div class="kpi-header">
                      <span class="kpi-title">{kpi.title}</span>
                      {#if kpi.trend}
                        <span class="kpi-trend kpi-trend--{kpi.trend}">
                          {#if kpi.trend === 'up'}↗{:else if kpi.trend === 'down'}↘{:else}→{/if}
                        </span>
                      {/if}
                    </div>
                    <div class="kpi-value">{kpi.display}</div>
                    <div class="kpi-category">{kpi.category}</div>
                  </div>
                {/each}
              </div>
            {/if}

            <!-- Dashboard Grid -->
            <div class="dashboard-grid">
              {#each current.doc.paragraphs as p, idx}
                {#if p.charts && p.charts.length}
                  {#each p.charts as chart, chartIdx}
                    {@const filteredData = filterData(parseMaybeJson(chart.data), p)}
                    {#if filteredData.length > 0}
                      <div class="dashboard-item" in:fly={{ y: 30, duration: 500, delay: 500 + (idx * 3 + chartIdx) * 150, easing: quartOut }}>
                        <Chart 
                          kind={chart.type} 
                          data={filteredData} 
                          title={chart.title}
                          height="400px"
                          interactive={true}
                        />
                      </div>
                    {/if}
                  {/each}
                {/if}

                {#if p.maps && p.maps.length}
                  {#each p.maps as map, mapIdx}
                    <div class="dashboard-item dashboard-item--map" in:fly={{ y: 30, duration: 500, delay: 600 + (idx * 3 + mapIdx) * 150, easing: quartOut }}>
                      <InteractiveMap 
                        title={map.title}
                        src={map.src}
                        height="450px"
                      />
                    </div>
                  {/each}
                {/if}

                {#if p.tables && p.tables.length}
                  {#each p.tables as t, tableIdx}
                    {@const filteredTableData = filterData(parseMaybeJson(t.data), p)}
                    {#if filteredTableData.length > 0}
                      <div class="dashboard-item dashboard-item--table" in:fly={{ y: 30, duration: 500, delay: 700 + (idx * 3 + tableIdx) * 150, easing: quartOut }}>
                        <div class="table-container">
                          <h4 class="table-title">{t.title}</h4>
                          <Table title="" rows={filteredTableData} />
                        </div>
                      </div>
                    {/if}
                  {/each}
                {/if}
              {/each}
            </div>

            <!-- Summary conclusions -->
            {#if generateChapterSummary(current.doc).length}
              {@const summary = generateChapterSummary(current.doc)}
              <div class="sources-section" in:fade={{ duration: 400, delay: 800 }}>
                <h4>Kluczowe spostrzeżenia</h4>
                <ul>
                  {#each summary as s}
                    <li>{s}</li>
                  {/each}
                </ul>
              </div>
            {/if}

            <!-- Data Sources -->
            {#if [...new Set(current.doc.paragraphs.flatMap(p => p.sources || []))].length > 0}
              {@const allSources = [...new Set(current.doc.paragraphs.flatMap(p => p.sources || []))]}
              <div class="sources-section" in:fade={{ duration: 400, delay: 800 }}>
                <h4>Źródła danych</h4>
                <div class="sources-tags">
                  {#each allSources as source}
                    <span class="source-tag">{source}</span>
                  {/each}
                </div>
              </div>
            {/if}
          </section>
        {/if}
      {/await}
    {/if}
  {/key}
  
  <footer class="dashboard-footer" style="color: var(--muted-text)">
    <div class="footer-content">
      <div class="footer-stats">
        <span class="footer-stat">
          <strong>{sections.reduce((acc, s) => acc + s.doc.paragraphs.reduce((pacc, p) => pacc + (p.charts?.length || 0), 0), 0)}</strong> interaktywnych wykresów
        </span>
        <span class="footer-stat">
          <strong>{sections.reduce((acc, s) => acc + s.doc.paragraphs.reduce((pacc, p) => pacc + (p.maps?.length || 0), 0), 0)}</strong> interaktywnych map
        </span>
        <span class="footer-stat">
          <strong>{sections.reduce((acc, s) => acc + s.doc.paragraphs.reduce((pacc, p) => pacc + (p.tables?.length || 0), 0), 0)}</strong> tabel danych
        </span>
        <span class="footer-stat">
          <strong>{sections.length}</strong> modułów analitycznych
        </span>
      </div>
      <p>Dashboard analityczny Metropolii Krakowskiej - wizualizacja danych w czasie rzeczywistym</p>
    </div>
  </footer>
</main>


