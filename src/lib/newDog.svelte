<script>
  import Input from "$lib/input.svelte";
  import InformationBox from "./informationBox.svelte";

  export let onCancel;
  export let onFinish;

  let errorFields = [];
  let errorMessage = "";

  const requiredFields = [
    { fieldName: "name", displayName: "Navn" },
    { fieldName: "gender", displayName: "Kjønn" },
    { fieldName: "color", displayName: "Fargevar" },
    { fieldName: "fatherName", displayName: "Fars navn" },
    { fieldName: "motherName", displayName: "Mors navn" },
  ];

  let newDog = {
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

  async function save() {
    let isFieldErr = checkFields();
    if (isFieldErr) {
      return;
    }

    const res = await fetch(`/admin/hunder.json`, {
      method: "POST",
      body: JSON.stringify(newDog),
    });
    if (res.ok) {
      onFinish(newDog);
    } else {
      errorMessage = `Det skjedde en feil ved lagring av hund. Feilkode ${res.status}.`;
    }
  }

  function checkFields() {
    let fullErrorFields = [];

    requiredFields.forEach((field) => {
      if (!newDog[field.fieldName]) {
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
</script>

<div class="newDogContainer">
  <h2>Ny hund</h2>

  <div class="horiz-wrap-flex" style="gap: 1rem; margin: 2rem 0;">
    <Input
      type="text"
      title="Titler"
      value={newDog.titles}
      onChange={(newVal) => (newDog.titles = newVal)}
      width="8rem"
      error={errorFields.includes("titles")}
    />

    <Input
      type="text"
      title="Navn*"
      value={newDog.name}
      onChange={(newVal) => (newDog.name = newVal)}
      error={errorFields.includes("name")}
    />

    <Input
      type="text"
      title="ID"
      value={newDog.nkkId}
      onChange={(newVal) => (newDog.nkkId = newVal)}
      width="8rem"
      error={errorFields.includes("nkkId")}
    />
  </div>

  <Input
    type="text"
    title="Pedigree-lenke"
    value={newDog.pedigreeDbLink}
    onChange={(newVal) => (newDog.pedigreeDbLink = newVal)}
    error={errorFields.includes("pedigreeDbLink")}
  />

  <div
    style="margin: 2rem 0; gap: 1rem; align-items: center;"
    class="horiz-wrap-flex"
  >
    <p>Kjønn:</p>
    <label>
      <input type="radio" bind:group={newDog.gender} name="gender" value="M" />
      Hannhund
    </label>

    <label>
      <input type="radio" bind:group={newDog.gender} name="gender" value="F" />
      Tispe
    </label>
  </div>

  <div
    style="margin: 2rem 0; gap: 1rem; align-items: center;"
    class="horiz-wrap-flex"
  >
    <p>Fargevar:</p>
    <label>
      <input type="radio" bind:group={newDog.color} name="color" value="Brun" />
      Brun
    </label>

    <label>
      <input
        type="radio"
        bind:group={newDog.color}
        name="color"
        value="Rødbrun"
      />
      Rødbrun
    </label>

    <label>
      <input
        type="radio"
        bind:group={newDog.color}
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
      value={newDog.fatherTitles}
      onChange={(newVal) => (newDog.fatherTitles = newVal)}
      width="8rem"
      error={errorFields.includes("fatherTitles")}
    />

    <Input
      type="text"
      title="Fars navn*"
      value={newDog.fatherName}
      onChange={(newVal) => (newDog.fatherName = newVal)}
      error={errorFields.includes("fatherName")}
    />

    <Input
      type="text"
      title="Fars ID"
      value={newDog.fatherId}
      onChange={(newVal) => (newDog.fatherId = newVal)}
      width="8rem"
      error={errorFields.includes("fatherId")}
    />
  </div>

  <div class="horiz-wrap-flex" style="gap: 1rem; margin: 2rem 0;">
    <Input
      type="text"
      title="Mors titler"
      value={newDog.motherTitles}
      onChange={(newVal) => (newDog.motherTitles = newVal)}
      width="8rem"
      error={errorFields.includes("motherTitles")}
    />

    <Input
      type="text"
      title="Mors navn*"
      value={newDog.motherName}
      onChange={(newVal) => (newDog.motherName = newVal)}
      error={errorFields.includes("motherName")}
    />

    <Input
      type="text"
      title="Mors ID"
      value={newDog.motherId}
      onChange={(newVal) => (newDog.motherId = newVal)}
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

  <div class="horiz-flex-end">
    <button on:click={onCancel}> Avbryt </button>
    <button on:click={save}> Lagre </button>
  </div>
</div>

<style>
  .newDogContainer {
    width: fit-content;
    padding: 2rem;
    margin: 1rem 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
</style>
