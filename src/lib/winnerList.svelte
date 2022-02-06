<script>
  export let dogs;
</script>

<h2 style="margin-top: 1rem;">Vinnerliste</h2>
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
          <a href={`/hunder/${dog.id}`}>
            {dog.name}
          </a>
        </td>
        <td>
          <!-- {winnerRow.points}
          {#if winnerRow.pointsSplit.length > 1}
            ({winnerRow.pointsSplit.join("+")})
          {/if} -->
          Kommer
        </td>
        <td>
          Kommer
          <!-- {winnerRow.numberOfContests} -->
        </td>
      </tr>
    {/each}
  </tbody>
</table>
