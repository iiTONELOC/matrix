import { validateCol, validateConstructor, validateGet, validateRow, validateSet } from './helpers';
import { MatrixIface, MatrixConstructor, MatrixUtilsIface } from './types';
import { createUtils } from './utils';

export class Matrix implements MatrixIface {
    public _matrix: number[];
    public numRows: number;
    public numCols: number;
    public utils: MatrixUtilsIface;

    constructor({ numRows, numCols, matrix }: MatrixConstructor) {
        // validates the input parameters
        validateConstructor({ numRows, numCols, matrix });

        this.numRows = numRows;
        this.numCols = numCols;
        this._matrix = matrix?.flat() as number[] ||
            Array.from({ length: numRows * numCols }, () => 0);
        this.utils = createUtils(this);
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
