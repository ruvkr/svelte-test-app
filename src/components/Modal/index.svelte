<script lang="ts">
  import { portal, objToCssVars } from '../../utils';
  import { getCalculatedDimensionStyles } from './utils';
  export let show: boolean = false;
  export let ratio: number = 1;
  export let close: () => void | undefined;
  $: calculatedCssVars = objToCssVars(getCalculatedDimensionStyles({ ratio, gapHorizontal: 80, gapVertical: 80 }));
</script>

{#if show}
  <div use:portal={document.body} class="dom-container" data-name="modal-container">
    <div class="backdrop" on:click={close} />
    <div class="modal-wrapper">
      <div class="modal" style={calculatedCssVars} />
    </div>
  </div>
{/if}

<style lang="scss">
  $width: var(--width);
  $height: var(--height);
  $max-width: var(--maxWidth);
  $max-height: var(--maxHeight);

  .dom-container {
    position: relative;
    z-index: 100;
  }

  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .modal {
    width: $width;
    height: $height;
    max-width: $max-width;
    max-height: $max-height;
    background-color: #000000;
    outline: 1px solid red;
    pointer-events: all;
  }
</style>
