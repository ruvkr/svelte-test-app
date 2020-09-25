<script>
  import { onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { themes } from '../configs/themes.js';

  let theme = writable(themes.default);
  const styleElement = document.createElement('style');
  document.head.appendChild(styleElement);

  const addThemesToDocument = (theme = themes.default) => {
    let colors = '';
    for (const color in theme.colors)
      colors += `  --${color}: ${theme.colors[color]};\n`;
    styleElement.innerHTML = `:root {\n${colors}}`;
  };

  setContext('theme', {
    theme,
    themes,
    changeTheme: theme => {
      theme.set(theme);
      addThemesToDocument(theme);
    },
  });

  onMount(addThemesToDocument);
</script>

<slot />
