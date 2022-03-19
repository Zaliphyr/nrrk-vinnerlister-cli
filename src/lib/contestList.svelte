<script>
  export let year = null;
  export let contests;
  export let marginTop='0';
</script>

<div class="shadow-box" style={`margin-top: ${marginTop};`}>
  {#if year}
    <h2>Utstillinger</h2>
  {/if}

  {#if contests?.length}
    <table>
      <thead>
        <tr>
          <th>Navn</th>
          <th>Dato</th>
          <th>Hunder</th>
          <th>Sted</th>
          <th>Arrangør</th>
          <th>Dommer</th>
        </tr>
      </thead>
      <tbody>
        {#each contests as contest}
          <tr>
            <td>
              <a href={`/utstillinger/${contest.id}`}>
                {contest.name}
              </a>
            </td>
            <td>{contest.date}</td>
            <td>{contest.numberOfDogs}</td>
            <td>{contest.location}</td>
            <td>{contest.host}</td>
            <td>{contest.judge}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p style="margin: 0.5rem 0">Ingen utstillinger funnet {#if year}for {year}{/if}</p>
  {/if}
</div>