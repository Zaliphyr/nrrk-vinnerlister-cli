<script>
  import DogShowList from "$lib/dogShowList.svelte";
  import WinnerList from "$lib/winnerList.svelte";

  const currentYear = new Date().getFullYear();
  let year = currentYear;

  function setYear(newYear) {
    if (newYear <= currentYear) {
      year = newYear;
    }
  }
</script>

<h1>BelloRosarios Rhodesian ridgeback vinnerlister</h1>

<div class="year-nav">
  <button on:click={() => setYear(year - 1)}> prev </button>
  <h2 style="width: 4.5rem; text-align: center;">
    {year}
  </h2>
  <button on:click={() => setYear(year + 1)} disabled={year >= currentYear}>
    next
  </button>
</div>

<WinnerList />

<DogShowList {year} />

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
