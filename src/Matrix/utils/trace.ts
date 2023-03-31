import { MatrixIface } from '../types';
import { isSquareMatrix } from './identifyMatrixType';

export function trace(matrix: MatrixIface): number {
    // must be a square matrix
    if (!isSquareMatrix(matrix)) {
        throw new Error('trace only works on square matrices');
    }

    // loop through the rows
    let trace = 0;
    for (let row = 0; row < matrix.numRows; row++) {
        // loop through the columns
        for (let col = 0; col < matrix.numCols; col++) {
            // if the entry is on the diagonal
            if (row === col) {
                // add the entry to the trace
                trace += matrix.get(row, col);
            }
        }
    }

    // return the trace
    return trace;
}
