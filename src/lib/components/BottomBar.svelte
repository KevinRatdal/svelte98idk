<script>
  import { programs, windowFocusOrder, lastFocused } from '$lib/stores';
  import timer from '$lib/timer';
  /**
   * @param {import("$lib/stores").Program}program
   */
  const handleProgramClick = (program) => () => {
    if (program.minimized) {
      lastFocused.set(program.windowUUID);
      program.minimized = !program.minimized;
    } else if ($lastFocused === program.windowUUID) {
      lastFocused.set(null);
      program.minimized = !program.minimized;
    } else {
      lastFocused.set(program.windowUUID);
    }
  };



  const clock = timer()
</script>

<div class="bottomBar">
  <button class="startButton">start</button>
  <div class="divider"></div>
  <div class="stuffs">
    {#each $programs as program}
      <button
        class="appButton"
        class:appButtonMinimized={program.minimized}
        class:appButtonSelected={$lastFocused === program.windowUUID}
        on:click={handleProgramClick(program)}
      >
        {program.title}
      </button>
    {/each}
  </div>
  <div class="divider"></div>
  <div class="statusDivider">
    <p style="font-size: 9px; padding-inline: 8px; width: 32px">{$clock}</p>
  </div>
</div>

<style>
  .startButton {
    padding-inline: 10px;
    min-width: unset;
  }
  .bottomBar {
    -webkit-font-smoothing: none;
    font-family: 'Pixelated MS Sans Serif', Arial;
    font-size: 11px;
    background: silver;
    box-shadow:
      inset 0px 1px silver,
      inset 0px 2px white;
    padding: 2px;
    padding-top: 4px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: grid;
    grid-template: auto / auto auto 1fr auto auto;
    gap: 2px;
    z-index: 999;
  }
  .divider {
    box-shadow:
      inset 1px 0px grey,
      inset 2px 0px white;
    height: 100%;
    width: 2px;
  }

  .stuffs {
    display: flex;
    gap: 4px;
  }

  .appButton:focus {
    outline: unset;
  }
  .appButtonSelected {
    box-shadow:
      inset -1px -1px #fff,
      inset 1px 1px #0a0a0a,
      inset -2px -2px #dfdfdf,
      inset 2px 2px grey;
    text-shadow: 1px 1px #222;
  }

  .statusDivider {
    box-shadow:
      inset -1px -1px white,
      inset 1px 1px grey;
    padding: 2px;
    padding-inline: 2px;
    display: flex;
    align-items: center;
    /* height: 100% */
  }
</style>
