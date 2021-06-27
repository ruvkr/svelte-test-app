<script lang="ts">
  import type { ImageData } from './images';
  import { Container, Column } from '../../components/MasonryGrid';
  import GalleryCard from '../../components/cards/GalleryCard/index.svelte';
  import Modal from '../../components/Modal/index.svelte';
  import { images } from './images';

  let selectedImageData: ImageData | null = null;
  // let flipTargetLayoutId: string | undefined = undefined;
  let ratio: number = 1;

  const clickHander = (imageData: ImageData | null) => {
    if (imageData) {
      selectedImageData = imageData;
      // flipTargetLayoutId = `gallery-card-${imageData.id}`;
      ratio = imageData.size.width / imageData.size.height;
    } else {
      selectedImageData = null;
      ratio = 1;
    }
  };
</script>

<main>
  <Container dataArray={images} let:dataColumns>
    {#each dataColumns as column, i (i)}
      <Column>
        {#each column as image (image.id)}
          <GalleryCard
            layoutId={`gallery-card-${image.id}`}
            thumb={image.thumb}
            user_name={image.user_name}
            on:click={() => clickHander(image)}
          />
        {/each}
      </Column>
    {/each}
  </Container>

  <Modal
    {ratio}
    flipTargetLayoutId={selectedImageData ? `gallery-card-${selectedImageData.id}` : undefined}
    show={selectedImageData != null}
    close={() => clickHander(null)}
  >
    <img src={selectedImageData.thumb} alt="Photo by {selectedImageData.user_name}" />
  </Modal>
</main>

<style lang="scss">
  main {
    padding: 10px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #000;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
  }
</style>
