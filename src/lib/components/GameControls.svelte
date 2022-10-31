<script>
    import {gameState} from '../stores/gameState.ts';

    // import {getContext} from 'svelte';
    import {options} from '../stores/options.ts';

    // const gameContext = getContext('game');

    function setDarkMode(enabled) {
        window.document.body.classList.toggle('dark-mode', enabled);
    }

    $: setDarkMode($options.darkMode);
</script>

<div class="options">
    <button on:click={gameState.newGame}>New Game</button>
    <label><input type="checkbox" bind:checked={$options.darkMode}> Dark Mode</label>
    <label><input type="checkbox" bind:checked={$options.soundFX}> Sound FX</label>
</div>

<style>
    .options {
        position: absolute;
        top: 1em;
        right: 1em;

        display: grid;
        justify-items: start;
        gap: 0.2em;
    }
    label {
        cursor: pointer;
    }
    button {
        font-size: 1em;
        width: 100%;
    }
</style>