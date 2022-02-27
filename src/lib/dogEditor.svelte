<script>
  import Input from "$lib/input.svelte";
  import InformationBox from "./informationBox.svelte";

  export let saveHttpMethod;
  export let saveUrl;
  export let onCancel;
  export let onFinish;
  export let onDelete;
  export let isNewDog;
  export let isModal = false;
  export let dog = {
    titles: "",
    name: "",
    nkkId: "",
    pedigreeDbLink: "",
    gender: "",
    color: "",
    fatherTitles: "",
    fatherName: "",
    fatherId: "",
    motherTitles: "",
    motherName: "",
    motherId: "",
  };

  let errorFields = [];
  let errorMessage = "";
  let isDeleting = false;

  const requiredFields = [
    { fieldName: "name", displayName: "Navn" },
    { fieldName: "gender", displayName: "Kjønn" },
    { fieldName: "color", displayName: "Fargevar" },
    { fieldName: "fatherName", displayName: "Fars navn" },
    { fieldName: "motherName", displayName: "Mors navn" },
  ];

  async function save() {
    let isFieldErr = checkFields();
    if (isFieldErr) {
      return;
    }

    const res = await fetch(saveUrl, {
      method: saveHttpMethod,
      body: JSON.stringify(dog),
    });
    if (res.ok) {
      onFinish(dog);
    } else {
      errorMessage = `Det skjedde en feil ved lagring av hund. Feilkode ${res.status}.`;
    }
  }

  async function deleteDog() {
    const res = await fetch(`/admin/hunder/${dog.id}.json`, {
      method: "DELETE",
    });
    if (res.ok) {
      onDelete(dog);
    } else {
      errorMessage = `Det skjedde en feil ved lagring av hund. Feilkode ${res.status}.`;
    }
  }

  function checkFields() {
    let fullErrorFields = [];

    requiredFields.forEach((field) => {
      if (!dog[field.fieldName]) {
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

<div
  class={`dog-container ${isModal ? "dog-modal" : ""}`}
  on:click={onContainerClick}
>
  <h2>{isNewDog ? "Ny hund" : `Rediger hund`}</h2>

  <div class="horiz-wrap-flex" style="gap: 1rem; margin: 2rem 0;">
    <Input
      type="text"
      title="Titler"
      value={dog.titles}
      onChange={(newVal) => (dog.titles = newVal)}
      width="8rem"
      error={errorFields.includes("titles")}
    />

    <Input
      type="text"
      title="Navn*"
      value={dog.name}
      onChange={(newVal) => (dog.name = newVal)}
      error={errorFields.includes("name")}
    />

    <Input
      type="text"
      title="ID"
      value={dog.nkkId}
      onChange={(newVal) => (dog.nkkId = newVal)}
      width="8rem"
      error={errorFields.includes("nkkId")}
    />
  </div>

  <Input
    type="text"
    title="Pedigree-lenke"
    value={dog.pedigreeDbLink}
    onChange={(newVal) => (dog.pedigreeDbLink = newVal)}
    error={errorFields.includes("pedigreeDbLink")}
  />

  <div
    style="margin: 2rem 0; gap: 1rem; align-items: center;"
    class="horiz-wrap-flex"
  >
    <p>Kjønn:</p>
    <label>
      <input type="radio" bind:group={dog.gender} name="gender" value="M" />
      Hannhund
    </label>

    <label>
      <input type="radio" bind:group={dog.gender} name="gender" value="F" />
      Tispe
    </label>
  </div>

  <div
    style="margin: 2rem 0; gap: 1rem; align-items: center;"
    class="horiz-wrap-flex"
  >
    <p>Fargevar:</p>
    <label>
      <input type="radio" bind:group={dog.color} name="color" value="Brun" />
      Brun
    </label>

    <label>
      <input type="radio" bind:group={dog.color} name="color" value="Rødbrun" />
      Rødbrun
    </label>

    <label>
      <input
        type="radio"
        bind:group={dog.color}
        name="color"
        value="Lysebrun"
      />
      Lysebrun
    </label>
  </div>

  <div class="horiz-wrap-flex" style="gap: 1rem; margin: 2rem 0;">
    <Input
      type="text"
      title="Fars titler"
      value={dog.fatherTitles}
      onChange={(newVal) => (dog.fatherTitles = newVal)}
      width="8rem"
      error={errorFields.includes("fatherTitles")}
    />

    <Input
      type="text"
      title="Fars navn*"
      value={dog.fatherName}
      onChange={(newVal) => (dog.fatherName = newVal)}
      error={errorFields.includes("fatherName")}
    />

    <Input
      type="text"
      title="Fars ID"
      value={dog.fatherId}
      onChange={(newVal) => (dog.fatherId = newVal)}
      width="8rem"
      error={errorFields.includes("fatherId")}
    />
  </div>

  <div class="horiz-wrap-flex" style="gap: 1rem; margin: 2rem 0;">
    <Input
      type="text"
      title="Mors titler"
      value={dog.motherTitles}
      onChange={(newVal) => (dog.motherTitles = newVal)}
      width="8rem"
      error={errorFields.includes("motherTitles")}
    />

    <Input
      type="text"
      title="Mors navn*"
      value={dog.motherName}
      onChange={(newVal) => (dog.motherName = newVal)}
      error={errorFields.includes("motherName")}
    />

    <Input
      type="text"
      title="Mors ID"
      value={dog.motherId}
      onChange={(newVal) => (dog.motherId = newVal)}
      width="8rem"
      error={errorFields.includes("motherId")}
    />
  </div>

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
      {#if !isNewDog}
        <button on:click={() => (isDeleting = true)}> Slett hund </button>
      {/if}
      <button on:click={save}> Lagre </button>
    </div>
  {:else}
    <p
      style="margin-bottom: 0.5rem; color: var(--errorColor); font-weight: bold;"
    >
      Er du sikker på at du vil slette hunden?
    </p>

    <div class="horiz-flex-end">
      <button on:click={deleteDog}> Ja, slett </button>
      <button on:click={() => (isDeleting = false)}> Nei, ikke slett </button>
    </div>
  {/if}
</div>

<style>
  .dog-container {
    width: fit-content;
    padding: 2rem;
    margin: 1rem 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: white;
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
  .dog-modal {
    max-width: 90%;
    max-height: 90%;
    z-index: 2;
    box-sizing: border-box;
    overflow: auto;
  }
  .dog-modal:hover {
    cursor: default;
  }
</style>
