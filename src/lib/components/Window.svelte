<script>
    import ScalableContent from "./ScalableContent.svelte";

  export let left = 100;
	export let top = 100;
	
  export let title = ""
  export const resizable = true


	let moving = false;


	/**
     * @param {MouseEvent} e
     */
	function onMouseDown(e) {
    // @ts-ignore
    if (e?.target?.type === 'submit') return
    
		moving = true;
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


  function handleMinimize() {

  }
  function handleMaximize() {

  }
  function handleClose() {

  }

</script>

<div class="window"  style="left: {left}px; top: {top}px;" >
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="title-bar" on:mousedown={onMouseDown}>
          <div class="title-bar-text">{title}</div>
          <div class="title-bar-controls">
            <button on:click|preventDefault={handleMinimize} aria-label="Minimize"></button>
            <button on:click|preventDefault={handleMaximize} aria-label="Maximize"></button>
            <button on:click|preventDefault={handleClose} aria-label="Close"></button>
          </div>
        </div>
        {#if resizable}
          <ScalableContent>
            <slot />
          </ScalableContent>
        {:else}
        <div class="window-body">
          <slot />
        </div>
        {/if}
      </div>



<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
  .window {
    position: absolute;
  }
  .title-bar {
    user-select: none;
    cursor: drag;
  }

</style>