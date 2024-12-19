<script>
  import { lastFocused } from '$lib/stores';
  import HomeIcon from '$lib/components/HomeIcon.svelte';
  import BottomBar from '$lib/components/BottomBar.svelte';

  // @ts-ignore
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('mainWrapper')) {
      lastFocused.set(null);
    }
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="mainWrapper" on:mousedown={handleOutsideClick}>
  <HomeIcon />
  <slot />
  <BottomBar />
</div>

<style>
  .mainWrapper {
    height: 100svh;
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
