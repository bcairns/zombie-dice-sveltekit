<script>
    import { goto } from '$app/navigation';
    import GradientHeading from './GradientHeading.svelte';
    import PageTitle from './PageTitle.svelte';

    let code = '';

    function host() {
        // just go to /lobby/{randomID}
        goto(`/lobby/${getRandomID()}`);
    }

    function join() {
        goto(`/lobby/${code}`);
    }

    function getRandomLetter() {
        return String.fromCharCode(
            Math.floor( Math.random() * 26 + 65 )
        );
    }

    function getRandomID(length = 4) {
        const chars = [];
        for (let i = 0; i < length; i++) {
            chars.push(getRandomLetter());
        }
        return chars.join('');
    }
</script>

<GradientHeading>Zombie Dice</GradientHeading>

<PageTitle>Main Menu</PageTitle>

<div class="grid gap-8 max-w-sm mx-auto">
    <button on:click={host}>Host New Game</button>
    <div class="grid grid-cols-2 gap-y-2">
        <button on:click={join} class="col-span-2">Join Game</button>
        <label>Code</label> <input bind:value={code} />
    </div>
</div>
