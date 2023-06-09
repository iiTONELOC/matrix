import { MatrixIface } from '../../types';
import EchelonForm from '.';

export const errMsg = 'Matrix is not in echelon form';

/**
 * Determines if a matrix has zero rows and if it does it
 * checks the following:
 *
 * 1. all rows below the zero rows are also zero rows
 * 2. all rows above the zero rows are non-zero rows
 * @param matrix the matrix we are operating on
 * @returns void
 * @throws Error if the checks fail, if they fail the matrix is not in echelon form
 */
export function checkZeroRows(matrix: MatrixIface): void { //NOSONAR
    // loop over the rows of the matrix
    let foundZeroRow = false;
    const zeroRowIndices: number[] = [];

    for (let row = 0; row < matrix.numRows; row++) {
        // if the row is all zeros, return true
        if (EchelonForm.isZeroRow(matrix, row)) {
            foundZeroRow = true;
            zeroRowIndices.push(row);
        }
    }

    // if we dont find any zero rows we can return
    if (!foundZeroRow && zeroRowIndices.length === 0) {
        return;
    }

    // check that all rows below the zero rows are also zero rows
    for (const element of zeroRowIndices) {
        const zeroRowIndex = element;
        for (let nextRow = zeroRowIndex + 1; nextRow < matrix.numRows; nextRow++) {
            if (!EchelonForm.isZeroRow(matrix, nextRow)) {
                throw new Error(errMsg);
            }
        }
    }

    // check that all rows above the the last zero row are non-zero rows
    for (let row = 0; row < zeroRowIndices[0]; row++) {
        if (EchelonForm.isZeroRow(matrix, row)) {
            throw new Error(errMsg);
        }
    }
}

/**
 * Checks for leading entries in a matrix and if it finds any it
 * checks the following:
 *
 * 1. the leading entries are in the correct order
 * 2. all entries below a leading entry are zeros
 * 3. the leading entry in question is to the right of the leading entry in the row above it
 *
 * @param matrix the matrix we are operating on
 * @returns void
 * @throws Error if the checks fail, if they fail the matrix is not in echelon form
 */
export function checkLeadingEntries(matrix: MatrixIface, checkReduced = false): void { //NOSONAR

    const leadingEntries: Map<number, number> = new Map();


    // loop over the rows of the matrix
    for (let row = 0; row < matrix.numRows; row++) {
        const Row = matrix.getRow(row);

        // loop over the entries of the row
        for (let col = 0; col < Row.length; col++) {
            const entry = Row[col];

            const firstNonZeroEntryIndex = Row.findIndex((entry: number) => entry !== 0);
            // The leading entry of a row is the first nonzero entry from the left.
            const isLeadingEntry = entry !== 0 && col === firstNonZeroEntryIndex;
            if (isLeadingEntry) {
                leadingEntries.set(row, col);
            }
        }
    }

    // console.log({ leadingEntries })

    // 2.check that the leading entries are in the correct order
    let prevLeadingEntry = -1;

    for (const [row, leadingEntry] of leadingEntries) {

        if (leadingEntry <= prevLeadingEntry) {
            throw new Error(errMsg);
        }

        // 3. check that all entries in the same column below the leading entry are zero
        for (let nextRow = row + 1; nextRow < matrix.numRows; nextRow++) {
            // only need to check the entries below the leading entry and not any other
            // entries in the row
            if (matrix.get(nextRow, leadingEntry) !== 0) {
                throw new Error(errMsg);
            }
        }

        // 5. all leading entries are to the right of the leading entry of the row above it
        for (let prevRow = row - 1; prevRow >= 0; prevRow--) {
            if (leadingEntry <= leadingEntries.get(prevRow)!) {
                throw new Error(errMsg);
            }
        }

        if (checkReduced) {
            // check that the leading entry is 1 and all entries in its column are 0
            if (matrix.get(row, leadingEntry) !== 1) {
                throw new Error(errMsg);
            }

            for (let nextRow = row + 1; nextRow < matrix.numRows; nextRow++) {
                matrix.get(nextRow, leadingEntry) !== 0 && (() => {
                    throw new Error(errMsg);
                })();
            }
        }

        prevLeadingEntry = leadingEntry;
    }
}


