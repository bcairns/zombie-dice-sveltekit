<script>
    import {gameState} from '../stores/gameState.ts';
    import {players} from '../stores/players.ts';
    import GameControls from './GameControls.svelte';
    import PlayerCountControls from './PlayerCountControls.svelte';

    export let winnerIndex;
</script>

<header>
    <h1 class="text-red text-8xl m-1 leading-none text-gradient-red">
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
