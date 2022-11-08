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

  const players = Array(numPlayers).fill().map(() => ({
    name: '',
    score: 0,
    id:
  }));

  const numEasyDice = 5;
  const numMediumDice = 4;
  const numHardDice = 3;

  const easyDice = Array(numEasyDice).fill().map(
    () => ({type: 'easy', showing: ''})
  );
  const mediumDice = Array(numMediumDice).fill().map(
    () => ({type: 'medium', showing: ''})
  );
  const hardDice = Array(numHardDice).fill().map(
    () => ({type: 'hard', showing: ''})
  );

  const diceInBag = [...easyDice, ...mediumDice, ...hardDice];

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
