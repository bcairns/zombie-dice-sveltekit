<script>
    import {players} from '../stores/players.ts';
    import {currentPlayerIndex} from '../stores/currentPlayerIndex.ts';

    import Die from './Die.svelte';

    export let diceBag;
    export let nextPlayer;

    let buckets = {
        brain: [],
        footsteps: [],
        shotgun: []
    }

    let isInitialRoll = true;

    function reset() {
        buckets = {
            brain: [],
            footsteps: [],
            shotgun: []
        }
        isInitialRoll = true;
        diceBag.reset();
    }

    function roll() {
        let newDiceCount = 3 - buckets.footsteps.length;

        let dice = [...buckets.footsteps, ...diceBag.pullRandomDice(newDiceCount)];
        buckets.footsteps.length = 0;

        dice.forEach(die => {
            die.roll();
            buckets[die.result].push(die);
        });

        buckets = buckets;
        isInitialRoll = false;
    }

    function stop() {
        if (!dead) {
            addScoreToCurrentPlayer(buckets.brain.length);
        }

        nextPlayer();

        reset();
    }


    function addScoreToCurrentPlayer(score) {
        $players[$currentPlayerIndex].score += score;
    }

    $: rollLabel = isInitialRoll ? 'Roll' : 'Roll Again';
    $: dead = buckets.shotgun.length >= 3;
</script>

<section class:dead>
    <h2>Dice Roller</h2>

    <div class="controls">
        <button on:click={roll} disabled={dead}>{rollLabel}</button>
        <button on:click={stop} disabled={isInitialRoll}>End Turn</button>
    </div>

    <div class="score">
        Score: {buckets.brain.length}
    </div>

    <div class="dice">
        <div class="brains bucket">
            {#each buckets.brain as dieState}
                <Die {dieState}/>
            {/each}
        </div>
        <div class="footsteps bucket">
            {#each buckets.footsteps as dieState}
                <Die {dieState}/>
            {/each}
        </div>
        <div class="shotguns bucket">
            {#each buckets.shotgun as dieState}
                <Die {dieState}/>
            {/each}
        </div>
    </div>

</section>

<style>
    .score {
        margin-top: 0.5em;
    }
    .dice {
        margin-top: 1em;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1em;
    }
    .bucket {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
        justify-content: center;
        border: 2px solid #eee;
        border-radius: 1em;
        padding: 1em;
    }
    .dead .shotguns {
        border-color: red;
    }
    .dead .score {
        color: red;
        text-decoration: line-through;
    }
</style>