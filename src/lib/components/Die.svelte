<script type="ts">
    import brainIcon from '$lib/assets/icons/brain.png';
    import shotgunIcon from '$lib/assets/icons/blast.png';
    import footstepsIcon from '$lib/assets/icons/footsteps.png';
    import DieState from '$lib/types/DieState';

    export let dieState:DieState;

    const RESULTS = {
        brain: {
            label: 'Brain',
            image: brainIcon
        },
        shotgun: {
            label: 'Shotgun',
            image: shotgunIcon
        },
        footsteps: {
            label: 'Footsteps',
            image: footstepsIcon
        }
    }
</script>

<div class="die text-4xl text-black w-[2em] h-[2em] rounded-xl grid place-items-center shadow-bevel p-2"
     class:bg-green-400={dieState.type === 'easy'}
     class:bg-yellow-400={dieState.type === 'medium'}
     class:bg-red-500={dieState.type === 'hard'}
>
    {#if dieState.result}
        <img src={RESULTS[dieState.result].image} alt={RESULTS[dieState.result].label}
             class="max-w-full max-h-14"
        />
    {:else}
        ?
    {/if}
</div>
