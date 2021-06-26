<script lang="ts">
  import { quartInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import { portal, objToCssVars } from '../../utils';
  import { getCalculatedDimensionStyles } from './utils';

  export let show: boolean = false;
  export let ratio: number = 1;
  export let close: (() => void) | undefined = undefined;
  export let originElement: HTMLElement | undefined = undefined;
  $: calculatedCssVars = objToCssVars(getCalculatedDimensionStyles({ ratio, gapHorizontal: 0, gapVertical: 0 }));

  const flip = (node: HTMLDivElement, { duration = 1000 }: { duration?: number } = {}) => {
    const first = originElement.getBoundingClientRect();
    const last = node.getBoundingClientRect();
    const x = first.x - last.x;
    const y = first.y - last.y;
    const scaleX = 1 - first.width / last.width;
    const scaleY = 1 - first.height / last.height;

    return {
      duration,
      easing: quartInOut,
      css: (t: number, u: number) => {
        return `transform: translate(${x * u}px, ${y * u}px) scale(${1 - scaleX * u}, ${1 - scaleY * u});`;
      },
    };
  };
</script>

{#if show}
  <div use:portal={document.body} class="dom-container" data-name="modal-container">
    <div class="backdrop" transition:fade={{ duration: 500 }} on:click={() => close && close()} />
    <div class="modal-wrapper">
      <div class="modal" style={calculatedCssVars} in:flip={{ duration: 500 }} out:flip={{ duration: 500 }}>
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
    transform-origin: top left;
  }
</style>
