<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let chartInstance = null;
  export let title = '';
  export let show = false;
  
  function exportChart(format) {
    if (!chartInstance) return;
    
    try {
      let dataUrl;
      let filename = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}`;
      
      switch (format) {
        case 'png':
          dataUrl = chartInstance.getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
          });
          downloadImage(dataUrl, `${filename}.png`);
          break;
          
        case 'svg':
          dataUrl = chartInstance.getDataURL({
            type: 'svg',
            backgroundColor: '#fff'
          });
          downloadImage(dataUrl, `${filename}.svg`);
          break;
          
        case 'pdf':
          // For PDF export, we'll use PNG and let the user convert it
          dataUrl = chartInstance.getDataURL({
            type: 'png',
            pixelRatio: 3,
            backgroundColor: '#fff'
          });
          downloadImage(dataUrl, `${filename}_for_pdf.png`);
          break;
          
        case 'json':
          const option = chartInstance.getOption();
          const dataStr = JSON.stringify(option, null, 2);
          downloadText(dataStr, `${filename}_config.json`, 'application/json');
          break;
          
        default:
          console.warn('Unsupported export format:', format);
      }
      
      dispatch('export-complete', { format, filename });
      show = false;
    } catch (error) {
      console.error('Export failed:', error);
      dispatch('export-error', { error: error.message });
    }
  }
  
  function downloadImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  function downloadText(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
</script>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div 
    class="export-modal" 
    role="dialog" 
    aria-modal="true" 
    aria-labelledby="export-title"
    on:click|self={() => show = false}
    on:keydown={(e) => e.key === 'Escape' && (show = false)}
  >
    <div class="export-content">
      <div class="export-header">
        <h4 id="export-title">Eksportuj wykres</h4>
        <button class="close-btn" on:click={() => show = false} aria-label="Zamknij">×</button>
      </div>
      
      <div class="export-options">
        <p class="export-description">Wybierz format eksportu dla wykresu: <strong>{title}</strong></p>
        
        <div class="export-buttons">
          <button class="export-btn export-btn--png" on:click={() => exportChart('png')}>
            <span class="export-icon">🖼️</span>
            <div>
              <strong>PNG</strong>
              <small>Obraz wysokiej jakości</small>
            </div>
          </button>
          
          <button class="export-btn export-btn--svg" on:click={() => exportChart('svg')}>
            <span class="export-icon">🎨</span>
            <div>
              <strong>SVG</strong>
              <small>Grafika wektorowa</small>
            </div>
          </button>
          
          <button class="export-btn export-btn--pdf" on:click={() => exportChart('pdf')}>
            <span class="export-icon">📄</span>
            <div>
              <strong>PNG (PDF)</strong>
              <small>Do konwersji na PDF</small>
            </div>
          </button>
          
          <button class="export-btn export-btn--json" on:click={() => exportChart('json')}>
            <span class="export-icon">⚙️</span>
            <div>
              <strong>JSON</strong>
              <small>Konfiguracja wykresu</small>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .export-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--modal-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .export-content {
    background: var(--background);
    border-radius: 16px;
    padding: 2rem;
    max-width: 480px;
    width: 90%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--border);
  }

  .export-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }

  .export-header h4 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text);
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--muted-text);
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    background: rgba(210, 31, 60, 0.1);
    color: var(--mk-red);
  }

  .export-description {
    margin: 0 0 1.5rem 0;
    color: var(--muted-text);
    font-size: 0.9rem;
    text-align: center;
  }

  .export-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .export-btn {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-align: left;
  }

  .export-btn:hover {
    background: var(--background);
    border-color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 91, 187, 0.15);
  }

  .export-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .export-btn div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .export-btn strong {
    font-size: 0.9rem;
    color: var(--text);
    font-weight: 600;
  }

  .export-btn small {
    font-size: 0.75rem;
    color: var(--muted-text);
    line-height: 1.2;
  }

  .export-btn--png {
    border-left: 4px solid #3b82f6;
  }

  .export-btn--svg {
    border-left: 4px solid #8b5cf6;
  }

  .export-btn--pdf {
    border-left: 4px solid #ef4444;
  }

  .export-btn--json {
    border-left: 4px solid #10b981;
  }

  @media (max-width: 600px) {
    .export-content {
      padding: 1.5rem;
      margin: 1rem;
    }
    
    .export-buttons {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
    
    .export-btn {
      padding: 0.75rem;
    }
  }
</style>
