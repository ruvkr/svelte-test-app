<script>
  import { pannable } from '../../libs/pannable';
  import { Spring } from '../../libs/Spring';

  const start = -75;
  const end = 75;
  let x = start;
  let opened = false;

  const spring = new Spring({
    stiffness: 200,
    damping: 20,
    from: -75,
    to: 75,
    onUpdate: v => (x = v),
    onComplete: () => console.log('done'),
  });

  const startSpring = () => {
    spring.start();
  };

  const stopSpring = () => {
    spring.stop();
  };

  const panmoveHandler = event => {
    let dx = event.detail.x - event.detail.ox;
    if (opened) x = end + dx;
    else x = start + dx;
  };

  const panendHandler = event => {
    if (opened) {
      opened = false;
      x = start;
    } else {
      opened = true;
      x = end;
    }
  };
</script>

<main>
  <div
    class="sd"
    use:pannable
    on:panmove={panmoveHandler}
    on:panend={panendHandler}
    style="transform: translate3d({x}px, 0, 0)" />

  <div class="controls">
    <button on:click={startSpring}>Start</button>
    <button on:click={stopSpring}>Stop</button>
  </div>
</main>

<style type="text/scss">
  main {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sd {
    position: fixed;
    width: 150px;
    height: 150px;
    background-color: var(--col5);
  }

  .controls {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 8px;
  }

  button {
    padding: 8px;
    min-width: 100px;
    cursor: pointer;
  }
</style>
