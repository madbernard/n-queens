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

  console.log(emptyBoard.rows());
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
  // only need to do the top row, all answers that come from each space there
  // because n rooks fill the board
  // solutionCount is one number
  var solutionCount = 0;
  var rookBoard = new Board({n:n});
  var rowArray = rookBoard.rows();

  // solutionCount increments when there are n rooks on the board
  // ie rooks = 0
  // the recursive fn tracks rooks/n?
  // passing info:  as a parameter, or return it

  // n is # of rooks to place
  function recurse(rowIdx, n) {
    // base case
    if (n === 0) {
      solutionCount++;
      return;
    }

    // recursive case
    //rowArraylength is 2
    for(var i = 0; i < rowArray.length; i++) {
      //first row...  i is column addresses
      //start with rook at 0, i and look for solutions
      rookBoard.togglePiece(rowIdx,i);
      if (!rookBoard.hasAnyRooksConflicts()){
        //this is a good spot
        // move on to next row
        recurse(rowIdx+1, n-1);
      }
      else {
        // no good in i/column space
        // try other spaces in that row not yet tested ie, new i
        rookBoard.togglePiece(rowIdx,i);
      }
      //at some spot in top row of board, spot denoted by i, rook placed there
      //----- call itself?
      //look at next row down, place rook in spot that isn't conflicted
      //
    }
  }
  recurse(0,n);

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
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
