import { MatrixIface } from '../../types';
import { EchelonFormIface } from './types';
import { checkZeroRows, checkLeadingEntries } from './helpers';


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
    isEchelonForm(matrix: MatrixIface, isReduced = false): boolean {
        // the verification function throw errors if the matrix is not in echelon form
        try {
            // 1. all zero rows are at the bottom of the matrix
            checkZeroRows(matrix);
            // 2. the first non-zero entry in a row is a leading entry
            // 3. all entries below a leading entry are zeros
            // 4. all entries above a leading entry we don't care about
            // 5. all leading entries are to the right of the leading entry of the row above it

            // This may not be truly functional since we have a function
            // that can do two things but it is more efficient to do it this way
            // rather than have to loop over the matrix 2x if we
            // want to ensure it is in reduced form an optional
            // parameter can be passed to checkLeadingEntries, which defaults to false
            checkLeadingEntries(matrix, isReduced);
        } catch (error: unknown) {
            return false;
        }

        // if we make it here, the matrix is in echelon form
        return true;
    },
    isReducedEchelonForm(matrix: MatrixIface): boolean {
        return EchelonForm.isEchelonForm(matrix, true);
    },
    isPivotElement(matrix: MatrixIface, row: number, col: number): boolean {
        // a pivot element is a leading entry that is the first non-zero entry in its column
        // and is the only non-zero entry in its column
        const Row = matrix.getRow(row);
        const Col = matrix.getColumn(col);
        const leadingEntry = Row[col];
        const isLeadingEntry = leadingEntry !== 0;
        const isOnlyNonZeroEntry = Col.filter((entry: number) => entry !== 0).length === 1;

        return isLeadingEntry && isOnlyNonZeroEntry;
    },
    isPivotColumn(matrix: MatrixIface, col: number): boolean {
        let hasPivot = false;

        // for each element in the column check if it is a pivot element, if it is
        // then the column is a pivot column

        const columnToCheck = matrix.getColumn(col);

        for (let row = 0; row < matrix.numRows; row++) {
            const entry = columnToCheck[row];
            if (entry !== 0) {
                hasPivot = EchelonForm.isPivotElement(matrix, row, col);
                if (hasPivot) {
                    break;
                }
            }
        }

        return hasPivot;
    },
};

export default EchelonForm;
