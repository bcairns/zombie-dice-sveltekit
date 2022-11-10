<script>
    import {gameState} from '../stores/gameState.ts';

    export let state;
    export let current;
</script>

<section class="player border-2 border-transparent rounded-3xl p-4"
         class:border-fg={current && $gameState !== 'gameOver'}
         class:bg-win={state.score >= 13}
>
    <h2><input bind:value={state.name} class="max-w-full bg-transparent text-2xl text-center text-fg" /></h2>
    <div class="score text-9xl text-bloodred">{state.score}</div>
</section>