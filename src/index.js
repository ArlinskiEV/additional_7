module.exports = function solveSudoku(matrix) {
  // your solution
  class Sudoku {
    constructor(desc) {
      this.desc = {
        items: desc
          .reduce((prev, item) => [...prev, ...item], [])
          .map(item => ({
            current: item,
            mayBe: item
              ? []
              : [1, 2, 3, 4, 5, 6, 7, 8, 9],
          })),
        rows: [[], [], [], [], [], [], [], [], []],
        columns: [[], [], [], [], [], [], [], [], []],
        squares: [[], [], [], [], [], [], [], [], []],
      };
      this.desc.items
        .forEach((item, index) => {
          // window.console.log(`this=${this}`);
          // window.console.log(`index=${index} trunc/9: ${Math.trunc(index / 9)} %9:${index % 9} trunc/3: ${Math.trunc(index / 3)} %3 ${index % 3}`);
          this.desc.rows[Math.trunc(index / 9)][index % 9] = item;
          this.desc.columns[index % 9][Math.trunc(index / 9)] = item;
          // this.desc.squares[][] = item;
        });
      
      this.desc.items
        .forEach((item, index) => {
          if (item.current === 0) {
            // ---------------------------------------------------------
            this.desc.rows.forEach((a, i) => {
              if (a.indexOf(item) !== -1) {
                window.console.log(`r: ${i}`);
              }
              return 0;
            });
            this.desc.columns.forEach((a, i) => {
              if (a.indexOf(item) !== -1) {
                window.console.log(`c: ${i}`);
              }
              return 0;
            });
            window.console.log(`mayBe:${item.mayBe}`);
            // ---------------------------------------------------------
            let row = this.desc.rows.findIndex();
            let column = [];
            // let square = [];
          }
        });
    }
  }
}
