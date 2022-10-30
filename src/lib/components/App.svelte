<script>
    import '../global.css';

    import {players} from '../stores/players.ts';
    import {currentPlayerIndex} from '../stores/currentPlayerIndex.ts';

    import DiceBag from './DiceBag.svelte';
    import Player from './Player.svelte';
    import DiceRoller from './DiceRoller.svelte';
    import PlayerState from '../types/PlayerState.ts';
    import Options from './Options.svelte';

    let diceBag;

    let playerCount = 2;

    $players.length = 0;
    for (let i = 0; i < playerCount; i++) {
        $players.push(new PlayerState(`Player ${i+1}`));
        $players = $players;
    }

    function nextPlayer() {
        $currentPlayerIndex = ( $currentPlayerIndex + 1 >= playerCount ) ? 0 : $currentPlayerIndex+1;
    }
</script>

<main>
    <header>
        <h1>Zombie Dice</h1>
        <Options />
    </header>
    <div class="players" style:--count={playerCount}>
        <div class="grid">
            {#each $players as state, index}
                <Player bind:state current={index === $currentPlayerIndex} />
            {/each}
        </div>
    </div>
    <DiceRoller {diceBag} {nextPlayer} />
    <DiceBag bind:this={diceBag} />
</main>

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
    main {
        display: grid;
        gap: 1em;
    }

    .players .grid {
        display: grid;
        gap: 1em;
        grid-template-columns: repeat(var(--count), minmax(0, 1fr));
    }
</style>