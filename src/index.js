module.exports = function solveSudoku(matrix) {
  // your solution
  let items = matrix
    .reduce((prev, item) => [...prev, ...item], [])
    .map((item, index) => ({
      current: item,
      mayBe: item
        ? []
        : [1, 2, 3, 4, 5, 6, 7, 8, 9],
      row: Math.trunc(index / 9),
      column: index % 9,
      square: index,})
    );

  let flag = false;
  do {
    flag = false;
    items
    .filter(item => item.mayBe.length !== 0)
    .forEach(item => {
      // reduce mayBe array
      item.mayBe = item.mayBe.filter(num => {
        let inThis = items
          .filter(i => ((i.row === item.row) || (i.column === item.column) || (i.square === item.square)))
          .some(j => j.current === num);
        return !(inThis);
      });

      if (item.mayBe.length === 1) {
        item.current = item.mayBe.pop();
        flag = true;
        window.console.log(`row=${item.row} col=${item.column} current=${item.current}`);
      };
    });
  } while (flag);
  
  return items
    .reduce((prev, item, index) => {
      prev[Math.trunc(index / 9)][index % 9] = item.current;
      return prev;
    }, [[], [], [], [], [], [], [], [], []]);
}
