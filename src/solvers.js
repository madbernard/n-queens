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

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = factorial(n);
  function factorial(num){
    if(num === 0){return 1} else { return num * factorial(num -1)}
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var queenBoard = new Board({n:n});

  var solutionCount = 0;

  function queenSearch(queensToPlace, rowIdx) {
    // base case is when n is 0, all queens placed
    if (queensToPlace === 0) {
      solutionCount++;
      return;
    }

    // recurse, i is column index
    for (var i = 0; i < n; i++) {
      queenBoard.togglePiece(rowIdx, i);
      if (!queenBoard.hasAnyQueenConflictsOn(rowIdx, i)) {
        //great place for queen for now
        queenSearch(queensToPlace - 1, rowIdx + 1);
        queenBoard.togglePiece(rowIdx, i);
      }
      else {
        // queen would die here, move her
        queenBoard.togglePiece(rowIdx, i);
      }
    }
  }

  queenSearch(n, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
