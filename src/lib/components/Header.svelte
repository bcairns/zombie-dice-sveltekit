<script>
    import {gameState} from '../stores/gameState.ts';
    import {players} from '../stores/players.ts';
    import GameControls from './GameControls.svelte';
    import PlayerCountControls from './PlayerCountControls.svelte';

    export let winnerIndex;
</script>

<header>
    <h1>
        {#if $gameState === 'finalRound'}
            Final Round!
        {:else if $gameState === 'tieBreaker'}
            Tie Breaker!
        {:else if $gameState === 'gameOver'}
            {$players[winnerIndex].name} wins!
        {:else}
            Zombie Dice
        {/if}
    </h1>
    <PlayerCountControls />
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