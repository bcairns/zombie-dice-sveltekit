<script>
    import {onMount, getContext} from 'svelte';
    import {players} from '../stores/players.ts';
    import {options} from '../stores/options.ts';
    import {currentPlayerIndex} from '../stores/currentPlayerIndex.ts';

    // todo: throw into a separate audio player component or helper
    import diceAudioFile from '../assets/audio/dice.wav';
    import shotgunAudioFile from '../assets/audio/shotgun.wav';
    import missAudioFile from '../assets/audio/zombie-attack.wav';
    import brains1AudioFile from '../assets/audio/brains1.wav';
    import brains2AudioFile from '../assets/audio/brains2.wav';
    import brains3AudioFile from '../assets/audio/brains3.wav';

    import Die from './Die.svelte';

    // export let diceBag;
    // export let nextPlayer;

    const AUDIO_FILES = {
        dice: diceAudioFile,
        shotgun: shotgunAudioFile,
        miss: missAudioFile,
        brains1: brains1AudioFile,
        brains2: brains2AudioFile,
        brains3: brains3AudioFile
    }

    const AUDIO = {};

    let buckets = {
        brain: [],
        footsteps: [],
        shotgun: []
    }

    let isInitialRoll = true;

    const gameContext = getContext('game');

    export function reset() {
        buckets = {
            brain: [],
            footsteps: [],
            shotgun: []
        }
        isInitialRoll = true;
        gameContext.getDiceBag().reset();
    }

    function roll() {
        let newDiceCount = 3 - buckets.footsteps.length;

        let dice = [...buckets.footsteps, ...gameContext.getDiceBag().pullRandomDice(newDiceCount)];
        buckets.footsteps.length = 0;

        dice.forEach(die => {
            die.roll();
            buckets[die.result].push(die);
        });

        buckets = buckets;
        isInitialRoll = false;

        if ($options.soundFX) {
            if (buckets.shotgun.length >= 3) {
                AUDIO.shotgun.play();
            } else {
                AUDIO.dice.play();
            }
        }
    }

    function getZombieSound(brainCount) {
        if (buckets.brain.length >= 5) {
            return AUDIO.brains3;
        }
        if (buckets.brain.length >= 3) {
            return AUDIO.brains2;
        }
        if (buckets.brain.length >= 1) {
            return AUDIO.brains1;
        }
        return AUDIO.miss;
    }

    function stop() {
        if (!dead) {
            $players[$currentPlayerIndex].score += buckets.brain.length;
            if ($options.soundFX) {
                getZombieSound(buckets.brain.length).play();
            }
        }

        gameContext.nextPlayer();

        reset();
    }

    onMount(async () => {
        for (let key in AUDIO_FILES) {
            AUDIO[key] = new Audio(AUDIO_FILES[key])
        }
    });

    $: rollLabel = isInitialRoll ? 'Roll' : 'Roll Again';
    $: dead = buckets.shotgun.length >= 3;
</script>

<section class:dead>
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
        font-size: 1.5em;
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
        border: 2px solid var(--faint-border);
        border-radius: 1em;
        padding: 1em;
        min-height: 100px;
    }
    .dead .shotguns {
        border-color: var(--red);
    }
    .dead .score {
        color: var(--red);
        text-decoration: line-through;
    }
</style>