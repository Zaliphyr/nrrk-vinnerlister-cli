<script>
  export let winnerList = [
    {
      dogId: 1,
      dogName: "Fantejentas Jimin",
      numberOfContests: 12,
      points: 420,
      pointsSplit: [18, 12, 12, 10, 5],
    },
    {
      dogId: 2,
      dogName: "Zal sin hund",
      numberOfContests: 4,
      points: 69,
      pointsSplit: [25, 11],
    },
    {
      dogId: 3,
      dogName: "Tux",
      numberOfContests: 1,
      points: 42,
      pointsSplit: [42],
    },
  ];
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
    {#each winnerList as winnerRow}
      <tr>
        <td>
          <a href={`/hunder/${winnerRow.dogId}`}>
            {winnerRow.dogName}
          </a>
        </td>
        <td>
          {winnerRow.points}
          {#if winnerRow.pointsSplit.length > 1}
            ({winnerRow.pointsSplit.join("+")})
          {/if}
        </td>
        <td>
          {winnerRow.numberOfContests}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
