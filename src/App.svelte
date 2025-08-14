<script>
  import Toolbar from './components/Toolbar.svelte';
  import Chart from './components/Chart.svelte';
  import Table from './components/Table.svelte';
  import { fade, slide } from 'svelte/transition';
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
    .sort((a, b) => a.label.localeCompare(b.label, 'pl'));

  let selectedKey = sections[0]?.key || '';

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
</script>

<Toolbar {sections} {selectedKey} on:select={(e) => { selectedKey = e.detail; history.replaceState(null, '', `#ch-${selectedKey}`); }} />

<main class="container">
  <header class="section hero">
    <div class="hero-inner">
      <img class="hero-logo" src={heroLogo} alt="Metropolia Krakowska" />
      <div class="hero-content">
        <h1>Raport: Metropolia Krakowska</h1>
        <p class="hero-sub" style="color: var(--muted-text)">Rozdziały: {sections.map(s => s.label).join(', ')}</p>
      </div>
    </div>
  </header>

  {#key selectedKey}
    {#if sections.length}
      {#await Promise.resolve(sections.find(s => s.key === selectedKey)) then current}
        {#if current}
          <section id={`ch-${current.key}`} class="section" aria-labelledby={`h-${current.key}`} in:fade={{ duration: 300, delay: 100 }} out:fade={{ duration: 200 }}>
            <h2 id={`h-${current.key}`} in:slide={{ duration: 400, delay: 200 }}>{current.label}</h2>

            {#each current.doc.paragraphs as p, idx}
              <article class="card" aria-labelledby={`p-${current.key}-${idx}`} in:slide={{ duration: 350, delay: 300 + idx * 100 }}>
                <h3 id={`p-${current.key}-${idx}`}>{p.title}</h3>
                {#each splitParagraphs(p.content) as para}
                  <p>{para}</p>
                {/each}

                {#if p.charts && p.charts.length}
                  <div class="charts">
                    {#each p.charts as chart, chartIdx}
                      <div class="card" in:fade={{ duration: 400, delay: 500 + chartIdx * 150 }}>
                        <h4>{chart.title}</h4>
                        <Chart kind={chart.type} data={parseMaybeJson(chart.data)} />
                      </div>
                    {/each}
                  </div>
                {/if}

                {#if p.tables && p.tables.length}
                  <div style="display: grid; gap: 1rem;">
                    {#each p.tables as t, tableIdx}
                      <div in:slide={{ duration: 300, delay: 600 + tableIdx * 100 }}>
                        <Table title={t.title} rows={parseMaybeJson(t.data)} />
                      </div>
                    {/each}
                  </div>
                {/if}

                {#if p.sources && p.sources.length}
                  <p><strong>Źródła:</strong> {p.sources.join(', ')}</p>
                {/if}
              </article>
            {/each}
          </section>
        {/if}
      {/await}
    {/if}
  {/key}
  
  <footer class="section" style="color: var(--muted-text)">
    Opracowanie demonstracyjne. Interaktywne wykresy i tabele z danych JSON. 
  </footer>
</main>


