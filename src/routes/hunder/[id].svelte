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
      props: {
        error: { code: res.status },
      },
    };
  };
</script>

<script>
  export let dogData;
  export let error = null;

  import { page } from "$app/stores";
  const id = $page.params.id;

  let isShowingAllResults = false;
</script>

{#if error}
  {#if error.code === 404}
    <h1>Hund ikke funnet</h1>
    <p>Fant ingen hund med system-id {id}</p>
  {:else}
    <h1>Noe gikk galt</h1>
  {/if}
{:else}
  <h1>
    {dogData.dog.name}
    {#if dogData.dog.titles}
      <span style="font-size: 1.25rem;">
        {dogData.dog.titles}
      </span>
    {/if}
  </h1>

  <div class="info-column-container">
    <div class="info-column-two-col">
      <h3 style="grid-column: span 2;">Info</h3>
      <p>ID:</p>
      <p>{dogData.dog.nkkId}</p>
      <p>Kjønn:</p>
      <p>{dogData.dog.gender}</p>
      <p>Fargevar:</p>
      <p>{dogData.dog.color}</p>
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

  {#if dogData.dog.pedigreeDbLink}
    <a
      href={dogData.dog.pedigreeDbLink}
      target="_blank"
      style="width: fit-content;"
    >
      <button>Se i pedigree-database</button>
    </a>
  {/if}

  <h2>Antall premieringer totalt</h2>
  {#if dogData?.awards?.length}
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
          <th>Kritikk</th>
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
            <td>
              {#if contestEntry.critiqueLink}
                <a href={contestEntry.critiqueLink} target="_blank"
                  >Se kritikk</a
                >
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    Ingen resultater enda
  {/if}
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
