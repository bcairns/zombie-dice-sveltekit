<script>
    import {getContext} from 'svelte';
    import {players} from '../stores/players.ts';

    const gameContext = getContext('game');
</script>

<div class="player-count absolute left-0 top-4 grid grid-cols-3 gap-y-2 gap-x-1 place-items-center">
    <button class="font-sans w-7 h-7 leading-3" on:click={gameContext.removePlayer} disabled={$players.length <= 2}>-</button>
    <span class="text-2xl">{$players.length}</span>
    <button class="font-sans w-7 h-7 leading-3" on:click={gameContext.addPlayer}>+</button>
    <label class="col-span-3">Players</label>
</div>
