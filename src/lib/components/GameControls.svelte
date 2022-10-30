<script>
    import {options} from '../stores/options.ts';
</script>

<svelte:head>
    {#if $options.darkMode}
        <style>
            body {
                --bg: #222;
                --fg: white;
            }
        </style>
    {/if}
</svelte:head>

<div class="options">
    <label><input type="checkbox" bind:checked={$options.darkMode}> Dark Mode</label>
    <label><input type="checkbox" bind:checked={$options.soundFX}> Sound FX</label>
</div>

<style>
    .options {
        position: absolute;
        top: 1em;
        right: 1em;

        display: grid;
        justify-items: start;
    }
    label {
        cursor: pointer;
    }
</style>