import fsm from 'svelte-fsm';
import { gameManipulator } from '../stores/game';

// This is the same in nextTurn and resolveDice
const rollDice = () => {
  gameManipulator.rollDice();
  return 'resolveDice';
};

const gameFsm = fsm('initial', {
  initial: {
    newGame(numPlayers) {
      gameManipulator.newGame(numPlayers);
      return 'nextTurn';
    }
  },
  nextTurn: {
    _enter() {
      const gameOver = gameManipulator.isGameOver();
      if (gameOver) {
        return 'final';
      }
    },
    rollDice  // defined above
  },
  resolveDice: {
    _enter() {
      const gotShot = gameManipulator.resolveDice();
      if (gotShot) {
        return 'nextTurn';
      }
    },
    rollDice,  // defined above
    acceptRoll() {
      gameManipulator.acceptRoll();
      return 'nextTurn';
    }
  },

  final: {}
});

export default gameFsm;
