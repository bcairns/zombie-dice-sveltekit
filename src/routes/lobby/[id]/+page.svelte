<script>
    import GradientHeading from '../../../lib/components/GradientHeading.svelte';
    import PageTitle from '../../../lib/components/PageTitle.svelte';
    import {goto} from '$app/navigation';

    export let data;

    function startGame() {
        goto(`/play/${data.id}`);
    }
</script>

<GradientHeading>Zombie Dice</GradientHeading>

<PageTitle>Lobby</PageTitle>

<h3 class="text-2xl">Game Code - {data.id}</h3>

<button on:click={startGame} class="mt-8">Start Game</button>
