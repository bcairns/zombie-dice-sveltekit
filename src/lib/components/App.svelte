<script>
    import '../global.css';

    import {players} from '../stores/players.ts';
    import {currentPlayerIndex} from '../stores/currentPlayerIndex.ts';

    import DiceBag from './DiceBag.svelte';
    import Player from './Player.svelte';
    import DiceRoller from './DiceRoller.svelte';
    import PlayerState from '../types/PlayerState.ts';
    import Header from './Header.svelte';

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
    <Header />
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