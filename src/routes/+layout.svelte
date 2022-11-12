<script>
	import '../lib/tailwind.css';
    import '$lib/global.css';
    import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
</script>

<ThemeSwitcher />

<nav class="text-left">
    <a href="/">Back to Main Menu!!</a>
</nav>
<hr>

<slot />