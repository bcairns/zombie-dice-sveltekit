<script>
    import {gameState} from '../stores/gameState.ts';
    import {players} from '../stores/players.ts';
    import GameControls from './GameControls.svelte';
    import PlayerCountControls from './PlayerCountControls.svelte';
    import GradientHeading from './GradientHeading.svelte';

    export let winnerIndex;
</script>

<header>
    <GradientHeading>
        {#if $gameState === 'finalRound'}
            Final Round!
        {:else if $gameState === 'tieBreaker'}
            Tie Breaker!
        {:else if $gameState === 'gameOver'}
            {$players[winnerIndex].name} wins!
        {:else}
            Zombie Dice
        {/if}
    </GradientHeading>

    <PlayerCountControls />
    <GameControls />
</header>
