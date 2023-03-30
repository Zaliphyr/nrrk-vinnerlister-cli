<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch("/hunder.json");

    if (res.ok) {
      const dogList = await res.json();
      const sortedDogList = dogList.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      return {
        props: { dogList: sortedDogList },
      };
    }

    return {
      props: { isError: true },
    };
  };
</script>

<script>
  export let dogList;
</script>

<h1>Alle hunder</h1>

{#if dogList.length}
  <table>
    <thead>
      <tr>
        <th>Hund</th>
      </tr>
    </thead>
    <tbody>
      {#each dogList as dog}
        <tr>
          <td>
            <a href={`/hunder/${dog.id}`}>
              {dog.name}
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p style="margin-top: 1rem;">
    Ingen hunder enda.
  </p>
{/if}
