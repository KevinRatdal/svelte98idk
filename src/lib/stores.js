import { derived, writable } from "svelte/store";


/**
 * @typedef {object} Program
 * @property {string} title
 * @property {string} name
 * @property {string} windowUUID
 * @property {boolean} minimized
  */

/** 
  * Writable store for handling a string variable.
  * @type {import('svelte/store').Writable<string[]>}
  */
export const windowFocusOrder = writable([])


/** 
  * Writable store for handling a Programs.
  * @type {import('svelte/store').Writable<Program[]>}
  */
export const programs = writable([])

export const visibleFocusOrder = derived(
  [windowFocusOrder, programs],
  ([$windowFocusOrder, $programs]) => {
    return $windowFocusOrder.filter((val) => !$programs.find(e => e.windowUUID === val )?.minimized)
  }
)