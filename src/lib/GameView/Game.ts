export class Game {
  score: number;
  grid: number[][];
  gridSize: number;
  isFinished: Boolean;

  constructor(gridSize: number = 4) {
    this.score = 0
    this.gridSize = gridSize
    this.isFinished = false
    this.grid = this.initGrid()
    this.start()
  }

  initGrid() {
    let newGrid = []
    for (let x = 0; x < this.gridSize; x++) {
      newGrid[x] = new Array(this.gridSize).fill(0)
    }
    return newGrid
  }

  start() {
    const randomX = Math.floor(this.gridSize * Math.random())
    const randomY = Math.floor(this.gridSize * Math.random())
    // const startVal = Math.floor((2 * Math.random()) + 1 ) * 2
    const startVal = 2
    this.grid[randomX][randomY] = startVal
  }

  restart() {
    this.score = 0
    this.isFinished = false
    this.grid = this.initGrid()
    this.start()
  }

  viewGrid() {
    console.log(JSON.stringify(this.grid))
  }

  getGrid() {
    return this.grid
  }

  getScore() {
    return this.score
  }

  getIsFinished() {
    return this.isFinished
  }

  _getEmptyPositions(): any[] {
    let empties = []
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        if (this.grid[x][y] === 0) {
          empties.push({ x: x, y: y })
        }
      }
    }
    return empties
  }

  _setRandomSquare() {
    let emptyPositions = this._getEmptyPositions()
    if (emptyPositions.length <= 0) {
      return
    }
    const { x, y } = emptyPositions[Math.floor(emptyPositions.length * Math.random())]
    const randomValue = (Math.random() < 0.1) ? 4 : 2
    this.grid[x][y] = randomValue
  }

  _checkFinishState() {
    // check if grid is full
    for (let row of this.grid) {
      for (let col of row) {
        if (col === 0) {
          this.isFinished = false
          return
        }
      }
    }
    // Board is full
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        const n = this.grid[x][y]
        const under = this.grid?.[x + 1]?.[y]
        const right = this.grid?.[x]?.[y + 1]
        if (n === under || n === right) {
          this.isFinished = false
          return
        }
      }
    }
    this.isFinished = true
    
  }

  move(direction: string) {
    console.log('moving', direction, this.isFinished)
    if (this.isFinished) {
      return
    }
    switch (direction) {
      case 'up':
        if (this._handleMoveUp()) {
          this._setRandomSquare()
        }
        break;
      case 'down':
        if (this._handleMoveDown()) {
          this._setRandomSquare()
        }
        break;
      case 'left':
        if (this._handleMoveLeft()) {
          this._setRandomSquare()
        }
        break;
      case 'right':
        if (this._handleMoveRight()) {
          this._setRandomSquare()
        }
        break;

      default:
        break;
    }
    this._checkFinishState()
  }

  _handleMoveUp() {
    console.log('move up')
    let gridChanged = false
    for (let i = 0; i < this.gridSize; i++) {
      let gridArray = []

      for (let y = 0; y < this.gridSize; y++) {
        gridArray[y] = this.grid[y][i]
      }
      let { newSection, changed } = this._handleSectionMove(gridArray)
      if (changed) {
        for (let y = 0; y < this.gridSize; y++) {
          this.grid[y][i] = newSection[y]
        }
        gridChanged = true
      }
    }
    return gridChanged
    // for each column in the grid
    // create an array from values and try to move numbers "upwards"
  }
  _handleMoveDown() {
    console.log('move down')
    let gridChanged = false
    for (let i = 0; i < this.gridSize; i++) {
      let gridArray = []

      for (let y = 0; y < this.gridSize; y++) {
        gridArray[y] = this.grid[y][i]
      }
      gridArray.reverse()
      let { newSection, changed } = this._handleSectionMove(gridArray)
      newSection.reverse()
      if (changed) {
        for (let y = 0; y < this.gridSize; y++) {
          this.grid[y][i] = newSection[y]
        }
        gridChanged = true
      }
    }
    return gridChanged
    // for each column in the grid
    // create an array from reverse values and try to move numbers "downwards"

  }
  _handleMoveLeft() {
    console.log('move left')
    let gridChanged = false
    for (let i = 0; i < this.gridSize; i++) {
      let gridArray = this.grid[i]
      let { newSection, changed } = this._handleSectionMove(gridArray)
      if (changed) {
        this.grid[i] = newSection
        gridChanged = true
      }
    }
    return gridChanged
    // for each row in the grid
    // create an array from values and try to move numbers "leftwards"  
  }
  _handleMoveRight() {
    console.log('move right')
    let gridChanged = false
    for (let i = 0; i < this.gridSize; i++) {
      let gridArray = [...this.grid[i]].reverse()
      let { newSection, changed } = this._handleSectionMove(gridArray)
      if (changed) {
        this.grid[i] = newSection.reverse()
        gridChanged = true
      }
    }
    return gridChanged
    // for each row in the grid
    // create an array from reverse values and try to move numbers "rightwards"
  }

  _handleSectionMove(section: number[]) {
    let changed = false
    let newSection = [...section]

    for (let index = 0; index < newSection.length; index++) {
      let next = newSection.findIndex((value, _nextIndex) => {
        return _nextIndex > index && value !== 0;
      });
      // if next entry is not found, skip
      if (next !== -1) {
        if (newSection[index] === 0) {
          newSection[index] = newSection[next];
          newSection[next] = 0;
          index -= 1;
          changed = true;
        } else if (newSection[index] === newSection[next]) {
          newSection[index] = newSection[index] * 2;
          console.log("inc SCore")
          this.score += newSection[index]
          newSection[next] = 0;
          changed = true;
        }
      }
    }
    // for each entry of the array, check if the next one is equal,
    // if it is, merge the current cell to the next
    // if it isnt check the next
    // comparison should be done backwards i.e.
    // [0,2,2,2] -> [4,2,0,0]
    // needs to return some of of indicator for if the array has changed or not
    return { newSection, changed }
  }

}

