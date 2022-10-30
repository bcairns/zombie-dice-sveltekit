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
        border-color: #ddd;
    }
    input {
        background: transparent;
        border: none;
        font-family: var(--zombie-font);
        font-size: 1.5em;
        text-align: center;
        color: var(--fg);
    }
    .current {
        border-color: green;
    }
    .winner {
        background: #afa;
    }
    h2 {
        margin: 0;
    }
    .score {
        font-size: 7em;
        color: var(--red);
    }
</style>