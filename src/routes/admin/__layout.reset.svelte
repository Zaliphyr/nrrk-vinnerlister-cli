<script>
  import Header from "$lib/header.svelte";
  import "../../styles/reset.css";
  import "../../styles/main.css";
</script>

<Header />

<main>
  <slot />
</main>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: fit-content;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 2.5rem;
  }
</style>
