<script>
  import Menu from '../../components/Menu/Menu.svelte';
  import { pannable } from './pannable';

  let x = 100;
  let y = 100;

  const handlepan = event => {
    x = event.detail.x - event.detail.dx;
    y = event.detail.y - event.detail.dy;
  };
</script>

<main>
  <div
    use:pannable
    on:panmove={handlepan}
    on:panend={handlepan}
    style="top: {y}px; left: {x}px">
    <Menu />
  </div>
</main>

<style type="text/scss">
  main {
    padding: 1em;
  }

  div {
    position: fixed;
    width: 84px;
    height: 84px;
    background-color: var(--col5);
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(#000, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
