<script context="module">
  const currentYear = new Date().getFullYear();

  export const load = async ({ fetch }) => {
    const winnerListRes = await fetch(`/${currentYear}.json`);

    if (!winnerListRes.ok) {
      return {
        status: winnerListRes.status,
        error: winnerListRes.error,
      };
    }

    const winnerList = await winnerListRes.json();

    return {
      props: { resultsByYear: { [currentYear]: winnerList } },
    };
  };
</script>

<script>
  import ContestList from '$lib/contestList.svelte';
  import WinnerList from '$lib/winnerList.svelte';

  const todayYear = new Date().getFullYear();
  let year = todayYear;

  export let resultsByYear;
  let winnerList = resultsByYear[todayYear];

  async function setYear(newYear) {
    if (newYear <= todayYear) {
      year = newYear;
    }
    if (newYear in resultsByYear) {
      winnerList = resultsByYear[newYear];
    } else {
      winnerList = null;
      const newWinnerList = await getYearData(newYear);
      winnerList = newWinnerList;
      resultsByYear[newYear] = newWinnerList;
    }
  }

  async function getYearData() {
    const winnerListRes = await fetch(`/${year}.json`);

    if (!winnerListRes.ok) {
      return {
        status: winnerListRes.status,
        error: winnerListRes.error,
      };
    }

    return winnerListRes.json();
  }
</script>

<h1>Rhodesian ridgeback vinnerlister</h1>

<div class="year-nav">
  <button on:click={() => setYear(year - 1)}> forrige </button>
  <h2 style="width: 4.5rem; text-align: center;">
    {year}
  </h2>
  <button on:click={() => setYear(year + 1)} disabled={year >= todayYear}> neste </button>
</div>

{#if winnerList}
  <div class="winner-list-container scrollable">
    <WinnerList dogs={winnerList.topList.male} {year} header="Vinnerliste hannhunder" />
    <WinnerList dogs={winnerList.topList.female} {year} header="Vinnerliste tisper" />
  </div>

  <p style="margin: 1.5rem 0 0 0">Kun de seks beste resultater er inkludert per hund</p>

  <ContestList {year} contests={winnerList.contests} marginTop="2rem" />
{:else}
  <p>Henter data</p>
{/if}

<style>
  .winner-list-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 2rem 0 1rem 0;
  }

  .scrollable {
    max-height: 600px;
    overflow-y: auto;
  }

  h1 {
    margin: 1rem auto 2rem auto;
  }

  .year-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
    gap: 1rem;
  }

  @media (max-width: 900px) {
    .winner-list-container {
      margin-top: 0;
      grid-template-columns: auto;
      margin-left: auto;
      margin-right: auto;
      width: fit-content;
    }

    h1 {
      margin: 1.5rem 0 1.5rem 0;
      font-size: 2rem;
    }

    .year-nav {
      margin: 0;
      margin-bottom: 1rem;
    }
  }
</style>
