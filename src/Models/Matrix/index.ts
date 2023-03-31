/**
 * While an array of arrays is a valid matrix, it is not a good way to represent a matrix.
 * This class provides a better way to represent a matrix.
 * It also provides a way to perform matrix operations.
 */


/**
 * The interface for a matrix.
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
     * Returns the value at the specified row and column.
     * @param row The row of the value to return. Note: the first row is 0.
     * @param col The column of the value to return. Note: the first column is 0.
     * @returns The value at the specified row and column.
     * @throws Throws an error if the row or column is out of bounds.
     * @example
     * const matrix = new Matrix(2, 2, [1, 2, 3, 4]);
     * matrix.get(0, 0); // 1
     * matrix.get(0, 1); // 2
     * matrix.get(1, 0); // 3
     * matrix.get(1, 1); // 4
     * matrix.get(2, 0); // Throws an error
     * matrix.get(0, 2); // Throws an error
    */
    get(row: number, col: number): number;
}

/**
 * Required parameters for the Matrix constructor.
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

export class Matrix implements MatrixIface {
    protected _matrix: number[];
    numRows: number;
    numCols: number;

    constructor({ numRows, numCols, matrix }: MatrixConstructor) {
        // VALIDATION
        // if numRows or numCols is less than 0 or not a number, throw an error
        if (numRows < 0 || !Number.isInteger(numRows)) {
            throw new Error(`Number of rows must be a positive integer. Received ${numRows}.`);
        }

        // if numRows or numCols is less than 0 or not a number, throw an error
        if (numCols < 0 || !Number.isInteger(numCols)) {
            throw new Error(`Number of columns must be a positive integer. Received ${numCols}.`);
        }

        // ensure that the provided matrix contains only numbers,
        // can be flattened, and has the correct number of elements
        if (matrix) {
            if (!Array.isArray(matrix)) {
                throw new Error(`Matrix must be an array. Received ${matrix}.`);
            }

            // flatten before more validation
            matrix = matrix.flat();

            if (matrix.some((value: unknown) => typeof value !== 'number')) {
                throw new Error(`Matrix elements must contain only numbers. Received ${matrix}.`);
            }

            if (matrix.length !== numRows * numCols) {
                throw new Error(`Matrix must contain ${numRows * numCols} elements. Received ${matrix.flat().length}.`);
            }

            this._matrix = matrix;
        }

        this.numRows = numRows;
        this.numCols = numCols;
        // the matrix is an optional parameter, so if it is not provided, create a new matrix
        this._matrix = matrix || Array.from({ length: numRows * numCols }, () => 0);
    }


    get(row: number, col: number): number {
        if (row < 0 || row >= this.numRows) {
            throw new Error(`Row ${row} is out of bounds.`);
        }

        if (col < 0 || col >= this.numCols) {
            throw new Error(`Column ${col} is out of bounds.`);
        }

        if (typeof row !== 'number') {
            throw new Error(`Row must be a number. Received ${row}.`);
        }

        if (typeof col !== 'number') {
            throw new Error(`Column must be a number. Received ${col}.`);
        }

        if (!Number.isInteger(row)) {
            throw new Error(`Row must be an integer. Received ${row}.`);
        }

        if (!Number.isInteger(col)) {
            throw new Error(`Column must be an integer. Received ${col}.`);
        }

        return this._matrix[row * this.numCols + col];
    }
}

/**
 * Attempts to create a new Matrix instance.
 * @param {MatrixConstructor} { numRows, numCols, matrix }
 * @returns a new Matrix instance or throws an error if construction fails.
 * @throws Throws an error if the number of rows or columns is less than 0 or
 */
export default function matrix({ numRows, numCols, matrix }: MatrixConstructor): MatrixIface {
    return new Matrix({ numRows, numCols, matrix });
}
