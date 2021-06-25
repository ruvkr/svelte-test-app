<script lang="ts">
  import { Container, Column } from '../../components/MasonryGrid';
  import GalleryCard from '../../components/cards/GalleryCard/index.svelte';
  import { images } from './images';
  const clickHandler = (id: string) => console.log(id);
</script>

<main>
  <Container dataArray={images} let:dataColumns>
    {#each dataColumns as column, i (i)}
      <Column>
        {#each column as image (image._id)}
          <GalleryCard thumb={image.thumb} user_name={image.user_name} on:click={() => clickHandler(image._id)} />
        {/each}
      </Column>
    {/each}
  </Container>
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
