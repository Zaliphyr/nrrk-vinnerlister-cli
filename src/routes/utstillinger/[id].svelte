<script context="module">
  export const load = async ({ fetch, params }) => {
    const res = await fetch(`/utstillinger/${params.id}.json`);
    if (res.ok) {
      const contest = await res.json();
      return {
        props: { contest },
      };
    }

    return {
      props: { isError: true },
    };
  };
</script>

<script>
  export let contest;
  export let isError;
</script>

{#if isError}
  <h1>Utstilling ikke funnet</h1>
{:else}
  <h1>{contest.name}</h1>

  <div class="contest-info">
    <p style="grid-column: span 2;">{contest.date}, {contest.location}</p>
    <p>Arrangør:</p>
    <p>{contest.host}</p>
    <p>Hunder:</p>
    <p>{contest.numberOfDogs}</p>
    <p>Dommer:</p>
    <p>{contest.judge}</p>
  </div>

  <h2>Resultater</h2>
  {#if contest.results?.length}
    <table>
      <thead>
        <tr>
          <th>Hund</th>
          <th>Resultat</th>
          <th>Poeng</th>
          <th>Kritikk</th>
        </tr>
      </thead>
      <tbody>
        {#each contest.results as result}
          <tr>
            <td>
              <a href={`/hunder/${result.dogId}`}>
                {result.dogName}
              </a>
            </td>
            <td>{result.result}</td>
            <td>{result.points}</td>
            <td>
              {#if result.critiqueLink}
                <a href={result.critiqueLink} target="_blank">Se kritikk</a>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    Ingen resultater enda
  {/if}
{/if}

<style>
  h1 {
    margin-bottom: 1rem;
  }
  h2 {
    margin-top: 2rem;
  }
  table,
  div {
    width: fit-content;
  }
  .contest-info {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;
  }
</style>
