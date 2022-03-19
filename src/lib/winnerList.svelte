<script>
  export let dogs;
  export let year = null;
  export let header = 'Vinnerliste';
</script>

<div class="shadow-box">
  <h2>{header}</h2>

  {#if dogs.length}
    <table>
      <thead>
        <tr>
          <th>Navn</th>
          <th>Poeng</th>
          <th>Antall</th>
        </tr>
      </thead>
      <tbody>
        {#each dogs as dog}
          <tr>
            <td>
              <a href={`/hunder/${dog.dogId}`} style="white-space: pre-wrap;">
                {dog.dogName}
              </a>
            </td>
            <td>
              {dog.pointsSum}
              {#if dog.points.length > 1}
                ({dog.points.join("+")})
              {/if}
            </td>
            <td>
              {dog.numberOfContests}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p style="margin: 0.5rem 0">
      Ingen resultater funnet
      {#if year} for {year}{/if}
    </p>
  {/if}
</div>

<style>
  td {
    vertical-align: middle;
  }
</style>
