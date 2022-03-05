<script>
  export let dogs;
  export let year = null;
</script>

<h2 style="margin-top: 1rem;">Vinnerliste</h2>

{#if dogs.length}
  <p style="margin: 0.5rem 0">
    Kun de fem beste resultater er inkludert pr. hund
  </p>
  <table>
    <thead>
      <tr>
        <th>Navn</th>
        <th>Poeng</th>
        <th>Utstillinger</th>
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

<style>
  td {
    vertical-align: middle;
  }
</style>
