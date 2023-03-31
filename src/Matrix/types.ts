import { MatrixUtilsIface } from './utils/types';

export type { MatrixUtilsIface, MatrixType } from './utils/types';

/**
 * Represents a Matrix object.
 * @interface MatrixIface
 * @property {number} numRows The number of rows in the matrix.
 * @property {number} numCols The number of columns in the matrix.
 * @property {number} get Returns the value at the specified row and column.
 */
export interface MatrixIface {
    /**
     * The matrix is represented as a 1D array.
     */
    numRows: number;
    /**
     * The matrix is represented as a 1D array.
     */
    numCols: number;

    /**
     * The matrix is represented as a 1D array.
     */
    _matrix: number[];

    /**
     * @public
     * Returns the value at the specified row and column.
     * @param row The row of the value to return. Note: the first row is 0.
     * @param col The column of the value to return. Note: the first column is 0.
     * @returns The value at the specified row and column.
     * @throws Throws an error if the row or column is out of bounds.
    */
    get(row: number, col: number): number;

    /**
     * @public
     * Sets the value at the specified row and column.
     * @param row The row of the value to set. Note: the first row is 0.
     * @param col The column of the value to set. Note: the first column is 0.
     * @param value The value to set.
     * @throws Throws an error if the row or column is out of bounds.
     * @Throws Throws an error if the value is not a number.
     *
     * @example
     */
    set(row: number, col: number, value: number): void;

    /**
     * @public
     * Returns a single row of the matrix as a 1D array.
     * @param row The row to return. Note: the first row is 0.
     * @returns A single row of the matrix as a 1D array.
     * @throws Throws an error if the row is out of bounds.
     */
    getRow(row: number): number[];

    /**
     * @public
     * Returns a single column of the matrix as a 1D array.
     * @param col The column to return. Note: the first column is 0.
     * @returns A single column of the matrix as a 1D array.
     * @throws Throws an error if the column is out of bounds.
     */
    getColumn(col: number): number[];

    /**
     * @public
     * This method creates a clone of the matrix.
     */
    clone(): MatrixIface;

    /**
     * @public
     * This method prints out the matrix in dimensional format.
     */
    print(): void;

    utils: MatrixUtilsIface;
}



/**
 * Required parameters for the Matrix constructor.
 * @interface MatrixConstructor
 * @property {number} numRows The number of rows in the matrix.
 * @property {number} numCols The number of columns in the matrix.
 * @property {number[][] | number[]} matrix The matrix as a 1D array. A multi-dimensional array will be flattened.
 */
export interface MatrixConstructor {
    /**
     * Number of rows in the matrix.
     */
    numRows: number;
    /**
     * Number of columns in the matrix.
     */
    numCols: number;
    /**
     * The matrix as a 1D array. A multi-dimensional array will be flattened.
     *
     * This is an optional parameter.
     * If it is not provided, a new matrix will be created and initialized with zeros.
     */
    matrix?: (number[] | number[][]);
}
