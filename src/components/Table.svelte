<script>
  export let title = '';
  export let rows = [];

  function getAllKeys(list) {
    const keySet = new Set();
    list.forEach((row) => Object.keys(row).forEach((k) => keySet.add(k)));
    return Array.from(keySet);
  }

  $: columns = getAllKeys(rows);
</script>

<div class="table-wrap">
  <table>
    {#if title}
      <caption>{title}</caption>
    {/if}
    <thead>
      <tr>
        {#each columns as col}
          <th scope="col">{col}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          {#each columns as col}
            <td>{row[col]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  {#if rows.length === 0}
    <p style="color: var(--muted-text)">Brak danych do wyświetlenia.</p>
  {/if}
  </div>


