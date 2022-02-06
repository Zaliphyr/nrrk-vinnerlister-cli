<script>
  export let dogs;
</script>

<h2 style="margin-top: 1rem;">Vinnerliste</h2>
<p style="margin: 0.5rem 0">Kun de fem beste resultater er inkludert</p>
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
          <a href={`/hunder/${dog.dogId}`}>
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
