<script>
  import { fontSize, numberColor } from '$lib/helpers.js';

  export const grid = [
    [0, 2, 4, 8],
    [0, 0, 0, 0],
    [0, 0, 512, 512],
    [2048, 0, 0, 0]
  ];
</script>

<div class="grid">
  {#each grid as row, x}
    <div class="row">
      {#each row as val, y}
        <div class="block">
          {#if val !== 0 && val}
            <p
              class="block-content"
              style:--number-color={numberColor(val)}
              style:--number-font-size={fontSize(val)}
            >
              {val}
            </p>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .grid {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    user-select: none;
  }
  .row {
    display: flex;
    gap: 4px;
    justify-content: center;
  }
  .block {
    box-shadow:
      inset -1px -1px #fff,
      inset 1px 1px #0a0a0a,
      inset -2px -2px #dfdfdf,
      inset 2px 2px grey;
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .block-content {
    color: var(--number-color, 'grey');
    font-size: var(--number-font-size, 1em);
    margin: 0;
  }
</style>
