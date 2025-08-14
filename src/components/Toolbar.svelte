<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import logoUrl from '../assets/image.png?url';
  
  export let sections = [];
  export let selectedKey = '';

  const dispatch = createEventDispatcher();

  let fontScale = 1;
  let fontFamily = 'system';
  let highContrast = false;
  let darkMode = false;

  function applySettings() {
    const root = document.documentElement;
    // Theme priority: high-contrast > dark > light
    if (highContrast) {
      root.dataset.theme = 'high-contrast';
    } else if (darkMode) {
      root.dataset.theme = 'dark';
    } else {
      root.dataset.theme = '';
    }
    root.dataset.font = fontFamily === 'serif' ? 'serif' : fontFamily === 'mono' ? 'mono' : '';
    root.style.setProperty('--base-font-size', `${Math.round(16 * fontScale)}px`);
    localStorage.setItem('mk.settings', JSON.stringify({ fontScale, fontFamily, highContrast, darkMode }));
  }

  function incFont() {
    fontScale = Math.min(1.6, +(fontScale + 0.1).toFixed(2));
    applySettings();
  }
  function decFont() {
    fontScale = Math.max(0.8, +(fontScale - 0.1).toFixed(2));
    applySettings();
  }
  function resetFont() {
    fontScale = 1;
    applySettings();
  }

  onMount(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mk.settings'));
      if (saved) {
        fontScale = saved.fontScale ?? fontScale;
        fontFamily = saved.fontFamily ?? fontFamily;
        highContrast = saved.highContrast ?? highContrast;
        darkMode = saved.darkMode ?? darkMode;
      }
    } catch {}
    applySettings();
  });
</script>

<div class="toolbar" role="region" aria-label="Ustawienia i nawigacja">
  <div class="toolbar-inner container">
    <div class="brand">
      <img src={logoUrl} alt="Metropolia Krakowska" />
    </div>
    <nav class="nav-chapters" aria-label="Spis treści">
      {#each sections as section}
        <a
          href={section.href}
          class:selected={section.key === selectedKey}
          aria-current={section.key === selectedKey ? 'page' : undefined}
          on:click|preventDefault={() => dispatch('select', section.key)}
        >{section.label}</a>
      {/each}
    </nav>
    <div style="margin-left: auto; display: flex; gap: 0.5rem; align-items: center;">
      <!-- Krój pisma ukryty zgodnie z prośbą -->
      <div role="group" aria-label="Rozmiar czcionki">
        <button type="button" on:click={decFont} aria-label="Zmniejsz czcionkę">A−</button>
        <button type="button" on:click={resetFont} aria-label="Resetuj rozmiar">A</button>
        <button type="button" on:click={incFont} aria-label="Zwiększ czcionkę">A+</button>
      </div>
      <label class="theme-toggle">
        <input type="checkbox" bind:checked={darkMode} on:change={applySettings} /> 
        <span class="theme-icon">{darkMode ? '☀️' : '🌙'}</span>
        Tryb ciemny
      </label>
      <label class="theme-toggle">
        <input type="checkbox" bind:checked={highContrast} on:change={applySettings} /> 
        <span class="theme-icon">🔍</span>
        Wysoki kontrast
      </label>
    </div>
  </div>
</div>


