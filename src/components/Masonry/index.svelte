<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  export let columnWidth: number = 320;
  export let gap: number = 10;
  export let dataArray: { _id: string }[] = [];
  export let component: typeof SvelteComponent;

  let innerWidth = window.innerWidth;
  $: columns = Math.max(1, Math.floor(innerWidth / columnWidth));
  $: dataColumns = dataArray.reduce<{ _id: string }[][]>((acc, cur, i) => {
    const index = i % columns;
    acc[index] = [...acc[index], cur];
    return acc;
  }, new Array(columns).fill([]));
</script>

<svelte:window bind:innerWidth />
{#if dataColumns}
  <div class="container" style="--columns:{columns}; --gap:{gap}px;">
    {#each dataColumns as column, i (i)}
      <div class="column">
        {#each column as data (data._id)}
          <svelte:component this={component} {...data} />
        {/each}
      </div>
    {/each}
  </div>
{/if}

<style lang="scss">
  $columns: var(--columns);
  $gap: var(--gap);

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
</style>
