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
  export let contestList;

  let searchText = "";

  $: filteredContestList = searchText
    ? contestList.filter((contest) =>
        containsCaseless(contest.name, searchText)
      )
    : contestList;

  function containsCaseless(s1, s2) {
    return s1.toLowerCase().includes(s2.toLowerCase());
  }
</script>

<h1>Utstillinger - admin</h1>

<a href="/admin/hunder" style="margin-top: 0.5rem;">Til hund-admin</a>

<a href="/admin/utstillinger/ny">
  <button style="margin-top: 1rem;">Ny utstilling</button>
</a>

<p style="margin-top: 1rem; font-size: 1rem;">Søk etter utstilling</p>

<input type="text" bind:value={searchText} />

{#if filteredContestList}
  <table style="margin-top: 1rem;">
    <thead>
      <tr>
        <th>Data</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredContestList as contest}
        <tr>
          <td>
            {Object.entries(contest).map(
              (entr) => ` (${entr[0]}: ${entr[1]}) `
            )}
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
