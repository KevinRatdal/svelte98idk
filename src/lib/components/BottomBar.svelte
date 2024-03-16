
<script>

</script>

<div class="bottomBar">
  <button class="startButton">start</button>
  <div class="divider"/>
  <div class='stuffs'>stuff goes here</div>
  <div class="divider"/>
  <div class="statusDivider">
    <p style="font-size: 9px; padding-inline: 8px;">23:32</p>
  </div>

</div>


<style>
  .startButton {
    padding-inline: 10px;
    min-width: unset;
  }
  .bottomBar {
    -webkit-font-smoothing: none;
    font-family: "Pixelated MS Sans Serif", Arial;
    font-size: 11px;
    background: silver;
    box-shadow: inset 0px 1px silver, inset 0px 2px white ;
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
    box-shadow: inset 1px 0px grey, inset 2px 0px white ;
    height: 100%;
    width: 2px;
  }
  .statusDivider {
    box-shadow: inset -1px -1px white, inset 1px 1px grey;
    padding: 2px;
    padding-inline: 2px;
    display: flex;
    align-items: center;
    /* height: 100% */
    
  }
</style>