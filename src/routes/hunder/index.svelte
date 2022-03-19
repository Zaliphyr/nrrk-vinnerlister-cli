<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch("/hunder.json");

    if (res.ok) {
      const dogList = await res.json();
      return {
        props: { dogList },
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
        <th>Ant. resultater</th>
        <th>Nyeste resultat</th>
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
          <td>Kommer</td>
          <td>Kommer</td>
          <!-- <td>{dog.numberOfResults}</td>
          <td>{dog.lastResultDate}</td> -->
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p style="margin-top: 1rem;">
    Ingen hunder enda.
  </p>
{/if}
