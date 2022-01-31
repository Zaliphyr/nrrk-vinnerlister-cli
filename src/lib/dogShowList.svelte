<script>
  export let year = null;
  export let dogShowList = [
    {
      id: 1,
      name: "Leangen open",
      date: "22. juli 2022",
      numberOfDogs: 55,
      location: "Trondheim",
      host: "NKK Trondheim",
      judge: "Linda Karlsen",
    },
    {
      id: 2,
      name: "Opddal open",
      date: "11. aug 2022",
      numberOfDogs: 11,
      location: "Oppdal",
      host: "Oppdal hund",
      judge: "Oppdal Hansen",
    },
  ];
</script>

<div style="margin-top: 2rem;">
  {#if year}
    <h2>Utstillinger</h2>
  {/if}

  <table>
    <thead>
      <tr>
        <th>Navn</th>
        <th>Dato</th>
        <th>Ant. hunder</th>
        <th>Sted</th>
        <th>Arrangør</th>
        <th>Dommer</th>
      </tr>
    </thead>
    <tbody>
      {#each dogShowList as dogShow}
        <tr>
          <td>
            <a href={`/utstillinger/${dogShow.id}`}>
              {dogShow.name}
            </a>
          </td>
          <td>{dogShow.date}</td>
          <td>{dogShow.numberOfDogs}</td>
          <td>{dogShow.location}</td>
          <td>{dogShow.host}</td>
          <td>{dogShow.judge}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
