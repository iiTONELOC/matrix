import { MatrixIface } from '../types';

export function scale(matrix: MatrixIface, scalar: number): MatrixIface {

    // validate the input parameters
    // istanbul ignore next
    if (typeof scalar !== 'number') {
        throw new Error('The scalar must be a number');
    }

    // needs to be a finite number
    if (!Number.isFinite(scalar)) {
        throw new Error('The scalar must be a finite number');
    }

    const copy = matrix.clone();

    // scaling is done by multiplying each entry
    // in the matrix by the scalar
    for (let row = 0; row < copy.numRows; row++) {
        // loop through the columns
        for (let col = 0; col < copy.numCols; col++) {
            // multiply the entry by the scalar
            copy.set(row, col, copy.get(row, col) * scalar);
        }
    }

    return copy;
}
