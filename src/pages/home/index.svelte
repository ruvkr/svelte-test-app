<script lang="ts">
  import Masonry from '../../components/Masonry/index.svelte';
  import GalleryCard from '../../components/cards/GalleryCard/index.svelte';
  import { images } from './images';
</script>

<Masonry dataArray={images} component={GalleryCard} />

<style lang="scss">
  //
</style>
