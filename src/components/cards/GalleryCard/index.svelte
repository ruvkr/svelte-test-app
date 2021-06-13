<script lang="ts">
  export let _id: string;
  export let thumb: string;
  export let path: string;
  export let user_name: string;
  export let user_url: string;
  export let photo_url: string;
</script>

<div>
  <img src={thumb} alt="Photo by {user_name}" />
</div>

<style lang="scss">
  div {
    width: 100%;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    margin: 0;
  }
</style>
