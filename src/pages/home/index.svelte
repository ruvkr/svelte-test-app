<script lang="ts">
  import { images } from './images';
  import type { ImageData } from './images';
  const columnWidth = 320;
  let innerWidth = window.innerWidth;

  // reactive values
  $: columns = Math.floor(innerWidth / columnWidth);
  $: imageColumns = images.reduce<ImageData[][]>((acc, cur, i) => {
    const index = i % columns;
    acc[index] = [...acc[index], cur];
    return acc;
  }, new Array(columns).fill([]));

  console.log(imageColumns);
  $: console.log(imageColumns);
</script>

<svelte:window bind:innerWidth />

<main>
  {#if imageColumns}
    <div class="container" style="--columns:{columns}">
      {#each imageColumns as column, i (i)}
        <div class="column">
          {#each column as image (image._id)}
            <img alt={image._id} src={image.thumb} />
          {/each}
        </div>
      {/each}
    </div>
  {:else}
    <p>Working</p>
  {/if}
</main>

<style lang="scss">
  $columns: var(--columns);
  $gap: 10px;

  main {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: $gap;
    backface-visibility: hidden;
  }

  .container {
    display: grid;
    grid-template-columns: repeat($columns, 1fr);
    grid-gap: $gap;
  }

  .column {
    display: grid;
    grid-gap: $gap;
    grid-auto-rows: max-content;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    margin: 0;
  }
</style>
