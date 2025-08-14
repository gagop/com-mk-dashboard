<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import logoUrl from '../assets/mk-logo.svg?url';

  export let sections = [];
  export let selectedKey = '';

  const dispatch = createEventDispatcher();

  let fontScale = 1;
  let fontFamily = 'system';
  let highContrast = false;

  function applySettings() {
    const root = document.documentElement;
    root.dataset.theme = highContrast ? 'high-contrast' : '';
    root.dataset.font = fontFamily === 'serif' ? 'serif' : fontFamily === 'mono' ? 'mono' : '';
    root.style.setProperty('--base-font-size', `${Math.round(16 * fontScale)}px`);
    localStorage.setItem('mk.settings', JSON.stringify({ fontScale, fontFamily, highContrast }));
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
      }
    } catch {}
    applySettings();
  });
</script>

<div class="toolbar" role="region" aria-label="Ustawienia i nawigacja">
  <div class="toolbar-inner container">
    <div class="brand">
      <img src={logoUrl} alt="Metropolia Krakowska" />
      <span class="brand-name">Raport: Metropolia Krakowska</span>
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
      <label><input type="checkbox" bind:checked={highContrast} on:change={applySettings} /> Wysoki kontrast</label>
    </div>
  </div>
</div>


