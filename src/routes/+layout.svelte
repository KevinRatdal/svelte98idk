<script>

    import HomeIcon from "$lib/components/HomeIcon.svelte";
    import BottomBar from "$lib/components/BottomBar.svelte"
</script>
<div class="mainWrapper">
  <HomeIcon />
  <slot />
<BottomBar />

</div>

<style>
  .mainWrapper {
    height: 100%;
    outline: red solid 1px;
    background: linear-gradient(lightBlue, orange);
  }
  :root {
    margin: 0;
    padding: 0;
    height: 100svh;
    user-select: none;
  }
  :global(body) {
    overflow: hidden;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  :global(p, h1, h2, h3, h4, h5, h6) {
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
</style>
