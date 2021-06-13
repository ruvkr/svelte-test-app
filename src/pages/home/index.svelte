<script lang="ts">
  import Masonry from '../../components/Masonry/index.svelte';
  import GalleryCard from '../../components/cards/GalleryCard/index.svelte';
  import { images } from './images';
</script>

<main>
  <Masonry dataArray={images} component={GalleryCard} />
</main>

<style lang="scss">
  main {
    padding: 10px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #000;
  }
</style>
