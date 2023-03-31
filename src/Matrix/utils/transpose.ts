import { MatrixIface } from '../types';

export function transpose(self: MatrixIface): number[] {
    // a transpose is a flip of the rows and columns
    const newMatrix = Array.from({ length: self.numRows * self.numCols }, () => 0);

    // loop through the rows
    for (let row = 0; row < self.numRows; row++) {
        // loop through the columns
        for (let col = 0; col < self.numCols; col++) {
            // get the entry
            const entry = self.get(row, col);

            // set the entry in the new matrix
            newMatrix[col * self.numRows + row] = entry;
        }
    }

    // return the new matrix
    return newMatrix;
}
