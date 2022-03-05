<script context="module">
  export const load = async ({ fetch, props, params }) => {
    const res = await fetch(`/utstillinger/${params.id}.json`);

    if (res.ok) {
      const contest = await res.json();
      return {
        props: { contest },
      };
    }

    return {
      props: { isError: true },
    };
  };
</script>

<script>
  import { page } from "$app/stores";
  import AddResult from "$lib/addResult.svelte";
  import InformationBox from "$lib/informationBox.svelte";

  export let contest;
  let isAddingResult = false;
  let addResultSuccessText = "";

  const contestId = $page.params.id;

  async function fetchContest() {
    const res = await fetch(`/utstillinger/${contestId}.json`);
    if (res.ok) {
      contest = await res.json();
    }
  }

  function onFinishAddingResults(numberOfNewRes) {
    isAddingResult = false;
    fetchContest();
    addResultSuccessText = `La til ${numberOfNewRes} resultat${
      numberOfNewRes > 1 ? "er" : ""
    }`;
  }
</script>

<h1>Utstilling: {contest.name}</h1>

<a href="/admin/utstillinger" style="margin-top: 1rem;"> Tilbake </a>

<div class="contest-info">
  <p style="grid-column: span 2;">{contest.date}, {contest.location}</p>
  <p>Arrangør:</p>
  <p>{contest.host}</p>
  <p>Hunder:</p>
  <p>{contest.numberOfDogs}</p>
  <p>Dommer:</p>
  <p>{contest.judge}</p>
</div>

{#if addResultSuccessText}
  <InformationBox
    variant="success"
    margin="1rem 0 0 0"
    text={addResultSuccessText}
  />
{/if}

{#if !isAddingResult}
  <button style="margin-top: 2rem;" on:click={() => (isAddingResult = true)}>
    Legg til resultat
  </button>
{:else}
  <AddResult
    alreadyTakenAwards={contest.results.map((res) => res.result)}
    dogsWithResults={contest.results.map((res) => res.dogId)}
    onCancel={() => (isAddingResult = false)}
    onFinish={onFinishAddingResults}
    {contestId}
  />
{/if}

<h2 style="margin-top: 2rem;">Resultater</h2>

{#if contest.results && contest.results.length}
  <table>
    <thead>
      <tr>
        <th>Hund</th>
        <th>Resultat</th>
        <th>Poeng</th>
        <th>Poeng tot.</th>
        <th>Kritikk-lenke</th>
        <th>Handling</th>
      </tr>
    </thead>
    <tbody>
      {#each contest.results as result}
        <tr>
          <td>
            <a href={`/hunder/${result.dogId}`}>{result.dogName}</a>
          </td>
          <td>
            {result.result}
          </td>
          <td>
            {result.pointsByAward}
          </td>
          <td>
            {result.pointsByAward + result.pointsByNumDogs}
          </td>
          <td>
            {#if result.critiqueLink}
              <a href={result.critiqueLink} target="_blank">
                {result.critiqueLink}
              </a>
            {:else}
              -
            {/if}
          </td>
          <td>
            <button on:click={() => alert("kommer snart")}>Rediger</button>
            <button on:click={() => alert("kommer snart")}>Slett</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p style="margin-top: 1rem;">Ingen resultater</p>
{/if}

<style>
  .contest-info {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;
    width: fit-content;
  }
</style>
