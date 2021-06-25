<script lang="ts">
  export let thumb: string;
  export let user_name: string;
</script>

<div class="container" title="Photo by {user_name}" on:click>
  <img class="image" src={thumb} alt="Photo by {user_name}" />
  <div class="info">
    <div class="credit">Photo by</div>
    <div class="user-name">{user_name}</div>
  </div>
</div>

<style lang="scss">
  .container {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    &:hover {
      .image {
        filter: brightness(80%);
        transform: scale(1.1);
      }
      .user-name {
        transform: scale(1.1);
      }
    }
  }

  .image {
    display: block;
    width: 100%;
    height: auto;
    margin: 0;
    transition: all 300ms ease-in-out;
  }

  .info {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 16px 16px 32px 16px;
    background-image: linear-gradient(0deg, transparent, #00000080);
    display: grid;
    gap: 8px;
  }

  .credit {
    color: #dbdbdb;
  }

  .user-name {
    color: #ffffff;
    font-size: 1.5rem;
    transform-origin: left top;
    transition: transform 300ms ease-in-out;
  }
</style>
