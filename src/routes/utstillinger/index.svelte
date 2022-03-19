<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch(`/utstillinger.json`);
    if (res.ok) {
      const contests = await res.json();
      return {
        props: { contests },
      };
    }

    return {
      props: { isError: true },
    };
  };
</script>

<script>
  import ContestList from "$lib/contestList.svelte";

  export let contests;
</script>

<h1>Alle utstillinger</h1>

<ContestList {contests} marginTop="1rem"/>
