<script lang="ts">
  import { Minesweeper, type GameState } from './Minesweeper';
  import { onMount } from 'svelte';

  let minesweeper = $state<Minesweeper|null>(null);
  
  let gState = $state<GameState|null>(null)

  const onStateChange = (gsObj: GameState) => {
    gState = gsObj
  }

  onMount(() => {
    minesweeper = new Minesweeper({stateChange: onStateChange});
   
  });


</script>

<div class="minesweeper">
  {#if minesweeper !== null && gState }
    <div class="minesweeper-grid">
      {#each gState.grid as row, y}
        <div class="row">
          {#each row as cell, x}
            {#if cell.mine && cell.revealed}
              <div class="cell">
                <p class="cell-content">X</p>
              </div>
            {:else if cell.revealed}
              <div class="cell">
                <p class="cell-content">{cell.number === 0 ? '' : cell.number}</p>
              </div>
            {:else if cell.flagged}
              <div class="cell chidden"
              oncontextmenu={(e) => {e.preventDefault();minesweeper?.toggleFlag(x, y)}}
              >
                <p class="cell-content flagged">
                  <!-- {cell.number} -->f
                </p>
              </div>
            {:else}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div 
                class="cell chidden" 
                onclick={(e) => {e.preventDefault();minesweeper?.revealCell(x, y)}}
                oncontextmenu={(e) => {e.preventDefault();minesweeper?.toggleFlag(x, y)}}
              >
                <p class="cell-content">
                  <!-- {cell.number} -->
                </p>
              </div>
            {/if}
          {/each}
        </div>
      {/each}
    </div>
  {/if}
  <!-- <button on:click={() => minesweeper.previewBoard()}>preview</button> -->
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
  .cell {
    box-shadow:
      inset -1px -1px #fff,
      inset 1px 1px #0a0a0a,
      inset -2px -2px #dfdfdf,
      inset 2px 2px grey;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    justify-content: center;
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
