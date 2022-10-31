<script>
    import {gameState} from '../stores/gameState.ts';
    import {players} from '../stores/players.ts';
    import GameControls from './GameControls.svelte';
    import PlayerCountControls from './PlayerCountControls.svelte';

    export let winnerIndex;

    function getTitle(state) {
        switch (state) {
            case 'finalRound': return 'Final Round!';
            case 'tieBreaker': return 'Tie Breaker!';
            case 'gameOver': return `${$players[winnerIndex].name} wins!`;
            default: return 'Zombie Dice';
        }
    }
</script>

<header>
    <h1>{getTitle($gameState)}</h1>
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