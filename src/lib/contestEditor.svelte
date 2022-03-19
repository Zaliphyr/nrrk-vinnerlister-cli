<script>
  import Input from "$lib/input.svelte";
  import InformationBox from "./informationBox.svelte";

  export let saveHttpMethod;
  export let saveUrl;
  export let onCancel;
  export let onFinish;
  export let onDelete;
  export let isNewItem;
  export let isModal = false;
  export let contest = {
    name: "",
    date: new Date().toISOString().substring(0, 10),
    numberOfDogs: 0,
    location: "",
    host: "",
    judge: "",
  };

  let errorFields = [];
  let errorMessage = "";
  let isDeleting = false;

  const requiredFields = [
    { fieldName: "name", displayName: "Navn" },
    { fieldName: "date", displayName: "Dato" },
    { fieldName: "numberOfDogs", displayName: "Antall hunder" },
    { fieldName: "location", displayName: "Sted" },
    { fieldName: "host", displayName: "Vert" },
    { fieldName: "judge", displayName: "Dommer" },
  ];

  async function save() {
    let isFieldErr = checkFields();
    if (isFieldErr) {
      return;
    }

    const res = await fetch(saveUrl, {
      method: saveHttpMethod,
      body: JSON.stringify(contest),
    });
    if (res.ok) {
      onFinish(contest);
    } else {
      errorMessage = `Det skjedde en feil ved lagring av utstilling. Feilkode ${res.status}.`;
    }
  }

  async function deleteContest() {
    const res = await fetch(`/admin/utstillinger/${contest.id}.json`, {
      method: "DELETE",
    });
    if (res.ok) {
      onDelete(contest);
    } else {
      errorMessage = `Det skjedde en feil ved lagring av utstilling. Feilkode ${res.status}.`;
    }
  }

  function checkFields() {
    let fullErrorFields = [];

    requiredFields.forEach((field) => {
      if (!contest[field.fieldName]) {
        fullErrorFields.push(field);
      }
    });

    if (fullErrorFields.length > 0) {
      errorMessage = `Felt mangler: ${fullErrorFields
        .map((errField) => errField.displayName)
        .join(", ")}`;
    }

    errorFields = fullErrorFields.map((errField) => errField.fieldName);

    return fullErrorFields.length > 0;
  }

  function onContainerClick(e) {
    e.stopPropagation();
  }
</script>

<div class={`container ${isModal ? "modal" : ""}`} on:click={onContainerClick}>
  <h2>{isNewItem ? "Ny utstilling" : "Rediger utstilling"}</h2>

  <Input
    type="text"
    title="Navn"
    value={contest.name}
    onChange={(newVal) => (contest.name = newVal)}
    width="16rem"
    error={errorFields.includes("name")}
  />

  <input
    type="date"
    bind:value={contest.date}
  />

  <Input
    type="number"
    title="Antall hunder"
    value={contest.numberOfDogs}
    onChange={(newVal) => (contest.numberOfDogs = newVal)}
    width="8rem"
    error={errorFields.includes("numberOfDogs")}
  />

  <Input
    type="text"
    title="Sted"
    value={contest.location}
    onChange={(newVal) => (contest.location = newVal)}
    error={errorFields.includes("location")}
    width="12rem"
  />

  <Input
    type="text"
    title="Vert"
    value={contest.host}
    onChange={(newVal) => (contest.host = newVal)}
    width="12rem"
    error={errorFields.includes("host")}
  />

  <Input
    type="text"
    title="Dommer"
    value={contest.judge}
    onChange={(newVal) => (contest.judge = newVal)}
    width="12rem"
    error={errorFields.includes("judge")}
  />

  {#if errorMessage}
    <InformationBox
      variant="error"
      margin="1rem 0"
      header="Feil"
      text={errorMessage}
    />
  {/if}

  {#if !isDeleting}
    <div class="horiz-flex-end">
      <button on:click={onCancel}> Avbryt </button>
      {#if !isNewItem}
        <button on:click={() => (isDeleting = true)}> Slett utstilling </button>
      {/if}
      <button on:click={save}> Lagre </button>
    </div>
  {:else}
    <p
      style="margin-bottom: 0.5rem; color: var(--errorColor); font-weight: bold;"
    >
      Er du sikker på at du vil slette utstillingen?
    </p>

    <div class="horiz-flex-end">
      <button on:click={deleteContest}> Ja, slett </button>
      <button on:click={() => (isDeleting = false)}> Nei, ikke slett </button>
    </div>
  {/if}
</div>

<style>
  .container {
    width: fit-content;
    padding: 2rem;
    margin: 1rem 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .horiz-wrap-flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .horiz-flex-end {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .modal {
    max-width: 90%;
    max-height: 90%;
    z-index: 2;
    box-sizing: border-box;
    overflow: auto;
  }
  .modal:hover {
    cursor: default;
  }
</style>
