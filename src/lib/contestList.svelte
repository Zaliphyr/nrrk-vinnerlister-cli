<script>
  import { onMount } from 'svelte';
  export let year = null;
  export let contests;
  export let marginTop = '0';

  let sortedContestList = [];
  let sortKey = 'name';
  let sortDirection = 'asc';

  const sortContests = (key) => {
    if (sortKey === key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = key;
      sortDirection = 'asc';
    }

    sortedContestList = contests.slice().sort((a, b) => {
      let modifier = sortDirection === 'asc' ? 1 : -1;
      if (a[sortKey] < b[sortKey]) return -1 * modifier;
      if (a[sortKey] > b[sortKey]) return 1 * modifier;
      return 0;
    });
  };

  onMount(() => {
    sortedContestList = contests.slice();
    sortContests(sortKey);
  });
</script>

<div class="shadow-box" style={`margin-top: ${marginTop};`}>
  {#if year}
    <h2>Utstillinger</h2>
  {/if}

  {#if sortedContestList.length}
    <table>
      <thead>
        <tr>
          <th on:click={() => sortContests('name')}>
            Navn {sortKey === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
          </th>
          <th on:click={() => sortContests('date')}>
            Dato {sortKey === 'date' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
          </th>
          <th on:click={() => sortContests('numberOfDogs')}>
            Hunder {sortKey === 'numberOfDogs' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
          </th>
          <th on:click={() => sortContests('location')}>
            Sted {sortKey === 'location' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
          </th>
          <th on:click={() => sortContests('host')}>
            Arrangør {sortKey === 'host' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
          </th>
          <th on:click={() => sortContests('judge')}>
            Dommer {sortKey === 'judge' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
          </th>
        </tr>
      </thead>
      <tbody>
        {#each sortedContestList as contest}
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

<style>
  th {
    cursor: pointer;
  }
</style>
