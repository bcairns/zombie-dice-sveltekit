<script>
    import '../global.css';
    import {gameState} from '../stores/gameState.ts';

    import { setContext } from 'svelte';

    import {players} from '../stores/players.ts';
    import {currentPlayerIndex} from '../stores/currentPlayerIndex.ts';

    import DiceBag from './DiceBag.svelte';
    import Player from './Player.svelte';
    import DiceRoller from './DiceRoller.svelte';
    import PlayerState from '../types/PlayerState.ts';
    import Header from './Header.svelte';

    let diceBag;
    let diceRoller;
    let winners = [];

    let initialPlayerCount = 2;

    $players.length = 0;
    for (let i = 0; i < initialPlayerCount; i++) {
        $players.push(new PlayerState(`Player ${i+1}`));
        $players = $players;
    }

    function nextPlayer() {
        if ($currentPlayerIndex + 1 >= $players.length) {
            roundComplete();
        } else {
            $currentPlayerIndex++;
        }
    }

    // returns array of player indices that are winners (highest score and >= 13)
    // multiple winners indicates a tie
    function getWinners(playerStates) {
        const winners = [];
        let highestScore = 0;

        playerStates.forEach((player, index) => {
            if (player.score >= 13) {
                if (player.score === highestScore) {
                    winners.push(index)
                }
                if (player.score > highestScore) {
                    winners.length = 0;
                    winners.push(index);
                    highestScore = player.score;
                }
            }
        });

        return winners;
    }

    function roundComplete() {
        if ($gameState === 'finalRound' || $gameState === 'tieBreaker') {
            // todo: check for actual winner / tiebreaker

            winners = getWinners($players);
            if (winners.length >= 2) {
                gameState.tie();
            } else {
                gameState.winner();
            }

        }
        $currentPlayerIndex = 0;
    }

    function newGame() {
        $players.forEach(player => player.score = 0);
        $players = $players;
        $currentPlayerIndex = 0;
        diceRoller?.reset();
        diceBag?.reset();
        gameState.startPlaying();
    }

    function addPlayer() {
        $players.push(new PlayerState(`Player ${$players.length + 1}`));
        $players = $players;
    }

    function removePlayer() {
        if ($players.length > 2) {
            $players.length--;
        }
        $players = $players;
        if ($currentPlayerIndex >= $players.length) {
            $currentPlayerIndex = 0;
        }
    }

    function getDiceBag() {
        return diceBag;
    }

    setContext('game', {
        getDiceBag,
        nextPlayer,
        addPlayer,
        removePlayer,
        newGame
    });

    $: if ($gameState === 'startNewGame') {
        newGame();
    }

    $: winnerIndex = $gameState === 'gameOver' ? winners[0] : '';
</script>

<main class="relative grid gap-4">
    <Header {winnerIndex} />
    <div class="players">
        <div class="grid gap-4"
             style:grid-template-columns="repeat({$players.length}, minmax(0, 1fr)"
        >
            {#each $players as state, index}
                <Player bind:state current={index === $currentPlayerIndex} />
            {/each}
        </div>
    </div>
    <DiceRoller bind:this={diceRoller} />
    <DiceBag bind:this={diceBag} />
</main>
