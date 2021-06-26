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
