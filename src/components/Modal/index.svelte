<script lang="ts">
  import { fade } from 'svelte/transition';
  import { portal, objToCssVars } from '../../utils';
  import { getCalculatedDimensionStyles, flip } from './utils';

  export let show: boolean = false;
  export let ratio: number = 1;
  export let close: (() => void) | undefined = undefined;
  export let flipTargetLayoutId: string | undefined = undefined;

  let targetLayoutId: string | undefined;
  let calculatedCssVars: string = '';
  
  $: if (show) {
    targetLayoutId = flipTargetLayoutId;
    calculatedCssVars = objToCssVars(getCalculatedDimensionStyles({ ratio, gapHorizontal: 0, gapVertical: 0 }));
  }
</script>

{#if show}
  <div use:portal={document.body} class="dom-container" data-name="modal-container">
    <div class="backdrop" transition:fade={{ duration: 500 }} on:click={() => close && close()} />
    <div class="modal-wrapper">
      <div
        class="modal"
        style={calculatedCssVars}
        in:flip={{ duration: 500, targetLayoutId }}
        out:flip={{ duration: 500, targetLayoutId }}
      >
        <slot />
      </div>
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
    pointer-events: all;
  }
</style>
