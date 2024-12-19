<script lang="ts">
  import { Minesweeper, type MSBox } from './ReactiveMS.svelte';

  type $$Props = {
    minesweeper: Minesweeper | null
    cell: MSBox
    x: number
    y: number
  } 

  const { 
    minesweeper, 
    cell, 
    x, 
    y}:$$Props = $props()
 

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    minesweeper?.revealCell(x, y);
  };

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    minesweeper?.toggleFlag(x, y);
  };
</script>


<button
  class="cell"
  class:chidden={!cell.revealed}
  onclick={handleClick}
  oncontextmenu={handleContextMenu}
>
  {#if cell.mine && cell.revealed}
    <p class="cell-content">X</p>
  {:else if cell.revealed}
    <p class="cell-content">{cell.number === 0 ? '' : cell.number}</p>
  {:else if cell.flagged}
    <p class="cell-content flagged">F</p>
  {:else}
    <p class="cell-content"></p>
  {/if}
</button>

<style>
  .cell {
    box-shadow:
      inset -1px -1px #fff,
      inset 1px 1px #0a0a0a,
      inset -2px -2px #dfdfdf,
      inset 2px 2px grey;
    min-width: unset;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    justify-content: center;
    &:focus {
      outline: unset;
    }
  }
  .cell.chidden {
    box-shadow:
      inset 1px 1px #fff,
      inset 2px 2px #dfdfdf,
      inset -1px -1px #0a0a0a,
      inset -2px -2px grey;
  }
  .cell-content {
    color: var(--number-color, 'grey');
    font-size: var(--number-font-size, 1em);
    margin: 0;
  }
  .flagged {
    color: red;
  }
</style>