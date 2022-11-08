<script context="module">
    export function setDarkMode(enabled) {
        window?.document.body.classList.toggle('dark-mode', enabled);
    }
</script>

<script>
    import {onMount} from 'svelte';
    import {options} from '$lib/stores/options.ts';

    onMount(async () => {
        if ($options.darkMode === true) {
            setDarkMode(true);
        }
    });
</script>