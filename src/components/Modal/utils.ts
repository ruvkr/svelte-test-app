import type { TransitionConfig } from 'svelte/transition';
import { quartInOut } from 'svelte/easing';

export type DimensionConfigs = {
  ratio?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  gapHorizontal?: number;
  gapVertical?: number;
};

export const getCalculatedDimensionStyles = ({
  ratio = 1,
  marginHorizontal = 0,
  marginVertical = 0,
  gapHorizontal = 0,
  gapVertical = 0,
}: DimensionConfigs = {}) => {
  const width = `calc(100vw - ${gapHorizontal}px)`;
  const maxHeight = `calc(100vh - ${gapVertical}px)`;
  const height = `calc(${100 / ratio}vw + ${marginVertical - (gapHorizontal + marginHorizontal) / ratio}px)`;
  const maxWidth = `calc(${100 * ratio}vh + ${marginHorizontal - (gapVertical + marginVertical) * ratio}px)`;
  return { width, maxHeight, height, maxWidth };
};

export const flip = (
  node: HTMLDivElement,
  { duration = 1000, targetLayoutId }: { duration?: number; targetLayoutId?: string } = {}
): TransitionConfig => {
  let originElement: HTMLElement | null;

  if (!targetLayoutId || !(originElement = document.querySelector(`[data-layoutid="${targetLayoutId}"]`))) {
    return {
      duration,
      easing: quartInOut,
      css: fallbackCss,
    };
  }

  const first = originElement.getBoundingClientRect();
  const last = node.getBoundingClientRect();
  const x = first.x - last.x;
  const y = first.y - last.y;
  const scaleX = 1 - first.width / last.width;
  const scaleY = 1 - first.height / last.height;

  return {
    duration,
    easing: quartInOut,
    css: (t, u) => {
      return `
        transform-origin: 0% 0%;
        transform: translate(${x * u}px, ${y * u}px) scale(${1 - scaleX * u}, ${1 - scaleY * u}); 
      `;
    },
  };
};

const fallbackCss: TransitionConfig['css'] = (t, u) => {
  return `
    transform-origin: 50% 50%;
    transform: scale(${1.0 - 0.5 * u});
    opacity: ${t};
  `;
};
