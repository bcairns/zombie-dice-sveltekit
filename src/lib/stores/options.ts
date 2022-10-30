import {writable} from 'svelte/store';


// todo: persist user prefs via local storage store


export const options = writable({
    darkMode: false,
    soundFX: true
});
