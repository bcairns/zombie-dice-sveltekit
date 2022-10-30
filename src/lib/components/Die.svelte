<script>
    import brainIcon from '$lib/assets/icons/brain.png';
    import shotgunIcon from '$lib/assets/icons/blast.png';
    import footstepsIcon from '$lib/assets/icons/footsteps.png';

    export let dieState;

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

<div class="die {dieState.type} {dieState.result}">
    {#if dieState.result}
        <img src={RESULTS[dieState.result].image} alt={RESULTS[dieState.result].label} />
    {:else}
        ?
    {/if}
</div>

<style>
    .die {
        font-size: 2rem;
        font-weight: bold;

        width: 2em;
        height: 2em;
        padding: 0.25em;
        border: 1px solid #666;
        border-radius: 0.3em;

        display: grid;
        place-content: center;
    }
    img {
        max-width: 100%;
        max-height: 100%;
    }
    .easy {
        background-color: lightgreen;
    }
    .medium {
        background-color: yellow;
    }
    .hard {
        background-color: red;
    }
</style>