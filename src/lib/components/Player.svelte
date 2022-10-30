<script>
    export let state;
    export let current;
</script>

<section class="player" class:current class:winner={state.score >= 13}>
    <h2>{state.name}</h2>
    <div class="score">{state.score}</div>
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
    h2 {
        margin: 0;
    }
    .score {
        font-size: 7em;
        color: var(--red);
    }
</style>