<script>
// @ts-nocheck


    /**
     * @param {HTMLDivElement} element
     */
    function move(element) {
		
		return {
			destroy() {
			}
		}
	}
    /**
     * @param {HTMLDivElement} element
     */
    function resize(element) {
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
			
			console.log({rect, parent})
			
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
	
	let grabber = false

</script>

<div class="window-body hide-grabber" use:move use:resize >
    <slot />
</div>

<style>
    .window-body {
        overflow: scroll;
        margin: 0;
        padding: 8px;
    }
    :global(.grabber) {
		position: absolute;
		box-sizing: border-box; 
	}
	
	:global(.grabber.right) {
		width: 5px;
		height: calc(100% - 10px);
		background: red;
		right: -2px;
        bottom: 10px;
		cursor: col-resize;
	}
	
	:global(.grabber.bottom) {
		height: 5px;
		width: calc(100% - 10px);
		background: orange;
        right: 10px;
		bottom: -3px;
		cursor: row-resize;
	}
	
	:global(.grabber.bottom-right) {
		height: 20px;
		width: 20px;
		background: green;
		bottom: -10px;
		right: -10px;
		cursor: se-resize;
		border-radius: 100%;
	}
	
	:global(.hide-grabber .grabber) {
		background: transparent !important;
		border: none !important;
	}
	
	:global(.grabber.selected) {
		border: solid 1px black;
	}
	
</style>