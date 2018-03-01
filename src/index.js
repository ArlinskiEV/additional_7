module.exports = function solveSudoku(matrix) {
  // your solution
  let items = matrix
    .reduce((prev, item) => [...prev, ...item], [])
    // init
    .map((item, index) => ({
      current: item,
      mayBe: item
        ? []
        : [1, 2, 3, 4, 5, 6, 7, 8, 9],
      row: Math.trunc(index / 9),
      column: index % 9,
      square: (Math.trunc(Math.trunc(index / 9) / 3) * 3) + Math.trunc((index % 9) / 3),})
    );

  function simple() {
    let flag = false;
    do {
      flag = false;
      items
      .filter(item => item.mayBe.length !== 0)
      .forEach(item => {
        // reduce mayBe array by current in row/col/quad
        item.mayBe = item.mayBe.filter(num => {
          let inThis = items
            .filter(i => ((i.row === item.row) || (i.column === item.column) || (i.square === item.square)))
            .some(j => j.current === num);
          return !(inThis);
        });
        if (item.mayBe.length === 0) {
          let inThis = items
            .filter(i => ((i.row === item.row) || (i.column === item.column) || (i.square === item.square)));

              window.console.log(items
                .reduce((P, X, I) => {
                  P[Math.trunc(I / 9)][I % 9] = X.current ? X.current : X.mayBe.join('/');
                  return P;
                }, [[], [], [], [], [], [], [], [], []]));
          window.console.log(`UPS`);
          throw new Error('WTF??');
        };
        if (item.mayBe.length === 1) {
          item.current = item.mayBe.pop();
          flag = true;
        } else {
          // find num which can be only in this place
          let only = item.mayBe.filter(num => {
            let row = items
              .filter(i => (i.row === item.row) && (i.column !== item.column))
              .every(j => j.mayBe.indexOf(num) === -1);
            let column = items
              .filter(i => (i.row !== item.row) && (i.column === item.column))
              .every(j => j.mayBe.indexOf(num) === -1);
            let square = items
              .filter(i => (i.square === item.square) && !((i.row === item.row) && (i.column === item.column)))
              .every(j => j.mayBe.indexOf(num) === -1);

            return row || column || square;
          });

          if (only.length === 1) {
            item.current = only.pop();
            item.mayBe = [];
            flag = true;
          }
        };
      });
    } while (flag);

    return items.reduce((prev, i) => i.mayBe.length === 0 ? prev : prev + 1, 0);
  }

  let res = simple();
  let f = res > 0;
  while ((res > 0) && (f)) {
    f = res;



    let temp = [...items].sort((a, b) => a.mayBe.length - b.mayBe.length);
    let first = temp[temp.findIndex(i => i.mayBe.length !== 0)];
                                      // window.console.log(`before:`);
                                      // window.console.log(items
                                      //   .reduce((prev, item, index) => {
                                      //     prev[Math.trunc(index / 9)][index % 9] = item.current ? item.current : item.mayBe.join('/');
                                      //     return prev;
                                      //   }, [[], [], [], [], [], [], [], [], []]));
    
    first.current = first.mayBe[0];
                                      // window.console.log(`row:${first.row} col:${first.column} => ${first.current}`);
    first.mayBe = [];
    res = simple();
    f = res !== f;
  }
  
  return items
    .reduce((prev, item, index) => {
      prev[Math.trunc(index / 9)][index % 9] = item.current ? item.current : item.mayBe.join('/');
      return prev;
    }, [[], [], [], [], [], [], [], [], []]);
}
