

type MinesweeperOptions = {
  height?: number,
  width?: number,
  mines?: number,
  stateChange?: GameStateChange
}

type GameStateChange = (state: GameState) => void

export type MSBox = {
  flagged: boolean,
  revealed: boolean,
  mine: boolean,
  number: number,
  x?: number,
  y?: number
}

export type GameState = {
  grid: MSBox[][],
  gameOver: boolean,
  isWin: boolean,
  mines: number
}

export class Minesweeper {
  height = $state(8);
  width = $state(10);
  mines = $state(10);
  gameOver = $state(false);
  isWin = $state(false);
  grid = $state<MSBox[][]>([[{flagged: false, revealed: false, mine: false, number: 0, x: 0, y: 0}]]);

  constructor(options?: MinesweeperOptions) {
    this.height = options?.height ?? 8
    this.width = options?.width ?? 10
    this.mines = options?.mines ?? 10
    // this.stateChange = options?.stateChange ?? null
    this.grid = this.initGrid()
    this.gameOver = false
    this.isWin = false
    this.initBombs()
    this.initNumbers()
    // this.updateGameState()

  }

  // updateGameState() {
  //   if (typeof this.stateChange === 'function') {
  //     this.stateChange({grid: this.grid, gameOver: this.gameOver, isWin: this.isWin, mines: this.mines})
  //   }
  // }

  reset() {
    this.grid = this.initGrid()
    this.gameOver = false
    this.isWin = false
    this.initBombs()
    this.initNumbers()
    // this.updateGameState()

  }

  initGrid() {
    const newGrid: MSBox[][] = []
    for (let y = 0; y < this.height; y++) {
      newGrid.push([])
      for (let x = 0; x < this.width; x++) {
        newGrid[y].push({
          flagged: false,
          revealed: false,
          mine: false,
          number: 0,
          x: x,
          y: y
        })
      }
    }
    return newGrid
  }

  initBombs() {
    for (let i = 0; i < this.mines; i++) {
      const x = Math.floor(Math.random() * this.width)
      const y = Math.floor(Math.random() * this.height)
      this.grid[y][x].mine = true
    }
  }

  initNumbers() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.grid[i][j].mine) {
          continue
        }
        
        this.grid[i][j].number = this.countNeighborBombs(j, i)
      }
    }
  }

  countNeighborBombs(x: number, y: number) {
    let count = 0
    // top
    if ((y > 0) && (this.grid[y - 1][x].mine)) count++;
    // bottom
    if ((y < this.height - 1) && (this.grid[y + 1][x].mine)) count++;
    // left
    if ((x > 0) && (this.grid[y][x - 1].mine)) count++;
    // right
    if ((x < this.width - 1) && (this.grid[y][x + 1].mine)) count++
     
    // top-left
    if ((y > 0 && x > 0) && (this.grid[y - 1][x - 1].mine)) count++;
    // top-right
    if ((y > 0 && x < this.width - 1) && (this.grid[y - 1][x + 1].mine)) count++;
    // bottom-left
    if ((y < this.height - 1 && x > 0) && (this.grid[y + 1][x - 1].mine)) count++;
    // bottom-right
    if ((y < this.height - 1 && x < this.width - 1) && (this.grid[y + 1][x + 1].mine)) count++;

    return count
  }

  previewBoard() {
    console.log('board preview')
    for (let y = 0; y < this.height; y++) {
      const l:string[] = []
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x].mine) {
          l.push('X')
        } else {
          l.push(String(this.grid[y][x].number))
        }
      }
      console.log(l.join('|'))
    }
    console.log('---')
    // this.updateGameState()
  }

  revealCell(x: number, y: number) {
    if (this.grid[y][x].mine && !this.grid[y][x].flagged) { // Cell is a bomb - end and reveal all
      this.grid[y][x].revealed = true
      for (let yi = 0; yi < this.height; yi++) {
        for (let xi = 0; xi < this.width; xi++) {
          this.grid[yi][xi].revealed = true
          this.grid[yi][xi].flagged = false
        }
      }
      this.gameOver = true
      // this.updateGameState()
      return
    }

    if (this.grid[y][x].revealed ||  this.grid[y][x].flagged) { // Cell is already revealed / flagged - skip
      // this.updateGameState()
      return
    }

    if (this.grid[y][x].number === 0) { // Cell is empty - reveal
      this.revealEmptyNeighbors(x, y)
    }

    if (this.grid[y][x].number) {
      this.grid[y][x].revealed = true
    }
    this.checkWin()
    // this.updateGameState()
  }

  toggleFlag(x: number, y: number) {
    if (!this.grid[y][x].revealed) {
      this.grid[y][x].flagged = !this.grid[y][x].flagged
    }
    if (this.grid[y][x].mine) {
      this.checkWin()
    }
    // this.updateGameState()
  }

  revealEmptyNeighbors(x: number, y: number) {
    if (this.grid[y][x].mine || this.grid[y][x].revealed || this.grid[y][x].flagged) return;
    this.grid[y][x].revealed = true
    if (this.grid[y][x].number !== 0) return;
    // if the number is zero, we want to check the neighboring cells,
    // if the cell has a mine or is already revealed, we skip
    // if the number is non-zero we reveal and skip the neighbor check
     // top
    if ((y > 0) && (!this.grid[y - 1][x].revealed)) this.revealEmptyNeighbors(x, y-1);
    // bottom
    if ((y < this.height - 1) && (!this.grid[y + 1][x].revealed)) this.revealEmptyNeighbors(x, y+1);
    // left
    if ((x > 0) && (!this.grid[y][x - 1].revealed)) this.revealEmptyNeighbors(x-1, y);
    // right
    if ((x < this.width - 1) && (!this.grid[y][x + 1].revealed)) this.revealEmptyNeighbors(x + 1, y);
  }

  checkWin() {
    let win = true
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const cell = this.grid[i][j]
        if (!cell.mine && !cell.revealed) {
          win = false
        }
        if (cell.mine && cell.revealed) {
          win = false
        }
        if (cell.mine && !cell.flagged) {
          win = false
        }
        if (!win) {
          this.isWin = false
          return
        }
      }
    }
    this.isWin = win
  }

}


// const gam = new Minesweeper()
// gam.previewBoard()

// 
// init game
// First click should never lose
// clicking a 0 cell, should reveal all connected 0's
// Gameloop:
// user input - (un)flag / reveal
// check win
// - win - all revealed + all bombs flagged
// - lose - bomb opened -> reveal all bombs + game over