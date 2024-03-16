/* eslint-disable no-unused-vars */
// @ts-nocheck

/**
     * @param {HTMLDivElement} element
     */
export function move(element, enabled) {

  return {
    destroy() {
    }
  }
}
/**
 * @param {HTMLDivElement} element
 * @param {boolean} element
 */
export function resize(element, enabled=false) {
  if (!enabled) return;
  const right = document.createElement('div')
  // @ts-ignore
  right.direction = 'east'
  right.classList.add('grabber')
  right.classList.add('right')

  const bottom = document.createElement('div')
  // @ts-ignore
  bottom.direction = 'south'
  bottom.classList.add('grabber')
  bottom.classList.add('bottom')

  const bottomRight = document.createElement('div')
  // @ts-ignore
  bottomRight.direction = 'southeast'
  bottomRight.classList.add('grabber')
  bottomRight.classList.add('bottom-right')

  const grabbers = [right, bottom, bottomRight]

  let active = null;
  let initialRect = null;
  let initialPos = null;

  grabbers.forEach(grabber => {
    element.appendChild(grabber)
    grabber.addEventListener('mousedown', onMousedown)
  })

  function onMousedown(event) {
    active = event.target
    const rect = element.getBoundingClientRect()
    const parent = element.parentElement.getBoundingClientRect()

    // console.log({ rect, parent })

    initialRect = {
      width: rect.width,
      height: rect.height,
      left: rect.left - parent.left,
      right: parent.right - rect.right,
      top: rect.top - parent.top,
      bottom: parent.bottom - rect.bottom
    }
    initialPos = { x: event.pageX, y: event.pageY }
    active.classList.add('selected')
  }

  function onMouseup() {
    if (!active) return

    active.classList.remove('selected')
    active = null
    initialRect = null
    initialPos = null
  }

  /**
       * @param {{ pageX: number; pageY: number; }} event
       */
  function onMove(event) {
    if (!active) return

    const direction = active.direction
    let delta

    if (direction.match('east')) {
      delta = event.pageX - initialPos.x
      element.style.width = `${initialRect.width + delta}px`
    }

    if (direction.match('west')) {
      delta = initialPos.x - event.pageX
      element.style.left = `${initialRect.left - delta}px`
      element.style.width = `${initialRect.width + delta}px`
    }

    if (direction.match('north')) {
      delta = initialPos.y - event.pageY
      element.style.top = `${initialRect.top - delta}px`
      element.style.height = `${initialRect.height + delta}px`
    }

    if (direction.match('south')) {
      delta = event.pageY - initialPos.y
      element.style.height = `${initialRect.height + delta}px`
    }
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onMouseup)

  return {
    destroy() {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousemove', onMousedown)

      grabbers.forEach(grabber => {
        element.removeChild(grabber)
      })
    }
  }
}