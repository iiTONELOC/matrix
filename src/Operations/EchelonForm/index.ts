import { MatrixIface } from '../../types';
import { EchelonFormIface } from './types';

const errMsg = 'Matrix is not in echelon form';


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

    // check that all rows above the zero rows are non-zero rows
    for (const element of zeroRowIndices) {
        const zeroRowIndex = element;
        for (let prevRow = zeroRowIndex - 1; prevRow >= 0; prevRow--) {
            if (EchelonForm.isZeroRow(matrix, prevRow)) {
                throw new Error(errMsg);
            }
        }
    }
}

export function checkLeadingEntries(matrix: MatrixIface): void { //NOSONAR

    const leadingEntries: Map<number, number> = new Map();
    const isLeading = (entry: number): boolean => entry !== 0;

    // loop over the rows of the matrix
    for (let row = 0; row < matrix.numRows; row++) {
        const leadingEntry = matrix.getRow(row).findIndex(isLeading);
        if (leadingEntry !== -1) {
            leadingEntries.set(row, leadingEntry);
        }
    }

    // 2.check that the leading entries are in the correct order
    let prevLeadingEntry = -1;

    for (const [row, leadingEntry] of leadingEntries) {

        if (leadingEntry <= prevLeadingEntry) {
            throw new Error(errMsg);
        }

        // 3. check that all entries below a leading entry are zeros
        for (let nextRow = row + 1; nextRow < matrix.numRows; nextRow++) {
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

        prevLeadingEntry = leadingEntry;
    }
}

export const EchelonForm: EchelonFormIface = {
    isZeroRow(matrix: MatrixIface, row: number): boolean {
        const Row = matrix.getRow(row);
        return Row.every((entry: number) => entry === 0);
    },
    isNonZeroRow(matrix: MatrixIface, row: number): boolean {
        return EchelonForm.isZeroRow(matrix, row) === false;
    },
    isZeroColumn(matrix: MatrixIface, col: number): boolean {
        const Col = matrix.getColumn(col);
        return Col.every((entry: number) => entry === 0);
    },
    isNonZeroColumn(matrix: MatrixIface, col: number): boolean {
        return EchelonForm.isZeroColumn(matrix, col) === false;
    },
    isEchelonForm(matrix: MatrixIface): boolean {
        // the verification function throw errors if the matrix is not in echelon form
        try {
            // 1. all zero rows are at the bottom of the matrix
            checkZeroRows(matrix);
            // 2. the first non-zero entry in a row is a leading entry
            // 3. all entries below a leading entry are zeros
            // 4. all entries above a leading entry we don't care about
            // 5. all leading entries are to the right of the leading entry of the row above it
            checkLeadingEntries(matrix);
        } catch (error: unknown) {
            process.stderr.write(String(error));
            return false;
        }

        // if we make it here, the matrix is in echelon form
        return true;
    },

    isReducedEchelonForm(matrix: MatrixIface): boolean {
        // check if the matrix is in echelon form
        if (!EchelonForm.isEchelonForm(matrix)) {
            return false;
        } else {
            // we have a matrix in echelon form, check that the leading entries are 1
            // and that it is the only non-zero entry in its column
            let isLeadingEntry = true;

            for (let row = 0; row < matrix.numRows; row++) {
                const leadingEntry = matrix.getRow(row).findIndex((entry: number) => entry !== 0);

                leadingEntry !== -1 && matrix.get(row, leadingEntry) !== 1 && (() => {
                    isLeadingEntry = false;
                })();

                leadingEntry !== -1 && (() => {
                    // check that all other entries in the column are zero
                    for (let nextRow = row + 1; nextRow < matrix.numRows; nextRow++) {
                        matrix.get(nextRow, leadingEntry) !== 0 && (() => {
                            isLeadingEntry = false;
                        })();
                    }
                })();
            }

            return isLeadingEntry;
        }
    },
};

export default EchelonForm;
