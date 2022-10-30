<script>
    import GameControls from './GameControls.svelte';
</script>

<header>
    <h1>Zombie Dice</h1>
    <GameControls />
</header>

<style>
    h1 {
        font-size: 5em;
        color: #EA1F27;
    }
    @supports (-webkit-background-clip: text) {
        h1 {
            background-image: linear-gradient(to top, #400, #E21143 50%, #FFF03A 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
</style>