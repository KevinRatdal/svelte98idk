<script lang="ts">
  import Cell from './Cell.svelte';
import { Minesweeper, type GameState } from './Minesweeper';
  import { onMount } from 'svelte';

  let minesweeper = $state<Minesweeper | null>(null);

  let gState = $state<GameState | null>(null);

  const onStateChange = (gsObj: GameState) => {
    gState = gsObj;
  };

  onMount(() => {
    minesweeper = new Minesweeper({ stateChange: onStateChange, mines: 10 });
  });
</script>

<div class="minesweeper">
  <div class="minesweeper-statusbar">
    <div class="minesweeper-status">
      <p>Flags: {gState?.grid.flat().filter((cell) => cell.flagged).length}</p>
    </div>
    <div class="minesweeper-smiley">
      {#if gState?.isWin}
        <p>😀</p>
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
