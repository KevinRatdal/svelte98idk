import { readable } from "svelte/store";

export default function timer(options={}) {
  return readable(null, set => {
    const update = () => {
      // @ts-ignore
      set(new Date().toLocaleTimeString('no').slice(0,9))
    }
    update()
    // @ts-ignore
    const interval = setInterval(update, options.interval || 1000)
    return () => clearInterval(interval)
  // @ts-ignore
  }) 
}