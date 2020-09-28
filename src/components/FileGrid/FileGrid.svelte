<script>
  import { getRandomString } from '../../libs';
  import FileView from './FileView.svelte';

  // generating sample files
  let files = Array.apply(null, Array(10)).map((_, index) => ({
    id: getRandomString(7),
    name: 'file ' + index,
  }));
</script>

<div>
  {#each files as file}
    <FileView {file} />
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
  }
</style>
