<script>
  export let dogList = [
    {
      id: 1,
      name: "Fantejentas Jimin",
      numberOfResults: 42,
      lastResultDate: "12. Juni 2021",
    },
    {
      id: 2,
      name: "Zal sin hund",
      numberOfResults: 11,
      lastResultDate: "11. Juni 2021",
    },
    {
      id: 31,
      name: "Tux",
      numberOfResults: 5,
      lastResultDate: "5. August 2020",
    },
    {
      id: 4,
      name: "Skaubos Aslan",
      numberOfResults: 3,
      lastResultDate: "1. Mai 2021",
    },
  ];
</script>

<h1>Alle hunder</h1>

<table>
  <thead>
    <tr>
      <th>Hund</th>
      <th>Ant. resultater</th>
      <th>Nyeste resultat</th>
    </tr>
  </thead>
  <tbody>
    {#each dogList as dog}
      <tr>
        <td>
          <a href={`/hunder/${dog.id}`}>
            {dog.name}
          </a>
        </td>
        <td>{dog.numberOfResults}</td>
        <td>{dog.lastResultDate}</td>
      </tr>
    {/each}
  </tbody>
</table>
