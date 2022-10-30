<script>
    import {getContext} from 'svelte';
    import {options} from '../stores/options.ts';

    const gameContext = getContext('game');
</script>

<svelte:head>
    {#if $options.darkMode}
        <style>
            /* seems we can't easily add a class to the body */
            body {
                --bg: #222;
                --fg: white;
            }
        </style>
    {/if}
</svelte:head>

<div class="options">
    <button on:click={gameContext.newGame}>New Game</button>
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