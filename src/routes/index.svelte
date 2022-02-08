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
  import DogShowList from "$lib/contestList.svelte";
  import WinnerList from "$lib/winnerList.svelte";

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
      console.log(winnerList);
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

<h1>BelloRosarios Rhodesian ridgeback vinnerlister</h1>

<div class="year-nav">
  <button on:click={() => setYear(year - 1)}> prev </button>
  <h2 style="width: 4.5rem; text-align: center;">
    {year}
  </h2>
  <button on:click={() => setYear(year + 1)} disabled={year >= todayYear}>
    next
  </button>
</div>

{#if winnerList}
  <WinnerList dogs={winnerList.topList} {year} />

  <DogShowList {year} contests={winnerList.contests} />
{:else}
  <p>Henter data</p>
{/if}

<style>
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
</style>
