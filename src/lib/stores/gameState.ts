import fsm from 'svelte-fsm'

export const gameState = fsm('startNewGame', {
    '*': {
        newGame: 'startNewGame',
    },
    startNewGame: {
        startPlaying: 'playing'
    },
    playing: {
        reached13: 'finalRound'
    },
    finalRound: {
        winner: 'gameOver',
        tie: 'tieBreaker'
    },
    tieBreaker: {
        winner: 'gameOver'
    },
    gameOver: {
    }
});