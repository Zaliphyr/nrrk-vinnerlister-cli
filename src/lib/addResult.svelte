<script>
  import { awardsWithNumDogPoitns, simpleAwards } from "../scores-and-points";

  import Input from "./input.svelte";
  import SearchableSelect from "./searchableSelect.svelte";

  const simpleResultOptions = simpleAwards.map((award) => ({
    value: award,
    text: award,
  }));

  const placementResultOptions = awardsWithNumDogPoitns.map((award) => ({
    value: award,
    text: award,
  }));

  const emptyResult = { dog: null, result: null, placement: null, ck: false };

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
    if (
      newResults.some(
        (newRes) =>
          !newRes.dog || (!newRes.result && !newRes.placement && !newRes.ck)
      )
    ) {
      alert("Noen verdier mangler");
      return;
    }

    const resBody = newResults.map((newRes) => ({
      dogId: newRes.dog.value.id,
      result: newRes.result,
      placement: newRes.placement,
      ck: newRes.ck,
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

  <div style="display: flex; flex-direction: column; gap: 1rem;">
    {#each newResults as result, i}
      <div class="single-result">
        <SearchableSelect
          options={allDogOptions}
          value={result.dog}
          onChange={(dog) => (newResults[i].dog = dog)}
          width="24rem"
          title="Hund"
        />

        <div class="horizontal">
          <p>Resultat:</p>

          <select style="height: fit-content;" bind:value={result.result}>
            <option selected value={null} />
            {#each simpleResultOptions as opt}
              <option value={opt.value}>
                {opt.text}
              </option>
            {/each}
          </select>
        </div>

        <div class="horizontal">
          <p>Plassering:</p>
          <select style="height: fit-content;" bind:value={result.placement}>
            <option selected value={null} />
            {#each placementResultOptions as opt}
              <option value={opt.value}>
                {opt.text}
              </option>
            {/each}
          </select>
        </div>

        <div class="horizontal-lower">
          <label for={`ckBox-${i}`}>
            <input type="checkbox" id={`ckBox-${i}`} bind:checked={result.ck} />
            CK
          </label>

          {#if newResults.length > 1}
            <button
              on:click={() =>
                (newResults = newResults
                  .slice(0, i)
                  .concat(newResults.slice(i + 1)))}>Fjern</button
            >
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <div class="buttons-div">
    <button on:click={() => (newResults = [...newResults, { ...emptyResult }])}>
      Legg til rad
    </button>
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

  .single-result {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid var(--maincolorFaded);
    padding: 1rem;
  }

  .horizontal {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    gap: 0.5rem;
  }
  .horizontal > select {
    flex-grow: 1;
  }
  .horizontal-lower {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
</style>
