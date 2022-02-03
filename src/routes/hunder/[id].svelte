<script context="module">
  export const load = async ({ fetch, params }) => {
    const res = await fetch(`/hunder/${params.id}.json`);

    if (res.ok) {
      const dog = await res.json();
      return {
        props: { dog },
      };
    }

    return {
      props: { isError: true },
    };
  };
</script>

<script>
  export let dog;

  // export let dog = {
  //   name: "Hundenavnet",
  //   nkkId: 99999,
  //   gender: "M",
  //   color: "Brun idk",
  //   fatherTitles: "NUCH",
  //   fatherName: "Fantejentas Jimin",
  //   fatherId: 12345,
  //   motherTitles: "",
  //   motherName: "Damenavn",
  //   motherId: 564656,
  //   pedigreeDbLink: "https://vg.no",

  //   awards: [
  //     { awardName: "BIR", count: 2, points: 25 },
  //     { awardName: "xx", count: 0, points: 22 },
  //     { awardName: "BIM", count: 1, points: 20 },
  //     { awardName: "xx2", count: 0, points: 5 },
  //   ],

  //   contests: [
  //     {
  //       contestId: 1,
  //       contestName: "NKK Leangen",
  //       result: "BIR",
  //       points: 25,
  //       date: "22. juni 2022",
  //       location: "Trondheim",
  //       host: "NKK Midt-Norge",
  //       judge: "Linda Karlsen",
  //       critiqueLink: "https://vg.no",
  //     },
  //     {
  //       contestId: 2,
  //       contestName: "NKK asd",
  //       result: "asd",
  //       points: 12,
  //       date: "11. juni 2022",
  //       location: "Oslo",
  //       host: "Oslo klubb",
  //       judge: "Ragnar",
  //       critiqueLink: null,
  //     },
  //   ],
  // };

  let isShowingAllResults = false;
</script>

<h1>{dog.name}</h1>

<div class="info-column-container">
  <div class="info-column-two-col">
    <h3 style="grid-column: span 2;">Info</h3>
    <p>ID:</p>
    <p>{dog.nkkId}</p>
    <p>Kjønn:</p>
    <p>{dog.gender}</p>
    <p>Fargevar:</p>
    <p>{dog.color}</p>
  </div>
  <div class="info-column">
    <h3 style="column-span: 2;">Far</h3>
    <p>{dog.fatherTitles}</p>
    <p>{dog.fatherName}</p>
    <p>ID: {dog.fatherId}</p>
  </div>
  <div class="info-column">
    <h3 style="column-span: 2;">Mor</h3>
    <p>{dog.motherTitles}</p>
    <p>{dog.motherName}</p>
    <p>ID: {dog.motherId}</p>
  </div>
</div>

{#if dog.pedigreeDbLink}
  <a href={dog.pedigreeDbLink} target="_blank">
    <button>Se i pedigree-database</button>
  </a>
{/if}

<h2>Antall premieringer totalt</h2>
{#if dog?.awards?.length}
  <table>
    <thead>
      <tr>
        <th>Kval.</th>
        <th>Poeng</th>
        <th>Antall</th>
      </tr>
    </thead>
    <tbody>
      {#each dog.awards.filter( (award) => (isShowingAllResults ? true : award.count > 0) ) as awardEntry}
        <tr>
          <td>{awardEntry.awardName}</td>
          <td>{awardEntry.points}</td>
          <td>{awardEntry.count}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  Ingen premieringer enda
{/if}

<button on:click={() => (isShowingAllResults = !isShowingAllResults)}>
  {#if isShowingAllResults}
    Vis kun oppnådde premieringer
  {:else}
    Vis alle premieringer
  {/if}
</button>

<h2>Alle resultater</h2>
{#if dog?.contests?.length}
  <table>
    <thead>
      <tr>
        <th>Utstilling</th>
        <th>Resultat</th>
        <th>Poeng</th>
        <th>Dato</th>
        <th>Sted</th>
        <th>Arrangør</th>
        <th>Dommer</th>
        <th>Kritikk</th>
      </tr>
    </thead>
    <tbody>
      {#each dog.contests as contestEntry}
        <tr>
          <td>
            <a href={`/utstillinger/${contestEntry.contestId}`}>
              {contestEntry.contestName}
            </a>
          </td>
          <td>{contestEntry.result}</td>
          <td>{contestEntry.points}</td>
          <td>{contestEntry.date}</td>
          <td>{contestEntry.location}</td>
          <td>{contestEntry.host}</td>
          <td>{contestEntry.judge}</td>
          <td>
            {#if contestEntry.critiqueLink}
              <a href={contestEntry.critiqueLink} target="_blank">Se kritikk</a>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  Ingen resultater enda
{/if}

<style>
  h1 {
    margin-bottom: 1rem;
  }
  h2 {
    margin-top: 2rem;
  }
  button {
    margin-top: 0.5rem;
  }

  .info-column-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 40rem;
    justify-content: space-between;
  }

  .info-column-two-col {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;
  }

  .info-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
