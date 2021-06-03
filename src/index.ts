// @ts-ignore
import PuzzleImage from './assets/monks.jpg';
import './style.css';
(function () {
  //IFFY
  class monkChallenge {
    board: any[] = [];
    private rows: number;
    private cols: number;
    private readonly directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ];
    image = new Image();

    constructor() {
      this.rows = 2;
      this.cols = 2;
      this.image.onload = this.initializeBoard.bind(this);
      this.image.src = PuzzleImage;
    }

    initializeBoard(): void {
      for (let i = 0; i < this.rows; i++) {
        this.board[i] = [];
        for (let j = 0; j < this.cols; j++) {
          this.board[i][j] = {
            position: {
              row: i,
              col: j,
            },
            empty: false,
          };
        }
      }
      this.board[this.rows - 1][this.cols - 1].empty = true;
      this.shufflePuzzle(this.board);
      const table = document.getElementById('challenge');
      for (let i = 0; i < this.rows; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < this.cols; j++) {
          const td = document.createElement('td');
          td.setAttribute('id', `puzzle${this.rows * i + (j + 1)}`);
          td.addEventListener('click', this.slide.bind(this, i, j));
          tr.appendChild(td);
        }
        if (table) {
          table.appendChild(tr);
        }
      }
      this.buildPuzzle();
    }

    buildPuzzle(): void {
      const width = this.image.width / this.cols;
      const height = this.image.height / this.rows;

      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          const td = document.getElementById(
            `puzzle${this.rows * i + (j + 1)}`
          );
          if (td) {
            td.setAttribute(
              'style',
              `width: ${width}px; height: ${height}px; background: 
                  ${
                    this.board[i][j].empty
                      ? "none"
                      : "url('" +
                        PuzzleImage +
                        "') no-repeat -" +
                        this.board[i][j].position.col * width +
                        "px -" +
                        this.board[i][j].position.row * height +
                        "px"
                  }`
            );
          }
        }
      }
    }

    slide(row: number, col: number): void {
      function change(
        this: monkChallenge,
        x: number,
        y: number,
        row: number,
        col: number
      ): void {
        let temp = this.board[row][col];
        this.board[row][col] = this.board[row + y][col + x];
        this.board[row + y][col + x] = temp;
      }

      this.directions.forEach((direction) => {
        if (
          this.board[row + direction.y] &&
          this.board[row + direction.y][col + direction.x] &&
          this.board[row + direction.y][col + direction.x].empty
        ) {
          change.call(this, direction.x, direction.y, row, col);
        }
      });

      if (this.isCompleted()) {
        const container = document.getElementById('challengeContainer');
        const challenge = document.getElementById('challenge');
        const completedMessage = document.createElement('h1');
        completedMessage.setAttribute('id', 'completeMessage');
        completedMessage.setAttribute('data-content', 'Congratulations!🧘');
        const img = document.createElement('img');
        img.setAttribute('src', PuzzleImage);
        if (container && challenge) {
          container.removeChild(challenge);
          container.appendChild(img);
          container.appendChild(completedMessage);
        }
      } else {
        this.buildPuzzle();
      }
    }

    isCompleted(): boolean {
      let completed = true;
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          if (
            this.board[row][col].position.row !== row ||
            this.board[row][col].position.col !== col
          ) {
            completed = false;
          }
        }
      }
      return completed;
    }

    shufflePuzzle(a: any[]): void {
      for (let i = a.length - 1; i > 0; i--) {
        for (let j = a[i].length - 1; j > 0; j--) {
          const randRow = Math.floor(Math.random() * (i + 1));
          const randCol = Math.floor(Math.random() * (j + 1));

          let temp = a[i][j];
          a[i][j] = a[randRow][randCol];
          a[randRow][randCol] = temp;
        }
      }
    }
  }

  return new monkChallenge();
})();
//TODO: improvements: it could be 'variable on size by user input or by init with the numbers'
