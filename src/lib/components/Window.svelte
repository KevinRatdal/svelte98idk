<script>
  import { windowFocusOrder, programs, visibleFocusOrder } from '$lib/stores.js';
  import { onDestroy } from 'svelte';
  import { move, resize } from '$lib/actions.js';

  export let left = 100;
  export let top = 100;

  export let title = '';
  export let resizable = true;

  const windowUUID = crypto.randomUUID();

  programs.update((prevPrograms) => {
    const progData = {
      title: title,
      name: '<placeholder_name>',
      windowUUID: windowUUID,
      minimized: false
    }
    return [...prevPrograms, progData]
  })

  windowFocusOrder.update((wfo) => {
    return [...wfo.filter((w) => !(w === windowUUID)), windowUUID];
  });

  let moving = false;

  /**
   * @param {MouseEvent} e
   */
  function onMouseDown(e) {
    // @ts-ignore
    if (e?.target?.type === 'submit') return;

    moving = true;
  }

  function handleWindowFocus() {
    windowFocusOrder.update((wfo) => {
      if (wfo.at(-1) === windowUUID) return wfo;
      return [...wfo.filter((w) => !(w === windowUUID)), windowUUID];
    });
  }

  /**
   * @param {MouseEvent} e
   */
  function onMouseMove(e) {
    if (moving) {
      left += e.movementX;
      top += e.movementY;
    }
  }

  function onMouseUp() {
    moving = false;
  }

  $:program = $programs.find(p => p.windowUUID === windowUUID)

  function handleMinimize() {
    if (!program) return;
    program.minimized = !program.minimized
    $programs = $programs
  }

  function handleMaximize() {}
  function handleClose() {}

  onDestroy(() => {
    windowFocusOrder.update((wfo) => {
      return wfo.filter((w) => !(w === windowUUID));
    });
    programs.update(progs => {
      return progs.filter(prog => !(prog.windowUUID === windowUUID))
    })
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="window hide-grabber"
  style:left="{left}px"
  style:top="{top}px"
  style:z-index={$visibleFocusOrder.indexOf(windowUUID)}
  style:visibility={program?.minimized ? 'hidden' : 'visible'}
  on:mousedown={handleWindowFocus}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="title-bar" class:inactive={$visibleFocusOrder.at(-1) !== windowUUID} on:mousedown={onMouseDown}>
    <div class="title-bar-text">{title} {String(program?.minimized)}</div>
    <div class="title-bar-controls">
      <button on:click|preventDefault={handleMinimize} aria-label="Minimize"></button>
      <button on:click|preventDefault={handleMaximize} aria-label="Maximize"></button>
      <button on:click|preventDefault={handleClose} aria-label="Close"></button>
    </div>
  </div>
  <div
    class="window-body"
    use:move={resizable}
    use:resize={resizable}
    style:overflow={resizable ? 'auto' : 'hidden'}
  >
    <slot />
  </div>
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
  .window {
    position: absolute;
    display: flex;
    flex-direction: column;
  }
  .window-body {
    margin: 0;
    min-width: 100%;
    min-height: 40px;
  }
  .title-bar {
    user-select: none;
    cursor: drag;
  }

  :global(.grabber) {
    position: absolute;
    box-sizing: border-box;
  }

  :global(.grabber.right) {
    width: 5px;
    height: calc(100% - 10px);
    background: red;
    right: -2px;
    bottom: 10px;
    cursor: col-resize;
  }

  :global(.grabber.bottom) {
    height: 5px;
    width: calc(100% - 10px);
    background: orange;
    right: 10px;
    bottom: -3px;
    cursor: row-resize;
  }

  :global(.grabber.bottom-right) {
    height: 20px;
    width: 20px;
    background: green;
    bottom: -10px;
    right: -10px;
    cursor: se-resize;
    border-radius: 100%;
  }

  :global(.hide-grabber .grabber) {
    background: transparent !important;
    border: none !important;
  }

  :global(.grabber.selected) {
    border: solid 1px black;
  }
</style>
