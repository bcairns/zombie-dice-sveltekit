<script>
    import {onMount, onDestroy} from 'svelte';
    import GradientHeading from '../../../lib/components/GradientHeading.svelte';
    import PageTitle from '../../../lib/components/PageTitle.svelte';
    import {goto} from '$app/navigation';

    export let data;

    let eventSource;
    let playerCount = 0;

    function startGame() {
        goto(`/play/${data.id}`);
    }

    onMount(async () => {
        // subscribe to lobby events
        eventSource = new EventSource(`/lobby/${data.id}/events`);
        console.log('subscribed to lobby event source');
        eventSource.onmessage = (event) => {
            console.log('message received from lobby event source', event.data);
            const data = JSON.parse(event.data);
            playerCount = data.playerCount;
            console.log(data);
        };
        return () => {
            eventSource.close();
        }

    });

    onDestroy(async () => {
        eventSource.close();
    });
</script>

<GradientHeading>Zombie Dice</GradientHeading>

<PageTitle>Lobby</PageTitle>

<h3 class="text-2xl">Game Code - {data.id}</h3>

<button on:click={startGame} class="mt-8">Start Game</button>

{#if playerCount}
    <ul>
        {#each {length: playerCount} as _, index}
            <li>Player {index + 1}</li>
        {/each}
    </ul>
{/if}