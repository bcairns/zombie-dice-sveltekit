import {writable} from 'svelte/store';

const defaults = {
    darkMode: false,
    soundFX: true
}

export const options = writable(JSON.parse(localStorage?.getItem('options')) || defaults);

options.subscribe((value) => localStorage.options = JSON.stringify(value));
