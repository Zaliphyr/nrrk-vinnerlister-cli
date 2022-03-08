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
  import Input from "$lib/input.svelte";
  import { pointsByResult } from "../../../scores-and-points";

  export let contest;
  let isAddingResult = false;
  let addResultSuccessText = "";
  let resultBeingEdited = null;
  let resultBeingDeleted = null;

  $: alreadyTakenAwards = contest.results.map((res) => res.result);

  const contestId = $page.params.id;

  async function fetchContest() {
    const res = await fetch(`/utstillinger/${contestId}.json`);
    if (res.ok) {
      contest = await res.json();
    }
  }

  function initiateEditResult(result) {
    resultBeingEdited = {
      id: result.resultId,
      result: result.result,
      critiqueLink: result.critiqueLink || "",
    };
  }

  function onFinishAddingResults(numberOfNewRes) {
    isAddingResult = false;
    fetchContest();
    addResultSuccessText = `La til ${numberOfNewRes} resultat${
      numberOfNewRes > 1 ? "er" : ""
    }`;
  }

  async function deleteResult(resultId) {
    const res = await fetch(`/admin/utstillinger/${resultId}/results.json`, {
      method: "DELETE",
    });
    if (res.ok) {
      resultBeingDeleted = null;
      fetchContest();
    }
  }

  async function saveEditedResult() {
    const res = await fetch(
      `/admin/utstillinger/${resultBeingEdited.id}/results.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          critiqueLink: resultBeingEdited.critiqueLink,
          result: resultBeingEdited.result,
        }),
      }
    );
    if (res.ok) {
      resultBeingEdited = null;
      fetchContest();
    }
  }

  const resultOptions = Object.entries(pointsByResult).map((pointResult) => ({
    value: pointResult[0],
    text: `${pointResult[0]} (${pointResult[1]})`,
  }));
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
    {alreadyTakenAwards}
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
            {#if resultBeingEdited?.id === result.resultId}
              <select
                style="height: fit-content;"
                bind:value={resultBeingEdited.result}
              >
                <option selected value={null} />
                {#each resultOptions as opt}
                  <option
                    value={opt.value}
                    disabled={alreadyTakenAwards.some(
                      (takenAwd) => opt.value === takenAwd
                    )}
                  >
                    {opt.text}
                  </option>
                {/each}
              </select>
            {:else}
              {result.result}
            {/if}
          </td>
          <td>
            {result.pointsByAward}
          </td>
          <td>
            {result.pointsByAward + result.pointsByNumDogs}
          </td>
          <td>
            {#if resultBeingEdited?.id === result.resultId}
              <Input
                title="Kritikk-lenke"
                value={resultBeingEdited.critiqueLink}
                onChange={(newVal) => (resultBeingEdited.critiqueLink = newVal)}
                width="24rem"
              />
            {:else if result.critiqueLink}
              <a href={result.critiqueLink} target="_blank">
                {result.critiqueLink}
              </a>
            {:else}
              -
            {/if}
          </td>
          <td>
            {#if !resultBeingDeleted && !resultBeingEdited}
              <button on:click={() => initiateEditResult(result)}>
                Rediger
              </button>
              <button on:click={() => (resultBeingDeleted = result)}>
                Slett
              </button>
            {:else if resultBeingDeleted?.resultId === result.resultId}
              <button on:click={() => deleteResult(result.resultId)}>
                Slett
              </button>
              <button on:click={() => (resultBeingDeleted = null)}>
                Avbryt
              </button>
            {:else if resultBeingEdited?.id === result.resultId}
              <button on:click={() => (resultBeingEdited = null)}>
                Abvryt
              </button>
              <button on:click={saveEditedResult}> Lagre </button>
            {:else}
              <button disabled>Rediger</button>
              <button disabled>Slett </button>
            {/if}
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

  td {
    vertical-align: middle;
  }
</style>
