<script context="module">
  export const load = async ({ fetch, params }) => {
    const res = await fetch(`/hunder/${params.id}.json`);

    if (res.ok) {
      const dogData = await res.json();
      return {
        props: { dogData },
      };
    }

    return {
      status: res.status,
      error: res.error,
    };
  };
</script>

<script>
  export let dogData;

  import { page } from "$app/stores";
  const id = $page.params.id;

  let isShowingAllResults = false;
</script>

<div style="margin-bottom: 1.5rem">
  <h1 style="margin-bottom: 0;">
    {dogData.dog.name}
  </h1>
  {#if dogData.dog.titles}
    <h2 style="font-size: 1.25rem; margin-top: 0.5rem;">
      {dogData.dog.titles}
    </h2>
  {/if}
</div>

<div class="info-column-container">
  <div class="info-column-two-col">
    <h3 style="grid-column: span 2;">Info</h3>
    <p>ID:</p>
    <p>{dogData.dog.nkkId}</p>
    <p>Kjønn:</p>
    <p>{dogData.dog.gender === "M" ? "Hannhund" : "Tispe"}</p>
    {#if dogData.dog.pedigreeDbLink}
      <a
        href={dogData.dog.pedigreeDbLink}
        target="_blank"
        style="grid-column: span 2"
      >
        Se i pedigree-database
      </a>
    {/if}
  </div>
  <div class="info-column">
    <h3 style="column-span: 2;">Far</h3>
    <p>{dogData.dog.fatherTitles}</p>
    <p>{dogData.dog.fatherName}</p>
    <p>ID: {dogData.dog.fatherId}</p>
  </div>
  <div class="info-column">
    <h3 style="column-span: 2;">Mor</h3>
    <p>{dogData.dog.motherTitles}</p>
    <p>{dogData.dog.motherName}</p>
    <p>ID: {dogData.dog.motherId}</p>
  </div>
</div>

<div class="shadow-box">
  <h2>Oppnådde premieringer</h2>
  {#if dogData?.awards && dogData.awards.some((awd) => awd.count > 0)}
    <table>
      <thead>
        <tr>
          <th>Kval.</th>
          <th>Poeng</th>
          <th>Antall</th>
        </tr>
      </thead>
      <tbody>
        {#each dogData.awards.filter( (award) => (isShowingAllResults ? true : award.count > 0) ) as awardEntry}
          <tr>
            <td>{awardEntry.awardName}</td>
            <td>{awardEntry.points}</td>
            <td>{awardEntry.count || "-"}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <button on:click={() => (isShowingAllResults = !isShowingAllResults)}>
      {#if isShowingAllResults}
        Vis kun oppnådde premieringer
      {:else}
        Vis alle premieringer
      {/if}
    </button>
  {:else}
    <p style="margin-top: 0.5rem">Ingen premieringer enda</p>
  {/if}
</div>

<div class="shadow-box">
  <h2>Resultater</h2>
  {#if dogData?.contests?.length}
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
        </tr>
      </thead>
      <tbody>
        {#each dogData.contests as contestEntry}
          <tr>
            <td>
              <a href={`/utstillinger/${contestEntry.contestId}`}>
                {contestEntry.contestName}
              </a>
            </td>
            <td>{contestEntry.result}</td>
            <td>
              {contestEntry.pointsByResult + contestEntry.pointsByNumDogs}
              ({contestEntry.pointsByResult}+{contestEntry.pointsByNumDogs})
            </td>
            <td>{contestEntry.contestDate}</td>
            <td>{contestEntry.contestLocation}</td>
            <td>{contestEntry.contestHost}</td>
            <td>{contestEntry.contestJudge}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    Ingen resultater enda
  {/if}
</div>

<style>
  .shadow-box {
    margin-top: 2rem;
  }

  h1 {
    margin-bottom: 1rem;
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
