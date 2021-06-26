<script lang="ts">
  import type { ImageData } from './images';
  import { Container, Column } from '../../components/MasonryGrid';
  import GalleryCard from '../../components/cards/GalleryCard/index.svelte';
  import Modal from '../../components/Modal/index.svelte';
  import { images } from './images';

  let selectedImageData: ImageData | null = null;
  let ratio: number | undefined;
  $: if (selectedImageData) ratio = selectedImageData.size.width / selectedImageData.size.height;
  const clickHandler = (imageData: ImageData) => (selectedImageData = imageData);
</script>

<main>
  <Container dataArray={images} let:dataColumns>
    {#each dataColumns as column, i (i)}
      <Column>
        {#each column as image (image.id)}
          <GalleryCard thumb={image.thumb} user_name={image.user_name} on:click={() => clickHandler(image)} />
        {/each}
      </Column>
    {/each}
  </Container>
  <Modal show={selectedImageData != null} close={() => (selectedImageData = null)} {ratio} />
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
