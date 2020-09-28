import { parseToRgb } from 'polished';

const getRgb = hex => {
  const { red, green, blue } = parseToRgb(hex);
  return `${red}, ${blue}, ${green}`;
};

export const themes = {
  default: {
    name: 'Dark',
    colors: {
      col1: '#eeeeee',
      col1_rgb: getRgb('#eeeeee'),
      col2: '#00adb5',
      col2_rgb: getRgb('#00adb5'),
      col3: '#393e46',
      col3_rgb: getRgb('#393e46'),
      col4: '#222831',
      col4_rgb: getRgb('#222831'),
      col5: '#1b2028',
      col5_rgb: getRgb('#1b2028'),
      col6: '#48B14C',
      col6_rgb: getRgb('#48B14C'),
      col7: '#FED219',
      col7_rgb: getRgb('#FED219'),
      col8: '#F78828',
      col8_rgb: getRgb('#F78828'),
      col9: '#FA5456',
      col9_rgb: getRgb('#FA5456'),
    },
  },
};
