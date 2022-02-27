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
  import InformationBox from "$lib/informationBox.svelte";
  import Input from "$lib/input.svelte";
  import DogEditor from "$lib/dogEditor.svelte";

  export let dogList;

  let searchText = "";
  let dogBeingEdited = null;
  let isAddingDog = false;

  let newDogName = "";
  let editedDogName = "";
  let deletedDogName = "";

  $: filteredDogList = searchText
    ? dogList.filter(
        (dog) =>
          containsCaseless(dog.name, searchText) ||
          containsCaseless(dog.motherName, searchText) ||
          containsCaseless(dog.fatherName, searchText) ||
          containsCaseless(dog.titles, searchText) ||
          containsCaseless(dog.nkkId, searchText)
      )
    : dogList;

  $: editedId = dogBeingEdited ? dogBeingEdited?.id : null;

  async function onNewDogAdded(newDogData) {
    resetSuccessMessagesAndFetchData();
    newDogName = newDogData.name;
  }

  async function onDogUpdated(newDogData) {
    resetSuccessMessagesAndFetchData();
    editedDogName = newDogData.name;
  }

  function onDogDeleted(deletedDogData) {
    resetSuccessMessagesAndFetchData();
    deletedDogName = deletedDogData.name;
  }

  async function resetSuccessMessagesAndFetchData() {
    dogBeingEdited = null;
    isAddingDog = false;
    newDogName = "";
    editedDogName = "";
    deletedDogName = "";

    const res = await fetch("/hunder.json");
    if (res.ok) {
      dogList = await res.json();
    }
  }

  function containsCaseless(s1, s2) {
    return s1.toLowerCase().includes(s2.toLowerCase());
  }
</script>

<h1>Hunder - admin</h1>

<a href="/admin/utstillinger" style="margin-top: 0.5rem;"
  >Til utstillinger-admin</a
>

{#if isAddingDog}
  <DogEditor
    isNewDog
    onCancel={() => (isAddingDog = false)}
    onFinish={onNewDogAdded}
    saveHttpMethod="POST"
    saveUrl="/admin/hunder.json"
  />
{:else}
  <button
    style="margin-top: 1.5rem;"
    on:click={() => (isAddingDog = true)}
    disabled={dogBeingEdited}
  >
    Ny hund
  </button>
{/if}

{#if editedDogName || newDogName || deletedDogName}
  <InformationBox
    variant="success"
    margin="1rem 0 0 0"
    text={`Hund ${editedDogName || newDogName || deletedDogName} ${
      editedDogName ? "oppdatert" : newDogName ? "lagt til" : "slettet"
    }`}
  />
{/if}

<Input
  type="text"
  title="Søk etter hund"
  value={searchText}
  onChange={(newVal) => (searchText = newVal)}
  width="16rem"
  margin="1.5rem 0 1rem 0"
/>

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
        <tr
          class={dog.name === newDogName || dog.name === editedDogName
            ? "updated-dog-row"
            : ""}
        >
          <td>
            <button
              on:click={() => (dogBeingEdited = { ...dog })}
              disabled={isAddingDog}
            >
              Rediger
            </button>
          </td>

          <td>
            <a href={`/hunder/${dog.id}`}>
              {dog.name}
            </a>
          </td>

          <td>
            <p>{dog.nkkId}</p>
          </td>

          <td>
            <p>{dog.gender}</p>
          </td>

          <td>
            <p>{dog.titles}</p>
          </td>

          <td>
            {#if dog.fatherTitles}
              <p>{dog.fatherTitles}</p>
            {/if}
            <p>{dog.fatherName}</p>
            <p>{dog.fatherId}</p>
          </td>

          <td>
            {#if dog.motherTitles}
              <p>{dog.motherTitles}</p>
            {/if}
            <p>{dog.motherName}</p>
            <p>{dog.motherId}</p>
          </td>

          <td>
            <a href={dog.pedigreeDbLink} target="_blank">{dog.pedigreeDbLink}</a
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

{#if dogBeingEdited}
  <div class="modal-backdrop" on:click={() => (dogBeingEdited = null)}>
    <DogEditor
      dog={dogBeingEdited}
      isNewDog={false}
      onCancel={() => (dogBeingEdited = null)}
      onFinish={onDogUpdated}
      onDelete={onDogDeleted}
      saveUrl={`/admin/hunder/${dogBeingEdited.id}.json`}
      saveHttpMethod="PATCH"
      isModal
    />
  </div>
{/if}

<style>
  td,
  th {
    vertical-align: middle;
  }

  .updated-dog-row {
    background-color: var(--successColorMedium);
  }

  .modal-backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
  .modal-backdrop:hover {
    cursor: pointer;
  }
</style>
