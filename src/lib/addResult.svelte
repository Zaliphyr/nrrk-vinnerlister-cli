<script>
  import { pointsByResult } from "../scores-and-points";

  import Input from "./input.svelte";
  import SearchableSelect from "./searchableSelect.svelte";

  const resultOptions = Object.entries(pointsByResult).map((pointResult) => ({
    value: pointResult[0],
    text: `${pointResult[0]} (${pointResult[1]})`,
  }));

  const emptyResult = { dog: null, result: null, critiqueLink: "" };

  export let dogsWithResults = [];
  export let onCancel;
  export let onFinish;
  export let contestId;

  let newResults = [{ ...emptyResult }];
  let allDogOptions = [];
  let errorMessage = null;

  async function fetchDogs() {
    const res = await fetch("/hunder.json");
    if (res.ok) {
      const dogList = await res.json();
      allDogOptions = dogList
        .filter((dog) => !dogsWithResults.includes(dog.id))
        .map((dog) => ({
          text: dog.name,
          value: dog,
        }));
    }
  }

  async function onSave() {
    if (newResults.some((newRes) => !newRes.dog || !newRes.result)) {
      alert("Noen verdier mangler");
      return;
    }

    const resBody = newResults.map((newRes) => ({
      critiqueLink: newRes.critiqueLink,
      result: newRes.result,
      dogId: newRes.dog.value.id,
    }));

    const res = await fetch(`/admin/utstillinger/${contestId}/results.json`, {
      method: "POST",
      body: JSON.stringify(resBody),
    });
    if (res.ok) {
      onFinish(newResults.length);
    } else {
      errorMessage = `Det skjedde en feil ved lagring av hund. Feilkode ${res.status}.`;
    }
  }

  fetchDogs();
</script>

<div class="container">
  <h3>Nye resultater</h3>

  <button
    on:click={() => (newResults = [...newResults, { ...emptyResult }])}
    style="margin: 1rem 0"
  >
    Legg til rad
  </button>

  <div class="grid">
    {#each newResults as result, i}
      <SearchableSelect
        options={allDogOptions}
        value={result.dog}
        onChange={(dog) => (newResults[i].dog = dog)}
        width="24rem"
        title="Hund"
      />

      <select style="height: fit-content;" bind:value={result.result}>
        <option selected value={null} />
        {#each resultOptions as opt}
          <option value={opt.value}>
            {opt.text}
          </option>
        {/each}
      </select>

      <Input
        title="Kritikk-lenke"
        value={result.critiqueLink}
        onChange={(newVal) => (result.critiqueLink = newVal)}
        width="24rem"
      />

      {#if newResults.length > 1}
        <button
          on:click={() =>
            (newResults = newResults
              .slice(0, i)
              .concat(newResults.slice(i + 1)))}>Fjern</button
        >
      {:else}
        &nbsp;
      {/if}
    {/each}
  </div>

  <div class="buttons-div">
    <button on:click={onCancel}>Avbryt</button>
    <button on:click={onSave}>Lagre</button>
  </div>
</div>

<style>
  .buttons-div {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .container {
    width: fit-content;
    padding: 2rem;
    margin: 1rem 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: white;
  }

  .grid {
    display: grid;
    align-items: flex-end;
    grid-template-columns: auto auto auto auto;
    row-gap: 1.5rem;
    column-gap: 1rem;
  }

  @media (max-width: 900px) {
    .grid {
      grid-template-columns: auto;
    }
  }
</style>
