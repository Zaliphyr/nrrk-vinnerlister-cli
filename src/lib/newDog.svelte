<script>
  import Input from "$lib/input.svelte";

  export let onCancel;
  export let onFinish;

  let newDog = {
    name: "",
    nkkId: "",
  };

  function save() {
    // TODO
    alert(JSON.stringify(newDog));
    onFinish();
  }
</script>

<div class="newDogContainer">
  <h2>Ny hund</h2>

  <Input
    type="text"
    title="Navn"
    value={newDog.name}
    onChange={(newVal) => (newDog.name = newVal)}
    margin="1.5rem 0"
  />

  <Input
    type="text"
    title="ID"
    value={newDog.nkkId}
    onChange={(newVal) => (newDog.nkkId = newVal)}
    margin="1.5rem 0"
  />

  <button style="margin-top: 1rem;" on:click={onCancel}> Avbryt </button>

  <button style="margin-top: 1rem;" on:click={save}> Lagre </button>
</div>

<style>
  .newDogContainer {
    width: fit-content;
    padding: 2rem;
    margin: 1rem 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
</style>
