import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';
export const accentColor = writable('#f4b8e4');

if (isBrowser) {
    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
        accentColor.set(savedColor);
    }

    accentColor.subscribe(value => {
        localStorage.setItem('accentColor', value);
    });
}
