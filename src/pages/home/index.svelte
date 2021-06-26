<script lang="ts">
  import type { ImageData } from './images';
  import { Container, Column } from '../../components/MasonryGrid';
  import GalleryCard from '../../components/cards/GalleryCard/index.svelte';
  import Modal from '../../components/Modal/index.svelte';
  import { images } from './images';

  let selectedImageData: ImageData | null = null;
  let selectedImageDom: HTMLElement | null = null;
  let ratio: number = 1;
</script>

<main>
  <Container dataArray={images} let:dataColumns>
    {#each dataColumns as column, i (i)}
      <Column>
        {#each column as image (image.id)}
          <GalleryCard
            thumb={image.thumb}
            user_name={image.user_name}
            onClick={dom => {
              selectedImageData = image;
              selectedImageDom = dom;
              ratio = image.size.width / image.size.height;
            }}
          />
        {/each}
      </Column>
    {/each}
  </Container>
  <Modal
    {ratio}
    show={selectedImageData != null}
    originElement={selectedImageDom}
    close={() => {
      selectedImageData = null;
      // selectedImageDom = null;
      ratio = 1;
    }}
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
