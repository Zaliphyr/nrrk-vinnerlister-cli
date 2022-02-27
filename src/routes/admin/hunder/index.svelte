<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch("/hunder.json");

    if (res.ok) {
      const dogList = await res.json();
      return {
        props: { dogList },
      };
    }

    return {
      props: { isError: true },
    };
  };
</script>

<script>
  import NewDog from "$lib/newDog.svelte";

  export let dogList;

  let searchText = "";
  let dogBeingEdited = null;
  let isAddingDog = false;

  $: filteredDogList = searchText
    ? dogList.filter(
        (dog) =>
          containsCaseless(dog.name, searchText) ||
          containsCaseless(dog.motherName, searchText) ||
          containsCaseless(dog.fatherName, searchText) ||
          containsCaseless(dog.titles, searchText)
      )
    : dogList;

  $: editedId = dogBeingEdited ? dogBeingEdited?.id : null;

  function saveEditedDog() {}

  function onNewDogAdded(newDogData) {
    isAddingDog = false;
  }

  function containsCaseless(s1, s2) {
    return s1.toLowerCase().includes(s2.toLowerCase());
  }
</script>

<h1>Hunder - admin</h1>

<a href="/admin/utstillinger" style="margin-top: 0.5rem;">Til utstillinger</a>

{#if isAddingDog}
  <NewDog onCancel={() => (isAddingDog = false)} onFinish={onNewDogAdded} />
{:else}
  <button
    style="margin-top: 1rem;"
    on:click={() => (isAddingDog = true)}
    disabled={dogBeingEdited}
  >
    Ny hund
  </button>
{/if}

<p style="margin-top: 1rem; font-size: 1rem;">Søk etter hund</p>
<input type="text" bind:value={searchText} />

{#if filteredDogList}
  <table style="margin-top: 1rem;">
    <thead>
      <tr>
        <th>Handling</th>
        <th>Navn</th>
        <th>ID</th>
        <th>Kjønn</th>
        <th>Titler</th>
        <th>Far</th>
        <th>Mor</th>
        <th>Pedigree-lenke</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredDogList as dog}
        <tr>
          <td>
            {#if !dogBeingEdited}
              <button
                on:click={() => (dogBeingEdited = { ...dog })}
                disabled={isAddingDog}
              >
                Rediger
              </button>
            {/if}
            {#if dog.id === editedId}
              <button on:click={saveEditedDog}>Lagre</button>
              <button on:click={() => (dogBeingEdited = null)}>Avbryt</button>
            {/if}
          </td>

          <td>
            {#if dog.id === editedId}
              <input type="text" bind:value={dogBeingEdited.name} />
            {:else}
              <a href={`/hunder/${dog.id}`}>
                {dog.name}
              </a>
            {/if}
          </td>

          <td>
            {#if dog.id === editedId}
              <input type="text" bind:value={dogBeingEdited.nkkId} />
            {:else}
              <p>{dog.nkkId}</p>
            {/if}
          </td>

          <td>
            {#if dog.id === editedId}
              <select bind:value={dogBeingEdited.gender}>
                <option value="Hann">Hann</option>
                <option value="Tispe">Tispe</option>
              </select>
            {:else}
              <p>{dog.gender}</p>
            {/if}
          </td>

          <td>
            {#if dog.id === editedId}
              <input type="text" bind:value={dogBeingEdited.titles} />
            {:else}
              <p>{dog.titles}</p>
            {/if}
          </td>

          <td>
            {#if dog.id === editedId}
              <input type="text" bind:value={dogBeingEdited.fatherTitles} />
              <input type="text" bind:value={dogBeingEdited.fatherName} />
              <input type="text" bind:value={dogBeingEdited.fatherId} />
            {:else}
              {#if dog.fatherTitles}
                <p>{dog.fatherTitles}</p>
              {/if}
              <p>{dog.fatherName}</p>
              <p>{dog.fatherId}</p>
            {/if}
          </td>

          <td>
            {#if dog.id === editedId}
              <input type="text" bind:value={dogBeingEdited.motherTitles} />
              <input type="text" bind:value={dogBeingEdited.motherName} />
              <input type="text" bind:value={dogBeingEdited.motherId} />
            {:else}
              {#if dog.motherTitles}
                <p>{dog.motherTitles}</p>
              {/if}
              <p>{dog.motherName}</p>
              <p>{dog.motherId}</p>
            {/if}
          </td>

          <td>
            {#if dog.id === editedId}
              <input type="text" bind:value={dogBeingEdited.pedigreeDbLink} />
            {:else}
              <a href={dog.pedigreeDbLink} target="_blank"
                >{dog.pedigreeDbLink}</a
              >
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  td,
  th {
    vertical-align: middle;
  }
</style>
