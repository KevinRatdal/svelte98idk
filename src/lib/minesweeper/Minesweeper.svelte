<script lang="ts">
  import Cell from './Cell.svelte';
  import { Minesweeper, type GameState } from './Minesweeper';
  import { Confetti } from "svelte-confetti"
  import { onMount } from 'svelte';

  let minesweeper = $state<Minesweeper | null>(null);

  let gState = $state<GameState | null>(null);

  const onStateChange = (gsObj: GameState) => {
    gState = gsObj;
  };

  onMount(() => {
    minesweeper = new Minesweeper({ stateChange: onStateChange, mines: 10, height: 10, width: 8 });
  });
</script>

<div class="minesweeper">
  <div class="minesweeper-statusbar">
    <div class="minesweeper-status">
      <p>Flags: {gState?.grid.flat().filter((cell) => cell.flagged).length}</p>
      <p>Mines: {gState?.mines}</p>
    </div>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="minesweeper-smiley"
      onclick={() => {(gState?.isWin || gState?.gameOver) && minesweeper?.reset()}}
    >
      {#if gState?.isWin}
        <p>😀</p>
        <div style="position: fixed; top: -50px; left: 0; height: 100vh; width: 100vw; display: flex; justify-content: center; overflow: hidden; pointer-events: none;">
					<Confetti x={[-5, 5]} y={[0, 0.1]} delay={[100, 200]} infinite fallDistance="100vh" />
				</div>
      {:else if gState?.gameOver}
        <p>😞</p>
      {:else}
        <p>😐</p>
      {/if}
      
    </div>
    <div class="minesweeper-status">
    <p>Revealed: {gState?.grid.flat().filter((cell) => cell.revealed).length}</p>
  </div>
  </div>
  {#if minesweeper !== null && gState}
    <div class="minesweeper-grid">
      {#each gState.grid as row, y}
        <div class="row">
          {#each row as cell, x}
           <Cell 
            x={x}
            y={y}
            cell={cell}
            minesweeper={minesweeper}
           />
          {/each}
        </div>
      {/each}
    </div>
  {/if}
  
</div>

<style>
  .minesweeper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
  }
  .minesweeper-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    box-shadow:
      inset -1px -1px #fff,
      inset 1px 1px #0a0a0a,
      inset -2px -2px #dfdfdf,
      inset 2px 2px grey;
  }
  .row {
    display: flex;
    gap: 8px;
  }
  .minesweeper-statusbar {
    display: flex;
    gap: 8px;
    justify-content: space-between;
  }

  .minesweeper-smiley {
    > p {
      font-size: 1.25em;
      color: unset;
      box-shadow:
        inset 1px 1px #fff,
        inset 2px 2px #dfdfdf,
        inset -1px -1px #0a0a0a,
        inset -2px -2px grey;
      padding: 4px;
    }
    display: flex;
    gap: 8px;
  }
  
</style>
