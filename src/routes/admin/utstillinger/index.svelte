<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch("/utstillinger.json");

    if (res.ok) {
      const contestList = await res.json();
      return {
        props: { contestList },
      };
    }

    return {
      props: { isError: true },
    };
  };
</script>

<script>
  import ContestEditor from "$lib/contestEditor.svelte";

  import InformationBox from "$lib/informationBox.svelte";
  import Input from "$lib/input.svelte";

  export let contestList;

  let searchText = "";
  let contestBeingEdited = null;
  let isAddingContest = false;

  let newContestName = "";
  let editedContestName = "";
  let deletedContestName = "";

  $: filteredContestList = searchText
    ? contestList.filter((contest) =>
        containsCaseless(contest.name, searchText)
      )
    : contestList;

  async function onNewContestAdded(newContestData) {
    resetSuccessMessagesAndFetchData();
    newContestName = newContestData.name;
  }

  async function onContestUpdated(newContestData) {
    resetSuccessMessagesAndFetchData();
    editedContestName = newContestData.name;
  }

  function onContestDeleted(deletedContestData) {
    resetSuccessMessagesAndFetchData();
    deletedContestName = deletedContestData.name;
  }

  async function resetSuccessMessagesAndFetchData() {
    contestBeingEdited = null;
    isAddingContest = false;
    newContestName = "";
    editedContestName = "";
    deletedContestName = "";

    const res = await fetch("/utstillinger.json");
    if (res.ok) {
      contestList = await res.json();
    }
  }

  function containsCaseless(s1, s2) {
    return s1.toLowerCase().includes(s2.toLowerCase());
  }
</script>

<div style="margin: auto; display: flex; flex-direction: column;">
  <h1>Utstillinger - admin</h1>

  <a href="/admin/hunder" style="margin-top: 0.5rem;">Til hunder-admin</a>

  {#if isAddingContest}
    <ContestEditor
      isNewItem
      onCancel={() => (isAddingContest = false)}
      onFinish={onNewContestAdded}
      saveHttpMethod="POST"
      saveUrl="/admin/utstillinger.json"
    />
  {:else}
    <button
      style="margin-top: 1.5rem;"
      on:click={() => (isAddingContest = true)}
      disabled={contestBeingEdited}
    >
      Ny utstilling
    </button>
  {/if}

  {#if editedContestName || newContestName || deletedContestName}
    <InformationBox
      variant="success"
      margin="1rem 0 0 0"
      text={`Utstilling ${
        editedContestName || newContestName || deletedContestName
      } ${
        editedContestName
          ? "oppdatert"
          : newContestName
          ? "lagt til"
          : "slettet"
      }`}
    />
  {/if}

  <Input
    type="text"
    title="Søk etter utstilling"
    value={searchText}
    onChange={(newVal) => (searchText = newVal)}
    width="16rem"
    margin="1.5rem 0 1rem 0"
  />
</div>

{#if filteredContestList}
  <table style="margin-top: 1rem;">
    <thead>
      <tr>
        <th />
        <th />
        <th>Navn</th>
        <th>Dato</th>
        <th>Hunder</th>
        <th>Sted</th>
        <th>Vert</th>
        <th>Dommer</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredContestList as contest}
        <tr
          class={contest.name === newContestName ||
          contest.name === editedContestName
            ? "updated-row"
            : ""}
        >
          <td>
            <a href={`/admin/utstillinger/${contest.id}`}>
              <button disabled={isAddingContest}> Administrer </button>
            </a>
          </td>

          <td>
            <button
              on:click={() => (contestBeingEdited = { ...contest })}
              disabled={isAddingContest}
            >
              Rediger
            </button>
          </td>

          <td>
            <a href={`/utstillinger/${contest.id}`}>
              {contest.name}
            </a>
          </td>

          <td>
            <p>{contest.date}</p>
          </td>

          <td>
            <p>{contest.numberOfDogs}</p>
          </td>

          <td>
            <p>{contest.location}</p>
          </td>

          <td>
            <p>{contest.host}</p>
          </td>

          <td>
            <p>{contest.judge}</p>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

{#if contestBeingEdited}
  <div class="modal-backdrop" on:click={() => (contestBeingEdited = null)}>
    <ContestEditor
      contest={contestBeingEdited}
      isNewDog={false}
      onCancel={() => (contestBeingEdited = null)}
      onFinish={onContestUpdated}
      onDelete={onContestDeleted}
      saveUrl={`/admin/utstillinger/${contestBeingEdited.id}.json`}
      saveHttpMethod="PUT"
      isModal
    />
  </div>
{/if}

<style>
  td,
  th {
    vertical-align: middle;
  }

  .updated-row {
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
