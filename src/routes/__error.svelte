<script context="module">
  export function load({ status }) {
    return {
      props: {
        isNotFound: status === 404,
      },
    };
  }
</script>

<script>
  export let isNotFound;

  import { page } from "$app/stores";
  const id = $page.params.id;

  let resourceName;
  if ($page.url.pathname.startsWith("/hunder/")) {
    resourceName = "Hund";
  } else if ($page.url.pathname.startsWith("/utstillinger/")) {
    resourceName = "Utstilling";
  }
</script>

{#if isNotFound}
  {#if resourceName}
    <h1>{resourceName} ikke funnet</h1>
    <p>Fant ingen {resourceName.toLowerCase()} med system-id {id}</p>
  {:else}
    <h1>Ikke funnet</h1>
    <p>Fant ikke den etterspurte ressursen</p>
  {/if}
{:else}
  <h1>Noe gikk galt</h1>
  <p>Kontakt support osv TODO</p>
{/if}
