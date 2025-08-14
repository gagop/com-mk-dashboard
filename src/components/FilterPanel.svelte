<script>
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  
  export let municipalities = [];
  export let years = [];
  export let categories = [];
  export let selectedMunicipalities = [];
  export let selectedYears = [];
  export let selectedCategories = [];
  export let showFilters = false;

  const dispatch = createEventDispatcher();

  function toggleMunicipality(municipality) {
    if (selectedMunicipalities.includes(municipality)) {
      selectedMunicipalities = selectedMunicipalities.filter(m => m !== municipality);
    } else {
      selectedMunicipalities = [...selectedMunicipalities, municipality];
    }
    dispatch('filter-change', {
      municipalities: selectedMunicipalities,
      years: selectedYears,
      categories: selectedCategories
    });
  }

  function toggleYear(year) {
    if (selectedYears.includes(year)) {
      selectedYears = selectedYears.filter(y => y !== year);
    } else {
      selectedYears = [...selectedYears, year];
    }
    dispatch('filter-change', {
      municipalities: selectedMunicipalities,
      years: selectedYears,
      categories: selectedCategories
    });
  }

  function toggleCategory(category) {
    if (selectedCategories.includes(category)) {
      selectedCategories = selectedCategories.filter(c => c !== category);
    } else {
      selectedCategories = [...selectedCategories, category];
    }
    dispatch('filter-change', {
      municipalities: selectedMunicipalities,
      years: selectedYears,
      categories: selectedCategories
    });
  }

  function clearAllFilters() {
    selectedMunicipalities = [];
    selectedYears = [];
    selectedCategories = [];
    dispatch('filter-change', {
      municipalities: [],
      years: [],
      categories: []
    });
  }

  function selectAllMunicipalities() {
    selectedMunicipalities = [...municipalities];
    dispatch('filter-change', {
      municipalities: selectedMunicipalities,
      years: selectedYears,
      categories: selectedCategories
    });
  }
</script>

{#if showFilters}
  <div class="filter-panel" in:slide={{ duration: 300 }} out:slide={{ duration: 200 }}>
    <div class="filter-header">
      <h3>Filtry interaktywne</h3>
      <div class="filter-actions">
        <button class="btn btn--secondary" on:click={clearAllFilters}>
          Wyczyść wszystkie
        </button>
        <button class="btn btn--close" on:click={() => showFilters = false} aria-label="Zamknij filtry">
          ×
        </button>
      </div>
    </div>

    <div class="filter-content">
      {#if municipalities.length > 0}
        <div class="filter-group">
          <h4>Gminy</h4>
          <div class="filter-actions-small">
            <button class="btn-link" on:click={selectAllMunicipalities}>Wybierz wszystkie</button>
          </div>
          <div class="filter-items">
            {#each municipalities as municipality}
              <label class="filter-item">
                <input 
                  type="checkbox" 
                  checked={selectedMunicipalities.includes(municipality)}
                  on:change={() => toggleMunicipality(municipality)}
                />
                <span class="checkmark"></span>
                {municipality}
              </label>
            {/each}
          </div>
        </div>
      {/if}

      {#if years.length > 0}
        <div class="filter-group">
          <h4>Lata</h4>
          <div class="filter-items">
            {#each years as year}
              <label class="filter-item">
                <input 
                  type="checkbox" 
                  checked={selectedYears.includes(year)}
                  on:change={() => toggleYear(year)}
                />
                <span class="checkmark"></span>
                {year}
              </label>
            {/each}
          </div>
        </div>
      {/if}

      {#if categories.length > 0}
        <div class="filter-group">
          <h4>Kategorie</h4>
          <div class="filter-items">
            {#each categories as category}
              <label class="filter-item">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(category)}
                  on:change={() => toggleCategory(category)}
                />
                <span class="checkmark"></span>
                {category}
              </label>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <div class="filter-footer">
      <div class="active-filters">
        <span class="filter-count">
          Aktywne filtry: {selectedMunicipalities.length + selectedYears.length + selectedCategories.length}
        </span>
      </div>
    </div>
  </div>
{/if}

<style>
  .filter-panel {
    background: var(--filter-bg);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--border);
  }

  .filter-header h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text);
  }

  .filter-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .filter-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
  }

  .filter-group h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--accent);
  }

  .filter-actions-small {
    margin-bottom: 0.75rem;
  }

  .btn-link {
    background: none;
    border: none;
    color: var(--accent);
    font-size: 0.8rem;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
  }

  .btn-link:hover {
    color: var(--accent-light);
  }

  .filter-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 200px;
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .filter-items::-webkit-scrollbar {
    width: 6px;
  }

  .filter-items::-webkit-scrollbar-track {
    background: var(--surface);
    border-radius: 3px;
  }

  .filter-items::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
  }

  .filter-items::-webkit-scrollbar-thumb:hover {
    background: var(--accent);
  }

  .filter-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    position: relative;
  }

  .filter-item:hover {
    background: rgba(0, 91, 187, 0.05);
  }

  .filter-item input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    height: 18px;
    width: 18px;
    background-color: var(--background);
    border: 2px solid var(--border);
    border-radius: 4px;
    position: relative;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .filter-item:hover .checkmark {
    border-color: var(--accent);
  }

  .filter-item input:checked ~ .checkmark {
    background-color: var(--accent);
    border-color: var(--accent);
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 5px;
    top: 2px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .filter-item input:checked ~ .checkmark:after {
    display: block;
  }

  .filter-footer {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
  }

  .active-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .filter-count {
    font-size: 0.9rem;
    color: var(--muted-text);
    font-weight: 500;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn--secondary {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
  }

  .btn--secondary:hover {
    background: var(--border);
    transform: translateY(-1px);
  }

  .btn--close {
    background: none;
    color: var(--muted-text);
    font-size: 1.5rem;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .btn--close:hover {
    background: rgba(210, 31, 60, 0.1);
    color: var(--mk-red);
  }

  @media (max-width: 768px) {
    .filter-content {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .filter-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }
  }
</style>
