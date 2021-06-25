<script lang="ts">
  type T = $$Generic;
  export let columnWidth: number = 320;
  export let gap: number = 10;
  export let dataArray: T[] = [];

  let innerWidth = window.innerWidth;
  $: columns = Math.max(1, Math.floor(innerWidth / columnWidth));
  $: dataColumns = dataArray.reduce<T[][]>((acc, cur, i) => {
    const index = i % columns;
    acc[index] = [...acc[index], cur];
    return acc;
  }, new Array(columns).fill([]));
</script>

<svelte:window bind:innerWidth />
{#if dataColumns}
  <div style="--columns:{columns}; --gap:{gap}px;">
    <slot {dataColumns} />
  </div>
{/if}

<style lang="scss">
  $columns: var(--columns);
  $gap: var(--gap);

  div {
    display: grid;
    grid-template-columns: repeat($columns, 1fr);
    grid-gap: $gap;
  }
</style>
