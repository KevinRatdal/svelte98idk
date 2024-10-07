<script>
  import Grid from '$lib/twentyfourtyeight/Grid.svelte';
  // import BottomBar from '$lib/components/BottomBar.svelte';
  import Window from '$lib/components/Window.svelte';
  import GameView from '$lib/twentyfourtyeight/GameView.svelte';
</script>

<Window title="Grid preview test" resizable={false}>
  <button style:margin="8px">test</button>
  <Grid></Grid>
</Window>
<Window title="Game view :O" resizable={false}>
  <GameView />
</Window>
<Window title="Test button" left={500} top={100}>
  <button>test</button>
</Window>
