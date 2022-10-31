<script>
    export let state;
    export let current;
</script>

<section class="player" class:current class:winner={state.score >= 13}>
    <h2><input bind:value={state.name} /></h2>
    <div class="score">{state.score}</div>
</section>

<style>
    .player {
        border: 2px solid transparent;
        border-radius: 2em;
        padding: 1em;
    }
    input {
        max-width: 100%;
        background: transparent;
        border: none;
        font-family: var(--zombie-font);
        font-size: 1.5em;
        text-align: center;
        color: var(--fg);
    }
    .current {
        border-color: var(--fg);
    }
    .winner {
        background: var(--win-bg);
    }
    h2 {
        margin: 0;
    }
    .score {
        font-size: 7em;
        color: var(--red);
    }
</style>