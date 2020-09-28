<script>
  import Dots from './dots-horizontal.svg';

  let opened = false;

  const toggleOpen = () => {
    opened = !opened;
  };
</script>

<div>
  <button on:click={toggleOpen} class:opened>
    <div>
      <Dots fill="inherit" width="100%" height="100%" />
    </div>
  </button>
  <div />
</div>

<style type="text/scss">
  button {
    font: inherit;
    padding: 8px;
    margin: 0;
    background-color: transparent;
    fill: var(--col2);
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 300ms ease-in-out;
    div {
      width: 24px;
      height: 24px;
      transition: transform 150ms ease-in-out;
    }
    &.opened {
      background-color: rgba(var(--col2_rgb), 0.2);
      transition: background-color 300ms ease-in-out;
    }
    &.opened div {
      transform: rotate(90deg);
      transition: transform 150ms ease-in-out;
    }
    &:hover:not(:disabled),
    &:focus {
      outline: none;
      background-color: rgba(var(--col2_rgb), 0.2);
      transition: background-color 300ms ease-in-out;
    }
  }
</style>
