import { validateCol, validateConstructor, validateGet, validateRow, validateSet } from './helpers';


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
     * Returns the value at the specified row and column.
     * @param row The row of the value to return. Note: the first row is 0.
     * @param col The column of the value to return. Note: the first column is 0.
     * @returns The value at the specified row and column.
     * @throws Throws an error if the row or column is out of bounds.
    */
    get(row: number, col: number): number;

    /**
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
     * Returns a single row of the matrix as a 1D array.
     * @param row The row to return. Note: the first row is 0.
     * @returns A single row of the matrix as a 1D array.
     * @throws Throws an error if the row is out of bounds.
     */
    getRow(row: number): number[];

    /**
     * Returns a single column of the matrix as a 1D array.
     * @param col The column to return. Note: the first column is 0.
     * @returns A single column of the matrix as a 1D array.
     * @throws Throws an error if the column is out of bounds.
     */
    getColumn(col: number): number[];

    /**
     * This method creates a clone of the matrix.
     */
    clone(): MatrixIface;

    /**
     * This method prints out the matrix in dimensional format.
     */
    print(): void;

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
    public numRows: number;
    public numCols: number;

    constructor({ numRows, numCols, matrix }: MatrixConstructor) {
        // validates the input parameters
        validateConstructor({ numRows, numCols, matrix });

        this.numRows = numRows;
        this.numCols = numCols;
        this._matrix = matrix?.flat() as number[] || Array.from({ length: numRows * numCols }, () => 0);
    }

    public get(row: number, col: number): number {
        validateGet(row, col, this);
        return this._matrix[row * this.numCols + col];
    }

    public set(row: number, col: number, value: number): void {
        validateSet(row, col, value, this);
        this._matrix[row * this.numCols + col] = value;
    }

    public getRow(row: number): number[] {
        validateRow(row, this.numRows);
        return this._matrix.slice(row * this.numCols, (row + 1) * this.numCols);
    }

    public getColumn(col: number): number[] {
        validateCol(col, this.numCols);
        return this._matrix.filter((_, index) => index % this.numCols === col);
    }

    public clone(): MatrixIface {
        return new Matrix({ numRows: this.numRows, numCols: this.numCols, matrix: this._matrix });
    }

    public print(): void {
        for (let i = 0; i < this.numRows; i++) {
            process.stdout.write(this.getRow(i).toString().replace(/,/g, ' '));
        }
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
