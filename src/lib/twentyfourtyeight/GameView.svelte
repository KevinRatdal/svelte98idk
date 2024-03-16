<script>
  import Grid from './Grid.svelte';
  import { Game } from '$lib/twentyfourtyeight/Game.js';
  import { onMount } from 'svelte';

  /**
   * @type {null|number[][]}
   */
  let grid = null;
  let gScore = 0;

  let isFinished = false;
  let debug = false;
  let gameId = 0;
  let roomId = '';
  let currentPName = '';

  function sendGameState() {}
  function finishGame() {}
  function joinRoom() {}

  let gameRef = new Game(4);
  let containerRef = null;

  onMount(() => {
    // initialize a new game of size four and init
    gameRef = new Game(4);
    console.log('test', gameRef?.initGrid());
    let gridValue = gameRef.getGrid();
    grid = [...gridValue];
    let gameScore = gameRef.getScore();
    gScore = gameScore;
  });

  // useEffect(() => { // handle inputs and toggle focus for input
  //     if (containerRef !== null) {
  //         containerRef.addEventListener('keydown', (event) => {
  //             console.log(event)
  //             if (event.code === 'ArrowUp') {
  //                 handleMove('up')
  //             }
  //             if (event.code === 'ArrowDown') {
  //                 handleMove('down')
  //             }
  //             if (event.code === 'ArrowLeft') {
  //                 handleMove('left')
  //             }
  //             if (event.code === 'ArrowRight') {
  //                 handleMove('right')
  //             }
  //         })
  //         containerRef.addEventListener('click', () => {
  //             containerRef?.focus()
  //         })
  //     }
  // }, [])

  // useEffect(() => { // send game state to be updated on server
  //     if (typeof sendGameState === 'function' && roomId !== '') {
  //         if (isFinished) {
  //             finishGame?.({ grid: grid, gScore: gScore, player: currentPName }, roomId)
  //         } else {
  //             sendGameState({ grid: grid, gScore: gScore, player: currentPName }, roomId)
  //         }
  //     }
  // }, [grid, gScore, roomId, isFinished])

  // const handleJoinRoom = (_roomId: string, pName: string) => {
  //     if (roomId === '' && typeof joinRoom === 'function') {
  //         joinRoom(_roomId, pName)
  //         currentPName = pName
  //         roomId = _roomId
  //         debug = false
  //     }
  // }

  const handleView = () => {
    if (gameRef !== null) {
      gameRef.viewGrid();
    }
  };

  const handleRenderView = () => {
    if (gameRef !== null) {
      let gridValue = gameRef.getGrid();
      console.log(JSON.stringify(gridValue));
      grid = [...gridValue];
      let gameScore = gameRef.getScore();
      gScore = gameScore;
      let isFin = gameRef.getIsFinished();
      isFinished = isFin;
    }
  };
  const handleSetAndRenderView = () => {
    //DEBUG
    if (gameRef !== null) {
      gameRef._setRandomSquare();
      let gridValue = gameRef.getGrid();
      grid = [...gridValue];
    }
  };
  const handleRandomSquare = () => {
    //DEBUG
    if (gameRef !== null) {
      gameRef._setRandomSquare();
    }
  };

  const handleMove = (/** @type {string} */ direction) => {
    if (gameRef !== null && !isFinished) {
      gameRef.move(direction);
      handleRenderView();
    }
  };
  const handleFinishGame = () => {
    // finishGame?.({ grid: grid, gScore: gScore, player: currentPName }, roomId)
    // send the finish game to the api
    // disable movement and freeze game
    // hide finish button?
  };

  console.log('grid from gameview', { grid });
</script>

<div bind:this={containerRef} class="container">
  <h6 class="header-score">
    Score: {gScore}
    {isFinished ? 'Finished' : ''}
  </h6>
  <div>
    {#if grid}
      <Grid {grid} />
    {/if}
  </div>
  <!-- <button
    disabled={!!roomId}
    on:click={() => handleJoinRoom('test1', `player_${Math.floor(Math.random() * 99)}`)}
    >join room test1</button
  > -->
  <button>Focus</button>
  {#if debug}
    <div class="debug-menu">
      <button on:click={handleView}>View</button>
      <button on:click={handleRenderView}>refresh view</button>
      <button on:click={handleSetAndRenderView}>setAndRefresh view</button>
      <button on:click={handleRandomSquare}>setRandomSquare</button>
      <button on:click={handleFinishGame}>Finish</button>
      <!-- <button
        disabled={!!roomId}
        on:click={() => handleJoinRoom('test1', `player_${Math.floor(Math.random() * 99)}`)}
        >join room test1</button
      > -->
    </div>
  {/if}
  <div class="game-buttons">
    <button class="game-btn game-btn-up" on:click={() => handleMove('up')}>Up</button>
    <button class="game-btn game-btn-left" on:click={() => handleMove('left')}>Left</button>
    <button class="game-btn game-btn-right" on:click={() => handleMove('right')}>Right</button>
    <button class="game-btn game-btn-down" on:click={() => handleMove('down')}>Down</button>
  </div>
  <div class="footer-menu">
    <button on:dblclick={() => (debug = !debug)}>DEBUG</button>

    <button on:click={() => (gameId += 1)}> Restart</button>
  </div>
</div>

<style>
  .container {
    padding: 1em;
  }
  .header-score {
    margin-block-start: '1em';
    margin-block-end: '0.5em';
    font-size: '1.3em';
  }
  .debug-menu {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    padding: 16px;
  }
  .game-buttons {
    display: grid;
    margin: 1em;
    gap: 8px;
    grid-template-areas:
      '. .  up up up . .'
      '. left left . right right .'
      '. . down down down . .';
  }
  .game-btn {
    min-width: unset;
  }
  .game-btn-up {
    grid-area: up;
  }
  .game-btn-left {
    grid-area: left;
  }
  .game-btn-right {
    grid-area: right;
  }
  .game-btn-down {
    grid-area: down;
  }

  .footer-menu {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
</style>
