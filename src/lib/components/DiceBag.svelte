<script lang="ts">
    import Die from './Die.svelte';
    import DieState from '../types/DieState.ts';

    const INITIAL_DICE = {
        easy: 5,
        medium: 4,
        hard: 3
    }

    let dice:DieState[] = [];

    export function reset() {
        const newDice:DieState[] = [];
        for (const type in INITIAL_DICE) {
            for (let i = 0; i < INITIAL_DICE[type]; i++) {
                newDice.push(new DieState(type));
            }
        }
        dice = newDice;
    }

    function getRandomDieIndex() {
        return Math.floor( Math.random() * dice.length );
    }

    // remove a random die from the bag, return DieState
    function pullRandomDie() {
        const die = dice.splice(getRandomDieIndex(), 1)[0];
        dice = dice; // splice() won't trigger reactivity
        return die;
    }

    // remove dice from bag, return array of type strings (easy|medium|hard)
    export function pullRandomDice(n = 1) {
        const dice:DieState[] = [];

        while (n-- > 0) {
            dice.push(pullRandomDie());
        }

        return dice;
    }

    reset();
</script>

<section>
    <h2>Dice Bag</h2>
    <div class="dice">
        {#each dice as dieState}
            <Die {dieState} />
        {/each}
    </div>
</section>

<style>
    .dice {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
        justify-content: center;
    }
</style>