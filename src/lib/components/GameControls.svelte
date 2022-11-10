<script>
    import {gameState} from '../stores/gameState.ts';
    import {options} from '../stores/options.ts';
    import {setDarkMode} from '$lib/components/ThemeSwitcher.svelte';

    // function setDarkMode(enabled) {
    //     window.document.body.classList.toggle('dark-mode', enabled);
    // }

    $: setDarkMode($options.darkMode);
</script>

<div class="options absolute top-4 right-0 grid justify-items-start">
    <button class="mb-1 text-base w-full" on:click={gameState.newGame}>New Game</button>
    <label class="cursor-pointer"><input type="checkbox" bind:checked={$options.darkMode}> Dark Mode</label>
    <label class="cursor-pointer"><input type="checkbox" bind:checked={$options.soundFX}> Sound FX</label>
</div>
