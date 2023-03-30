<script context="module">
  export const load = async ({ fetch, props, params }) => {
    const res = await fetch(`/utstillinger/${params.id}.json`);

    if (res.ok) {
      const contest = await res.json();
      if (contest.maleCertDogRef) {
        contest.maleCertDogRef = contest.maleCertDogRef["@ref"].id;
      }
      if (contest.femaleCertDogRef) {
        contest.femaleCertDogRef = contest.femaleCertDogRef["@ref"].id;
      }
      if (contest.maleNordCertDogRef) {
        contest.maleNordCertDogRef = contest.maleNordCertDogRef["@ref"].id;
      }
      if (contest.femaleNordCertDogRef) {
        contest.femaleNordCertDogRef = contest.femaleNordCertDogRef["@ref"].id;
      }
      if (contest.maleJuniorCertDogRef) {
        contest.maleJuniorCertDogRef =
          contest.maleJuniorCertDogRef["@ref"].id;
      }
      if (contest.femaleJuniorCertDogRef) {
        contest.femaleJuniorCertDogRef =
          contest.femaleJuniorCertDogRef["@ref"].id;
      }
      if (contest.maleVeteranCertDogRef) {
        contest.maleVeteranCertDogRef =
          contest.maleVeteranCertDogRef["@ref"].id;
      }
      if (contest.femaleVeteranCertDogRef) {
        contest.femaleVeteranCertDogRef =
          contest.femaleVeteranCertDogRef["@ref"].id;
      }
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
  import SearchableSelect from "$lib/searchableSelect.svelte";
  import {
    awardsWithNumDogPoitns,
    simpleAwards,
  } from "../../../scores-and-points";

  export let contest;
  let isAddingResult = false;
  let addResultSuccessText = "";
  let resultBeingEdited = null;
  let resultBeingDeleted = null;

  // todo this is getting ridiculous but i'm laze
  let isAddingMaleCert = false;
  let newMaleCertDogId = null;
  let isAddingFemaleCert = false;
  let newFemaleCertDogId = null;
  let isAddingMaleNordCert = false;
  let newMaleNordCertDogId = null;
  let isAddingFemaleNordCert = false;
  let newFemaleNordCertDogId = null;
  let isAddingMaleJuniorCert = false;
  let newMaleJuniorCertDogId = null;
  let isAddingFemaleJuniorCert = false;
  let newFemaleJuniorCertDogId = null;
  let isAddingMaleVeteranCert = false;
  let newMaleVeteranCertDogId = null;
  let isAddingFemaleVeteranCert = false;
  let newFemaleVeteranCertDogId = null;

  let allMaleDogOptions = contest?.results
    ? contest.results
        .filter((resDog) => resDog.dogGender === "M")
        .map((resDog) => ({ text: resDog.dogName, value: resDog.dogId }))
    : [];
  let allFemaleDogOptions = contest?.results
    ? contest.results
        .filter((resDog) => resDog.dogGender === "F")
        .map((resDog) => ({ text: resDog.dogName, value: resDog.dogId }))
    : [];

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
      placement: result.placement,
      ck: result.ck,
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
          result: resultBeingEdited.result,
          placement: resultBeingEdited.placement,
          ck: resultBeingEdited.ck,
        }),
      }
    );
    if (res.ok) {
      resultBeingEdited = null;
      fetchContest();
    }
  }

  async function removeCert(gender, certType) {
    setCert(gender, certType, false, null);
  }

  async function setCert(dogGender, certType, isCert, dogId) {
    const res = await fetch(`/admin/utstillinger/${contestId}.json`, {
      method: "PATCH",
      body: JSON.stringify({
        dogGender,
        certType,
        isCert,
        dogId,
      }),
    });
    if (res.ok) {
      newMaleCertDogId = null;
      newFemaleCertDogId = null;
      newMaleNordCertDogId = null;
      newFemaleNordCertDogId = null;
      newMaleJuniorCertDogId = null;
      newFemaleJuniorCertDogId = null;
      newMaleVeteranCertDogId = null;
      newFemaleVeteranCertDogId = null;
      isAddingFemaleCert = false;
      isAddingMaleCert = false;
      isAddingFemaleNordCert = false;
      isAddingMaleNordCert = false;
      isAddingFemaleJuniorCert = false;
      isAddingMaleJuniorCert = false;
      isAddingFemaleVeteranCert = false;
      isAddingMaleVeteranCert = false;
      fetchContest();
    }
  }

  function getDogNameByDogId(dogId) {
    for (let result of contest.results) {
      if (result.dogId === dogId) {
        return result.dogName;
      }
    }
  }

  const simpleResultOptions = simpleAwards.map((award) => ({
    value: award,
    text: award,
  }));

  const placementResultOptions = awardsWithNumDogPoitns.map((award) => ({
    value: award,
    text: award,
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
    dogsWithResults={contest.results.map((res) => res.dogId)}
    onCancel={() => (isAddingResult = false)}
    onFinish={onFinishAddingResults}
    {contestId}
  />
{/if}

<h2 style="margin-top: 2rem;">Resultater</h2>

<h3 style="margin-top: 1rem;">Cert</h3>
<div class="cert-container">
  <p>Hannhund</p>
  <p>
    {#if contest.maleCertDogRef}
      <a href={`/hunder/${contest.maleCertDogRef}`}>
        {getDogNameByDogId(contest.maleCertDogRef)}
      </a>
    {:else}
      Ingen
    {/if}
  </p>

  {#if isAddingMaleCert}
    <div class="search-and-submit-box">
      <SearchableSelect
        options={allMaleDogOptions}
        value={newMaleCertDogId}
        onChange={(dog) => (newMaleCertDogId = dog)}
        width="24rem"
        title="Hund"
      />
      <button
        disabled={!newMaleCertDogId}
        on:click={() => setCert("M", "normal", true, newMaleCertDogId.value)}
      >
        Lagre
      </button>
    </div>
  {:else if contest.maleCertDogRef}
    <button on:click={() => removeCert("M", "normal")} disabled={isAddingFemaleCert}>
      Fjern
    </button>
  {:else}
    <button
      on:click={() => (isAddingMaleCert = true)}
      disabled={isAddingFemaleCert}
    >
      Legg til
    </button>
  {/if}

  <p>Tispe</p>
  <p>
    {#if contest.femaleCertDogRef}
      <a href={`/hunder/${contest.femaleCertDogRef}`}>
        {getDogNameByDogId(contest.femaleCertDogRef)}
      </a>
    {:else}
      Ingen
    {/if}
  </p>

  {#if isAddingFemaleCert}
    <div class="search-and-submit-box">
      <SearchableSelect
        options={allFemaleDogOptions}
        value={newFemaleCertDogId}
        onChange={(dog) => (newFemaleCertDogId = dog)}
        width="24rem"
        title="Hund"
      />
      <button
        disabled={!newFemaleCertDogId}
        on:click={() => setCert("F", "normal", true, newFemaleCertDogId.value)}
      >
        Lagre
      </button>
    </div>
  {:else if contest.femaleCertDogRef}
    <button on:click={() => removeCert("F", "normal")} disabled={isAddingMaleCert}>
      Fjern
    </button>
  {:else}
    <button
      on:click={() => (isAddingFemaleCert = true)}
      disabled={isAddingMaleCert}
    >
      Legg til
    </button>
  {/if}
</div>

<h3 style="margin-top: 1rem;">Nord cert</h3>
<div class="cert-container">
  <p>Hannhund</p>
  <p>
    {#if contest.maleNordCertDogRef}
      <a href={`/hunder/${contest.maleNordCertDogRef}`}>
        {getDogNameByDogId(contest.maleNordCertDogRef)}
      </a>
    {:else}
      Ingen
    {/if}
  </p>

  {#if isAddingMaleNordCert}
    <div class="search-and-submit-box">
      <SearchableSelect
        options={allMaleDogOptions}
        value={newMaleNordCertDogId}
        onChange={(dog) => (newMaleNordCertDogId = dog)}
        width="24rem"
        title="Hund"
      />
      <button
        disabled={!newMaleNordCertDogId}
        on:click={() => setCert("M", "nord", true, newMaleNordCertDogId.value)}
      >
        Lagre
      </button>
    </div>
  {:else if contest.maleNordCertDogRef}
    <button on:click={() => removeCert("M", "nord")} disabled={isAddingFemaleNordCert}>
      Fjern
    </button>
  {:else}
    <button
      on:click={() => (isAddingMaleNordCert = true)}
      disabled={isAddingFemaleNordCert}
    >
      Legg til
    </button>
  {/if}

  <p>Tispe</p>
  <p>
    {#if contest.femaleNordCertDogRef}
      <a href={`/hunder/${contest.femaleNordCertDogRef}`}>
        {getDogNameByDogId(contest.femaleNordCertDogRef)}
      </a>
    {:else}
      Ingen
    {/if}
  </p>

  {#if isAddingFemaleNordCert}
    <div class="search-and-submit-box">
      <SearchableSelect
        options={allFemaleDogOptions}
        value={newFemaleNordCertDogId}
        onChange={(dog) => (newFemaleNordCertDogId = dog)}
        width="24rem"
        title="Hund"
      />
      <button
        disabled={!newFemaleNordCertDogId}
        on:click={() => setCert("F", "nord", true, newFemaleNordCertDogId.value)}
      >
        Lagre
      </button>
    </div>
  {:else if contest.femaleNordCertDogRef}
    <button on:click={() => removeCert("F", "nord")} disabled={isAddingMaleNordCert}>
      Fjern
    </button>
  {:else}
    <button
      on:click={() => (isAddingFemaleNordCert = true)}
      disabled={isAddingMaleNordCert}
    >
      Legg til
    </button>
  {/if}
</div>

<h3 style="margin-top: 1rem;">Junior cert</h3>
<div class="cert-container">
  <p>Hannhund</p>
  <p>
    {#if contest.maleJuniorCertDogRef}
      <a href={`/hunder/${contest.maleJuniorCertDogRef}`}>
        {getDogNameByDogId(contest.maleJuniorCertDogRef)}
      </a>
    {:else}
      Ingen
    {/if}
  </p>

  {#if isAddingMaleJuniorCert}
    <div class="search-and-submit-box">
      <SearchableSelect
        options={allMaleDogOptions}
        value={newMaleJuniorCertDogId}
        onChange={(dog) => (newMaleJuniorCertDogId = dog)}
        width="24rem"
        title="Hund"
      />
      <button
        disabled={!newMaleJuniorCertDogId}
        on:click={() => setCert("M", "junior", true, newMaleJuniorCertDogId.value)}
      >
        Lagre
      </button>
    </div>
  {:else if contest.maleJuniorCertDogRef}
    <button on:click={() => removeCert("M", "junior")} disabled={isAddingFemaleJuniorCert}>
      Fjern
    </button>
  {:else}
    <button
      on:click={() => (isAddingMaleJuniorCert = true)}
      disabled={isAddingFemaleJuniorCert}
    >
      Legg til
    </button>
  {/if}

  <p>Tispe</p>
  <p>
    {#if contest.femaleJuniorCertDogRef}
      <a href={`/hunder/${contest.femaleJuniorCertDogRef}`}>
        {getDogNameByDogId(contest.femaleJuniorCertDogRef)}
      </a>
    {:else}
      Ingen
    {/if}
  </p>

  {#if isAddingFemaleJuniorCert}
    <div class="search-and-submit-box">
      <SearchableSelect
        options={allFemaleDogOptions}
        value={newFemaleJuniorCertDogId}
        onChange={(dog) => (newFemaleJuniorCertDogId = dog)}
        width="24rem"
        title="Hund"
      />
      <button
        disabled={!newFemaleJuniorCertDogId}
        on:click={() => setCert("F", "junior", true, newFemaleJuniorCertDogId.value)}
      >
        Lagre
      </button>
    </div>
  {:else if contest.femaleJuniorCertDogRef}
    <button on:click={() => removeCert("F", "junior")} disabled={isAddingMaleJuniorCert}>
      Fjern
    </button>
  {:else}
    <button
      on:click={() => (isAddingFemaleJuniorCert = true)}
      disabled={isAddingMaleJuniorCert}
    >
      Legg til
    </button>
  {/if}
</div>

<h3 style="margin-top: 1rem;">Veteran cert</h3>
<div class="cert-container">
  <p>Hannhund</p>
  <p>
    {#if contest.maleVeteranCertDogRef}
      <a href={`/hunder/${contest.maleVeteranCertDogRef}`}>
        {getDogNameByDogId(contest.maleVeteranCertDogRef)}
      </a>
    {:else}
      Ingen
    {/if}
  </p>

  {#if isAddingMaleVeteranCert}
    <div class="search-and-submit-box">
      <SearchableSelect
        options={allMaleDogOptions}
        value={newMaleVeteranCertDogId}
        onChange={(dog) => (newMaleVeteranCertDogId = dog)}
        width="24rem"
        title="Hund"
      />
      <button
        disabled={!newMaleVeteranCertDogId}
        on:click={() => setCert("M", "veteran", true, newMaleVeteranCertDogId.value)}
      >
        Lagre
      </button>
    </div>
  {:else if contest.maleVeteranCertDogRef}
    <button on:click={() => removeCert("M", "veteran")} disabled={isAddingFemaleVeteranCert}>
      Fjern
    </button>
  {:else}
    <button
      on:click={() => (isAddingMaleVeteranCert = true)}
      disabled={isAddingFemaleVeteranCert}
    >
      Legg til
    </button>
  {/if}

  <p>Tispe</p>
  <p>
    {#if contest.femaleVeteranCertDogRef}
      <a href={`/hunder/${contest.femaleVeteranCertDogRef}`}>
        {getDogNameByDogId(contest.femaleVeteranCertDogRef)}
      </a>
    {:else}
      Ingen
    {/if}
  </p>

  {#if isAddingFemaleVeteranCert}
    <div class="search-and-submit-box">
      <SearchableSelect
        options={allFemaleDogOptions}
        value={newFemaleVeteranCertDogId}
        onChange={(dog) => (newFemaleVeteranCertDogId = dog)}
        width="24rem"
        title="Hund"
      />
      <button
        disabled={!newFemaleVeteranCertDogId}
        on:click={() => setCert("F", "veteran", true, newFemaleVeteranCertDogId.value)}
      >
        Lagre
      </button>
    </div>
  {:else if contest.femaleVeteranCertDogRef}
    <button on:click={() => removeCert("F", "veteran")} disabled={isAddingMaleVeteranCert}>
      Fjern
    </button>
  {:else}
    <button
      on:click={() => (isAddingFemaleVeteranCert = true)}
      disabled={isAddingMaleVeteranCert}
    >
      Legg til
    </button>
  {/if}
</div>


<h3 style="margin-top: 2rem;">Premieringer</h3>
{#if contest.results && contest.results.length}
  <table>
    <thead>
      <tr>
        <th>Hund</th>
        <th>Resultat</th>
        <th>Plassering</th>
        <th>CK</th>
        <th>Poeng</th>
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
                {#each simpleResultOptions as opt}
                  <option value={opt.value}>
                    {opt.text}
                  </option>
                {/each}
              </select>
            {:else}
              {result.result || "-"}
            {/if}
          </td>
          <td>
            {#if resultBeingEdited?.id === result.resultId}
              <select
                style="height: fit-content;"
                bind:value={resultBeingEdited.placement}
              >
                <option selected value={null} />
                {#each placementResultOptions as opt}
                  <option value={opt.value}>
                    {opt.text}
                  </option>
                {/each}
              </select>
            {:else}
              {result.placement || "-"}
            {/if}
          </td>
          <td>
            {#if resultBeingEdited?.id === result.resultId}
              <label for={`ckBox-${result.resultId}`}>
                <input
                  type="checkbox"
                  id={`ckBox-${result.resultId}`}
                  bind:checked={resultBeingEdited.ck}
                />
                CK
              </label>
            {:else}
              {result.ck ? "Ja" : "-"}
            {/if}
          </td>
          <td>
            {result.points}
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

  .cert-container {
    display: grid;
    grid-template-columns: auto auto auto;
    width: fit-content;
    row-gap: 0.25rem;
    column-gap: 0.75rem;
    margin-top: 0.5rem;
    align-items: center;
  }

  .search-and-submit-box {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
  }
  .search-and-submit-box > button {
    height: fit-content;
  }
</style>
