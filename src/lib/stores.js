import { writable } from "svelte/store";


/** 
  * writable store for handling a string variable.
  * @type {import('svelte/store').Writable<string[]>}
  */
export const windowFocusOrder = writable([])