<script>

</script>

<a href='/' >
    <img alt="rs" src='./rslPixelated.png' draggable="false"/>
    <p>Home</p>
</a>

<style>
    a {
        text-decoration: none;
        position: absolute; 
        top: 34px; 
        left: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        & > p {
            color: black;
            font-weight: 700;
            letter-spacing: 0;
            -webkit-font-smoothing: none;
            font-family: "Pixelated MS Sans Serif", Arial;
            font-size: 12px;
        }
        & > img {
            height: 32px;
            image-rendering: pixelated;
        }
    }
</style>