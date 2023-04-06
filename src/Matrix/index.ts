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

    public print(): void { //NOSONAR
        const longestNum = Math.max(...this._matrix.map((num: number) => num.toString().length));
        let outStr = '';

        function toOut(str: string) {
            outStr += str;
        }

        function printDash() {
            toOut('─'.repeat(longestNum + 2));
        }

        function printNewLine() {
            toOut('\n');
        }

        function printPipe() {
            toOut('│');
        }

        // adds the necessary spacing to the front and back of the number
        function padNum(num: string): string {
            // get the length of the number
            const numLength = num.toString().length;

            return numLength === longestNum ? ' ' + num + ' ' :
                ' '.repeat(longestNum - numLength + 1) + num + ' ';
        }


        // print the matrix
        for (let i = 0; i < this.numRows; i++) {
            // if its the first row, print the symbols for the top of the matrix
            if (i === 0) {
                toOut('┌');
                for (let j = 0; j < this.numCols; j++) {
                    printDash();
                    j === this.numCols - 1 && (() => toOut('┐'))();
                    j !== this.numCols - 1 && (() => toOut('┬'))();
                }
                printNewLine();
            }

            // prints sides and elements of the matrix
            printPipe();
            let row = this.getRow(i).toString().replace(/,/g, ' ');
            // using regex, add the spacing to the front of the number
            // capture the negative sign and the number
            row = row.replace(/(-?\d+)/g, (match, p1) => padNum(p1));
            // print the row
            toOut(row);
            printPipe();
            printNewLine();

            // if its the last row, print the symbols for the bottom of the matrix
            if (i === this.numRows - 1) {
                toOut('└');
                for (let j = 0; j < this.numCols; j++) {
                    printDash();
                    j === this.numCols - 1 && (() => toOut('┘'))();
                    j !== this.numCols - 1 && (() => toOut('┴'))();
                }
                printNewLine();
            } else {
                toOut('├');
                for (let j = 0; j < this.numCols; j++) {
                    printDash();
                    j === this.numCols - 1 && (() => toOut('┤'))();
                    j !== this.numCols - 1 && (() => toOut('┼'))();
                }
                printNewLine();
            }
        }
        process.stdout.write('\n');
        process.stdout.write(outStr);
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
