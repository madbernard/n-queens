/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // if n was 3 array [[1,0,0],[0,1,0],[0,0,1]];
  var emptyBoard = new Board({n:n});
  var rowIndex = 0;
  var colIndex = 0;
  //emptyBoard.rows is the array of arrays
  //emptyBoard.togglePiece(0,0) at top corner

  // put rook at top corner
  // row and column 0 are forbidden
  // ---
  // board is only from 1,1 to n,n
  // --- place rook fn on smaller board
  // put rook at 0,0 (aka 1,1)
  while (rowIndex < n) {
    emptyBoard.togglePiece(rowIndex,colIndex);
    rowIndex++;
    colIndex++;
  }


  var solution = emptyBoard.rows();


  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = factorial(n);
  function factorial(num){
    if(num === 0){return 1} else { return num * factorial(num -1)}
  }

  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var allSolutions = [];
  var queenBoard = new Board({n:n});
  var emptyBoard = new Board({n:n});
  var empty = emptyBoard.rows();

  function search(queensToPlace, rowIndex) {
    // http://stackoverflow.com/questions/21003059/how-do-you-clone-an-array-of-objects-using-underscore
    //base case queens all placed
    if (queensToPlace === 0) {
      solution = queenBoard.rows();
      var b = _.map(solution, _.clone);
      allSolutions.push(b);
      return;
    }
    // columns is i
    for (var i = 0; i < n; i++) {
      queenBoard.togglePiece(rowIndex, i);
      if (!queenBoard.hasAnyQueenConflictsOn(rowIndex, i)) {
        // good spot
        search(queensToPlace - 1, rowIndex + 1);
        queenBoard.togglePiece(rowIndex, i);
      }
      else {
        queenBoard.togglePiece(rowIndex, i);
      }
    }
  }

  search(n, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(allSolutions[0]));
  console.log(allSolutions);
  return allSolutions[0] || empty;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n, rowIndex, queenBoard) {
//   if (rowIndex === undefined) {
//     rowIndex = 0;
//   }

//   if (queenBoard === undefined) {
//     queenBoard =  new Board({n:n});
//   }
//   var rowNumber = queenBoard.rows();
//   var solutionCount = 0;

// //  function queenSearch(queensToPlace, rowIdx) {
//     // base case is when n is 0, all queens placed
//     if (n === 0) {
//       return 1;
// //      return;
//     }

//     // recurse, i is column index
//     for (var i = 0; i < rowNumber.length; i++) {
//       queenBoard.togglePiece(rowIndex, i);
//       if (!queenBoard.hasAnyQueenConflictsOn(rowIndex, i)) {
//         //great place for queen for now
//         solutionCount += this.countNQueensSolutions(n - 1, rowIndex + 1, queenBoard);
//         queenBoard.togglePiece(rowIndex, i);
//       }
//       else {
//         // queen would die here, move her
//         queenBoard.togglePiece(rowIndex, i);
//       }
//     }
// n === 5
//allOnes = 11111
var allOnes = (1 << n) - 1;

  var solutions = 0;

  function nextRow(rightCon, leftCon, columnCon) {
    if (columnCon === allOnes) {
      solutions++;
    } else {
      /// ~(0)
      ///(00001) & (11111)
      //open === 00001
      // right 00000 left 00000 col 00000 invert to 11111 & allones 000000000011111
      // open is 11111

      // 2nd time 00000 left 00010 col 00001 go to 00011 then 11100 then & 11100

      // it recurses!!
      var open = ~(rightCon | leftCon | columnCon) & allOnes;

      while (open !== 0) {
        // nextopen...  open is 11111 and -open is ??
        // nextopen is 00001
        // 2nd time nextopen 00100
        var nextOpen = (open & -open);
        // open is 11110
        // 2nd open before reassignment 11100 ^ 00100
        // 2nd time open becomes 11000
        open = open ^ nextOpen;

        var right = rightCon;
        var left = leftCon;
        var column = columnCon;

        nextRow(
            // 00000 | 00001 >> 00000 & goes to  00000
            // 2nd time 00000 |
            ((rightCon | nextOpen) >> 1) & allOnes,
            // 00000 | 00001 << 00010 & goes to  00010
            ((leftCon | nextOpen) << 1) & allOnes,
            // 00000 | 00001 goes to 00001
            columnCon | nextOpen);
      }
    }
  }
  nextRow(0, 0, 0);

  return solutions;

// pos 0000||||||111 neg (where are the 0's, they indicate)
// pos 8421/0||1/248 neg
// negative 1 is 11111
// negative 2 is 11110
// negative 3 is 11101
// negative 4 is 11100
// negative 5 is 11011
  return solutionCount;
};
