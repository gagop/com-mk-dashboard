<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';

  export let title = '';
  export let src = '';
  export let height = '400px';
  export let showTitle = true;
  
  let mapContainer;
  let isLoaded = false;
  let isError = false;

  function handleLoad() {
    isLoaded = true;
  }

  function handleError() {
    isError = true;
  }

  onMount(() => {
    // Add a small delay to ensure smooth animations
    setTimeout(() => {
      if (mapContainer && src) {
        const iframe = mapContainer.querySelector('iframe');
        if (iframe) {
          iframe.addEventListener('load', handleLoad);
          iframe.addEventListener('error', handleError);
        }
      }
    }, 100);
  });

  // Fullscreen handled via separate page (public/map.html)
</script>

<!-- Fullscreen handled via new tab; no global key handling needed -->

<div class="map-container" style="height: {height};">
  {#if showTitle && title}
    <div class="map-header" in:fly={{ y: -20, duration: 400, delay: 200, easing: quartOut }}>
      <h4 class="map-title">{title}</h4>
      <div class="map-actions">
        <div class="map-badge" aria-hidden="true">
          <span class="map-icon">🗺️</span>
          Mapa interaktywna
        </div>
        <a class="fullscreen-trigger" href={`/map.html?title=${encodeURIComponent(title)}&src=${encodeURIComponent(src)}`} target="_blank" rel="noopener" aria-label="Pokaż w trybie pełnoekranowym" title="Pełny ekran">
          ⤢
        </a>
      </div>
    </div>
  {/if}
  
  <div class="map-wrapper" bind:this={mapContainer}>
    {#if !isError}
      <div 
        class="embed-container" 
        in:fade={{ duration: 600, delay: 300 }}
      >
        <iframe 
          width="500" 
          height="400" 
          frameborder="0" 
          scrolling="no" 
          marginheight="0" 
          marginwidth="0" 
          {title}
          {src}
          loading="lazy"
          allowfullscreen
          class="map-iframe"
          on:load={handleLoad}
          on:error={handleError}
        />
        
        {#if !isLoaded}
          <div class="map-loading" in:fade={{ duration: 200 }} out:fade={{ duration: 300 }}>
            <div class="loading-spinner"></div>
            <p>Ładowanie mapy interaktywnej...</p>
          </div>
        {/if}
      </div>
    {:else}
      <div class="map-error" in:fade={{ duration: 400 }}>
        <div class="error-icon">❌</div>
        <h5>Nie można załadować mapy</h5>
        <p>Sprawdź połączenie internetowe lub spróbuj ponownie później.</p>
        <button class="retry-btn" on:click={() => { isError = false; isLoaded = false; }}>
          Spróbuj ponownie
        </button>
      </div>
    {/if}
  </div>

  <!-- Fullscreen now handled by dedicated page, nothing rendered here. -->
</div>

<style>
  .map-container {
    position: relative;
    width: 100%;
    background: var(--chart-bg);
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--chart-border);
    transition: all 0.3s ease;
    overflow: hidden;
  }
  
  .map-container:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .map-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border);
  }

  .map-title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--chart-text);
    line-height: 1.4;
    flex: 1;
  }

  .map-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .map-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, var(--accent), var(--accent-light));
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    flex-shrink: 0;
  }

  .map-icon {
    font-size: 0.8rem;
  }

  .fullscreen-trigger {
    background: linear-gradient(135deg, var(--surface), var(--background));
    border: 1px solid var(--border);
    border-radius: 8px;
    width: 36px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    color: var(--text);
  }

  .fullscreen-trigger:hover {
    background: linear-gradient(135deg, var(--accent), var(--accent-light));
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 91, 187, 0.25);
  }

  .map-wrapper {
    position: relative;
    height: calc(100% - 3rem);
    min-height: 320px;
  }

  .embed-container {
    position: relative;
    padding-bottom: 80%;
    height: 0;
    max-width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: var(--surface);
  }

  .map-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    transition: opacity 0.3s ease;
  }

  .map-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--surface);
    z-index: 2;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border);
    border-top: 3px solid var(--accent);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .map-loading p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--muted-text);
    text-align: center;
  }

  .map-error {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--surface);
    text-align: center;
    padding: 2rem;
  }

  .error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .map-error h5 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: var(--text);
  }

  .map-error p {
    margin: 0 0 1.5rem 0;
    font-size: 0.9rem;
    color: var(--muted-text);
    line-height: 1.4;
  }

  .retry-btn {
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .retry-btn:hover {
    background: var(--accent-light);
    transform: translateY(-1px);
  }

  /* Fullscreen now handled via separate page (map.html) */

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .map-container {
      padding: 0.75rem;
    }
    
    .map-header {
      flex-direction: column;
      gap: 0.75rem;
      align-items: flex-start;
    }
    
    .map-badge {
      align-self: flex-end;
    }
    
    .embed-container {
      padding-bottom: 90%;
    }
  }

  @media (max-width: 480px) {
    .embed-container {
      padding-bottom: 100%;
    }
    
    .map-error {
      padding: 1rem;
    }
    
    .error-icon {
      font-size: 2rem;
    }
  }
</style>
