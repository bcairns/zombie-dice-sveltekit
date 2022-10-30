<script>
    import {getContext} from 'svelte';
    import {players} from '../stores/players.ts';

    const gameContext = getContext('game');
</script>

<div class="player-count">
    <button on:click={gameContext.removePlayer} disabled={$players.length <= 2}>-</button>
    <span>{$players.length}</span>
    <button on:click={gameContext.addPlayer}>+</button>
    <label>Players</label>
</div>

<style>
    .player-count {
        position: absolute;
        left: 1em;
        top: 1em;

        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.5em 0.25em;
        place-items: center;
    }
    button {
        font-family: initial;
        font-size: 1em;
    }
    span {
        font-size: 1.5em;
    }
    label {
        grid-column: span 3;
    }
</style>