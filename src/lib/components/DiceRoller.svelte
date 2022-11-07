<script>
    import {gameState} from '../stores/gameState.ts';

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
            if ($players[$currentPlayerIndex].score >= 13) {
                gameState.reached13();
            }

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
    $: gameOver = $gameState === 'gameOver';
</script>

<section class:dead>
    <div class="controls">
        <button class="text-4xl" on:click={roll} disabled={gameOver || dead}>{rollLabel}</button>
        <button class="text-4xl" on:click={stop} disabled={gameOver || isInitialRoll}>End Turn</button>
    </div>

    <div class="score mt-2 text-xl"
         class:text-bloodred={dead}
         class:line-through={dead}
    >
        Score: {buckets.brain.length}
    </div>

    <div class="dice mt-4 grid grid-cols-3 gap-4">
        <div class="brains bucket flex flex-wrap gap-2 justify-center border-2 border-faint rounded-2xl p-4 min-h-[108px]">
            {#each buckets.brain as dieState}
                <Die {dieState}/>
            {/each}
        </div>
        <div class="footsteps bucket flex flex-wrap gap-2 justify-center border-2 border-faint rounded-2xl p-4 min-h-[108px]">
            {#each buckets.footsteps as dieState}
                <Die {dieState}/>
            {/each}
        </div>
        <div class="shotguns bucket flex flex-wrap gap-2 justify-center border-2 border-faint rounded-2xl p-4 min-h-[108px]"
             class:border-bloodred={dead}
        >
            {#each buckets.shotgun as dieState}
                <Die {dieState}/>
            {/each}
        </div>
    </div>

</section>
