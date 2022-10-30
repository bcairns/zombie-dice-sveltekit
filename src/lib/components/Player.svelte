<script>
    export let state;
    export let current;
</script>

<section class="player" class:current class:winner={state.score >= 13}>
    <h2>{state.name}</h2>
    <p>Score: {state.score}</p>
</section>

<style>
    .player {
        border-color: #ddd;
    }
    .current {
        border-color: green;
    }
    .winner {
        background: #afa;
    }
</style>