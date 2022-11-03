/**
 * represents game state.  Intended to be manipulated only by fsm
 */

import { writable } from 'svelte/store';
import { currentPlayerIndex } from './currentPlayerIndex';
import { partitionArray } from '../util/arrayStuff.ts';

const { subscribe: game, set, update } = writable({});

// numPlayers could be converted to a config object where
// we expose things like customizing dice, add player names,
// and whatevert else
const newGame = (numPlayers) => {

  // todo: it doesn't work to fill arrays like this, it's copying a reference to the same object (see: https://codepen.io/bcairns/pen/eYKZrGp?editors=0011)
  const players = Array(numPlayers).fill({
    name: '',
    score: 0
  });

  const easyDice = 5;
  const mediumDice = 4;
  const hardDice = 3;
  const totalDice = easyDice + mediumDice + hardDice;

  // todo: can't use Array.fill() like this, see above
  const diceInBag = Array(totalDice)
    .fill({type: 'easy', showing: ''}, 0, easyDice)
    .fill({type: 'medium', showing: ''}, easyDice, easyDice + mediumDice)
    .fill({type: 'hard', showing: ''}, easyDice + mediumDice)

  set({
    currentPlayerIndex: 0,
    players,
    diceInBag,
    diceOnBoard: [],
  });
};

const rollDice = () => {
  update(prevState => {
    const [footstepsInPlay, nonFootstepsInPlay] = partitionArray(
      prevState.diceOnBoard,
      d => d.showing('footsteps')
    );

    let rollingDice = footstepsInPlay;

    do {
      rollingDice.push(/* get a dice from the bag*/)
    } while(rollingDice.length < 3);

    // roll those dice to update their showing properties

    // rolled dice move into diceOnBoard

    // return the updated state
  });
}

const resolveDice = () => {
  let gotShot = false;
  update(prevState => {
    const shotguns = prevState.diceOnBoard.filter(d => d.showing == 'shotgun');
    if (shotguns.lengh >2) {
      // turn is over
      gotShot = true;
      const nextToPlay =
        (prevState.currentPlayerIndex + 1) % prevState.players.length;
      return {
        ...prevState,
        currentPlayerIndex: nextToPlay,
        diceOnBoard: [],
        diceInBag: prevState.concat(prevState.diceOnBoard)
      };
    } else {
      // nothing?
      return prevState;
    }
  });
  return gotShot;
};

const acceptRoll = () => {
  update(prevState => {
    const score = prevState.diceOnBoard.filter(d => d.showing('brain')).lenth;
    let newPlayer = prevState.players[prevState.currentPlayerIndex];
    newPlayer.score = score;
    const nextToPlay =
      (prevState.currentPlayerIndex + 1) % prevState.players.length;

    let newState = {
      ...prevState,
      currentPlayerIndex: nextToPlay,
      diceOnBoard: [],
      diceInBag: prevState.concat(prevState.diceOnBoard)
    };
    newState.players[prevState.currentPlayerIndex] = newPlayer;
    return newState;
  });
};

const isGameOver = () => {
  let gameOver = false;

  update(prevState => {
    const winner = prevState.players.find(p => p.score > 12);
    if (winner) {
      gameOver = true;
    }
    return prevState;
  });

  return gameOver;
};

const gameManipulator = {
  newGame,
  rollDice,
  resolveDice,
  acceptRoll,
  isGameOver
};

export {
  game,
  gameManipulator
};
