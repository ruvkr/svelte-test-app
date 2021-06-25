<div><slot /></div>

<style lang="scss">
  $gap: var(--gap);

  div {
    display: grid;
    grid-gap: $gap;
    grid-auto-rows: max-content;
  }
</style>
