<script lang="ts">
  async function fetchMovie() {
    const response = await fetch("/api/random-movie", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    return await response.json();
  }

  async function click() {
    const movie = await fetchMovie()
    console.table(movie);
  }
</script>

<button on:click={async () => await click()}>Movie</button>
