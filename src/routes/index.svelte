<script context="module">
  export const load = async ({ fetch }) => {
    const contestPromise = fetch(`/utstillinger.json`);
    const dogPromise = fetch("/hunder.json");

    const [contestRes, dogRes] = await Promise.all([
      contestPromise,
      dogPromise,
    ]);

    if (!contestRes.ok) {
      return {
        status: contestRes.status,
        error: contestRes.error,
      };
    }
    if (!dogRes.ok) {
      return {
        status: dogRes.status,
        error: dogRes.error,
      };
    }

    const contests = await contestRes.json();
    const dogs = await dogRes.json();

    return {
      props: { contests, dogs },
    };
  };
</script>

<script>
  import DogShowList from "$lib/contestList.svelte";
  import WinnerList from "$lib/winnerList.svelte";

  export let contests;
  export let dogs;

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

<WinnerList {dogs} />

<DogShowList {year} {contests} />

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
