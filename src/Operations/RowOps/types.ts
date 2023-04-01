import { MatrixIface } from '../../Matrix/types';

/**
 * This interface defines the functions that are used to perform row operations on a matrix.
 *
 * Row operations are operations that are performed on a matrix by manipulating the rows of the matrix.
 * This is done for the purpose of reducing the matrix to make matrices row equivalent.
 *
 * There are three elementary row operations:
 * 1. Interchange two rows
 * 2. Multiply a row by a nonzero constant
 * 3. Add a multiple of one row to another row
 */
export interface ElemRowOpsIface {
    /**
     * Swaps two rows in the matrix.
     *
     * Default behavior is to swap the swapRowIndex with the swapWithRowIndex.
     * @param swapRowIndex The index of the row to be swapped
     * @param swapWithRowIndex The index of the replacement row
     * @param self The matrix to perform the operation on
     * @returns void
     * @Throws Error if the row index is out of bounds
     */
    interchangeRows(swapRowIndex: number, swapWithRowIndex: number, self: MatrixIface): void;

    /**
     * Multiply each element in a row by a nonzero constant.
     * @param rowId The row to be scaled
     * @param scalar a nonzero constant to multiply the row by
     * @param self The matrix to perform the operation on
     */
    scaleRow(rowId: number, scalar: number, self: MatrixIface): void;

    /**
     * This function takes two rows and adds them together.
     * By default it will apply the scalar to the second row and then add the two rows together.
     *
     * Addition is commutative so the order of the rows does not matter except for the scalar.
     * 
     * @param rowId The row to be added to
     * @param scalar The scalar to multiply the second row by
     * @param addRowId The row to be added to the first row
     * @param self The matrix to perform the operation on
     * @returns void
     */
    addMultipleOfRow(rowId: number, scalar: number, addRowId: number, self: MatrixIface): void;
}
